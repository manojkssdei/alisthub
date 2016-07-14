/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event step  
*/


angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('stepeventController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state) {

  $scope.loader = false;
   //For Step 1
  var $serviceTest = $injector.get("venues");
  if($stateParams.eventId==='')
  {
   $localStorage.eventId=null;
  }
  else{
    
     var event_id=$stateParams.eventId;
     $serviceTest.getEvent({'event_id':event_id},function(response){
        
        $scope.data=response.results[0];
        $scope.selected1 = $scope.venues[1];
        $scope.data.eventname=response.results[0].title;
        $scope.starttime=$scope.startevent_time=response.results[0].start_time;
        $scope.endtime=$scope.endevent_time=response.results[0].end_time;
        $scope.data.content=response.results[0].description;
        $scope.data.venuename=response.results[0].venue_name;
        $scope.location_event_div=true;$scope.venue_event_div=$scope.select_delect_event=false;
        $scope.select_delect_event = false;
      var d = new Date(response.results[0].eventdate);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day = d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon = d.getMonth() + 1;
      $rootScope.single_start_date = curr_year + "-" + cur_mon + "-" + curr_date;
      $rootScope.selectevent_date = weekday[day] + " " + m_names[curr_month] + " " + curr_date + "," + curr_year;
       
     });
  }
  
 
 

 
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
        }

      } else {
        $scope.total_venue = [];
      }

    });
  }
 
  $eventId = $localStorage.eventId;
