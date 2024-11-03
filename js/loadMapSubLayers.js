//function that adds map feature layer
//code block credit to https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-sublayers/
require(["esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer"], function (Map, MapView, MapImageLayer) {

    var renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
          size: 6,
          color: "black",
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: "white"
          }
        }
    };
  
  /*  //create rendered for school districts layer
    var renderer = {
        type: "unique-value",  // autocasts as new UniqueValueRenderer()
        field: "TYPE",
        defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
        uniqueValueInfos: [{
            // All features with value of "North" will be blue
            value: "Unified",
            symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "blue",
                opacity: "0.50" 
            }
        }, {
            // All features with value of "East" will be green
            value: "Secondary",
            symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "green",
                opacity: "0.50"
            }
        }, {
            // All features with value of "South" will be red
            value: "Elementary",
            symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "red",
                opacity: "0.90"
            }
        }],
    };
    */
    // change the url or remove.I will comment out, Andy
    // This layer has four sublayers. You can define the visibility of these layers in the
    // sublayers property.
    // var layer = new MapImageLayer({
    //   url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/schoolDistrictGDB/FeatureServer",
    //   sublayers: [
    //     {
    //       id: 2,
    //       visible: true
    //     },
    //     {
    //       id: 1,
    //       visible: true
    //     },
    
    //example of layer with load render being used
    /*    {
          id: 4,
          visible: false,
          title: "Railroads",
          renderer: renderer,
          source: {
            // indicates the source of the sublayer is a dynamic data layer
            type: "data-layer",
            // this object defines the data source of the layer
            // in this case it's a feature class table from a file geodatabase
            dataSource: {
              type: "table",
              // workspace name
              workspaceId: "MyDatabaseWorkspaceIDSSR2",
              // table name
              dataSourceName: "ss6.gdb.Railroads"
            }
          }
        }, */
    //     {//I will comment this out Andy
    //       id: 0,
    //       visible: true
    //     }
    //   ]
    // });
  
    //add layers to map
    var map = new Map({
        basemap: "topo-vector", //basemap: "topo-vector",(Topographic) ("arcgis/topographic")
        layers: [layer]
    });
  
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [ -113.8061405, 48.6836922], //center: [-88.16719778104223, 41.740399844246234], // longitude, latitude, 
        zoom: 9
    });
  
    //wait for layers to load and updates map to which layers are visible
    layer.when(function() {
        layer.sublayers.map(function(sublayer) {
            var id = sublayer.id;
            var visible = sublayer.visible;
            var node = document.querySelector(".sublayers-item[data-id='" + id + "']");
            if (visible) {
                node.classList.add("visible-layer");
            }
        });
    });
  
      //button listener for turning layers on and off
      var sublayersElement = document.querySelector(".sublayers");
      sublayersElement.addEventListener("click", function(event) {
          var id = event.target.getAttribute("data-id");
          if (id) {
              var sublayer = layer.findSublayerById(parseInt(id));
              var node = document.querySelector(".sublayers-item[data-id='" + id + "']");
              sublayer.visible = !sublayer.visible;
              node.classList.toggle("visible-layer");
          }
      });
  });