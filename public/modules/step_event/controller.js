/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event step  
*/


angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('stepeventController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad) { 
   //If user is not logged in and then log him out.
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
  }
  $scope.loader = false;
  $scope.step1html = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.step1html = 'modules/step_event/views/step1html.html';
        }, function(e) {
            console.log(e);
        });
    // For bundle html
  $scope.bundlehtml = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.bundlehtml = 'modules/step_event/views/bundlehtml.html';
        }, function(e) {
            console.log(e);
        });
    //for Price level html
   $scope.pricelevelhtml = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.pricelevelhtml = 'modules/step_event/views/pricelevelhtml.html';
        }, function(e) {
            console.log(e);
        });
    //For step 2 html
   $scope.step2html = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.step2html = 'modules/step_event/views/step2.html';
        }, function(e) {
            console.log(e);
        });
    //for step3 html
  $scope.step3html = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.step3html = 'modules/step_event/views/step3.html';
        }, function(e) {
            console.log(e);
        });
    //For step4 html
  $scope.step4html = '';

        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.step4html = 'modules/step_event/views/step4.html';
        }, function(e) {
            console.log(e);
        });
   //For Step 1
    var $serviceTest = $injector.get("venues");
    //To show or hide divs
    $scope.select_delect_event=$scope.monthly_div=$scope.days_div=$scope.error_message=$scope.error_time_message=true;
    $rootScope.success_message1=false;
    //For recurring days
    $scope.days=[
      {id: '0', name: 'Sun'},
      {id: '1', name: 'Mon'},
      {id: '2', name: 'Tues'},
      {id: '3', name: 'Wed'},
      {id: '4', name: 'Thurs'},
      {id: '5', name: 'Fri'},
      {id: '6', name: 'Sat'}
    ]
    
    
    //for dates selection
    $scope.dates=[
                 {id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},
                 {id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},
                 {id:21},{id:22},{id:23},{id:24},{id:25},{id:26},{id:27},{id:28},{id:29},{id:30},{id:31}
                 ];


    if ($localStorage.userId!=undefined) {
      //To get venues of a user 
        $serviceTest.getVenues({'userId':$localStorage.userId},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.total_venue=response.result;
            }

            }else{
             $scope.total_venue=[];   
            }
            
        });
    }

    $eventId=$localStorage.eventId;
    

    $scope.eventBundle = {};
    
    $scope.eventBundle.eventId = $localStorage.eventId; 
    $scope.eventBundle.userId = $localStorage.userId;
   //To get bundles
    $serviceTest.getBundles($scope.eventBundle,function(response){
      //$rootScope.bundleList = response.results;
      $rootScope.bundleList = response.result;
    });



    /** 
    Method: change_month
    Description:Function to be execute when a month change occures 
    Created : 2016-04-19
    Created By:  Deepak khokkar  
    */

    $scope.change_month=function(){
      
       var monthly_start=new Date($scope.multiple_start_date);
       var monthly_end=new Date($scope.multiple_end_date);
       var dateArray = new Array();
       while (monthly_start<=monthly_end)
          {
            if(monthly_start.getDate()==$scope.data.monthly_option)
            {
              var currentDate=JSON.parse(JSON.stringify(monthly_start));
              dateArray.push(currentDate);
            }
            monthly_start.setDate(monthly_start.getDate() + 1);
          }
          $scope.between_date=dateArray;
    }

    /* Variable initialized */
    $scope.timeperiod=[
      {id: 'daily', name: 'Daily'},
      {id: 'hourly', name: 'Hourly'},
      {id:'weekly',name:'Weekly'},
      {id:'monthly',name:'Monthly'}
    ]
    /* Remove div from cloned object */
    $scope.removediv=function(index){
        $scope.between_date.splice(index,1);
    }

    /** 
    Method: weekly_option_change
    Description:Function to be execute when a week change occures 
    Created : 2016-04-19
    Created By:  Deepak khokkar  
    */
    $scope.weekly_div=true;
    $scope.weekly_option_change=function() {
      var weekly_start=new Date($scope.multiple_start_date);
      var weekly_end=new Date($scope.multiple_end_date);
      var dateArray = new Array();
      while (weekly_start<=weekly_end) {
        var currentDate=JSON.parse(JSON.stringify(weekly_start));
        if (weekly_start.getDay()==$scope.data.weekly_option) {
          dateArray.push(currentDate);
        }
        weekly_start.setDate(weekly_start.getDate() + 1);
      }
      $scope.between_date=dateArray;
    }
    
    /** 
    Method: select_checkbox
    Description:Function to be execute when a checkbox selected 
    Created : 2016-04-19
    Created By:  Deepak khokkar  
    */
    $scope.select_checkbox=function($event){
        var dateArray = new Array();
        angular.forEach($scope.days, function(day){
        if (!!day.selected)  {
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
      })
      $scope.between_date=dateArray; 
    }

    /** 
    Method: recurring_period
    Description:Function for reccuring process 
    Created : 2016-04-19
    Created By:  Deepak khokkar  
    */
    $scope.recurring_period=function(action) {
        var stt = new Date($scope.multiple_start_date);
        stt = stt.getTime();
        var endt = new Date($scope.multiple_end_date);
        endt = endt.getTime();

        if(stt >= endt) {
          $scope.error_message=false;
          $scope.multiple_end_date='';
          $scope.error='End date must be greater than start date. '; 
          $timeout(function() {
              $scope.error='';
              $scope.error_message=true;
          },3000);
        }

         if(($scope.multiple_start_date===undefined)||($scope.multiple_end_date==undefined)) {
          if ((action=='start')||(action=='end')) { } else {
            $scope.error="Please select start date and end date.";
            $scope.error_message=false;
            $timeout(function() {
                 
              $scope.error='';
              $scope.error_message=true;
              $scope.data.period='';
            },3000);
          }
         } else {
          if ($scope.data.period=='daily') {
            $scope.weekly_div=$scope.monthly_div=$scope.days_div=true;
            if ($scope.data.period!=undefined) {
                currentDate=new Date($scope.multiple_start_date);
                endDate=new Date($scope.multiple_end_date);
                
                var between=[];
                while (currentDate <= endDate) {
                    between.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                $scope.between_date=between;  
            }
          } else if ($scope.data.period=='hourly') {
              $scope.days_div=false;$scope.weekly_div=$scope.monthly_div=true;
              $scope.between_date=[];
          } else if ($scope.data.period=='weekly') {
             $scope.weekly_div=false;$scope.days_div=$scope.monthly_div=true;
          } else if ($scope.data.period=='monthly') {
              $scope.weekly_div=$scope.days_div=true;$scope.monthly_div=false;
          }
        } 
    }
    
    //update price level
    $scope.getPrice=function(id){
        $rootScope.data1={};
        $serviceTest.getSinglePricelevel({'id':id},function(response){
            if (response.code==200) {
                $scope.open_price_level('lg');
                
                $rootScope.data1=response.results[0];
                
            }
           
            
           
        }); 
    }
    
    // To get Price level.
    $serviceTest.getPricelevel({'eventId':$eventId},function(response){
      $rootScope.price_level=response.results;
    });
    //change status of price level
    $scope.changeStatus = function(id,status) {
        
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
         $scope.loader = true;
        $serviceTest.changePricelevelStatus($scope.data,function(response){
            
            if (response.code == 200) {
                     $eventId=$localStorage.eventId;
                    $serviceTest.getPricelevel({'eventId':$eventId},function(response){
                        
                        $rootScope.price_level=response.results;
                    });
                    $scope.loader = false;
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
                    $scope.loader = false;
            }
            
        });
        }
    };
    
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
                 $scope.success="Event Successfully Saved.";
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
              $scope.success="Event Successfully Saved.";
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
    
   
     $rootScope.starttime='';
     $rootScope.endtime='';
     $scope.data = {};
     $scope.locations = [];
     $scope.locations[0]=[];
     // To show google map
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
     $scope.venue_info=function(venuedata){
    
        $scope.data.venuename=venuedata.venue_name;
        $scope.data.place=venuedata.address;
        $scope.data.venueid=venuedata.id;
        $scope.data.city=venuedata.city;
        $scope.data.country=venuedata.country;
        $scope.data.latitude=venuedata.latitude;
        $scope.data.longitude=venuedata.longitude;
        $scope.data.longitude=venuedata.longitude;
        $scope.data.state=venuedata.state;
        $scope.data.zipcode=venuedata.zipcode;
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
     
  $scope.data1={};  
   $scope.data1 = {
        type_of_event: 0,
        price:0
      };
     

 //To get ages
 $serviceTest.postEventdata({'var':'ages'},function(response){

            if (response!=null) {
            if (response.code==200)
             {
              $scope.ages=response.results;
             
              $scope.data1.custom_ages=($scope.ages[0].age).toString();
             }
            }


        });

 //To get steps
  $scope.steps=[

     { "title":"Events Details","icon":'fa fa-calendar','id':5,"formname":'myForm'},
     { "title":"Price & Links","icon":'fa fa-tags','id':6,"formname":'myForm'},
     { "title":"Look & Feel","icon":'fa fa-eye','id':7,"formname":'myForm1'},
     { "title":"Setting","icon":'fa fa-cog','id':8,"formname":'event-form'}

  ];


  ///////////////////////////////steps event///////////////
  /* $serviceTest.postEventdata({'var':'event_types'},function(response){
            if (response!=null) {
            if (response.code==200)
             {
              $scope.events=response.results;
             }
            }

        });*/
   //////////event type///////////
    /*  $serviceTest.postEventdata({'var':'event_venue'},function(response){
            if (response!=null) {
            if (response.code==200)
             {
               $scope.venues=response.results;
             }
            }
            

        });*/
      
      //To get Event Category
          $serviceTest.postEventdata({'var':'event_category'},function(response){
            
            
            if (response.code==200)
             {
              $scope.cat1=$scope.cat2=$scope.cat3=response.results;
              $scope.data1.category1=($scope.cat1[0].category_id).toString();
             
              
             }

        });
    
    //To save step2 data.
    $scope.price_and_link_data=function(data1)
    {
        data1.eventId=$localStorage.eventId;
        $serviceTest.postSecondStepdata(data1,function(response){
            if (response.code=200) {
               $scope.success="Price & links Successfully Saved.";
              $scope.data1={};
              $scope.error_message=false;
              $timeout(function() {
               $scope.success='';
               $scope.error_message=true;
              },3000);
             // window.location.reload();
            }
        });
    }

   
  var now = new Date();
  if (now.getMonth() == 11) {
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
    //mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)
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
  

  $scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };

  // Called when the editor is completely ready.
  $scope.onReady = function () {
   $scope.hello();
  };
  $scope.hello=function(){
    
  }
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
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
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
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
    $scope.ismeridian = ! $scope.ismeridian;
  };
  
  $scope.success_message=false;
  $scope.error_message=true;

  $scope.multiple_event_div=$scope.location_event_div=$scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=$scope.dynamic_age_div=$scope.return_age_text_div=true;
  
  //To show custom age div
  
  $scope.custom_age=function(){
     $scope.age_div=$scope.age_text_div=true; 
     $scope.dynamic_age_div=$scope.return_age_text_div=false;
     $scope.data1.ages='';
  }

  //To show default age
  $scope.custom_default_age=function(){
     $scope.age_div=$scope.age_text_div=false; 
     $scope.dynamic_age_div=$scope.return_age_text_div=true;
     $scope.data1.dynamic_age='';
  }
//Default Event
 $scope.events = [
    { "name": "Single Event",'id':1},
    {"name": "Multiple Event",'id':2}
  ]
 //To show default venues 
  $scope.venues = [
    { "name": "Add New Venue",'id':3},
    {"name": "Use Past Location",'id':4}
  ]
  
 
// To show selected event,venue and step.
  $scope.selected=$scope.events[0];
  $scope.selected1=$scope.venues[0];
  $scope.selected2=$scope.steps[0];
  
  
  
  
   

  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

  $scope.click_menu=function(menu,valid) {
    var objectForm = this;
    //To go to step1 event Details
    if (menu.id==5) {
      $scope.eventdetail_div=false;
      $scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=true;
    }
    
    ///TO move to price and level
    if (menu.id==6) {

      if(objectForm.myForm.$valid==true){
        $scope.eventdetail_div=$scope.look_and_feel_div=$scope.setting_div=true;
        $scope.price_and_link_div=false;  
      } else {
        $scope.error_message = false;
        $scope.error="Please update the event detail data.";
        $timeout(function() {
            $scope.error='';
            $scope.error_message=true;
            $scope.error='';
        },3000);
      }
    }
     //look and feel div
     if (menu.id==7) {
      if(objectForm.myForm.$valid==true){
        $scope.eventdetail_div=$scope.price_and_link_div=$scope.setting_div=true;
        $scope.look_and_feel_div=false;
      } else {
        $scope.error_message = false;
        $scope.error="Please update the event detail data.";
        $timeout(function() {
            $scope.error='';
            $scope.error_message=true;
            $scope.error='';
        },3000);
      }
    }
    //Event Setting div
    if (menu.id==8) {
      if(objectForm.myForm.$valid==true){
        $scope.eventdetail_div=$scope.look_and_feel_div=$scope.price_and_link_div=true;
        $scope.setting_div=false;
      } else {
        $scope.error_message = false;
        $scope.error="Please update the event detail data.";
        $timeout(function() {
            $scope.error='';
            $scope.error_message=true;
            $scope.error='';
        },3000);
      }

    }
    $scope.selected2 = menu;  
  }

  /** 
  Method: select_venue
  Description:Function for vanue select 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
     
  $scope.select_venue=function(venue){
    if(venue.id==3) {
      $scope.venue_event_div=false;
      $scope.location_event_div=true;
    } else {
      $scope.venue_event_div=true;
      $scope.location_event_div=false;
    }
    $scope.selected1 = venue; 
  }

  /** 
  Method: select
  Description:Function for select event type : single / multiple   
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */



  $scope.select= function(item) {
    if (item.id==1) {
      $scope.data.eventtype='single';
      $scope.multiple_event_div=true;
      $scope.single_event_div=false;  
    } else {
     $scope.data.eventtype='multiple';
     $scope.multiple_event_div=false;
     $scope.single_event_div=true;      
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

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  // Add Price level
  $scope.open_price_level = function (size) {
    $rootScope.data1={};
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentPrice.html',
      controller: 'ModalInstancePriceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  
 
  
  //Schedule Price change
  $scope.price_change=function(size,priceid)
  {
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'pricechange.html',
      controller: 'PricechangeCtrl',
      size: size,
      resolve: {
        items: function () {
          $rootScope.price_change_id=priceid;
          return $scope.items;
        }
      }
    });
  
  }
  
  
  //delete Price level
  $scope.delete_price_level = function (size,index,price_id) {
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deletePricelevel.html',
      controller: 'DeletePricelevelCtrl',
      size: size,
      resolve: {
        items: function () {
            $rootScope.delete_price_level_id=index;
            $rootScope.price_leveldelete_id=price_id;
          return $scope.items;
        }
      }
    });
  };
  
  //Add bundle pop up
  $scope.add_bundle = function (size,bundleId) {
    $rootScope.editBundleId = bundleId;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentBundle.html',
      controller: 'ModalInstanceBundleCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  
  //Add Product pop up
  $scope.add_product = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentProduct.html',
      controller: 'ModalInstanceProductCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  
  
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

  /** 
  Method: single_eventstart
  Description:Function for select event type : single / multiple   
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
  $scope.single_eventstart=function() {
    if($rootScope.selectevent_date==undefined) {
      $scope.select_delect_event=false;
      var d=new Date($scope.start_date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day=d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon=d.getMonth()+1;
      $rootScope.single_start_date=curr_year+"-"+cur_mon+"-"+curr_date;
      $rootScope.selectevent_date=weekday[day]+" "+m_names[curr_month]+" "+curr_date + "," + curr_year;  
    } else {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    }
  }
   
  /* $scope.single_eventend=function()
   {
    if($rootScope.selectevent_date==undefined)
    {
        var d=new Date($scope.end_date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var day=d.getDay();
        var curr_year = d.getFullYear();
        var cur_mon=d.getMonth()+1;
         $rootScope.single_start_date=curr_year+"-"+cur_mon+"-"+curr_date;
        $rootScope.selectevent_date=weekday[day]+" "+m_names[curr_month]+" "+curr_date + "," + curr_year; 
    }else{
     var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: '',
      resolve: {
        items: function () {
          
          return $scope.items;
        }
      }
    });
    }
    
   }*/
   //To remove event of an event
   $scope.remove_event=function()
   {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: '',
      resolve: {
        items: function () {
          
          return $scope.items;
        }
      }
    });
   }
   // Start time change func
   $scope.changedstarttime=function(){
    $scope.select_delect_event=false;
    $rootScope.startevent_time=$filter('date')($scope.starttime, 'shortTime');
    
   } 
   //Ebd time change func
   $scope.changedendtime=function(){
  
    if ($scope.starttime!='') {
    
      if( $scope.data.eventtype == "single") {
            var stt = new Date("January 01, 2016 " + $scope.starttime);
            stt = stt.getTime();
            var endt = new Date("January 01, 2016 " + $scope.endtime);
            endt = endt.getTime();

            if(stt >= endt) {
            $scope.error_message=false;
            $scope.endtime='';
            $scope.error='End time must be greater than start time. '; 
            $scope.endtime='';
            $timeout(function() {
                $scope.error='';
                $scope.error_message=true;
              },3000);

                   }
      }
      $scope.select_delect_event=false;
      $rootScope.endevent_time=$filter('date')($scope.endtime, 'shortTime');  
    }else{
        $scope.error_message=false;
        $scope.error='Kindly select start time.';
        $scope.endtime='';
        $timeout(function() {
                          
            $scope.error='';
            $scope.error_message=true;
          },3000);
    }
    
   }
 // To check start end time.
  $scope.checkStartEndTime=function(index){
 
    if( $scope.multiple_endtime ) {
            var stt = new Date("January 01, 2016 " + $scope.data.starttimeloop1[index]);
            stt = stt.getTime();
            var endt = new Date("January 01, 2016 " + $scope.data.endtimeloop1[index]);
            endt = endt.getTime();

            if(stt >= endt) {
            $scope.error_time_message=false;
            $scope.data.endtimeloop1[index]='';
            $scope.error_time_display_message='End time must be greater than start time. '; 
            $timeout(function() {
                $scope.error_time_display_message='';
                $scope.error_time_message=true;
              },3000);

                   }
                 }
   }
    

   $scope.data = {};
   //To multiple start
   $scope.multiplestart=function(){

    $scope.data.starttimeloop1=[];
    
    var i=0;
    while(i<$scope.between_date.length)
    {
        $scope.data.starttimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_starttime)));
    
      i++;  
    }
    
   }
   
   
   //To multiple end date
   $scope.multipleend=function(){
    if ($scope.data.period  && $scope.multiple_endtime) {
    
            var stt = new Date("January 01, 2016 " + $scope.multiple_starttime);
            stt = stt.getTime();
            var endt = new Date("January 01, 2016 " + $scope.multiple_endtime);
            endt = endt.getTime();
            if(stt >= endt) {
            $scope.error_time_message=false;
            $scope.multiple_endtime='';
            $scope.error_time_display_message='End time must be greater than start time. '; 
            $timeout(function() {
                $scope.error_time_display_message='';
                $scope.error_time_message=true;
              },3000);

                   }
    }

  $scope.data.endtimeloop1=[];
    var j=0;
   
    while(j<$scope.between_date.length)
    {
    $scope.data.endtimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_endtime)));
      j++;  
    }
   
   }


  /** Module: Event page Step 2*/ 
  $scope.eventBundle = {};
  $scope.success_message_bundle = false;
  $scope.loader_bundle = false;
  //change status of Bundle
  $scope.changeBundleStatus = function(id,status) {
      $scope.data = {};
      if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $scope.data.status   = status==1?0:1;
        $scope.loader_bundle = true;
        $serviceTest.changeBundleStatus($scope.data,function(response){
          if (response.code == 200) {

            $scope.success_message_bundle = true;
            $scope.success_bundle = "Bundle status changed successfully.";
            $timeout(function() {
              $scope.error = '';
              $scope.success_message_bundle = false;
              $scope.success_bundle = '';
            },3000);

            $scope.eventBundle.eventId = $localStorage.eventId; 
            $scope.eventBundle.userId = $localStorage.userId;
            $serviceTest.getBundles($scope.eventBundle,function(response){
              $rootScope.bundleList = response.result;
            });
            $scope.loader_bundle = false;
          } else {
            $scope.activation_message = global_message.ErrorInActivation;
            $scope.loader_bundle = false;
          }
        });
      }
  };

  //delete Bundle
  $scope.delete_bundle = function (size,index,bundle_id) {
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deleteBundle.html',
      controller: 'deleteBundleCtrl',
      size: size,
      resolve: {
      items: function () {
          $rootScope.bundleIdDelete = index;
          $rootScope.bundleDeleteId = bundle_id;
        return $scope.items;
      }
      }
    });
  };

});