/** 
  Method: change_month
  Description:Function to be execute when a month change occures 
  Created : 2016-04-19
  Created By:  Deepak khokkar  
  */

  $scope.change_month = function() {

    if ($scope.monthly && $scope.monthly.type == "everythisday") {
      if ($scope.data.monthly_option) {
        $scope.monthly_error = '';
        var monthly_start = new Date($scope.multiple_start_date);
        var monthly_end = new Date($scope.multiple_end_date);
        var dateArray = [];

        while (monthly_start <= monthly_end) {
          if (monthly_start.getDate() == $scope.data.monthly_option) {
            dateArray.push(new Date(monthly_start));
          }
          monthly_start.setDate(monthly_start.getDate() + 1);
        }
        $scope.between_date = dateArray;
      }
      else {
        $scope.monthly_error = 'Day is required'
      }
    }
    else {
      $scope.monthly_error = 'Must select option for it to work';
    }

  }

  /* Variable initialized */
  $scope.timeperiod = [{
      id: 'daily',
      name: 'Daily'
    }, {
      id: 'weekly',
      name: 'Weekly'
    }, {
      id: 'monthly',
      name: 'Monthly'
    }, {
      id: 'yearly',
      name: 'Yearly'
    }]

  $scope.month_week_selection = [{
    id: '1',
    name: 'First'
  }, {
    id: '2',
    name: 'Second'
  }, {
    id: '3',
    name: 'Third'
  }, {
    id: '4',
    name: 'Fourth'
  } , {
    id: '5',
    name: 'Fifth'
  }]


    /* Remove div from cloned object */
  $scope.removediv = function(index) {
    $scope.between_date.splice(index, 1);
  }

  /** 
  Method: weekly_option_change
  Description:Function to be execute when a week change occures 
  Created : 2016-04-19
  Created By:  Deepak khokkar  
  */
  $scope.weekly_div = true;
  $scope.weekly_option_change = function() {

    var weekly_start = new Date($scope.multiple_start_date);
    var weekly_end = new Date($scope.multiple_end_date);
    var dateArray = [];
    $scope.between_date = [];

    var currentDate = new Date(weekly_start);

    while (currentDate <= weekly_end) {
      if (currentDate.getDay() === $scope.data.weekly_option) {
        dateArray.push(currentDate);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    $scope.between_date = dateArray;
  }

  /** 
  Method: select_checkbox
  Description:Function to be execute when a checkbox selected 
  Created : 2016-04-19
  Created By:  Deepak khokkar  
  */
  /*Added Sorted functionality - Ravnit Suri*/
  $scope.select_checkbox=function($event){
      var dateArray = new Array();
      angular.forEach($scope.days, function(day){
      if (day.selected)  {
        dDate1=new Date($scope.multiple_start_date);
        dDate2=new Date($scope.multiple_end_date);
       
        while (dDate1<=dDate2) {
          var currentDate=JSON.parse(JSON.stringify(dDate1));
          if (dDate1.getDay()==day.id) {
            dateArray.push(currentDate);
          }
          dDate1.setDate(dDate1.getDate() + 1);
        }
      }
    });


    var date_sort_asc = function (date1, date2) {
      if (date1 > date2) return 1;
      if (date1 < date2) return -1;
      return 0;
    };
    dateArray = dateArray.sort(date_sort_asc);



    $scope.between_date=dateArray; 
  }


  /** 
  Method: rec_days_func
  Description:Function for Daily Recurring Events Date repeat
  Created : 2016-06-01
  Created By:  Ravnit Suri
  */
$scope.rec_days_func = function(value) {

  if ( !value || value == "" || value == undefined || value == null || value == 0)  { var between = []; }
  else {
    currentDate = new Date($scope.multiple_start_date);
    endDate = new Date($scope.multiple_end_date);

    var between = [];
    $scope.between_date = [];
    while (currentDate <= endDate) {
      between.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + parseInt(value));
      // console.log(currentDate.getDate() + parseInt(value))
    }
  }

  $scope.between_date = between;
}


  /** 
  Method: rec_monthly_func
  Description:Function for Monthly Recurring Events Date repeat
  Created : 2016-06-01
  Created By:  Ravnit Suri
  */
$scope.rec_monthly_func = function() {
    if ($scope.data.monthly_week_value && $scope.data.monthly_day_value){
      $scope.monthly_error = null;
      var monthly_start = new Date($scope.multiple_start_date);
      var monthly_end = new Date($scope.multiple_end_date);
      var dateArray = [];

      var week_value = $scope.data.monthly_week_value ;
      var day_value = $scope.data.monthly_day_value ;

      var currentDate = new Date($scope.multiple_start_date);
      while (currentDate <= monthly_end)
      {
        var weeknumber = parseInt(currentDate.getDate() / 7);
        if ( currentDate.getDate() == 7 
                  || currentDate.getDate() == 14 
                  || currentDate.getDate() == 21 
                  || currentDate.getDate() == 28    ) 
           { weeknumber = weeknumber - 1; }

        if ( (currentDate.getDay() == day_value) && (weeknumber == (week_value-1)) )
        {
          dateArray.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      $scope.between_date = dateArray;
    }
    else {
      $scope.monthly_error = 'Week number and day is required';
    }
}

  /** 
  Method: rec_year_func
  Description:Function for reccuring yearly process 
  Created : 2016-04-19
  Created By:  Ravnit Suri
  */
$scope.rec_year_func = function() {
    var yearly_start = new Date($scope.multiple_start_date);
    var yearly_end = new Date($scope.multiple_end_date);
    var dateArray = [];
    var currentDate = new Date(yearly_start);
    while(currentDate <= yearly_end) {
      dateArray.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    $scope.between_date=dateArray; 
}




  /** 
  Method: recurring_period
  Description:Function for reccuring process 
  Created : 2016-04-19
  Created By:  Deepak khokkar  
  */
  $scope.recurring_period = function(action) {
    var stt = new Date($scope.multiple_start_date);
    stt = stt.getTime();
    var endt = new Date($scope.multiple_end_date);
    endt = endt.getTime();

    if (stt >= endt) {
      $scope.error_message = false;
      $scope.multiple_end_date = '';
      $scope.error = global_message.date_error;
      $timeout(function() {
        $scope.error = '';
        $scope.error_message = true;
      }, 3000);
    }

    if (($scope.multiple_start_date === undefined) || ($scope.multiple_end_date === undefined)) {
      if ((action === 'start') || (action === 'end')) {} else {
        $scope.error = "";
        $scope.error_message = false;
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = true;
          $scope.data.period = '';
        }, 3000);
      }
    } else {
      if ($scope.data.period === 'daily') {
        $scope.dailyrecurring_div = true;
        $scope.weekly_div = $scope.monthly_div = $scope.days_div = true;

        $scope.rec_days_func();
      } 

      else if ($scope.data.period === 'weekly') {
        $scope.days_div = $scope.dailyrecurring_div = false;
        $scope.weekly_div = $scope.monthly_div = true;
      }

      else if ($scope.data.period === 'monthly') {
        $scope.weekly_div = $scope.days_div = true;
        $scope.monthly_div = $scope.dailyrecurring_div = false;
      }

      else if ($scope.data.period === 'yearly') {
        $scope.dailyrecurring_div = false;
        $scope.days_div = $scope.weekly_div = $scope.monthly_div = true;

        $scope.rec_year_func();
      }

    }

  }

    /** 
    Method: savedata
    Description:Function for save the data of recurring event 
    Created : 2016-04-25
    Created By:  Deepak khokkar  
    */

    $scope.savedata=function(data) {
        if (data.eventtype=='single') {
          if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
            data.eventdate=$scope.single_start_date;
            
            data.startevent_time=$scope.startevent_time;
            data.endevent_time=$scope.endevent_time;
            
            data.userId=$localStorage.userId;
            $serviceTest.saveEvent(data,function(response){
              if (response.code == 200) {
                 $scope.success=global_message.event_step1;
                 $localStorage.eventId=response.result;
                 $scope.error_message=false;
                 $timeout(function() {
                   $scope.success='';
                   $scope.error_message=true;
                 },3000);
              }
            });

          }  
        } else {
          data.userId=$localStorage.userId;
          $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
            if (response.code == 200) {
              $scope.success=global_message.event_step1;
              $scope.data={};
              $scope.error_message=false;
              $timeout(function() {
               $scope.success='';
               $scope.error_message=true;
              },3000);
              window.location.reload();
            }
          }); 
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
  $scope.venue_info = function(venuedata) {

    $scope.data.venuename = venuedata.venue_name;
    $scope.data.place = venuedata.address;
    $scope.data.venueid = venuedata.id;
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
  $scope.data1 = {
    type_of_event: 0,
    price: 0
  };
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
      "formname": 'event-form'
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
  $scope.events = [{
      "name": "Single Event",
      'id': 1
    }, {
      "name": "Multiple Event",
      'id': 2
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



  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

  $scope.click_menu = function(menu, data, valid) {

    var objectForm = this;
    //To go to step1 event Details
    if (menu.id === 5) {
      $state.go("create_event_step1");
    }

    ///TO move to price and level
    if (menu.id === 6) {

      if (objectForm.myForm.$valid === true) {
          if ($localStorage.eventId == null) {
              if (data.eventtype=='single') {
                if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                  data.eventdate=$scope.single_start_date;
                  
                  data.startevent_time=$scope.startevent_time;
                  data.endevent_time=$scope.endevent_time;
                  
                  data.userId=$localStorage.userId;
                  $serviceTest.saveEvent(data,function(response){
                    if (response.code == 200) {
                       $scope.success=global_message.event_step1;
                       $localStorage.eventId=response.result;
                       $scope.error_message=false;
                       $timeout(function() {
                         $scope.success='';
                         $scope.error_message=true;
                       },3000);
                        $location.path("/create_event_step2/"+$localStorage.eventId);
                    }
                  });

                }  
              } else {
                data.userId=$localStorage.userId;
                $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
                  if (response.code == 200) {
                    $scope.success=global_message.event_step1;
                    $scope.data={};
                    $scope.error_message=false;
                    $timeout(function() {
                     $scope.success='';
                     $scope.error_message=true;
                    },3000);
                    window.location.reload();
                  }
                }); 
              }
             
          }
          else {
            
            $location.path("/create_event_step2/"+$localStorage.eventId);
          }
      } else {
        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }
    }

    //look and feel div
    if (menu.id === 7) {
        $location.path("/create_event_step3/"+$localStorage.eventId);
     /*if (objectForm.myForm.$valid === true) {
      $scope.eventdetail_div = $scope.price_and_link_div = $scope.setting_div = true;
      $scope.look_and_feel_div = false;
      } else {
        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }*/


    }
    //Event Setting div
    if (menu.id === 8) {

      //if (objectForm.myForm.$valid === true) {
          $location.path("/create_event_step4/"+$localStorage.eventId);
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
    $scope.selected2 = menu;
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
    if ($rootScope.selectevent_date === undefined) {
      $scope.select_delect_event = false;
      var d = new Date($scope.start_date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day = d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon = d.getMonth() + 1;
      $rootScope.single_start_date = curr_year + "-" + cur_mon + "-" + curr_date;
      $rootScope.selectevent_date = weekday[day] + " " + m_names[curr_month] + " " + curr_date + "," + curr_year;
    } else {
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
