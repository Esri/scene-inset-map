
ArcGIS Configurable Apps will be retired in 2025. The ArcGIS Configurable Apps source code repro is deprecated and will not receive further updates. In addition, this repository will be removed in October 2025, along with the October 2025 ArcGIS Online update.

# Deprected: scene-inset-map
Scene with inset map is a configurable app template for visualizing web scenes with the inclusion of an inset map to help orient users, especially useful when viewing at larger scales.


## Configurable Options
Select optional widgets, including a 3D measure tool
Choose a color theme, and include a header and title
Configure an information dialog that can be used as a splash screen to provide context about the map to your audience
# Configuration Options

## General options
* **appid**: Application id that contains configured app properties

## View comparision options
* **webscene**: Web scene for the 3d map area.
* **webmap**: Optionally specify a Web map for the 2d inset map panel.
* **useWebMap**: Default value is false. When false the inset map uses the basemap value defined in *insetBasemap*. When true the webmap specified by *webmap* is used.
* **insetBasemap**: Use this option to modify the basemap displayed in the inset map. By default the basemap for the 3d map is used.
* **insetExpand**: Add an expand button to each map so users can quickly expand/collapse the inset map to view it full size.
* **splitDirection**: *horizontal|vertical*  When the *insetExpand* option is enabled this property defines how the 2d map and 3d map are displayed when in expanded mdoe. Horizontal displays maps side by side. Vertical stacks maps.
* **insetPosition**: Valid values are *top-left|top-right|bottom-left|bottom-right*. The location on the 3d map where the inset map is displayed.The default value is bottom-left.
* **controlPosition**: Valid values are *top-left|top-right|bottom-left|bottom-right*.  The location on the inset map where the expand button is added. The default value is bottom-right.
* **locationColor**: The hex color of the arrow that displays on the 2d inset map showing the camera direction. The default value is black.


## Title and Toolbar options
* **title**: Main title for the app
* **titlelink**: Url if you want the title to be a clickable link that navigates to the specified site.
* **headerPosition**: *top|bottom* Determines the positioning of the title and toolbar content.
* **header**: *true|false* When true the header area is hidden and any header tools that have been enabled are added to the app

## Splash or Info panel
Use these options to add a modal with descriptive info and/or a button with info to the app. The info/splash button is added to the title area of the app unless **header** is false. If header is false the button is added to the top-right corner of the first view.
* **splash**: Add info button to the app
* **splashOnStart**: Display the information as a splash screen when the app loads. Once the user closes the splash screen we write a property to session storage so the modal isn't displayed again during that session.  When false the modal doesn't display and the info content is added as a button.
* **splashDesc**: Content that displays in the description area of the info panel.
* **splashTitle**: Title for the info panel
* **splashButtonLabel**: Text that displays on the info panel. The default value is ok.


## 3d View Settings
 * **backgroundColor**: Specify a hex color value for the scene background. When set the atmosphere and stars are turned off so the background of the scene will be drawn in the specified color.
 * **transparentBackground**: When true the 3d background(starts and atmostphere) is hidden and the **backgroundColor** displays.


