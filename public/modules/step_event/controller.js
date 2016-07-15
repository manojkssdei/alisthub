/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event step  
*/


angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('stepeventController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state,$anchorScroll) {

  $scope.loader = false;
   //For Step 1
  var $serviceTest = $injector.get("venues");
  if($stateParams.eventId === '')
  {
   
  } else {
    var event_id=$stateParams.eventId;
    $serviceTest.getEvent({'event_id':event_id},function(response) {
      $scope.data=response.results[0];
     
      if($scope.data.recurring_or_not==0) {
        $scope.data.eventtype = 'single';  
      } else {
        $scope.data.eventtype = 'multiple';
      }
      
      $scope.selected1 = $scope.venues[1];
      $scope.data.eventname=response.results[0].title;
      $scope.data.eventurl=response.results[0].event_domain;
      $scope.data.domain_url_availability=1;
      $scope.starttime=$scope.startevent_time=response.results[0].start_time;
      $scope.endtime=$scope.endevent_time=response.results[0].end_time;
      $scope.data.content=response.results[0].description;
      
      $scope.data.venueid = response.results[0].eventvenueId;
      
      $scope.data.venuetype = response.results[0].venue_type;
      $scope.data.place = response.results[0].address;

      $scope.data.venuename=response.results[0].venue_name;
      //$scope.location_event_div=true;$scope.venue_event_div=$scope.select_delect_event=false;
      $scope.venue_info($scope.data,2);
      
      $scope.location_event_div=false;$scope.venue_event_div=$scope.select_delect_event=true;
      
      var d = new Date(response.results[0].eventdate);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day = d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon = d.getMonth() + 1;
      $rootScope.single_start_date = curr_year + "-" + cur_mon + "-" + curr_date;
      $rootScope.selectevent_date = weekday[day] + " " + m_names[curr_month] + " " + curr_date + "," + " "+ curr_year;
      $scope.start_date = d;
      $scope.select_delect_event = false;
      $scope.single_eventstart();
    });
  }
  
    $scope.unique = false;
    $scope.message = "";
    
    $scope.unique_type = 0;
     $scope.successuniquemessage=$scope.erroruniquemessage=true;
         $scope.checkeventurl = function() 
         {
          $serviceTest.checkeventurl({'eventurl':$scope.data.eventurl},function(response){
           
            if(response.result<1)
            {
                $scope.successuniquemessage = false;
                $scope.erroruniquemessage = true;
                $scope.data.domain_url_availability=1;
                $scope.unique = "Available";
            }
            else{
                $scope.erroruniquemessage = false;
                $scope.successuniquemessage = true;
                $scope.data.domain_url_availability='';
                $scope.unique = "This domain already taken.";
            }
          });

        };
 

 
  //To show or hide divs
  $scope.select_delect_event = $scope.monthly_div = $scope.days_div = $scope.error_message = $scope.error_time_message = true;
  $rootScope.success_message1 = false;
  //For recurring days
  $scope.days = day;


  //for dates selection
  $scope.dates = dates;


  if ($localStorage.userId !== undefined) {
    //To get venues of a user 
    $serviceTest.getVenues({
      'userId': $localStorage.userId
    }, function(response) {
      if (response !== null) {

        if (response.code === 200) {
          $scope.total_venue = response.result;
          if ($scope.total_venue != "") {
            $scope.select_venue($scope.venues[0])
          }
          else{
            $scope.select_venue($scope.venues[1]);
          }
        }

      } else {
        $scope.total_venue = [];
      }

    });
  }
 


    /* Remove div from cloned object */
  $scope.removediv = function(index) {
    $scope.between_date.splice(index, 1);
  }

    /** 
    Method: savedata
    Description:Function for save the data of recurring event 
    Created : 2016-04-25
    Created By:  Deepak khokkar  
    */

    $scope.savedata=function(data) {

      if($stateParams.eventId==='') {
        $localStorage.eventId = null;
      } else {
        data.id = $stateParams.eventId;
      }
        data.eventtype=='single'
      if (data.eventtype=='single') {
        if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
          data.eventdate=$scope.single_start_date;
          
          data.startevent_time=$scope.startevent_time;
          data.endevent_time=$scope.endevent_time;
          data.event_startdatetime  = $scope.formatDate($scope.combine($scope.start_date,data.startevent_time));
          data.event_enddatetime    = $scope.formatDate($scope.combine($scope.start_date,data.endevent_time));
          data.userId=$localStorage.userId;
          data.showclix_token     = $localStorage.showclix_token;
          data.showclix_user_id   = $localStorage.showclix_user_id;
          data.showclix_seller_id = $localStorage.showclix_seller_id;
          data.step               = 1;
          $serviceTest.saveEvent(data,function(response){
            if (response.code == 200) {
               $scope.success=global_message.event_step1;
               $stateParams.eventId=response.result;
               $scope.error_message=false;
               $timeout(function() {
                 $scope.success='';
                 $scope.error_message=true;
               },3000);
            }
            else{
              console.log("test007");
              $anchorScroll();
              $scope.show_error=response.error;
              $scope.show_error_message = true;
              $timeout(function() {
                $scope.show_error_message=false;
              },10000);          
            }
            
          });
        }  
      } 
    }


  $rootScope.starttime = $rootScope.endtime ='';
  
  $scope.data = {};
  $scope.locations =[];
  $scope.locations[0] =[];
 
  // To show google map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(32.7990, -86.8073),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  $scope.$on('g-places-autocomplete:select', function(event, place) {

    if (place.geometry) {
      $scope.data.latitude = place.geometry.location.lat();
      $scope.data.longitude = place.geometry.location.lng();
    }

    $scope.data.address = place.formatted_address;

    $scope.data.zipcode = '';
    $scope.data.country = '';
    $scope.data.state = '';
    $scope.data.city = '';
    $scope.data.venueid = '';

    // FINDING ZIP
    if (place.address_components[place.address_components.length - 1].types[0] === 'postal_code') {
      $scope.data.zipcode = Number(place.address_components[place.address_components.length - 1].long_name);
    };
    // FINDING COUNTRY 
    if (place.address_components[place.address_components.length - 1].types[0] === 'country' ||
      place.address_components[place.address_components.length - 2].types[0] === 'country') {
      if (place.address_components[place.address_components.length - 1].types[0] === 'country') {
        $scope.data.country = place.address_components[place.address_components.length - 1].long_name;
      } else {
        $scope.data.country = place.address_components[place.address_components.length - 2].long_name;
      }
    };
    // FINDING STATE
    if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_1' ||
      place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_1' ||
      place.address_components[place.address_components.length - 3].types[0] === 'administrative_area_level_1') {

      if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_1') {
        $scope.data.state = place.address_components[place.address_components.length - 1].long_name;
      } else if (place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_1') {
        $scope.data.state = place.address_components[place.address_components.length - 2].long_name;
      } else {
        $scope.data.state = place.address_components[place.address_components.length - 3].long_name;
      }
    };
    // FINDING CITY
    if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_2' ||
      place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_2' ||
      place.address_components[place.address_components.length - 3].types[0] === 'administrative_area_level_2' ||
      place.address_components[place.address_components.length - 4].types[0] === 'administrative_area_level_2' ||

      place.address_components[place.address_components.length - 1].types[0] === 'sublocality_level_1' ||
      place.address_components[place.address_components.length - 2].types[0] === 'sublocality_level_1' ||
      place.address_components[place.address_components.length - 3].types[0] === 'sublocality_level_1' ||
      place.address_components[place.address_components.length - 4].types[0] === 'sublocality_level_1') {

      if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_2' ||
        place.address_components[place.address_components.length - 1].types[0] === 'sublocality_level_1') {
        $scope.data.city = place.address_components[place.address_components.length - 1].long_name;
      } else if (place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_2' ||
        place.address_components[place.address_components.length - 2].types[0] === 'sublocality_level_1') {
        $scope.data.city = place.address_components[place.address_components.length - 2].long_name;
      } else if (place.address_components[place.address_components.length - 3].types[0] === 'administrative_area_level_2' ||
        place.address_components[place.address_components.length - 3].types[0] === 'sublocality_level_1') {
        $scope.data.city = place.address_components[place.address_components.length - 3].long_name;
      } else {
        $scope.data.city = place.address_components[place.address_components.length - 4].long_name;
      }
    };

    // FINDING STATE
    if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_1' ||
      place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_1' ||
      place.address_components[place.address_components.length - 3].types[0] === 'administrative_area_level_1') {

      if (place.address_components[place.address_components.length - 1].types[0] === 'administrative_area_level_1') {
        $scope.data.state = place.address_components[place.address_components.length - 1].long_name;
      } else if (place.address_components[place.address_components.length - 2].types[0] === 'administrative_area_level_1') {
        $scope.data.state = place.address_components[place.address_components.length - 2].long_name;
      } else {
        $scope.data.state = place.address_components[place.address_components.length - 3].long_name;
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
    var listener = google.maps.event.addListener(map, "idle", function() {
      map.setZoom(14);
      google.maps.event.removeListener(listener);
    });
  });


  $scope.venue_info = function(venuedata,type) {

    $scope.data.venuename = venuedata.venue_name;
    $scope.data.place = venuedata.address;
    $scope.data.address = venuedata.address;
    if (type == 2) {
      $scope.data.venueid = venuedata.venueid;
    }else{
      $scope.data.venueid = venuedata.id;
    }
       
    $scope.data.city = venuedata.city;
    $scope.data.country = venuedata.country;
    $scope.data.latitude = venuedata.latitude;
    $scope.data.longitude = venuedata.longitude;
    $scope.data.longitude = venuedata.longitude;
    $scope.data.state = venuedata.state;
    $scope.data.zipcode = venuedata.zipcode;
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    marker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.data.latitude, $scope.data.longitude),
      map: map
    });
    bounds.extend(marker.position);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {

        infowindow.setContent($scope.data.place, '');
        infowindow.open(map, marker);
      }
    })(marker, i));
    map.fitBounds(bounds);
  }

  $scope.data1 = {};