angular.module('alisthub').controller('deleteBundleCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
   //Remove Bundle data
    $scope.removeBundle=function() {
      var $serviceTest = $injector.get("venues");
      $serviceTest.removeBundle({'bundleDeleteId':$rootScope.bundleDeleteId},function(response){
          if (response.code==200) {

              $rootScope.success_message_bundle = true;
              $rootScope.success_bundle="Bundle status changed successfully.";
              $timeout(function() {
                  $rootScope.error='';
                  $rootScope.success_message_bundle = false;
                  $rootScope.success_bundle = "";

              },3000);
              $rootScope.bundleList.splice($rootScope.bundleIdDelete,1);
          }
          $uibModalInstance.close($scope.selected.item);
      });
    }

});

angular.module('alisthub').controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items,$rootScope) {
     $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

 // Remove data of popup
  $scope.remove=function(){
  
    delete $rootScope.selectevent_date;
    delete $rootScope.startevent_time;
    delete $rootScope.endevent_time;
   
    $uibModalInstance.close($scope.selected.item);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('alisthub').controller('DeletePricelevelCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    
     $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
    
    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  //Remove Price level
  $scope.remove=function(){
 
  var $serviceTest = $injector.get("venues");
   $serviceTest.removepricelevel({'price_leveldelete_id':$rootScope.price_leveldelete_id},function(response){
    if (response.code==200) {
        $rootScope.success_message1 = true;
                    $rootScope.success1="Price level has been removed.";
                    $timeout(function() {
                        $rootScope.error='';
                        $rootScope.success_message1=false;
                        $rootScope.success1='';
                    },3000);
        $rootScope.price_level.splice($rootScope.delete_price_level_id,1);
    }
    $uibModalInstance.close($scope.selected.item);
      
   });
  
  }
  
});

angular.module('alisthub').controller('ModalInstancePriceCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    var $serviceTest = $injector.get("venues");

   
    if ($rootScope.data1.id==undefined) {
         $scope.data1 = {
        hide_online: 0,
        hide_in_box_office:0
      };
    }else{
        $scope.data1.price_level=$rootScope.data1.price_level_name;
        $scope.data1.price_type=$rootScope.data1.price_level_type;
        $scope.data1.minimum_per_order=$rootScope.data1.min_per_order;
        $scope.data1.maximum_per_order=$rootScope.data1.max_per_order;
        //$scope.data1.description=$rootScope.data1.description;
         $scope.data1=$rootScope.data1; 
    }
   
     $scope.items = items;
     $scope.min_price=true;
     //To change Price type function
     $scope.change_price_type=function(){
    
     if($scope.data1.price_type=='name_your_price')
     {
        $scope.min_price=false;
        $scope.online_price=true;
     }else{
        $scope.online_price=false;
        $scope.min_price=true;
     }
    }
    //Online price function
    $scope.onlinePricefunc=function()
    {
    
       $scope.data1.box_office_price=$scope.data1.online_price;
    }
    //Suggested Price function
     $scope.suggestedPricefunc=function()
    {
     
       $scope.data1.box_office_price=$scope.data1.suggested_price;
    }
    
    $scope.selected = {
      item: $scope.items[0]
    };



  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  
   //For step 2 Save Price level
 $scope.savepriceleveldata=function(data1)
 {
  data1.userId=$localStorage.userId; 
  data1.eventId=$localStorage.eventId; 
         
         $serviceTest.savepriceleveldata(data1,function(response){
          
              if (response!=null) {
            if (response.code==200)
             {
              $scope.data1=$rootScope.price_level=[];
              $serviceTest.getPricelevel({'eventId':data1.eventId},function(response){
                $rootScope.success_message1 = true;
                   if (data1.id!=undefined) {
                    $rootScope.success1="Price level has been updated.";
                   }else{
                    $rootScope.success1="Price level has been added.";
                   }
                    $timeout(function() {
                        $rootScope.error='';
                        $rootScope.success_message1=false;
                        $rootScope.success1='';
                    },3000);
                $rootScope.price_level=response.results;
              });
              $uibModalInstance.dismiss('cancel'); 
             }
            }
        }); 
 }
});

  /*
  Module for the bundle popup
  */

  angular.module('alisthub').controller('ModalInstanceBundleCtrl', function($scope, $uibModalInstance, items,$rootScope,$injector,$localStorage,$location,$timeout) {
    var $serviceTest = $injector.get("venues");
    $scope.data = {};
    $scope.eventBundle = {};
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
    $scope.bundle = {};
    $scope.editBundle = {};
    $scope.totalQty = 0;
    $localStorage.bundleId = '';
    $scope.error='';
    $scope.error_message = true;

    $scope.bundleList = $rootScope.bundleList;
    //Bundle Steps
    $scope.steps=[
     { "title":"Details","icon":'fa fa-calendar','id':1},
     { "title":"Quantities","icon":'fa fa-cog','id':2},
     { "title":"Price","icon":'fa fa-tags','id':3}
    ];

    $scope.click_menu=function(menu) {
       var bundleForm = this;
       
       $scope.selectedClass = 1; 
       if (menu.id==1) {
        $scope.selectedClass = 1;
        $scope.step_1=true;
        $scope.step_2=$scope.step_3=false;
       }
       if (menu.id==2) {
          if(bundleForm.bundleForm.$valid==true){
              $scope.selectedClass = 2;
              $scope.step_2=true;
              $scope.step_1=$scope.step_3=false;     
          } else {
            $scope.error_message = false;
            $scope.error="Please update the step 1";
            $timeout(function() {
                $scope.error='';
                $scope.error_message=true;
                $scope.error='';
            },5000);
          }
       }
       
       if (menu.id==3) {
         if(bundleForm.bundleForm.$valid==true){
            $scope.getTotal();
            $scope.selectedClass = 3;
            $scope.step_3=true;
            $scope.step_2=$scope.step_1=false;    
          } else {
            $scope.error_message = false;
            $scope.error="Please update the step 1";
            $timeout(function() {
                $scope.error='';
                $scope.error_message=true;
                $scope.error='';
            },5000);
          }

       
       }
       //$scope.selected2 = menu;  
    }
    $scope.click_menu({id:1});

    $scope.isActive2 = function(step2) {
      return $scope.selected2 === step2;
    };

    /* bundle tab stop */
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.getBundleDetail = function() { 
      if ($localStorage.userId!=undefined) {
        $scope.editBundle.userId = $localStorage.userId;
        $scope.editBundle.editBundleId = $rootScope.editBundleId;

        $serviceTest.getBundleDetail($scope.editBundle,function(response){
          $scope.loader = false;
          if (response.code == 200) {
            console.log(response);
            $scope.bundle = response.result[0];
          } else {
            $scope.error_message = response.error;
          }
        });
      }
    }; 


    $scope.updateBundle = function(bundle) {
      if ($localStorage.userId!=undefined) {
        $scope.bundle.seller_id   = $localStorage.userId;
        $scope.bundle.step   = 1;
        $scope.bundle.event_id = $localStorage.eventId;

        if($localStorage.bundleId!=undefined){
          $scope.bundle.id = $localStorage.bundleId;
        }

        //console.log($scope.bundle);
        $serviceTest.addBundle($scope.bundle,function(response){
          //console.log(response);
          if (response.code == 200) { 
            if(bundle.id==undefined && bundle.id==''){
              $localStorage.bundleId = response.result.insertId;  
              $scope.success = "Bundle information has been added.";
            } else {
              $localStorage.bundleId = bundle.id;
              $scope.success = "Bundle information has been updated successfully.";

              $scope.eventBundle.eventId = $localStorage.eventId; 
              $scope.eventBundle.userId = $localStorage.userId;

              $serviceTest.getBundles($scope.eventBundle,function(response){
                $rootScope.bundleList = response.result;
              });
            }
            
            $scope.success_message = true;
            
            $timeout(function() {
              $scope.error = '';
              $scope.success_message = false;
              $scope.success = '';
            },3000);
          } else {
            $scope.activation_message = global_message.ErrorInActivation;
          }
        });
      }
    };
    
    //console.log($rootScope.price_level);
 //To get Total of Bundle
    $scope.getTotal = function(){
        var totalQty = 0;
        var totalOnline = 0;
        var totalBoxoffice =0;

        for(var i = 0; i < $scope.price_level.length; i++){
            var quantity = $scope.price_level[i].qty;
            totalQty += parseInt(quantity);
            totalOnline += parseFloat(quantity * $scope.price_level[i].online_price);
            totalBoxoffice += parseFloat(quantity * $scope.price_level[i].box_office_price);  
        }

        for(var i = 0; i < $scope.productList.length; i++){
            var quantity = $scope.productList[i].qty;
            totalQty += parseInt(quantity);
            totalOnline += parseFloat(quantity * $scope.productList[i].retail_price);
            totalBoxoffice += parseFloat(quantity * $scope.productList[i].retail_price);  
        }

        $scope.totalQty = totalQty;
        $scope.totalOnline = totalOnline;
        $scope.totalBoxoffice = totalBoxoffice;
    }

    

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
  //Update quantity
    $scope.updateQty = function(status) {
      console.log($scope.price_level);
      $scope.bundle.bundle_id = $localStorage.bundleId;
      $scope.bundle.product_json = $scope.productList;

      $scope.bundle.totalQty = $scope.totalQty;
      $scope.bundle.totalOnline = $scope.totalOnline;
      $scope.bundle.totalBoxoffice = $scope.totalBoxoffice;

      $serviceTest.updateBundle($scope.bundle,function(response){
        //console.log(response);
        if (response.code == 200) {

          $scope.eventBundle.eventId = $localStorage.eventId; 
          $scope.eventBundle.userId = $localStorage.userId;

          $serviceTest.getBundles($scope.eventBundle,function(response){
            $rootScope.bundleList = response.result;
          });

          if(status=='submit') {
            $scope.cancel();
          }
          
          $scope.success = "Bundle updated successfully.";
          $timeout(function() {
            $scope.error = '';
            $scope.success_message = false;
            $scope.success = '';
          },3000);
        } else {
          $scope.activation_message = global_message.ErrorInActivation;
        }
      });
    };
//To get Products
    $scope.getProduct = function() { 
      if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $serviceTest.getProducts($scope.data,function(response){
          //console.log(response);
          $scope.loader = false;
          if (response.code == 200) {
            $scope.productList = response.result;
          } else {
            $scope.error_message = response.error;
          }
        });
      }
    }; 

    // Get product list 
    $scope.getProduct();
    // get bundle details at edit time
    if($rootScope.editBundleId!=undefined){
      $scope.getBundleDetail();
    }

  });

  
  /*
  Code for product popup
  */
  angular.module('alisthub').controller('ModalInstanceProductCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector) {
    $scope.items = items;
    $scope.data = {};
    var $serviceTest = $injector.get("venues");
    $scope.selected = {
      item: $scope.items[0]
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

//To get Product
    $scope.getProduct = function() { 
      if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $serviceTest.getProducts($scope.data,function(response){
          
          $scope.loader = false;
          if (response.code == 200) {
            //console.log($scope.data.first_name);
          } else {
            $scope.error_message = response.error;
          }
        });
      }
    }; 

    $scope.getProduct();

  });
  
   /*
  Code for product popup
  */
  angular.module('alisthub').controller('PricechangeCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    var $serviceTest = $injector.get("venues");
   $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
  $scope.popup1 = {
    opened: false
  };
  //To get Months
    $scope.months=[
      {id: '01', name: '1'},
      {id: '02', name: '2'},
      {id: '03', name: '3'},
      {id: '04', name: '4'},
      {id: '05', name: '5'},
      {id: '06', name: '6'},
      {id: '07', name: '7'},
      {id: '08', name: '8'},
      {id: '09', name: '9'},
      {id: '10', name: '10'},
      {id: '11', name: '11'},
      {id: '12', name: '12'},
    ]
    //To get time interval
    $scope.timeinterval=[
      {id: '00', name: '00'},
      {id: '15', name: '15'},
      {id: '30', name: '30'},
      {id: '45', name: '45'}
    ]
    $scope.interval=[
        {id: 'am', name: 'am'},
      {id: 'pm', name: 'pm'},
    ];
    $scope.apply=[
        {id: 'all', name: 'All'},
      {id: 'online_price', name: 'Online Sales'},
      {id: 'box_office', name: 'Box Office'},
    ];
    //Price change function
     $scope.pricechangefunc=function(data2)
     {
       $rootScope.success_message1 = true;
        data2.price_change_id=$rootScope.price_change_id;
        $serviceTest.postPriceChange(data2,function(response){
           if (response.code==200) {
             $rootScope.success1 = "Price change has been updated successfully.";
             $timeout(function() {
              $rootScope.error = '';
              $rootScope.success_message1 = false;
              $rootScope.success1 = '';
            },3000);
           }else{
            $rootScope.error1 = "Error in price change update.";
             $timeout(function() {
              $rootScope.error1 = '';
              $rootScope.success_message1 = false;
              $rootScope.success1 = '';
            },3000);
           }
            $uibModalInstance.dismiss('cancel');
        });
     }
    $scope.data2={};
    $scope.data2.month=$scope.months[0].id;
    $scope.data2.time=$scope.timeinterval[0].id;
    $scope.data2.interval=$scope.interval[0].id;
    $scope.data2.apply=$scope.apply[0].id;
    
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
