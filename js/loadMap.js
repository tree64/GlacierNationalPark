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
  
  esriConfig.apiKey = "AAPK485bd483be544e7a81f95ec44c935768P1KiKSLDlVqfdCUccKq13y4MXw2VF57BG-nUpacjvrgCpyzLkAap4Fbg8b-QH9hI";

  //creating base map
  const map = new Map({
   basemap: "dark-gray-vector" //basemap: "dark-gray-vector"(arcgis/topographic), (arcgis/outdoor)
  });

  //creating map view centering on glacier national park
  const view = new MapView({
   container: "viewDiv",
   map: map,
   center: [-113.8061405,48.6836922 ], // longitude and latitude for Glacier National Park, 113.8061405°W 48.6836922°N longitude, latitude for Naperville 41.74779842602606, -88.15690516211465
   zoom: 9  //17
  }
  );

  //creating the home button to center the map 
  var homeBtn = new Home({
    view: view
  });
  //create incident icon
//add new icons

//create incident icon
// const addresspointsRenderer = {
//   "type": "simple",
//   "symbol": {
//     "type": "picture-marker",
//     "url": "img/rectangle_addresses.png",
//     "width": "24px",
//     "height": "24px"
//   }
// }       
// Define a pop-up for Address Points, don't need
//  const popupAddresspoints = {
//   "title": "<b>Full Address<b>",
//   "content": "{FULL_ADDRE}<br><b></b> {CITY}, {STATE} {ZIP}"
// }
//address label feature layer (points), don't need
  // const addresspointsLayer = new FeatureLayer({
  //   url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/9",
  //   renderer: addresspointsRenderer,
  //   outFields: ["FULL_ADDRE","CITY","STATE","ZIP"],
  //   popupTemplate: popupAddresspoints
  // });
  
    //create Bear Report Icon (change to a new icon for general animal sightings)-------------------------
//  const bearreportRenderer = { 
//      "type": "simple",
//      "symbol": {
//       "type": "picture-marker",
//       "url": "img/bear_2.jpg", 
//       "width": "24px",
//       "height": "24px"   
//      } 
//     }
 
const animalsightingRenderer = {
    "type": "simple",
    "symbol": {
      "type": "picture-marker",
      "url": "image/letter-a-black-24.png", 
      "width": "24px",
      "height": "24px"
    }
 }
         
//Define a pop-up for Bear Reports(change to animal sightings)-------------------------
//  const popupBearReport = {
//      "title": "<b>Bear Reports<b>",
//      "content": "{ReportType}<br><b></b> {Date}, {Kind}" //KindofBear
// }    

//Define a pop-up for Animal Sightings)-------------------------
const popupAnimalSighting = {
  "title": "<b>Animal Sighting<b>",
  "content": "{SPECIES}<br><b></b> {TIME_DATE}, {LOCATION}, {USERNAME}" //Species of Animal
}    



//Bear Report feature layer (points) (change to aniamal sightings)----------------------
  // const bearReportLayer = new FeatureLayer({
  //   url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Bear_Encounters/FeatureServer",
  //   renderer: bearreportRenderer,
  //   outFields: ["ReportType","Date","Kind"], //"KindofBear"
  //   popupTemplate: popupBearReport
  // });

  // map.add(bearReportLayer);

//Animal Sighting feature layer (points)----------------------
const animalSightingLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Animal_Sightings_1/FeatureServer", 
  renderer: animalsightingRenderer,
  outFields: ["SPECIES","DATE_TIME","LOCATION_DESC", "USERNAME"], //"Species of Animal"
  popupTemplate: popupAnimalSighting
});

map.add(animalSightingLayer);

 //create TrailHeads Icon
  const trailHeadsRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/trailhead_2.jpg", 
      "width": "24px",
      "height": "24px"   
     }
    }

//Define a pop-up for Trail Heads
  const popupTrailHeads = {
     "title": "<b>Trail Heads<b>",
     "content": "{POINAME}<br><b></b> {POITYPE}, {UNITNAME}"
}    
    
