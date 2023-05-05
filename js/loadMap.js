require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/FeatureTable",
    "esri/widgets/LayerList",
    "esri/core/watchUtils",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "esri/core/watchUtils",
    "esri/widgets/Editor",
    "esri/widgets/Editor/CreateWorkflow",
    "esri/widgets/Editor/UpdateWorkflow",
    "esri/widgets/Locate",
    "esri/widgets/FeatureForm",
    "esri/widgets/FeatureTemplates",
    "dojo/dom-class",
    "esri/widgets/Popup",
    "esri/PopupTemplate",
    "esri/widgets/Home",
    "dojo/json",
    "esri/widgets/Legend"


    
 ], function(esriConfig, Map, MapView, FeatureLayer, Search, QueryTask, Query, FeatureTable, LayerList, watchUtils, Expand,
  BasemapGallery, domConstruct, dom, on, watchUtils, Editor, CreateWorkflow, UpdateWorkflow, Locate, FeatureForm, FeatureTemplates, domClass,  Popup, PopupTemplate, Home, Legend) {

  esriConfig.apiKey = "AAPKbd17414641f84139af043c11b03c88eamFCGTb4e5J64QrVkSbvKl7lwiAeqhZTS3MXMKoL-UtLeZL2AnlCJ9rCoyIm-mC6y";


  //creating base map
  const map = new Map({
   basemap: "dark-gray-vector"
  });

  //creating map view
  const view = new MapView({
   container: "viewDiv",
   map: map,
   center: [-88.15690516211465, 41.74779842602606], // longitude, latitude for Naperville 41.74779842602606, -88.15690516211465
   zoom: 11
  }
  );



  var homeBtn = new Home({
    view: view
  });

  

//create incident icon

//create incident icon
const addresspointsRenderer = {
  "type": "simple",
  "symbol": {
    "type": "picture-marker",
    "url": "img/rectangle_addresses.png",
    "width": "24px",
    "height": "24px"
  }
}

 // Define a pop-up for Address Points
 const popupAddresspoints = {
  "title": "<b>Full Address<b>",
  "content": "{FULL_ADDRE}<br><b></b> {CITY}, {STATE} {ZIP}"
}



  //address label feature layer (points)
  const addresspointsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/9",
    renderer: addresspointsRenderer,
    outFields: ["FULL_ADDRE","CITY","STATE","ZIP"],
    popupTemplate: popupAddresspoints
  });



  map.add(addresspointsLayer);

  

 //adding icon types for stormwater features

 const defaultSym = {
  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
  color: [0, 0, 0, 0],
  
  
  
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: "#71de6e",
    width: 1
  }
};

  const treesRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: defaultSym,
    visualVariables: [
      {
        type: "size",
        field: "DIAMETER",
        normalizationField: null,
        legendOptions: {
          title: "Canopy Diameter"
        },
        stops: [
          {
            value: 15,
            size: 5,
            label: "15 ft"
          },
          {
            value: 30,
            size: 10,
            label: "30 ft"
          },
          {
            value: 45,
            size: 15,
            label: "45 ft"
          },
          {
            value: 60,
            size: 20,
            label: ">60 ft"
          }
        ]
      }
    ]
  };

  const treesLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG777PROJ2_Layers/FeatureServer/4",
    renderer: treesRenderer,
    title: "Tree Inventory",
    popupTemplate: {
      // autocasts as new PopupTemplate()
      title: "<b>Tree Inventory Information<b>",
      content:
        "<br><b>Type:</b> {ROWTREE_TY}<br><b>Canopy Width:</b> {DIAMETER} ft<br><b>Location:</b> {ADDRESS_NU} {ADDRESS_DI} {ADDRESS_ST}",
      fieldInfos: [
        {
          fieldName: "DIAMETER",
          format: {
            digitSeparator: false,
            places: 0
          }
        },
        {
          fieldName: "ROWTREE_TY",
          format: {
            digitSeparator: false,
            places: 0
          }
        }
      ]
    }
  });



  map.add(treesLayer);
  
  /* only use for single symbol
  //create incident icon
  const incidentRenderer = {
    "type": "simple",
    "symbol": {
      "type": "picture-marker",
      "url": "img/redleaf.png",
      "width": "12px",
      "height": "12px"
    }
  }
*/ 
  
