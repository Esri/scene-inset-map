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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "dojo/i18n!./nls/resources", "./InsetMap", "esri/core/requireUtils", "ApplicationBase/support/itemUtils", "ApplicationBase/support/domHelper"], function (require, exports, i18n, InsetMap_1, requireUtils, itemUtils_1, domHelper_1) {
    "use strict";
    var CSS = {
        loading: "configurable-application--loading"
    };
    var SceneExample = /** @class */ (function () {
        function SceneExample() {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  ApplicationBase
            //----------------------------------
            this.base = null;
            this.header = null;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        SceneExample.prototype.init = function (base) {
            var _this = this;
            if (!base) {
                console.error("ApplicationBase is not defined");
                return;
            }
            this._applySharedTheme(base);
            domHelper_1.setPageLocale(base.locale);
            domHelper_1.setPageDirection(base.direction);
            this.base = base;
            var config = base.config, results = base.results;
            var find = config.find, marker = config.marker;
            var webSceneItems = results.webSceneItems;
            var validWebSceneItems = webSceneItems.map(function (response) {
                return response.value;
            });
            var firstItem = validWebSceneItems[0];
            if (!firstItem) {
                console.error("Could not load an item to display");
                return;
            }
            config.title = !config.title ? itemUtils_1.getItemTitle(firstItem) : config.title;
            var viewContainerNode = document.getElementById("viewContainer");
            if (this.base.config.splitDirection === "vertical") {
                // vertical is maps stacked vertically. Horizontal is side by side
                viewContainerNode.classList.add("direction-vertical");
            }
            domHelper_1.setPageTitle(config.title);
            if (config.embed && config.embed === true) { // Hide header if embed property is true
            }
            else if (config.header) {
                this._addHeader(viewContainerNode, config);
            }
            var portalItem = this.base.results.applicationItem.value;
            var appProxies = portalItem && portalItem.applicationProxies
                ? portalItem.applicationProxies
                : null;
            var defaultViewProperties = itemUtils_1.getConfigViewProperties(config);
            var item = firstItem;
            var contDiv = document.createElement("div");
            document.getElementById("mapMain").appendChild(contDiv);
            var container = {
                container: contDiv
            };
            var viewProperties = __assign({}, defaultViewProperties, container);
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
            itemUtils_1.createMapFromItem({ item: item, appProxies: appProxies }).then(function (map) {
                return itemUtils_1.createView(__assign({}, viewProperties, { map: map })).then(function (view) {
                    view.when(function () { return __awaiter(_this, void 0, void 0, function () {
                        var insetMap;
                        return __generator(this, function (_a) {
                            this.base.config.appProxies = appProxies;
                            this._addSplash(view, this.base.config);
                            insetMap = new InsetMap_1.default({
                                mainView: view,
                                config: this.base.config
                            });
                            insetMap.createInsetView();
                            return [2 /*return*/];
                        });
                    }); });
                    itemUtils_1.findQuery(find, view).then(function () { return itemUtils_1.goToMarker(marker, view); });
                    _this._addMeasureWidgets(view, _this.base.config);
                    _this._addHome(view, _this.base.config);
                    _this._addSearch(view, _this.base.config);
                    _this._createSlideGallery(view, _this.base.config);
                    if (_this.base.config.splash && _this.base.config.embed) {
                        // move splash button to ui
                        var splash = document.getElementById("splashButton");
                        view.ui.add(splash, "top-right");
                    }
                });
            });
            document.body.classList.remove(CSS.loading);
        };
        SceneExample.prototype._applySharedTheme = function (base) {
            var portal = base.portal, config = base.config;
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
            var styles = [];
            styles.push(config.bodyBackground ? ".app-body{background:" + config.bodyBackground + ";}" : null);
            styles.push(config.bodyColor ? ".app-body{color:" + config.bodyColor + ";}" : null);
            styles.push(config.headerBackground ? ".app-header{background:" + config.headerBackground + ";}" : null);
            styles.push(config.headerColor ? ".app-header{color:" + config.headerColor + ";}.toolbar-buttons{color:" + config.headerColor + "}" : null);
            styles.push(config.buttonBackground ? ".app-button{background:" + config.buttonBackground + ";}" : null);
            styles.push(config.buttonColor ? ".app-button{color:" + config.buttonColor + ";}" : null);
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(styles.join("")));
            document.getElementsByTagName("head")[0].appendChild(style);
        };
        SceneExample.prototype._addHeader = function (viewContainerNode, config) {
            return __awaiter(this, void 0, void 0, function () {
                var Header, headerContainer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["./components/Header"], resolve_1, reject_1); })];
                        case 1:
                            Header = _a.sent();
                            if (Header !== null) {
                                this.header = new Header.default({
                                    config: config,
                                    container: document.createElement("div")
                                });
                                headerContainer = this.header.container;
                                config.headerPosition === "top" ? document.body.insertBefore(headerContainer, viewContainerNode) : document.body.appendChild(headerContainer);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._addSplash = function (view, config) {
            return __awaiter(this, void 0, void 0, function () {
                var Splash, splash, splashToggle, toolbar_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!config.splash) return [3 /*break*/, 2];
                            return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(["./components/Splash"], resolve_2, reject_2); })];
                        case 1:
                            Splash = _a.sent();
                            if (Splash !== null) {
                                splash = new Splash.default({
                                    config: config,
                                    container: document.createElement("div")
                                });
                                document.body.appendChild(splash.container);
                                splashToggle = splash.createToolbarButton();
                                if (!config.header) {
                                    view.ui.add(splashToggle, "top-right");
                                }
                                else {
                                    toolbar_1 = this.header && this.header.getToolbar();
                                    if (toolbar_1) {
                                        toolbar_1.appendChild(splashToggle);
                                    }
                                }
                                splash.showSplash();
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._addHome = function (view, config) {
            return __awaiter(this, void 0, void 0, function () {
                var Home;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!config.home) return [3 /*break*/, 2];
                            return [4 /*yield*/, requireUtils.when(require, ["esri/widgets/Home"])];
                        case 1:
                            Home = (_a.sent())[0];
                            if (!Home) {
                                return [2 /*return*/];
                            }
                            ;
                            view.ui.add(new Home({ view: view }), config.homePosition);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._addSearch = function (view, config) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, Search, Expand, FeatureLayer_1, searchProperties, sources, content, expandSearch;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!config.search) return [3 /*break*/, 2];
                            return [4 /*yield*/, requireUtils.when(require, [
                                    "esri/widgets/Search",
                                    "esri/widgets/Expand",
                                    "esri/layers/FeatureLayer"
                                ])];
                        case 1:
                            _a = _b.sent(), Search = _a[0], Expand = _a[1], FeatureLayer_1 = _a[2];
                            if (!Search && !Expand && !FeatureLayer_1) {
                                return [2 /*return*/];
                            }
                            searchProperties = {
                                view: view,
                                locationEnabled: true
                            };
                            // Get any configured search settings
                            if (config.searchConfig) {
                                if (config.searchConfig.sources) {
                                    sources = config.searchConfig.sources;
                                    searchProperties.sources = sources.filter(function (source) {
                                        if (source.flayerId && source.url) {
                                            var layer = view.map.findLayerById(source.flayerId);
                                            source.featureLayer = layer ? layer : new FeatureLayer_1(source.url);
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
                            content = new Search(searchProperties);
                            expandSearch = new Expand({
                                view: view,
                                expandTooltip: i18n.tools.search,
                                group: config.searchPosition,
                                content: content
                            });
                            if (config.searchExpanded) {
                                expandSearch.expand();
                            }
                            view.ui.add(expandSearch, config.searchPosition);
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._createSlideGallery = function (view, config) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, Expand, CustomBookmarks, expand;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!config.slides) return [3 /*break*/, 2];
                            if (!(view &&
                                view.map &&
                                view.map.presentation &&
                                view.map.presentation.slides &&
                                view.map.presentation.slides.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, requireUtils.when(require, [
                                    "esri/widgets/Expand",
                                    "./components/CustomBookmarks"
                                ])];
                        case 1:
                            _a = _b.sent(), Expand = _a[0], CustomBookmarks = _a[1];
                            if (!Expand && !CustomBookmarks) {
                                return [2 /*return*/];
                            }
                            expand = new Expand({
                                view: view,
                                expandTooltip: i18n.tools.bookmarks.label,
                                content: new CustomBookmarks({
                                    view: view,
                                    containerTitle: this.base.config.slidesTitle
                                }),
                                group: config.slidePosition
                            });
                            view.ui.add(expand, config.slidesPosition);
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._addMeasureWidgets = function (view, config) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, DirectLineMeasurement3D_1, AreaMeasurement3D_1, Slice_1, nav_1, buttons_1, measureTool_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!config.measurement) return [3 /*break*/, 2];
                            return [4 /*yield*/, requireUtils.when(require, [
                                    "esri/widgets/DirectLineMeasurement3D",
                                    "esri/widgets/AreaMeasurement3D",
                                    "esri/widgets/Slice"
                                ])];
                        case 1:
                            _a = _b.sent(), DirectLineMeasurement3D_1 = _a[0], AreaMeasurement3D_1 = _a[1], Slice_1 = _a[2];
                            nav_1 = document.createElement("nav");
                            nav_1.classList.add("leader-1");
                            buttons_1 = [];
                            measureTool_1 = null;
                            if (config.measurementOptions === "area" || config.measurementOptions === "both") {
                                buttons_1.push(this._createMeasureButton("area"));
                            }
                            if (config.measurementOptions === "line" || config.measurementOptions === "both") {
                                buttons_1.push(this._createMeasureButton("line"));
                            }
                            if (config.slice) {
                                buttons_1.push(this._createMeasureButton("slice"));
                            }
                            buttons_1.forEach(function (button) { return nav_1.appendChild(button); });
                            nav_1.addEventListener("click", function (e) {
                                var activeButton = e.target;
                                var isActive = activeButton.classList.contains("active");
                                // Deactivate all buttons
                                buttons_1.forEach(function (button) { return button.classList.remove("active"); });
                                _this._destroyMeasureButton(view, measureTool_1);
                                if (!isActive) {
                                    var buttonType = activeButton.dataset.type;
                                    activeButton.classList.add("active");
                                    if (buttonType === "area") {
                                        measureTool_1 = new AreaMeasurement3D_1({ view: view });
                                        measureTool_1.viewModel.newMeasurement();
                                    }
                                    else if (buttonType === "line") {
                                        measureTool_1 = new DirectLineMeasurement3D_1({ view: view });
                                        measureTool_1.viewModel.newMeasurement();
                                    }
                                    else if (buttonType === "slice") {
                                        measureTool_1 = new Slice_1({ view: view });
                                    }
                                    view.ui.add(measureTool_1, config.measurementPosition);
                                }
                            });
                            view.ui.add(nav_1, config.measurementPosition);
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SceneExample.prototype._destroyMeasureButton = function (view, tool) {
            if (!tool) {
                return;
            }
            view.ui.remove(tool);
            tool.destroy();
            tool = null;
        };
        SceneExample.prototype._createMeasureButton = function (type) {
            var _a;
            var button = document.createElement("button");
            var icon, label;
            if (type === "area") {
                icon = "esri-icon-polygon";
                label = i18n.tools.measureArea;
            }
            else if (type === "line") {
                icon = "esri-icon-minus";
                label = i18n.tools.measureLine;
            }
            else if (type === "slice") {
                icon = "esri-icon-hollow-eye";
                label = "Slice"; // hard-code name for testing
            }
            button.dataset.type = type;
            (_a = button.classList).add.apply(_a, ["esri-widget--button", "esri-widget", "btn", "btn-white", "btn-grouped", icon]);
            button.title = label;
            button.setAttribute("aria-label", label);
            return button;
        };
        return SceneExample;
    }());
    return SceneExample;
});
//# sourceMappingURL=Main.js.map