//Trail Heads feature layer (points), 
  const trailHeadsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_TrailHeads/FeatureServer",
    renderer: trailHeadsRenderer,
    outFields: ["POINAME","POITYPE","UNITNAME"],
    popupTemplate: popupTrailHeads
  });
  
    map.add(trailHeadsLayer);

 //create Restrooms Icon
 const RestroomsRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/restrooms.jpg",
      "width": "24px",
      "height": "24px"   
     }
}
//Define a pop-up for Restrooms
 const popupRestrooms = {
     "title": "<b>RestRooms<b>",
     "content": "{POINAME}<br><b></b> {NOTES}"
}    
         
//Trail Heads feature layer (points), 
 const RestRoomsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_Restrooms/FeatureServer",
    renderer: RestroomsRenderer,
    outFields: ["POINAME","NOTES"],
    popupTemplate: popupRestrooms
  });
 
  map.add(RestRoomsLayer);

 //create ViewPoints Icon
 const viewPointsRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/viewpoint.jpg", 
      "width": "24px",
      "height": "24px"   
     }
    }
//Define a pop-up for View Points
 const popupViewPoints = {
     "title": "<b>View Points<b>",
     "content": "{POINAME}<br><b></b> {NOTES}"
}    

//View Points feature layer (points), 
  const viewPointsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_ViewPoints/FeatureServer",
    renderer: viewPointsRenderer,
    outFields: ["POINAME","NOTES"],
    popupTemplate: popupViewPoints
  });

  map.add(viewPointsLayer);


    //create Ranger Station Icon
  const RangerStationRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/rangerStation_2.jpg",  
      "width": "24px",
      "height": "24px"
     }   
    }

  //Define a pop-up for Ranger Station
    const popupRangerStation = {
     "title": "<b>Ranger Stations<b>",
     "content": "{POINAME}<br><b></b> {POITYPE}"
}    

//Ranger Stations feature layer (points), 
    const RangerStationLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_RangerStation/FeatureServer",
    renderer: RangerStationRenderer,
    outFields: ["POINAME","POITYPE"],
    popupTemplate: popupRangerStation
  });

  map.add(RangerStationLayer);

 //create Picnic Areas Icon
    const picnicAreasRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/picnicarea.jpg", 
      "width": "24px",
      "height": "24px"   
     }
    }
//Define a pop-up for Picnic Areas
    const popuppicnicAreas = {
     "title": "<b>Picnic Areas<b>",
     "content": "{POINAME}<br><b></b> {POITYPE}"
}    

//Picnic Areas feature layer (points), 
    const PicnicAreasLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_PicnicArea/FeatureServer",
    renderer: picnicAreasRenderer,
    outFields: ["POINAME","POITYPE"],
    popupTemplate: popuppicnicAreas
  });

  map.add(PicnicAreasLayer);

  //create Parking Icon
    const parkingRenderer = {
     "type": "simple",
     "symbol": {
      "type": "picture-marker",
      "url": "img/parkinglot.jpg", 
      "width": "24px",
      "height": "24px",
     }
    }

//Define a pop-up for Parking
    const popupParking = {
     "title": "<b>Parking Lots<b>",
     "content": "{POINAME}<br><b></b> {POITYPE}, {NOTES}"
}    

//Parking Lots feature layer (points), 
    const ParkingLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_Parking/FeatureServer",
    renderer: parkingRenderer,
    outFields: ["POINAME","POITYPE", "NOTES"],
    popupTemplate: popupParking
  });

  map.add(ParkingLayer);

  //create Campgrounds Icon
    const CampgroundsRenderer = {
    "type": "simple", //autocasts as new SimpleRenderer()
      "symbol": {
      "type": "picture-marker",
      "url": "img/campsite.jpg", 
      "width": "24px",
      "height": "24px",
    
      },
    };
    
    //Define a pop-up for Campgrounds
    const popupCampgrounds = {
     "title": "<b>Campgrounds<b>",
     "content": "{POINAME}<br><b></b> {POITYPE}, {NOTES}"
}    