//adding icon types for incident features
var incidentRenderer = {
  type: "unique-value",  // autocasts as new UniqueValueRenderer()
  legendOptions: {
    title: "Severity"
  },
  field: "Severity",  // values returned by this function will
                     // be used to render features by type
  uniqueValueInfos: [
    {
      value: "Low",  // features labeled as "Low"
      label: "Low: Reponse in 1 week",
      symbol: {
        "type": "picture-marker",
        "url": "img/greenleaf.png",
        "width": "12px",
        "height": "12px"
      }
    }, {
      value: "Moderate",  // features labeled as "Moderate"
      label: "Moderate: Response in 1-2 days",
      symbol: {
        "type": "picture-marker",
        "url": "img/yellowleaf.png",
        "width": "12px",
        "height": "12px"
      }
    }, {
      value: "High",  // features labeled as "High"
      label: "High: Response in <1 day",
      symbol: {
        "type": "picture-marker",
        "url": "img/redleaf.png",
        "width": "12px",
        "height": "12px"
      }
    }
  ]
};



      // Define a pop-up for Incidents
      const popupIncidents = {
        "title": "<b>Incident<b>",
        "content": "<b>Severity:</b> {Severity}<br><b>Type:</b> {IncidentType}"
      }

    const incidentLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/0",
        renderer: incidentRenderer,
        outFields: ["OBJECTID","IncidentType","Severity"],
        popupTemplate: popupIncidents
      });

  incidentLayer.visible = true;
  map.add(incidentLayer);

  //adding icon types for stormwater features
  var stormstructuresRenderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    legendOptions: {
      title: "Types"
    },
    field: "SUBTYPE",  // values returned by this function will
                       // be used to render features by type
    uniqueValueInfos: [
      {
        value: "1",  // features labeled as "High"
        label: "Catch Basin",
        symbol: {
          "type": "picture-marker",
          "url": "img/catchbasin_icon.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "9",  // features labeled as "Medium"
        label: "FES Inlet",
        symbol: {
          "type": "picture-marker",
          "url": "img/FESinlet_icon.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "2",  // features labeled as "Low"
        label: "Manhole (Open Lid)",
        symbol: {
          "type": "picture-marker",
          "url": "img/manholeopenlid_icon.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "4",  // features labeled as "High"
        label: "Non-Standard Inlet",
        symbol: {
          "type": "picture-marker",
          "url": "img/nonstandardinlet_icon.png",
          "width": "12px",
          "height": "12px"
        }
      }, {
        value: "8",  // features labeled as "Medium"
        label: "Standard Inlet",
        symbol: {
          "type": "picture-marker",
          "url": "img/standardinlet_icon.png",
          "width": "12px",
          "height": "12px"
        }
      }
    ]
  };

  // Define a pop-up for Incidents
  const popupStormstructures = {
    "title": "<b>Storm Drain Information<b>",
    "content": "<b>Type:</b> {SUBTYPE}<br><b>ID:</b> {STRUCTUREI}<br><b>Depth:</b> {DEPTH} ft<br><b>Location:</b> {LOCATION}"
  }

const stormstructuresLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/3",
    renderer: stormstructuresRenderer,
    outFields: ["OBJECTID","IncidentType","Severity"],
    popupTemplate: popupStormstructures,
    autoOpenEnabled: true,
    collapseEnabled: false
  });

  map.add(stormstructuresLayer);

  // Define a pop-up for subdivisions
  const popupSubdivisions = {
    title: "<b>{SUB_NAME}<br><b>Trees: {TREE_TOTAL} <b>Storm Drains:</b> {STORM_TOTAL}",
    content: [{
      type: "media",
       mediaInfos: [{
        type: "pie-chart", //delete this line to remove pie chart
         size: 6, //delete this line to remove pie chart
         

         caption: "Ratio of Tree to Storm Drains: {TREE_TOTAL}:{STORM_TOTAL}", //delete this line to remove pie chart
         value: {
           fields: [ "TREE_TOTAL","STORM_TOTAL" ],
           normalizeField: null,
           }
         }]
     }]
   }

   view.popup.dockEnabled = true
   view.popup.collapseEnabled = false
   view.popup.dockOptions = {
    breakpoint: false,
    buttonEnabled: true,
    position: 'bottom-right'
  }

  const subdivisionsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      size: 6,
      color: "#71de6e",
      outline: {
        color: [128, 128, 128, 0.5],
        width: "0.5px"
      }
    }
  };

  //school district feature layer (polygons)
  const subdivisionsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/5",
    renderer: subdivisionsRenderer,
    opacity: 0.2,
    outFields: ["SUB_NAME","TREE_TOTAL","STORM_TOTAL"],
    popupTemplate: popupSubdivisions
  });

  map.add(subdivisionsLayer, 0);

  //Location Widget
  const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });

