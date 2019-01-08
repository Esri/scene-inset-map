/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/

import ApplicationBase = require("ApplicationBase/ApplicationBase");

import i18n = require("dojo/i18n!./nls/resources");

const CSS = {
  loading: "configurable-application--loading"
};

import InsetMap from "./InsetMap";
import requireUtils = require("esri/core/requireUtils");
import {
  createMapFromItem,
  createView,
  getConfigViewProperties,
  getItemTitle,
  findQuery,
  goToMarker
} from "ApplicationBase/support/itemUtils";

import {
  setPageLocale,
  setPageDirection,
  setPageTitle
} from "ApplicationBase/support/domHelper";

declare var calcite: any;
class SceneExample {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  ApplicationBase
  //----------------------------------
  base: ApplicationBase = null;
  header = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  public init(base: ApplicationBase): void {
    if (!base) {
      console.error("ApplicationBase is not defined");
      return;
    }
    this._applySharedTheme(base);
    setPageLocale(base.locale);
    setPageDirection(base.direction);

    this.base = base;

    const { config, results } = base;
    const { find, marker } = config;
    const { webSceneItems } = results;

    const validWebSceneItems = webSceneItems.map(response => {
      return response.value;
    });

    const firstItem = validWebSceneItems[0];
    if (!firstItem) {
      console.error("Could not load an item to display");
      return;
    }

    config.title = !config.title ? getItemTitle(firstItem) : config.title;
    const viewContainerNode = document.getElementById("viewContainer");
    if (this.base.config.splitDirection === "vertical") {
      // vertical is maps stacked vertically. Horizontal is side by side
      viewContainerNode.classList.add("direction-vertical");
    }
    setPageTitle(config.title);
    if (config.embed && config.embed === true) { // Hide header if embed property is true
    } else if (config.header) {
      this._addHeader(viewContainerNode, config);
    }

    const portalItem: any = this.base.results.applicationItem.value;
    const appProxies =
      portalItem && portalItem.applicationProxies
        ? portalItem.applicationProxies
        : null;

    const defaultViewProperties = getConfigViewProperties(config);
    const item = firstItem;
    const contDiv = document.createElement("div");
    document.getElementById("mapMain").appendChild(contDiv);
    const container = {
      container: contDiv
    };

    const viewProperties = {
      ...defaultViewProperties,
      ...container
    };
    if (base.config.transparentBackground && base.config.backgroundColor) {
      viewProperties.alphaCompositingEnabled = true;
      viewProperties.environment = {
        background: {
          type: "color",
          color: base.config.backgroundColor
        },
        starsEnabled: false,
        atmosphereEnabled: false
      };
    }

    createMapFromItem({ item, appProxies }).then(map =>
      createView({
        ...viewProperties,
        map
      }).then(view => {
        view.when(async () => {
          this.base.config.appProxies = appProxies;
          this._addSplash(view, this.base.config);
          const insetMap = new InsetMap({
            mainView: view,
            config: this.base.config
          });
          insetMap.createInsetView();
        });
        findQuery(find, view).then(() => goToMarker(marker, view));
        this._addMeasureWidgets(view, this.base.config);
        this._addHome(view, this.base.config);
        this._addSearch(view, this.base.config);
        this._createSlideGallery(view, this.base.config);
        if (this.base.config.splash && this.base.config.embed) {
          // move splash button to ui
          const splash = document.getElementById("splashButton");
          view.ui.add(splash, "top-right");
        }
      })
    );
    document.body.classList.remove(CSS.loading);
  }