//Campgrounds feature layer (points), 
    const CampgroundsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GNP_POI_Campgrounds/FeatureServer",
    renderer: CampgroundsRenderer,
    outFields: ["POINAME","POITYPE", "NOTES"],
    popupTemplate: popupCampgrounds
  });

  map.add(CampgroundsLayer);
    
  // Define a pop-up for Trails -----------see about adding links to all trails for more information. 
   const popupTrails = { 
    "title": "<b>Trails</b>",
    "content": "{NAME} <br><b><b>,{AREA},{Miles}, {DESC_SEG}, {TRAILROUTE}"
   }

   const TrailsRenderer = {
    type: "simple",
    symbol: {
      color: "#FF0000",
      type: "simple-line",
      style: "solid",  
    }
  };

  //Adding Trails feature layer (polygons)
  const TrailsLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/DRQySz3VhPgOv7Bo/arcgis/rest/services/Glacier_National_Park_Trails/FeatureServer",
    renderer: TrailsRenderer,
    opacity: 1.0,
    outFields: ["NAME","AREA","Miles", "DESC_SEG", "TRAILROUTE"],
    popupTemplate: popupTrails
  });

  map.add(TrailsLayer, 0);   
    
// Define a pop-up for GNP Boundary
   const popupGNPboundary = {
    "title": "<b>Glacier National Park Boundary</b>",
    //"content": "{NAME} <br><b><b>,{AREA},{Miles}, {DESC_SEG}, {TRAILROUTE}"
   }

   const GNPboundaryRenderer = {
    type: "simple",
    symbol: {
      color: "#000000", 
      type: "simple-line",
      style: "solid" 
    }
  };

  //Adding GNP Boundary feature layer (polygons)
  const GNPboundaryLayer = new FeatureLayer({
    url: "https://services5.arcgis.com/qq4v7PSRahj3ckMw/arcgis/rest/services/GNP_Boundary/FeatureServer",
    renderer: GNPboundaryRenderer,
    opacity: 1.0,
   //outFields: //["NAME","AREA","Miles", "DESC_SEG", "TRAILROUTE"],
    popupTemplate: popupGNPboundary
    
   });

  map.add(GNPboundaryLayer, 0); 

 // Define a pop-up for Roads
   const popupRoads = {
    "title": "<b>Roads</b>",
    "content": "{ROADNAME} <br><b><b>,{ROADNUM},{ADMIN}, {SURFACE}"
    } 

   const RoadsRenderer = {
    type: "simple",
    symbol: {
      color:"#FFAA00",
      type: "simple-line",
      style: "solid",
      }
  };

  //Adding Roads feature layer (polygons)
  const RoadsLayer = new FeatureLayer({
    url: "https://geo.dot.gov/server/rest/services/Hosted/North_American_Roads_DS/FeatureServer",
    renderer: RoadsRenderer,
    opacity: 1.0,
    outFields: ["ROADNAME","ROADNUM","ADMIN", "SURFACE"],
    popupTemplate: popupRoads
  });

  map.add(RoadsLayer, 0);   


   view.popup.dockEnabled = true
   view.popup.collapseEnabled = false
   view.popup.dockOptions = {
    breakpoint: false,
    buttonEnabled: true,
    position: 'bottom-right'
  }

  //Location Widget
  const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });
  