/*
  // New FeatureForm and set its layer to Crayfish Burrows FeatureLayer.
  const featureForm = new FeatureForm({
    container: "formDiv",
    layer: incidentLayer,
    fieldConfig: [
      {
        name: "IncidentType",
        label: "Incident Type"
      },
      {
        name: "Severity",
        label: "Severity1"
      }
    ],
  });

  // Listen to the feature form's submit event.
  // Update feature attributes shown in the form.
  //for add features "Add" adds the feature, for update feature "Update" updates the feature
  featureForm.on("submit", function() {
    if (editFeature) {
      // Grab updated attributes from the form.
      const updated = featureForm.getValues();

      // Loop through updated attributes and assign
      // the updated values to feature attributes.
      Object.keys(updated).forEach(function(name) {
        editFeature.attributes[name] = updated[name];
      });

      // Setup the applyEdits parameter with updates.
      const edits = {
        updateFeatures: [editFeature]
      };
      applyEditsToIncidents(edits);
      document.getElementById("viewDiv").style.cursor = "auto";
    }
  });
*/
  
//create editor panel
  const editor = new Editor({
    view: view,
    label: "Incident",
    allowedWorkflows: ["create", "update"],
    layerInfos: [{
      view: view,
      layer: incidentLayer,
      fieldConfig: [
        {
          name: "IncidentType",
          label: "Incident Type"
        },
        {
          name: "Severity",
          label: "Severity"
        }],
      enabled: true, // default is true, set to false to disable editing functionality
      addEnabled: true, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: true, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: true // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: treesLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: addresspointsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: stormstructuresLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: subdivisionsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    }
  ]
  });

  //Editor Widget Functionality that allows for user submitted data
  editor.viewModel.watch('state', function(state){
    if(state === 'ready'){
      setTimeout(function(){
        document.getElementsByClassName('esri-editor__title esri-heading')[0].innerHTML = 'Leaf Collection Incident';
        var actions = document.getElementsByClassName("esri-editor__feature-list-name");
        Array.from(actions).forEach(function(ele){
          if(ele.innerHTML==='Add feature'){
            ele.innerHTML = 'Report New Incident';
          }
      	  if(ele.innerHTML==='Edit feature'){
            ele.innerHTML = 'Modify or Delete Existing Incident';
          
          }
        });
      }, 50);
    }
  });

  //create node for content panel
  var node = domConstruct.create("div", {
    className: "myPanel",
    innerHTML: "<b>Resident Portal Information Guide</b><br>" +
    '<a class="none" href="https://www.naperville.il.us/" target="_blank"><img class="NPD" src="img/logo.png" alt="NPD" style="width:111px;height:42px;"></a>' +
    "<p>Thank you for utilizing the Naperville Leaf Collection Resident Portal! The portal offers residents the ability to locate and flag leaf collection incidents in an interactive map, allowing Leaf Crews to respond to concerns in a timely manner.</p></b>" +
    '<a class="none" href="https://www.naperville.il.us/services/brush-leaf-and-yard-waste-collection/bulk-curbside-leaf-collection/" target="_blank"><img class="NPD" src="img/leaf4.jpg" alt="Prairie Crayfish" style="width:100px;height:60px;"></a></b>' +
    '<a class="none" href="https://app.powerbigov.us/view?r=eyJrIjoiNzlhMDgyOWQtYTBjMi00MzgwLWFiM2QtYjg3YTBhZjVlYjU5IiwidCI6ImI5YTBmOTlmLTRiZGUtNGI4MS04YjIxLWZjZWRkNDU4ZmVjNSJ9" target="_blank"><img class="NPD" src="img/icons8-graph-report-64.png" alt="NPD" style="width:64px;height:64px;"></a>' +
    "<p>In years past, the 3rd leaf collection cycle was neccessary in order to account for late leaf-fall or missed-service. However, this delayed the fleet's Winter conversion to salt trucks in December. <br> With your continued map contributions, we can make this an effective program that responds to your needs in real-time! </p></b>"
  });

  const purpose = new Expand({
   expandIconClass: "esri-icon-description",
   view: view,
   expanded: false,
   expandTooltip: "Application Purpose",
   content: node
  });

  watchUtils.whenTrueOnce(purpose, 'expanded', function(){
   on(dom.byId("btnSubmit"), 'click', function(){
     console.log("submit clicked");
   });
  });

 //creating basemap widget and setting its container to a div
  var basemapGallery = new BasemapGallery({
   view: view,
   container: document.createElement("div")
  });

  //creates an expand instance and sets content properpty to DOM node of basemap gallery widget with an Esri
  //icon font to represent the content inside the expand widget
  var bgExpand = new Expand({
   view: view,
   content: basemapGallery,
   expandTooltip: "Change Basemap"
  });

  // close the expand whenever a basemap is selected
  basemapGallery.watch("activeBasemap", function() {
   var mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";

   if (mobileSize) {
     bgExpand.collapse();
   }
  });

  // Add the expand instance to the ui
  view.ui.add(bgExpand, "top-left");

  //create layer lists widget to make layers visiblie or invisible
  var layerList = new LayerList({
   view: view,
   // executes for each ListItem in the LayerList
   listItemCreatedFunction: function (event) {

     // The event object contains properties of the
     // layer in the LayerList widget.

     var item = event.item;

     if (item.title === "GEOG777PROJ2 Layers - Address Points") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Address Points";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "GEOG777PROJ2 Layers - TreeInventory") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Trees";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "GEOG777PROJ2 Layers - Storm Structures") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Storm Drains";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "GEOG777PROJ2 Layers - IncidentReport") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Leaf Collection Incidents";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "GEOG777PROJ2 Layers - Subdivisions") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Subdivisions";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
   }
  });

  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  layerListExpand = new Expand({
   expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: layerList,
   expandTooltip: "Layer Visibility/Layer Legend"
  });

  view.ui.add(layerListExpand, "top-left");

  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  editorExpand = new Expand({
   expandIconClass: "esri-icon-visible",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: editor,
   expandTooltip: "Report Leaf Collection Incident"
  });

  view.ui.add(editorExpand, "top-left");

  //add location button to map
  view.ui.add(locate, "top-left");

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");

  //pop up for subdivision being searched
  var subdivisionSearch = new FeatureLayer({
   url:
     "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/5",
   popupTemplate: {
     // autocasts as new PopupTemplate()
     title: "Subdivision: {SUB_NAME} </br>Trees: {TREE_TOTAL} </br>Total Storm Drains: {STORM_TOTAL}",
     overwriteActions: true
   }
  });


  //Search Widget Functionality Enabling Leaf Crews to Query Neighborhoods
  var searchWidget = new Search({
    view: view,
    allPlaceholder: "Enter Subdivision Name",
    sources: [
      {
        layer: subdivisionSearch,
        searchFields: ["SUB_NAME"],
        displayField: "SUB_NAME",
        exactMatch: false,
        outFields: ["SUB_NAME","TREE_TOTAL","STORM_TOTAL"],
        name: "Naperville Subdivisions",
        placeholder: "Subdivision Search (e.g. 'Maple..)"
      }
    ],
    includeDefaultSources: false

  });

  // Add the search widget to the top right corner of the view
  view.ui.add(searchWidget, {
    position: "top-right",
    width: "50%"
  });

  view.ui.add(purpose, "top-right");

  

});

