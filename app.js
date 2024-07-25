// app.js
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer"
], function (Map, MapView, BasemapGallery, Expand, Sketch, GraphicsLayer) {
    
    const map = new Map({
        basemap: "streets" // Initial basemap
    });

    const view = new MapView({
        container: "viewDiv",
        map: map
    });

    // Basemap Gallery
    const basemapGallery = new BasemapGallery({
        view: view
    });

    // Expand widget
    const expand = new Expand({
        view: view,
        content: basemapGallery,
        expanded: false // Initial state
    });

    view.ui.add(expand, "top-right");

    // Sketch widget
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const sketch = new Sketch({
        layer: graphicsLayer,
        view: view
    });

    view.ui.add(sketch, "bottom-right");

    // Event handlers
    expand.watch("expanded", function (expanded) {
        if (expanded) {
            // Close expand when basemap is selected
            basemapGallery.on("selection-change", function () {
                expand.collapse();
            });
        }
    });

    // Settings
    document.getElementById("settings").addEventListener("click", () => {
        // Toggle settings here
        alert("Settings clicked");
    });
});