//create editor panel (this is where you add the various layers that you will display)(change to animal sightings, add picture attachment)------
  // const editor = new Editor({
  //   view: view,
  //   label: "Bear Report", 
  //   allowedWorkflows: ["create", "update"],
  //   layerInfos: [{
  //     view: view,
  //     layer: bearReportLayer,
  //     fieldConfig: [
  //       {
  //         name: "ReportType", 
  //         label: "Report Type"  
  //       },
  //       {
  //         name: "Date",
  //         label: "Date"
  //       },
  //       {
  //         name: "Kind",
  //         label: "Kind"
  //       }],
  //     enabled: true, // default is true, set to false to disable editing functionality
  //     addEnabled: true, // default is true, set to false to disable the ability to add a new feature
  //     updateEnabled: true, // default is true, set to false to disable the ability to edit an existing feature
  //     deleteEnabled: true // default is true, set to false to disable the ability to delete features
  //   },
    //create editor panel (this is where you add the various layers that you will display)(change to animal sightings, add picture attachment)------
  const editor = new Editor({
    view: view,
    label: "Animal Sighting", 
    allowedWorkflows: ["create", "update"], 
    layerInfos: [{
      view: view,
      layer: animalSightingLayer,
      fieldConfig: [
        {
          name: "SPECIES", 
          label: "Species"  
        },
        {
          name: "TIME_DATE",
          label: "Date and Time"
        },
        {
          name: "LOCATION_DESC",
          label: "Location"
        },
        { 
          name: "USERNAME",
          label: "Username"
        }
          ],
      enabled: true, // default is true, set to false to disable editing functionality
      addEnabled: true, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: true, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: true // default is true, set to false to disable the ability to delete features
    },
    
    {
      view: view,
      layer: trailHeadsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: RestRoomsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: viewPointsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
    {
      view: view,
      layer: RangerStationLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
     {
      view: view,
      layer: PicnicAreasLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
     {
      view: view,
      layer: ParkingLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
     {
      view: view,
      layer: CampgroundsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
     {
      view: view,
      layer: TrailsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },           
     {
      view: view,
      layer: GNPboundaryLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    },
      {
      view: view,
      layer: RoadsLayer,
      enabled: false, // default is true, set to false to disable editing functionality
      addEnabled: false, // default is true, set to false to disable the ability to add a new feature
      updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
      deleteEnabled: false // default is true, set to false to disable the ability to delete features
    }                    
   ]
  });

  //Editor Widget Functionality that allows for user submitted data (change to animal sightings, and include picture attachment)----------------------------
  editor.viewModel.watch('state', function(state){
    if(state === 'ready'){
      setTimeout(function(){
        document.getElementsByClassName('esri-editor__title esri-heading')[0].innerHTML = 'Animal Sighting'; // 'Bear Reports'
        var actions = document.getElementsByClassName("esri-editor__feature-list-name");
        Array.from(actions).forEach(function(ele){
          if(ele.innerHTML==='Add feature'){
            ele.innerHTML = 'Create New Animal Sighting'; //'Create New Bear Report'
          }
      	  if(ele.innerHTML==='Edit feature'){
            ele.innerHTML = 'Modify or Delete Existing Animal Sighting'; //'Modify or Delete Existing Bear Reports'
          
          }
        });
      }, 50);
    }
  });
// Listen to the `applyEdits` event (this section of code adds the image to the feature service)
// editor.viewModel.on("applyEdits", function(event) {
//   var objectId = event.addFeatureResults[0].objectId; // Get objectId of added feature
//   uploadAttachment(objectId); // Call the attachment upload function
// });

// Function to upload attachment to a feature (This appears at the bottum of the map (10/25/2024))
// function uploadAttachment(objectId) {
//   var fileInput = document.getElementById("imageFileInput");
//   var file = fileInput.files[0]; // Get the selected file

//   if (file) {
//     featureLayer.addAttachment(objectId, file).then(function(result) {
//       console.log("Attachment uploaded:", result);
//     }).catch(function(error) {
//       console.error("Error uploading attachment:", error);
//     });
//   } else {
//     console.log("No file selected for attachment.");
//   }
// }
//});

// require(["esri/layers/FeatureLayer"], function(FeatureLayer) {
//   // Feature Layer with attachments enabled
//   var featureLayer = new FeatureLayer({
//     url: "https://your-feature-service-url/FeatureServer/0"
//   });

  // Function to fetch and display attachments
  // function displayAttachments(objectId) {
  //   featureLayer.queryAttachments({
  //     objectIds: [objectId]
  //   }).then(function(attachmentResults) {
  //     var attachmentList = document.getElementById("attachmentList");
  //     attachmentList.innerHTML = ""; // Clear any previous attachments

  //     if (attachmentResults[objectId] && attachmentResults[objectId].length > 0) {
  //       attachmentResults[objectId].forEach(function(attachment) {
  //         // Create an image element for each attachment
  //         var img = document.createElement("img");
  //         img.src = featureLayer.url + "/attachments/" + objectId + "/" + attachment.id;
  //         img.alt = "Animal Sighting Attachment";
  //         img.style.maxWidth = "200px"; // Adjust image size

  //         // Append the image to the attachment list
  //         attachmentList.appendChild(img);
  //       });
  //     } else {
  //       attachmentList.innerHTML = "No attachments found for this feature.";
  //     }
  //   }).catch(function(error) {
  //     console.error("Error fetching attachments:", error);
  //   });
  // }

  // // Example usage: when a feature is selected, pass its objectId to displayAttachments
  // var objectId = 1; // Replace with the actual objectId of the selected feature
  // displayAttachments(objectId);
//});




  // build in more links for animal information------------------------------------- Add one widget that creates a drop down for multiple sites if possible.
//   create node for content panel(remove not needed, could add the reservation.gov or the nps site here, change the "Every year..." for animal sightings  Andy)
  var node = domConstruct. create("div", {
    className: "myPanel",
    innerHTML: "<b>Resident Portal Information Guide</b><br>" +
    '<a class="none" href="https://www.nps.gov/glac/planyourvisit/bears.htm" target="_blank"></a>' + //<img class="NPS" src="img/nps_logo.edit_2.jpg" alt="NPS" style="width:111px;height:42px;">
    "<p>Thank you for utilizing the Glacier National Park Bear Report Portal! The portal offers residents the ability to locate Bear incidents in an interactive map, allowing park staff to respond to concerns about bear activity in Glacier National Park.</p></b>" +
  //   '<a class="none" href="https://www.naperville.il.us/services/brush-leaf-and-yard-waste-collection/bulk-curbside-leaf-collection/" target="_blank"><img class="NPD" src="img/leaf4.jpg" alt="Prairie Crayfish" style="width:100px;height:60px;"></a></b>' +
  //   '<a class="none" href="https://app.powerbigov.us/view?r=eyJrIjoiNzlhMDgyOWQtYTBjMi00MzgwLWFiM2QtYjg3YTBhZjVlYjU5IiwidCI6ImI5YTBmOTlmLTRiZGUtNGI4MS04YjIxLWZjZWRkNDU4ZmVjNSJ9" target="_blank"><img class="NPD" src="img/icons8-graph-report-64.png" alt="NPD" style="width:64px;height:64px;"></a>' +
    "<p>Every year  1 to 2 visitors are attacked by bears in the park. This application was created to assist park staff with monitoring bear activity within the park with the aim to reduce those numbers. <br> With your continued map contributions, we can make this an effective program that increases your safety and the safety of other visitors. </p></b>"
    });

    const purpose = new Expand({
     expandIconClass: "esri-icon-description",
     view: view,
     expanded: false,
     expandTooltip: "Application Purpose",
     content: node
    });

 // keep
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

     if (item.title === "trailheadsLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Trail Heads"; //Address Points
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "RestRoomsLayers") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "RestRooms"; 
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "ViewPointsLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "View Points"; 
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
    //  if (item.title === "bearReportsLayer") { 
    //    // open the list item in the LayerList
    //    item.open = true;
    //    // change the title to something more descriptive
    //    item.title = "Bear Reports"; 
    //    //add legend
    //    item.panel = {
    //      content: "legend",
    //      open: true
    //    };
    //  }
     if (item.title === "animalSightingLayer") { //changes for animal sightings
      // open the list item in the LayerList
      item.open = true;
      // change the title to something more descriptive
      item.title = "Animal Sighting"; 
      //add legend
      item.panel = {
        content: "legend",
        open: true
      };
    }
     
     if (item.title === "RangerStationLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Ranger Stations";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
   if (item.title === "PicnicAreasLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Picnic Areas";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
   if (item.title === "ParkingLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Parking";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
   if (item.title === "CampgroundsLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Campgrounds";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "TrailsLayer") {
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Trails";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }  
     if (item.title === "GNPboundaryLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "Glacier National Park Boundary";
       //add legend
       item.panel = {
         content: "legend",
         open: true
       };
     }
     if (item.title === "RoadsLayer") { 
       // open the list item in the LayerList
       item.open = true;
       // change the title to something more descriptive
       item.title = "US North American Roads";
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
  // editorExpand = new Expand({
  //  expandIconClass: "esri-icon-visible",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
  //  // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
  //  view: view,
  //  content: editor,
  //  expandTooltip: "Bear Reports"  
  // });
 
  //adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
  editorExpand = new Expand({
   expandIconClass: "esri-icon-visible",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
 expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
   view: view,
   content: editor,
   expandTooltip: "Animal Sighting"  
  });

  view.ui.add(editorExpand, "top-left");

  //add location button to map
  view.ui.add(locate, "top-left");

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");

  // Add the animal information button to the map (try for the left corner of the view) 
  // view.ui.add(information, "top-left");


  //pop up for Bear Reports being searched (change to animal sightings, see if you can search by username including by animal)
  // var bearReportsSearch = new FeatureLayer({ 
  //  url:
  //    "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Bear_Encounters/FeatureServer",//"https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG777PROJ2_Layers/FeatureServer/5",
  //  popupTemplate: {
  //    // autocasts as new PopupTemplate()
  //    title: "Bear Reports: {ReportType} ", //"Bear Reports: {SUB_NAME} </br>Trees: {TREE_TOTAL} </br>Total Storm Drains: {STORM_TOTAL}",
  //    overwriteActions: true
  //  }
  // });
//pop up for Animal Sightings being searched (change to animal sightings, see if you can search by username including by animal)
var animalSightingSearch = new FeatureLayer({ 
  url:
    "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Animal_Sightings_1/FeatureServer",
  popupTemplate: {
    // autocasts as new PopupTemplate()
    title: "Animal Sighting: {Species} ", //"Bear Reports: {SUB_NAME} </br>Trees: {TREE_TOTAL} </br>Total Storm Drains: {STORM_TOTAL}",
    overwriteActions: true
  }
 });

  //Search Widget Functionality Enabling Users to Search Bear Reports (change to animal sightings, see if you can add a search for username including animal name)
  // var searchWidget = new Search({
  //   view: view,
  //   allPlaceholder: "Enter Bear Report Type", 
  //   sources: [
  //     {
  //       layer: bearReportsSearch, 
  //       searchFields: ["ReportType"], 
  //       displayField: "ReportType", 
  //       exactMatch: false,
  //       outFields: ["ReportType", "Date", "Kind"], 
  //       name: "Bear Reports",
  //       placeholder: "Bear Report Search" 
  //     }
  //   ],
  //   includeDefaultSources: false

  // });
  var searchWidget = new Search({
    view: view,
    allPlaceholder: "Enter Animal Species", 
    sources: [
      {
        layer: animalSightingSearch, 
        searchFields: ["SPECIES"], 
        displayField: "SPECIES", 
        exactMatch: false,
        outFields: ["SPECIES", "TIME_DATE", "LOCATION_DESC", "USERNAME"], //Photos and files, see if you can search by username too. 
        name: "animalSighting",
        placeholder: "Animal Sightings Search" 
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