$scope.data1.type_of_event=0;
$scope.data1.price=0;

  // $scope.data1 = {
  //   type_of_event: 0,
  //   price: 0
  // };
  //To get steps
  $scope.steps = [

    {
      "title": "Events Details",
      "icon": 'fa fa-calendar',
      'id': 5,
      "formname": 'myForm'
    }, {
      "title": "Price & Links",
      "icon": 'fa fa-tags',
      'id': 6,
      "formname": 'myForm'
    }, {
      "title": "Look & Feel",
      "icon": 'fa fa-eye',
      'id': 7,
      "formname": 'myForm1'
    }, {
      "title": "Setting",
      "icon": 'fa fa-cog',
      'id': 8,
      "formname": 'eventSettingForm'
    }

  ];
   var now = new Date();
  if (now.getMonth() === 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',

    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return '';

  }



  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  ////
  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  $scope.open5 = function() {
    $scope.popup5.opened = true;
  };
  $scope.open6 = function() {
    $scope.popup6.opened = true;
  };
  ////

  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
  //////
  $scope.popup3 = {
    opened: false
  };
  $scope.popup4 = {
    opened: false
  };
  ////
  $scope.popup5 = {
    opened: false
  };

  $scope.popup6 = {
    opened: false
  };


  $scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };

  // Called when the editor is completely ready.
  $scope.onReady = function() {
  
  };
 
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  $scope.options1 = {
    customClass: getDayClass,
    initDate: current,
    showWeeks: true
  };
  $scope.options3 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };
  $scope.options4 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }

  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = !$scope.ismeridian;
  };

  $scope.success_message = false;
  $scope.error_message = true;

  $scope.multiple_event_div = $scope.venue_event_div = $scope.price_and_link_div = $scope.look_and_feel_div = $scope.setting_div = $scope.dynamic_age_div = $scope.return_age_text_div = true;

   //Default Event
  if (!$stateParams.eventId) {
      var href = 'create_series_step1';
  } else {
      var href = 'javascript:void(0)'; 
  }
    
   $scope.events = [{
      "name": "Single Event",
      'id': 1,
      'href':'javascript:void(0)'
    }, {
      "name": "Multiple Event",
      'id': 2,
      'href':href
    }]

    //To show default venues 
  $scope.venues = [{
    "name": "Use Past Location",
    'id': 3
  }, {
    "name": "Add New Venue",
    'id': 4
  }]


  // To show selected event,venue and step.
  $scope.selected = $scope.events[0];
  $scope.selected1 = $scope.venues[0];
  $scope.selected2 = $scope.steps[0];
  
  $scope.formatDate = function(d){
        var d2 = new Date();
        var n2 = d2.getTimezoneOffset(); 
        if (n2 > 0) {
          var newdate = new Date(d .getTime() + n2*60000);
        } else {
          var newdate = new Date(d .getTime() - n2*60000);
        }
        
        d = newdate;
        console.log(d);
        
        function addZero(n){
           return n < 10 ? '0' + n : '' + n;
        }
        console.log(d.getFullYear()+"-"+ addZero(d.getMonth()+1) + "-" + addZero(d.getDate()) + " " + 
                 addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getMinutes()));
      
          return d.getFullYear()+"-"+ addZero(d.getMonth()+1) + "-" + addZero(d.getDate()) + " " + 
                 addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getMinutes());
  }
  
  $scope.combine = function(dt, timeString) {
    var startDateTime = '';
    var parts = /^(\d+):(\d+) (AM|PM)$/.exec(timeString);
    if (parts) {
      hours = parseInt(parts[1], 10);
      minutes = parseInt(parts[2], 10);
      if (parts[3] === "PM" && hours !== 12) {
        hours += 12;
      } else if (parts[3] === "AM" && hours === 12) {
        hours = 0;
      }
      if (!isNaN(hours) && !isNaN(minutes)) {
        startDateTime = new Date(dt.getTime());
        startDateTime.setHours(hours);
        startDateTime.setMinutes(minutes);
      }
    }
    var d = new Date();
    var n = d.getTimezoneOffset(); 
    if (n > 0) {
      var newdate = new Date(startDateTime .getTime() + n*60000);
    } else {
      var newdate = new Date(startDateTime .getTime() - n*60000);
    }
    return newdate;
  }

  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

 $scope.click_menu = function(menu, data, valid) {
    console.log($stateParams.eventId+':1');
    console.log(menu.id);
    console.log(data);
    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 5) {
      if($stateParams.eventId!=undefined){
        $location.path("/create_event_step1/"+$stateParams.eventId);
      } else {
        $location.path("/create_event_step1");
      }
      
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 6) {
      
      if(objectForm.myForm!=undefined) {
        
        if (objectForm.myForm.$valid === true) {
            
            $scope.selectedClass = 2;
            console.log($stateParams.eventId);
            if ($stateParams.eventId == null || $stateParams.eventId == "") {
              
              if(data != undefined) {
                if (data.eventtype=='single') {
                  
                  if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                    $scope.saveloader = true;
                    data.eventdate=$scope.single_start_date;
                    
                    data.startevent_time=$scope.startevent_time;
                    data.endevent_time=$scope.endevent_time;
                    console.log($scope.start_date);
                    console.log(data);
                    data.event_startdatetime  = $scope.formatDate($scope.combine($scope.start_date,data.startevent_time));
                    data.event_enddatetime    = $scope.formatDate($scope.combine($scope.start_date,data.endevent_time));
                    
                    data.userId=$localStorage.userId;
                    data.showclix_token     = $localStorage.showclix_token;
                    data.showclix_user_id   = $localStorage.showclix_user_id;
                    data.showclix_seller_id = $localStorage.showclix_seller_id;
                    data.step               = 1;
                    console.log(data);
                    $serviceTest.saveEvent(data,function(response){
                      $scope.saveloader = false;
                      if (response.code == 200) {
                        $scope.success=global_message.event_step1;
                        $stateParams.eventId = response.result;
                        $scope.error_message=false;
                        $timeout(function() {
                          $scope.success='';
                          $scope.error_message=true;
                        },5000);
                        console.log(response.result);
                        $location.path("/create_event_step2/"+$stateParams.eventId);
                        
                      }
                      else{
                        console.log("test007");
                        $anchorScroll();
                        $scope.show_error=response.error;
                        $scope.show_error_message = true;
                        $timeout(function() {
                            $scope.show_error_message=false;
                        },10000);
                      }
                    });
                  }  
                } 
              }
            } else {
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                
                if(data != undefined) {
                if (data.eventtype=='single') {
                 
                  if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                    data.eventdate=$scope.single_start_date;
                    data.startevent_time=$scope.startevent_time;
                    data.endevent_time=$scope.endevent_time;
                    data.userId=$localStorage.userId;
                    data.id    = $stateParams.eventId;
                    
                    data.event_startdatetime  = $scope.formatDate($scope.combine($scope.start_date,data.startevent_time));
                    data.event_enddatetime    = $scope.formatDate($scope.combine($scope.start_date,data.endevent_time));
                    
                    data.showclix_token     = $localStorage.showclix_token;
                    data.showclix_user_id   = $localStorage.showclix_user_id;
                    data.showclix_seller_id = $localStorage.showclix_seller_id;
                    data.step               = 1;
                    $serviceTest.saveEvent(data,function(response){
                      if (response.code == 200) {
                        $scope.success=global_message.event_step1;
                        $scope.error_message=false;
                        $timeout(function() {
                          $scope.success='';
                          $scope.error_message=true;
                        },3000);
                        
                        $location.path("/create_event_step2/"+$stateParams.eventId);
                        
                      }
                      else{
                        $anchorScroll();
                        $scope.show_error=response.error;
                        $scope.show_error_message = true;
                        $timeout(function() {
                            $scope.show_error_message=false;
                        },10000);
                      }
                    });
                  }  
                } 
              }
                
                
              } 
            }
        } else {
          $scope.selectedClass = 1;
          $scope.error_message = false;
          $scope.error = global_message.event_step1_msg;
          $timeout(function() {
            $scope.error = '';
            $scope.error_message = true;
            $scope.error = '';
          }, 3000);
        }
      } else {
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step2/"+$stateParams.eventId);
        } 
      }
    }

    //look and feel div
    if (menu.id === 7) {
      if(objectForm.myForm1!=undefined) {
      if (objectForm.myForm1.$valid === true) {

        if(data != undefined) {
          data.eventId = $stateParams.eventId;
          $serviceTest.postSecondStepdata(data, function(response) {
            if (response.code == 200) {
              $scope.selectedClass = 3;
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step3/"+$stateParams.eventId);
              }      
            }
          });
        } else {
          $scope.selectedClass = 3;
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step3/"+$stateParams.eventId);
          } 
        }
      } else {
        $scope.selectedClass = 2;
        $scope.error_message = false;
        $scope.error = global_message.event_step2_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000); 
      }

        
      } else {
       
        $scope.selectedClass = 3;
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step3/"+$stateParams.eventId);
        }

      }
    }

    //Event Setting div
    if (menu.id === 8) {
      $scope.selectedClass = 4;
      //if (objectForm.myForm.$valid === true) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step4/"+$stateParams.eventId);
          }
     /* } else {

        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }*/

    }
    //$scope.selected2 = menu;
  }
  



  /** 
  Method: select_venue
  Description:Function for vanue select 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

  $scope.select_venue = function(venue) {
    if (venue.id === 3) {
      $scope.venue_event_div = true;
      $scope.location_event_div = false;
    } else {
      $scope.venue_event_div = false;
      $scope.location_event_div = true;
    }
    $scope.selected1 = venue;
  }

  /** 
  Method: select
  Description:Function for select event type : single / multiple   
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */



  $scope.select = function(item) {
    if (item.id === 1) {
      $scope.data.eventtype = 'single';
      $scope.multiple_event_div = true;
      $scope.single_event_div = false;
    } else {
      $scope.data.eventtype = 'multiple';
      $scope.multiple_event_div = false;
      $scope.single_event_div = true;
    }
    $scope.selected = item;
  };


  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
  $scope.isActive1 = function(venue) {
    return $scope.selected1 === venue;
  };

  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

  //For Step 2
  $scope.items = ['item1'];

  $scope.animationsEnabled = true;

  $scope.open = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };
 

  /** 
  Method: single_eventstart
  Description:Function for select event type : single / multiple   
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
  $scope.single_eventstart = function() {
    //if ($rootScope.selectevent_date === undefined) {
      $scope.select_delect_event = false;
      var d = new Date($scope.start_date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day = d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon = d.getMonth() + 1;
      $rootScope.single_start_date = curr_year + "-" + cur_mon + "-" + curr_date;
      $rootScope.selectevent_date = weekday[day] + " " + m_names[curr_month] + " " + curr_date + "," +" "+curr_year;
    //} else {
     /* var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });*/
    //}
  }



  //To remove event of an event
  $scope.remove_event = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          items: function() {

            return $scope.items;
          }
        }
      });
    }
    // Start time change func
  $scope.changedstarttime = function() {
      $scope.select_delect_event = false;
      $rootScope.startevent_time = $filter('date')($scope.starttime, 'shortTime');

    }
    //Ebd time change func
  $scope.changedendtime = function() {

      if ($scope.starttime !== '') {

        if ($scope.data.eventtype === "single") {
          var stt = new Date("January 01, 2016 " + $scope.starttime);
          stt = stt.getTime();
          var endt = new Date("January 01, 2016 " + $scope.endtime);
          endt = endt.getTime();

          if (stt >= endt) {
            $scope.error_message = false;
            $scope.endtime = '';
            $scope.error = global_message.date_comparison;
            $scope.endtime = '';
            $timeout(function() {
              $scope.error = '';
              $scope.error_message = true;
            }, 3000);

          }
        }
        $scope.select_delect_event = false;
        $rootScope.endevent_time = $filter('date')($scope.endtime, 'shortTime');
      } else {
        $scope.error_message = false;
        $scope.error = global_message.start_date;
        $scope.endtime = '';
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = true;
        }, 3000);
      }

    }
    // To check start end time.
  $scope.checkStartEndTime = function(index) {

    if ($scope.multiple_endtime) {
      var stt = new Date("January 01, 2016 " + $scope.data.starttimeloop1[index]);
      stt = stt.getTime();
      var endt = new Date("January 01, 2016 " + $scope.data.endtimeloop1[index]);
      endt = endt.getTime();

      if (stt >= endt) {
        $scope.error_time_message = false;
        $scope.data.endtimeloop1[index] = '';
        $scope.error_time_display_message = global_message.date_comparison;
        $timeout(function() {
          $scope.error_time_display_message = '';
          $scope.error_time_message = true;
        }, 3000);

      }
    }
  }


  $scope.data = {};
  //To multiple start
  $scope.multiplestart = function() {

    $scope.data.starttimeloop1 = [];

    var i = 0;
    while (i < $scope.between_date.length) {
      $scope.data.starttimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_starttime)));

      i++;
    }

  }


  //To multiple end date
  $scope.multipleend = function() {
    if ($scope.data.period && $scope.multiple_endtime) {

      var stt = new Date("January 01, 2016 " + $scope.multiple_starttime);
      stt = stt.getTime();
      var endt = new Date("January 01, 2016 " + $scope.multiple_endtime);
      endt = endt.getTime();
      if (stt >= endt) {
        $scope.error_time_message = false;
        $scope.multiple_endtime = '';
        $scope.error_time_display_message = global_message.date_comparison;
        $timeout(function() {
          $scope.error_time_display_message = '';
          $scope.error_time_message = true;
        }, 3000);

      }
    }

    $scope.data.endtimeloop1 = [];
    var j = 0;

    while (j < $scope.between_date.length) {
      $scope.data.endtimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_endtime)));
      j++;
    }

  }
});