  _applySharedTheme(base) {
    const { portal, config } = base;

    /* if (portal && portal.portalProperties && portal.portalProperties.sharedTheme) {
       const theme = portal.portalProperties.sharedTheme;
       if (theme.body) {
         //.app-body
         // background,text, link
         if (theme.body.background) {
           config.bodyBackground = theme.body.background;
         }
         if (theme.body.text) {
           config.bodyColor = theme.body.text;
         }
       }
       if (theme.header) {
         //.app-header
         //background, text
         if (theme.header.background) {
           config.headerBackground = theme.header.background;
         }
         if (theme.header.text) {
           config.headerColor = theme.header.text;
         }
       }
       if (theme.button) {
         //background text
         //esri-widget--button
         if (theme.button.background) {
           config.buttonBackground = theme.button.background;
         }
         if (theme.button.text) {
           config.buttonColor = theme.button.text;
         }
       }
       if (theme.logo) {
         //small
       }
     }*/
    // Build and insert style
    const styles = [];
    styles.push(config.bodyBackground ? `.app-body{background:${config.bodyBackground};}` : null);
    styles.push(config.bodyColor ? `.app-body{color:${config.bodyColor};}` : null);
    styles.push(config.headerBackground ? `.app-header{background:${config.headerBackground};}` : null);
    styles.push(config.headerColor ? `.app-header{color:${config.headerColor};}.toolbar-buttons{color:${config.headerColor}}` : null);
    styles.push(config.buttonBackground ? `.app-button{background:${config.buttonBackground};}` : null);
    styles.push(config.buttonColor ? `.app-button{color:${config.buttonColor};}` : null);

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(styles.join("")));
    document.getElementsByTagName("head")[0].appendChild(style);

  }
  async _addHeader(viewContainerNode, config) {
    //Add header if specified
    const Header = await import("./components/Header");
    if (Header !== null) {
      this.header = new Header.default({
        config,
        container: document.createElement("div")
      });
      // position at top or bottom of app
      const headerContainer = this.header.container as HTMLElement;
      config.headerPosition === "top" ? document.body.insertBefore(headerContainer, viewContainerNode) : document.body.appendChild(headerContainer);
    }
  }
  async _addSplash(view, config) {
    if (config.splash) {
      const Splash = await import("./components/Splash");
      if (Splash !== null) {
        const splash = new Splash.default({
          config,
          container: document.createElement("div")
        });
        document.body.appendChild(splash.container as HTMLElement);
        const splashToggle = splash.createToolbarButton();
        if (!config.header) {
          view.ui.add(splashToggle, "top-right");
        } else {
          // This toolbar is created as part of header
          const toolbar = this.header && this.header.getToolbar();
          if (toolbar) {
            toolbar.appendChild(splashToggle);
          }
        }
        splash.showSplash();
      }
    }
  }
  async _addHome(view, config) {
    if (config.home) {
      const [Home] = await requireUtils.when(require, ["esri/widgets/Home"]);
      if (!Home) { return };
      view.ui.add(new Home({ view }), config.homePosition);
    }
  }
  async _addSearch(view, config) {
    if (config.search) {
      const [Search, Expand, FeatureLayer] = await requireUtils.when(require, [
        "esri/widgets/Search",
        "esri/widgets/Expand",
        "esri/layers/FeatureLayer"
      ]);
      if (!Search && !Expand && !FeatureLayer) {
        return;
      }
      const searchProperties: any = {
        view,
        locationEnabled: true
      };

      // Get any configured search settings
      if (config.searchConfig) {
        if (config.searchConfig.sources) {
          const sources = config.searchConfig.sources;
          searchProperties.sources = sources.filter((source) => {
            if (source.flayerId && source.url) {
              const layer = view.map.findLayerById(source.flayerId);
              source.featureLayer = layer ? layer : new FeatureLayer(source.url);
            }
            return source;
          });
        }
        if (searchProperties.sources && searchProperties.sources.length && searchProperties.sources.length > 0) {
          searchProperties.includeDefaultSources = false;
        }
        searchProperties.searchAllEnabled = this.base.config.searchConfig.enableSearchingAll || true;
        if (this.base.config.searchConfig.activeSourceIndex && searchProperties.sources && searchProperties.sources.length >= this.base.config.searchConfig.activeSourceIndex) {
          searchProperties.activeSourceIndex = this.base.config.searchConfig.activeSourceIndex;
        }
      }

      const content = new Search(searchProperties);
      const expandSearch = new Expand({
        view,
        expandTooltip: i18n.tools.search,
        group: config.searchPosition,
        content
      });
      if (config.searchExpanded) {
        expandSearch.expand();
      }
      view.ui.add(expandSearch, config.searchPosition);

    }
  }
  async _createSlideGallery(view, config) {
    // If the scene contains slides add custom scene view widget to app
    if (config.slides) {
      if (
        view &&
        view.map &&
        view.map.presentation &&
        view.map.presentation.slides &&
        view.map.presentation.slides.length > 0
      ) {
        const [Expand, CustomBookmarks] = await requireUtils.when(require, [
          "esri/widgets/Expand",
          "./components/CustomBookmarks"
        ]);
        if (!Expand && !CustomBookmarks) { return; }

        const expand = new Expand({
          view: view,
          expandTooltip: i18n.tools.bookmarks.label,
          content: new CustomBookmarks({
            view,
            containerTitle: this.base.config.slidesTitle
          }),
          group: config.slidePosition
        });
        view.ui.add(expand, config.slidesPosition);

      }
    }
  }
  async _addMeasureWidgets(view, config) {
    if (config.measurement) {
      const [DirectLineMeasurement3D, AreaMeasurement3D, Slice] = await requireUtils.when(require, [
        "esri/widgets/DirectLineMeasurement3D",
        "esri/widgets/AreaMeasurement3D",
        "esri/widgets/Slice"
      ]);

      const nav = document.createElement("nav");
      nav.classList.add("leader-1");
      let buttons = [];

      let measureTool = null;
      if (config.measurementOptions === "area" || config.measurementOptions === "both") {
        buttons.push(this._createMeasureButton("area"));
      }
      if (config.measurementOptions === "line" || config.measurementOptions === "both") {
        buttons.push(this._createMeasureButton("line"));
      }
      if (config.slice) {
        buttons.push(this._createMeasureButton("slice"));
      }
      buttons.forEach(button => nav.appendChild(button));
      nav.addEventListener("click", e => {
        const activeButton = e.target as HTMLButtonElement;

        const isActive = activeButton.classList.contains("active");

        // Deactivate all buttons
        buttons.forEach(button => button.classList.remove("active"));
        this._destroyMeasureButton(view, measureTool);

        if (!isActive) {
          const buttonType = activeButton.dataset.type;
          activeButton.classList.add("active");
          if (buttonType === "area") {
            measureTool = new AreaMeasurement3D({ view });
            measureTool.viewModel.newMeasurement();
          } else if (buttonType === "line") {
            measureTool = new DirectLineMeasurement3D({ view });
            measureTool.viewModel.newMeasurement();
          } else if (buttonType === "slice") {
            measureTool = new Slice({ view });
          }
          view.ui.add(measureTool, config.measurementPosition);
        }
      });
      view.ui.add(nav, config.measurementPosition);

    }
  }
  _destroyMeasureButton(view, tool) {
    if (!tool) {
      return;
    }
    view.ui.remove(tool);
    tool.destroy();
    tool = null;
  }
  _createMeasureButton(type) {
    const button = document.createElement("button");
    let icon, label;
    if (type === "area") {
      icon = "esri-icon-polygon";
      label = i18n.tools.measureArea;
    } else if (type === "line") {
      icon = "esri-icon-minus";
      label = i18n.tools.measureLine;
    } else if (type === "slice") {
      icon = "esri-icon-hollow-eye";
      label = "Slice"; // hard-code name for testing
    }
    button.dataset.type = type;
    button.classList.add(...["esri-widget--button", "esri-widget", "btn", "btn-white", "btn-grouped", icon]);
    button.title = label;
    button.setAttribute("aria-label", label);
    return button;
  }
}

export = SceneExample;
