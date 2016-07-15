/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event step  
*/


angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('seriesStep1Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state) {

  $scope.loader = false;
   //For Step 1
  var $serviceTest = $injector.get("venues");
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
  $scope.days = [{
    id: '0',
    name: 'Sun'
  }, {
    id: '1',
    name: 'Mon'
  }, {
    id: '2',
    name: 'Tues'
  }, {
    id: '3',
    name: 'Wed'
  }, {
    id: '4',
    name: 'Thurs'
  }, {
    id: '5',
    name: 'Fri'
  }, {
    id: '6',
    name: 'Sat'
  }]

  //for dates selection
  $scope.dates = [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }, {
    id: 4
  }, {
    id: 5
  }, {
    id: 6
  }, {
    id: 7
  }, {
    id: 8
  }, {
    id: 9
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }, {
    id: 13
  }, {
    id: 14
  }, {
    id: 15
  }, {
    id: 16
  }, {
    id: 17
  }, {
    id: 18
  }, {
    id: 19
  }, {
    id: 20
  }, {
    id: 21
  }, {
    id: 22
  }, {
    id: 23
  }, {
    id: 24
  }, {
    id: 25
  }, {
    id: 26
  }, {
    id: 27
  }, {
    id: 28
  }, {
    id: 29
  }, {
    id: 30
  }, {
    id: 31
  }];

  
  
  if($stateParams.eventId==='')
  {
   $stateParams.eventId = null;
  }
  else{
     
     var event_id=$stateParams.eventId;
     $scope.pageloader = true;
     $serviceTest.getSeriesEvent({'event_id':event_id},function(response){
        $scope.pageloader = false;
        console.log(response.results[0]);
        $scope.data=response.results[0];
        $scope.data.eventurl= $scope.data.event_domain;
        $scope.data.domain_url_availability = 1;
        $scope.selected1 = $scope.venues[1];
        $scope.data.eventname=response.results[0].title;
        $scope.starttime=$scope.startevent_time=response.results[0].start_time;
        $scope.endtime=$scope.endevent_time=response.results[0].end_time;
        $scope.data.content=response.results[0].description;
        $scope.data.venuename=response.results[0].venue_name;
        
        //////////////////////// Venue Info //////////////////////////////
         $scope.data.venuename = response.results[0].venue_name;
         $scope.data.place     = response.results[0].address;
         $scope.data.address   = response.results[0].address;
         $scope.data.venueid   = response.results[0].venue_id;
         $scope.data.city      = response.results[0].city;
         $scope.data.country   = response.results[0].country;
         $scope.data.latitude  = response.results[0].latitude;
         $scope.data.longitude = response.results[0].longitude;
         $scope.data.longitude = response.results[0].longitude;
         $scope.data.state     = response.results[0].state;
         $scope.data.zipcode   = response.results[0].zipcode;
         $scope.data.selected_venue = response.results[0].venue_id;
         console.log($scope.data.selected_venue);
         console.log("===========================");
         $scope.venue_info($scope.data,2);
         console.log($scope.data.selected_venue);
         console.log("===========================");
         
         
        ///////////////////////// Venue Info  /////////////////////////////
        
        // For start date and end Date      
         var d = new Date();
         var n = d.getTimezoneOffset(); 
        
         var ee = new Date(response.results[0].end_date);
         var ss = new Date(response.results[0].start_date);
         $scope.multiple_start_date = ss;
         $scope.multiple_end_date   = ee;
            
        
        // for showing recurring type
        if (response.results[0].recurring_type == 1) {
         $scope.data.period    = "daily";
         $scope.rec_days_value = response.results[0].repeat_every;
        }
        
        if (response.results[0].recurring_type == 2) {
         $scope.day = {};
         $scope.week_repeat2 =[];
         $scope.data.period = "weekly";
         var str  = response.results[0].repeat_every;
         $scope.week_repeat = str.split(",");
         
         $scope.week_repeat.forEach(function(arr){
            $scope.days[arr].checked = 1;
         });
         
        }
        
        if (response.results[0].recurring_type == 3) {
         $scope.data.period = "monthly";
         $scope.monthly = {};
         $scope.monthly.type            = response.results[0].repeat_every;
         $scope.data.monthly_option     = response.results[0].monthly_option;
         $scope.data.monthly_week_value = response.results[0].monthly_week_value;
         $scope.data.monthly_day_value  = response.results[0].monthly_day_value;
        }
        
        if (response.results[0].recurring_type == 4) {
         $scope.data.period = "yearly";
        }
        
        $scope.recurring_period('period');
        
        
        
      $scope.location_event_div=false;$scope.venue_event_div=true;
      $scope.select_delect_event=true;
      var d = new Date(response.results[0].eventdate);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var day = d.getDay();
      var curr_year = d.getFullYear();
      var cur_mon = d.getMonth() + 1;
      $rootScope.single_start_date = curr_year + "-" + cur_mon + "-" + curr_date;
      $rootScope.selectevent_date = weekday[day] + " " + m_names[curr_month] + " " + curr_date + "," + curr_year;
      
      var timing  = response.timing;
      var tlength = timing.length;
      $scope.multiple_starttime = timing[0].start_time;
      $scope.multiple_endtime   = timing[tlength-1].end_time;
      //data.starttimeloop1[$index]  between_date data.endtimeloop1
      $scope.between_date   = [];
      $scope.data.starttimeloop1 = [];
      $scope.data.endtimeloop1 = [];
      timing.forEach(function(arr){
        var sbetween = new Date(arr.start_date_time);
        if (n > 0) {
        var sbetweens = new Date(sbetween.getTime() - n*60000); 
        }else{
        var sbetweens = new Date(sbetween.getTime() + n*60000);  
        }
        $scope.between_date.push(sbetweens);
      });
      timing.forEach(function(arr){
         $scope.data.starttimeloop1.push(arr.start_time);
         $scope.data.endtimeloop1.push(arr.end_time);
      });
      });
  }
    
  

  if ($localStorage.userId !== undefined) {
    //To get venues of a user
    $scope.venueloader = true;
    $serviceTest.getVenues({
      'userId': $localStorage.userId
    }, function(response) {
       $scope.venueloader = false;
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
 
  $eventId = $stateParams.eventId;
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
      var recur_day = [];
      angular.forEach($scope.days, function(day){
      if (day.selected)  {
        dDate1=new Date($scope.multiple_start_date);
        dDate2=new Date($scope.multiple_end_date);
       
        while (dDate1<=dDate2) {
          var currentDate=JSON.parse(JSON.stringify(dDate1));
          if (dDate1.getDay()==day.id) {
            dateArray.push(new Date(currentDate));
            recur_day.push(day.id);
          }
          dDate1.setDate(dDate1.getDate() + 1);
        }
      }
    });
    $scope.recur_day = recur_day.toString(); 
    console.log(dateArray);
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
    $scope.rec_days_value = value;
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

    if (stt > endt) {
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
        $scope.error = "Please select start and end date";
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
  
    /** Method : Date Time Merge 
    
    **/
   $scope.combine = function(dt, timeString) {
      var startDateTime;
      var parts = /^(\d+):(\d+) (AM|PM)$/.exec(timeString);
      if (parts) {
          hours = parseInt(parts[1], 10);
          minutes = parseInt(parts[2], 10);
          if (parts[3] === "PM" && hours !== 12) {
              hours += 12;
          }
          else if (parts[3] === "AM" && hours === 12) {
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
      }
      else{
         var newdate = new Date(startDateTime .getTime() - n*60000);
      }
      
      return newdate;
   }
        
   /** 
    Method: savedata
    Description:Function for save the data of recurring event 
    Created : 2016-04-25
    Created By:  Deepak khokkar  
   **/
   $scope.timezone_timing = function(date){
     var d = new Date();
     var n = d.getTimezoneOffset(); 
     var dates = new Date(date);
     if (n > 0) {
         var newvalue = new Date(dates .getTime() + n*60000);
      }
      else{
         var newvalue = new Date(dates .getTime() - n*60000);
      }
      return newvalue;
   }
   
   
   $scope.savedata=function(data) {
         data.userId=$localStorage.userId;
         $scope.saveloader = true;
          // Merge Event Date and Time
          var date_time_series = [];
                   
          $scope.between_date.forEach(function(value,key) {
          // $scope.combine
          var time1 = $scope.combine(value,data.starttimeloop1[key]);
          
          var time2 = $scope.combine(value,data.endtimeloop1[key]);
                          
          var newvalue = $scope.timezone_timing(value);          
          
          date_time_series.push({"from":time1,"to":time2,"date":newvalue,"start_time":data.starttimeloop1[key],"end_time":data.endtimeloop1[key]});
                             
          });
          
          data.venue_id = $scope.data.selected_venue;
          data.date_time_series = date_time_series;
          data.venue_event_div  = $scope.venue_event_div;
          console.log("====================================");
          console.log(data);
          console.log("====================================");
          
          var d = new Date();
          var n = d.getTimezoneOffset(); 
          console.log(n);   
           
         if(data.venue_id != "" && data.venue_id !== undefined)
         {
            // Repeat every
            if (data.period == 'daily') {
               data.repeat_every = $scope.rec_days_value;
               data.monthly_option     = "";
               data.monthly_week_value = "";
               data.monthly_day_value  = "";
            }
            if (data.period == 'weekly') {
               data.repeat_every = $scope.recur_day;
               data.monthly_option     = "";
               data.monthly_week_value = "";
               data.monthly_day_value  = "";
            }
            if (data.period == 'monthly') {
               console.log($scope.monthly.type+"::"+$scope.data.monthly_option+"::"+$scope.data.monthly_week_value+$scope.monthly_day_value);
               data.repeat_every       = $scope.monthly.type;
               data.monthly_option     = $scope.data.monthly_option;
               data.monthly_week_value = $scope.data.monthly_week_value;
               data.monthly_day_value  = $scope.data.monthly_day_value;
            }
            if (data.period == 'yearly') {
               data.repeat_every = $scope.rec_days_value;
               data.monthly_option     = "";
               data.monthly_week_value = "";
               data.monthly_day_value  = "";
            }
            console.log(data);
            console.log($scope.rec_days_value);
            data.eventtype = 'multiple';
            if($stateParams.eventId !=='' && $stateParams.eventId !== undefined)
            {
             data.event_id = $stateParams.eventId; 
            }
            
            $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
            $scope.saveloader = false;
            console.log(response);
            if (response.code == 200) {
              $scope.success=global_message.event_step1;
              $scope.data.event_id = response.parent_id;
              $stateParams.eventId = response.parent_id;
              //$localStorage.eventId = response.parent_id
              $scope.eventId = response.parent_id;
              $stateParams.eventId = $scope.eventId;
              $location.path("/create_series_step2/"+$stateParams.eventId);
              //$scope.data={};
              $scope.error_message=false;
              $timeout(function() {
               $scope.success='';
               $scope.error_message=true;
              },3000);
              
            }
            
          });
         }
         else
         {
            $scope.error = "Please select venue to create event";
             $scope.error_message = false;
             $scope.multiple_endtime = "";
             $timeout(function() {
               $scope.error = '';
               $scope.error_message = true;
               $scope.data.period = '';
             }, 3000);  
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
  $scope.venue_info = function(venuedata,ctr) {

    $scope.data.venuename = venuedata.venue_name;
    $scope.data.place = venuedata.address;
    $scope.data.address = venuedata.address;
    $scope.data.city = venuedata.city;
    $scope.data.country = venuedata.country;
    $scope.data.latitude = venuedata.latitude;
    $scope.data.longitude = venuedata.longitude;
    $scope.data.longitude = venuedata.longitude;
    $scope.data.state = venuedata.state;
    $scope.data.zipcode = venuedata.zipcode;
    if (ctr == 2) {
      $scope.data.venueid        = venuedata.venue_id;
      $scope.data.selected_venue = venuedata.venue_id;
    }else {
      $scope.data.venueid        = venuedata.id;
      $scope.data.selected_venue = venuedata.id; 
    }
        
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
    showWeeks: false
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',

    minDate: new Date(),
    startingDay: 1
  };

   $scope.dateOptions3 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };
  $scope.dateOptions4 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
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
      var href = 'create_event_step1';
    }
    else{
      var href = 'javascript:void(0)';  
    }
    
   $scope.events = [{
      "name": "Single Event",
      'id': 1,
      'href': href
    }, {
      "name": "Multiple Event",
      'id': 2,
      'href':'javascript:void(0)'
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
  $scope.selected = $scope.events[1];
  
  if ($scope.total_venue != "") {
    $scope.selected1 = $scope.venues[0];
  }else{
    $scope.selected1 = $scope.venues[1];
  }
 
  
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
      if ($stateParams.eventId != null && $stateParams.eventId != "") {
         $location.path("/create_series_step1/"+$stateParams.eventId);
      }
      else{
          $location.path("/create_series_step1");
      }
     
    }

    ///TO move to price and level
    if (menu.id === 6) {

      if (objectForm.myForm.$valid === true) {
          if ($stateParams.eventId == null) {
              if (data.eventtype=='single') {
                if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                  data.eventdate=$scope.single_start_date;
                  
                  data.startevent_time=$scope.startevent_time;
                  data.endevent_time=$scope.endevent_time;
                  
                  data.userId=$localStorage.userId;
                  $serviceTest.saveEvent(data,function(response){
                    if (response.code == 200) {
                       $scope.success=global_message.event_step1;
                       //$localStorage.eventId=response.result;
                       $scope.eventId=response.result;
                       $scope.error_message=false;
                       $timeout(function() {
                         $scope.success='';
                         $scope.error_message=true;
                       },3000);
                        $location.path("/create_series_step2/"+$stateParams.eventId);
                    }
                  });

                }  
              } else {
                data.userId=$localStorage.userId;
                $scope.savedata(data);
                if ($scope.eventId != null) {
                  $location.path("/create_series_step2/"+$stateParams.eventId);
                }
                else{
                  console.log("Not locat event id");
                }
                
              }
             
          }
          else {
            
            $location.path("/create_series_step2/"+$stateParams.eventId);
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
        $location.path("/create_series_step3/"+$stateParams.eventId);
    }
    //Event Setting div
    if (menu.id === 8) {

      //if (objectForm.myForm.$valid === true) {
          $location.path("/create_series_step4/"+$stateParams.eventId);
     /* } else {
>>>>>>> upstream/master
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


  $scope.multiple_event_div = false;
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
 var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

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
    if($scope.between_date !== undefined){ 
    var i = 0;
    while (i < $scope.between_date.length) {
      $scope.data.starttimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_starttime)));

      i++;
    }
    }
    else{
       $scope.error = "Please select start and end date";
        $scope.error_message = false;
        $scope.multiple_starttime = "";
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = true;
          $scope.data.period = '';
        }, 3000);  
    }

  }


  //To multiple end date
  $scope.multipleend = function() {
    
   if($scope.between_date !== undefined){ 
    
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
   else{
       $scope.error = "Please select start and end date";
        $scope.error_message = false;
        $scope.multiple_endtime = "";
        $timeout(function() {

          $scope.error = '';
          $scope.error_message = true;
          $scope.data.period = '';
        }, 3000);  
    }

  }
});

function keypress(e){
  if(e.charCode===32){
    return false;
  }
  else{
    return true;
  }
}
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