## Theme
* **bodyBackground**: Default value is empty. If a shared theme is set in the organization the body.background color will be used. Users can specify a color via the configuration process. This color will be used for the splash and description panel background color.
* **bodyColor**: Default value is empty. If a shared theme is set in the organization the body.text color will be used. Users can specify a color via the configuration process. This color will be used for the splash and description panel text color.
* **headerBackground**: Default value is white (#fff). If a shared theme is set in the organization the header.background color will be used. Users can specify a color via the configuration process. This color will be used for the header/footer background color.
* **headerColor**: Default value is dark gray (#4c4c4c). If a shared theme is set in the organization the header.text color will be used. Users can specify a color via the configuration process. This color will be used for the header/footer text color and the color of any tools that are displayed in the header/footer area.
* **buttonBackground**: Default value is empty. If a shared theme is set in the organization the button.background color will be used. Users can specify a color via the configuration process. This color will be used for the splash screen button background color. Note: This value is not applied to map buttons.
* **buttonColor**: Default value is empty. If a shared theme is set in the organization the button.text color will be used. Users can specify a color via the configuration process. This color will be used for the splash screen button text color. Note: this value is not applied to map buttons.

## Tools
* **search**: Default value is false.  If the maps are sync'd and the header is displayed we'll just add one search widget to the header area that will allow searching of both maps. If maps are not sync'd then we'll add a search widget to each map.
* **searchConfig**: Allow users to configure search sources for the app
* **searchPosition**: Location on the map where the search button is displayed. Only applies if its not in the header. Valid values are *top-left|top-center|top-right|bottom-left|bottom-center|bottom-right*
* **slides**: Default value is false. When true displays  slides for the 3d map. If no slides  are present in the map then the tool isn't added to the map.
* **slidesPosition**: Location on the  map where the bookmark or slide tool is placed. Valid values are *top-left|top-center|top-right|bottom-left|bottom-center|bottom-right*
* **slidesTitle**: Optional text that is displayed at the top of the slide container. Default value is slides.
* **home**: Default value is false. When true a home button is added to the maps.
* **homePosition**: Location on the map where the home tool is placed.  Valid values are *top-left|top-center|top-right|bottom-left|bottom-center|bottom-right*
* **measurement**: Default value is false. When true the measure button is added to the map.
* **measurementPosition**:Location on the map where the measure tool is placed.  Valid values are *top-left|top-center|top-right|bottom-left|bottom-center|bottom-right*
* **measurementOptions**: Valid values are *both|line|area*. Allows users to display just the line and area tools or add both.


## Use Cases
Present detailed 3D view of a mountainous region at a large scale and let the 2D map to provide an overview of where you are in the world
Show a detailed 3D plan for new urban development and allow users to use the 2D map view for context.

## Supported Devices
This application is responsively designed to support use in browsers on desktops, mobile phones, and tablets.

## Data Requirements
This application has no data requirements.

## Instructions

1. Download and unzip the .zip file or clone the repository.
2. Web-enable the directory.
3. Access the .html page.
4. Start writing your template!

[New to Github? Get started here.](https://github.com/)


## Deploying

1. To deploy this application, download the template from Portal/ArcGIS Online and unzip it.
2. Install npm and run npm install via command line then run npm run start.
3. Copy the unzipped folder containing the web app template files, such as index.html, to your web server. You can rename the folder to change the URL through which users will access the application. By default the URL to the app will be `http://<Your Web Server>/<app folder name>/app/index.html`
4. Change the sharing host, found in defaults.js inside the config folder for the application, to the sharing URL for ArcGIS Online or Portal. For ArcGIS Online users, keep the default value of www.arcgis.com or specify the name of your organization.
  - ArcGIS Online Example:  `"sharinghost": location.protocol + "//" + “<your organization name>.maps.arcgis.com`
  - Portal Example where `arcgis` is the name of the Web Adaptor: `"sharinghost": location.protocol + "//" + "webadaptor.domain.com/arcgis"`
5. If you are using Portal or a local install of the ArcGIS API for JavaScript, change all references to the ArcGIS API for JavaScript in index.html to refer to your local copy of the API. Search for the references containing `"//js.arcgis.com/3.13"` and replace this portion of the reference with the url to your local install.
  - For example: `"//webadaptor.domain.com/arcgis/jsapi/jsapi"` where `arcgis` is the name of your Web Adaptor.
6. Copy a map or group ID from Portal/ArcGIS Online and replace the default web map ID in the application’s default.js file. You can now run the application on your web server or customize the application further.

> **Note:** If your application edits features in a feature service, contains secure services or web maps that aren't shared publicly, or generate requests that exceed 200 characters, you may need to set up and use a proxy page. Common situations where you may exceed the URL length are using complex polygons as input to a task or specifying a spatial reference using well-known text (WKT). For details on installing and configuring a proxy page see [Using the proxy](https://developers.arcgis.com/javascript/jshelp/ags_proxy.html). If you do not have an Internet connection, you will need to access and deploy the ArcGIS API for JavaScript documentation from [developers.arcgis.com](https://developers.arcgis.com/).

## Requirements

* Text or HTML editor.
* A little background with JavaScript.
* Experience with the [ArcGIS JavaScript API](http://www.esri.com/) would help.

## Resources

* [Community](https://developers.arcgis.com/en/javascript/jshelp/community.html)
* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2018 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license](LICENSE) file.

