angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete'])
.controller('venueController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
    var $serviceTest = $injector.get("venues");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 
 /////////////////////////////////////////////////////////////////////////////
$scope.data = {};
     $scope.locations = [];
     $scope.locations[0]=[];
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
       center: new google.maps.LatLng(32.7990, -86.8073),
      mapTypeId: google.maps.MapTypeId.ROADMAP 
    });
     $scope.$on('g-places-autocomplete:select', function (event, place) {
        
        if (place.geometry) {
        $scope.data.latitude  = place.geometry.location.lat();
        $scope.data.longitude = place.geometry.location.lng();
    }
     
    $scope.data.address = place.formatted_address;
    
    $scope.data.zipcode = '';
    $scope.data.country = '';
    $scope.data.state = '';
    $scope.data.city = '';
    
    // FINDING ZIP
    if (place.address_components[place.address_components.length-1].types[0] == 'postal_code') {
      $scope.data.zipcode = Number(place.address_components[place.address_components.length-1].long_name);
    };
     // FINDING COUNTRY 
    if (place.address_components[place.address_components.length-1].types[0] == 'country' || 
        place.address_components[place.address_components.length-2].types[0] == 'country') {
      if(place.address_components[place.address_components.length-1].types[0] == 'country'){
        $scope.data.country = place.address_components[place.address_components.length-1].long_name;  
      }else{
        $scope.data.country = place.address_components[place.address_components.length-2].long_name;  
      }      
    };
    // FINDING STATE
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_1') {
      
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-1].long_name;
      }else if(place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-2].long_name;  
      }else{
        $scope.data.state = place.address_components[place.address_components.length-3].long_name;  
      }
    };
    // FINDING CITY
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-4].types[0] == 'administrative_area_level_2' ||

        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-4].types[0] == 'sublocality_level_1' ) {
    
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-1].long_name;
      }else if( place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-2].long_name;  
      }else if( place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-3].long_name;  
      }else{
        $scope.data.city = place.address_components[place.address_components.length-4].long_name;  
      }    
    };
    
     // FINDING STATE
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_1') {
      
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-1].long_name;
      }else if(place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-2].long_name;  
      }else{
        $scope.data.state = place.address_components[place.address_components.length-3].long_name;  
      }
    };
    $scope.locations[0].push($scope.data.state,
        $scope.data.latitude,
        $scope.data.longitude,
        1,
        $scope.data.city,
        "",
        $scope.data.address,
        "coming soon");
    var bounds = new google.maps.LatLngBounds();
     var infowindow = new google.maps.InfoWindow();

    var marker, i;
    
    for (i = 0; i < $scope.locations.length; i++) {
       
      marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.data.latitude, $scope.data.longitude),
        map: map
      });
     bounds.extend(marker.position);
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          
          infowindow.setContent($scope.data.address, '');
          infowindow.open(map, marker);
        } 
      })(marker, i));
    }
    //now fit the map to the newly inclusive bounds
    map.fitBounds(bounds);

    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(map, "idle", function () {
        map.setZoom(14);
        google.maps.event.removeListener(listener);
    });
      });
 ////////////////////////////////////////////////////////////////////////////
    $scope.encodeImageFileAsURL = function(){
                  var filesSelected = document.getElementById("inputFileToLoad").files;
                  if (filesSelected.length > 0)
                  {   console.log(filesSelected.length);
                      var fileToLoad = filesSelected[0];
              
                      var fileReader = new FileReader();
              
                      fileReader.onload = function(fileLoadedEvent) {
                          var srcData = fileLoadedEvent.target.result; // <--- data: base64
              
                          var newImage = document.createElement('img');
                          newImage.src = srcData;
                          $scope.image =  srcData;                         
                          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                                       
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
    }
    
     $scope.encodeChartFileAsURL = function(){
                  var filesSelected = document.getElementById("inputFileToLoad5").files;
                  if (filesSelected.length > 0)
                  {   console.log(filesSelected.length);
                      var fileToLoad = filesSelected[0];
              
                      var fileReader = new FileReader();
              
                      fileReader.onload = function(fileLoadedEvent) {
                          var srcData = fileLoadedEvent.target.result; // <--- data: base64
              
                          var newImage = document.createElement('img');
                          newImage.src = srcData;
                          $scope.venue_chart =  srcData;                         
                          document.getElementById("imgTest5").innerHTML = newImage.outerHTML;
                                       
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
    }
  
  
  
  $scope.addVenue = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.imagedata   = $scope.image;
        $scope.data.venue_chart = $scope.venue_chart;
        $serviceTest.addVenue($scope.data,function(response){
            console.log(response);
            console.log("5555555555");
            if (response.code == 200) {
                    $location.path("/view_venues/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  $scope.getVenue = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getVenues($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.venuedata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
  };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getVenue();
  }
  
  $scope.page_title = 'ADD';
  $scope.callfunction = 0;
  $scope.saveVenue = function()
  {
    if ($scope.callfunction == 0) {
        $scope.addVenue();
    }
    if ($scope.callfunction == 1) {
        $scope.editVenue();
    }
  }
  
  // Edit Venue 
  if ($state.params.id)
  {
    $scope.callfunction = 1;
    
    $scope.page_title = 'EDIT';
    $scope.getVenueDetail = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.id      = $state.params.id;
        $scope.loader = true;
        console.log($state.params.id);
        $serviceTest.venueOverview($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.data  = {};
                   $scope.data = response.result[0];
                   $scope.place = response.result[0].address;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
    $scope.getVenueDetail();
    ////////////////////////////////////////
    $scope.editVenue = function() {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $scope.data.imagedata   = $scope.image;
        $scope.data.venue_chart = $scope.venue_chart;
        $serviceTest.addVenue($scope.data,function(response){
            if (response.code == 200) {
                    $location.path("/view_venues/list");
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
    };
    
    ///////////////////////////////////////
  }
  
  //////////////////// Duplicate Venue ////////////////
  
  $scope.duplicateVenue = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.duplicateVenue($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getVenue();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  
  ////////////////////  Change Status ////////////////
  $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeVenueStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getVenue();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  $scope.delVenue = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteVenue($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getVenue();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  
    
 ///////////////////////////////////////////////////////////////////////////
})

.controller('eventSettingController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
    var $serviceTest = $injector.get("venues");
    $scope.data = {};
    if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getVenues($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.venuecount = response.result.length;
                  }else{
                   $scope.venuecount = 0;
            }
            
        });
        
    }
    
    $scope.venuetab   = false;
    $scope.producttab = false;
    $scope.discounttab = false;
    $scope.questiontab = false;
    $scope.openTab = function(id)
    {
        if (id == 1) {
            $scope.venuetab     = true;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab = false;
        }
        if (id == 2) {
            $scope.venuetab     = false;
            $scope.producttab   = true;
            $scope.discounttab = false;
            $scope.questiontab = false;
        }
        if (id == 3) {
            $scope.venuetab   = false;
            $scope.producttab = false;
            $scope.discounttab  = true;
            $scope.questiontab = false;
        }
        if (id == 4) {
            $scope.venuetab   = false;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab  = true;
        }
        
    }
    
})