angular.module('alisthub').controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items, $rootScope) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  // data1.eventinventory
    // Remove data of popup
  $scope.remove = function() {

    delete $rootScope.selectevent_date;
    delete $rootScope.startevent_time;
    delete $rootScope.endevent_time;

    $uibModalInstance.close($scope.selected.item);
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('alisthub').controller('advanceSetting', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$stateParams) { 

  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
  }

  var $serviceTest = $injector.get("venues");
  $scope.data = {};

  $scope.getAdvanceSetting = function() {
  
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                //$scope.data.event_id = 10;  

                if($stateParams.event_id!=undefined && $stateParams.event_id!='') {
                  $scope.data.event_id = $stateParams.event_id;
                } 

                $serviceTest.getAdvanceSetting($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.data = response.result[0];
                    } else {
                        $scope.error_message = response.error;
                    }

                });

            }
        };
  $scope.getAdvanceSetting();

  $scope.saveAdvanceSettings = function() {
      if ($localStorage.userId != undefined) {
            //$scope.data.event_id = 10;
            if($stateParams.event_id!=undefined && $stateParams.event_id!='') {
              $scope.data.event_id = $stateParams.event_id;
            } else {
              $scope.data.event_id = $localStorage.event_id;
            }

            $scope.data.seller_id = $localStorage.userId;
            $serviceTest.saveAdvanceSettings($scope.data, function(response) {
                if (response.code == 200) {
                    $rootScope.success_message = true;
                    $rootScope.success = global_message.advanceSettingSaved;
                    $scope.data = response.result[0];
                } else {
                    $scope.error_message = true;
                    $scope.error =  global_message.advanceSettingSavingError;

                  $timeout(function() {
                    $scope.error_message = false;
                    $scope.error = '';
                  }, 3000);
                }

            });
        } 
  }

  /* Edit advance settings of seller*/
   // if ($state.params.id) {
   //     $scope.callfunction = 1;
        
   //     $scope.getAdvanceSetting = function() {
   //         if ($localStorage.userId != undefined) {
   //               $scope.data.seller_id = $localStorage.userId;
   //              $scope.data.event_id = $state.params.id;
   //             $serviceTest.getAdvanceSetting($scope.data, function(response) {
   //                $scope.loader = false;
   //                  if (response.code == 200) {
   //                      $scope.data = {};
   //                      $scope.data = response.result[0];
   //                  } else {
   //                      $scope.error_message = response.error;
   //                  }

   //             });

   //         }
   //      };
   //      $scope.getAdvanceSetting();
   //     $scope.editAdvanceSetting = function() {
   //          if ($localStorage.userId != undefined) {
   //              $scope.data.seller_id = $localStorage.userId;
   //             $scope.data.id = $state.params.id;
   //             $serviceTest.saveAdvanceSettings($scope.data);
   //          }
   //      };
   //  }
   

});
function keypress(e){
  if(e.charCode===32){
    return false;
  }
  else{
    return true;
  }
}
