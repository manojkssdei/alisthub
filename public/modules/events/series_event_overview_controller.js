angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('seriesEventOverviewController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
    $rootScope.class_status = false;
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    
    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }


   // var $eventService = $injector.get("events");
    var $venueService = $injector.get("venues");
    var $questionService = $injector.get("questions");
    var $discountService = $injector.get("discounts");
    var $lookAndFeelService = $injector.get("Lookservice");
    var $eventSettingService = $injector.get("event_setting");

    
    $scope.data = {};
    $rootScope.data = {};
    $scope.error_message = true;
    var userId =  $localStorage.userId;
    var eventId = $stateParams.eventId;

    $scope.userId = userId;
    $scope.eventId = eventId;

    $scope.data.user_id = userId;
    $scope.data.event_id = eventId;


    $scope.data.sales_pause_status = 'Pause Sales';
    $scope.data.favorite_status = 'Add To Favorite';
    $rootScope.sales_status = 'live';

    
    console.log('eventId ' , eventId) ;




$scope.hours_am_pm = function(time) {
    var hours = time[0] + time[1];
    var min = time[2] + time[3];
    if (hours < 12) {
      return hours + ':' + min + ' AM';
    } else {
      hours=hours - 12;
      hours=(hours.length < 10) ? '0'+hours:hours;
      return hours+ ':' + min + ' PM';
    }
  }

  $scope.getDateTime = function(openDate) {
    var date1 = new Date(openDate);
    
    if(date1!="Invalid Date" && openDate!=null) {
      console.log(openDate);
      var date = ('0' + (date1.getUTCDate())).slice(-2);
      var year = date1.getUTCFullYear();
      var month = ('0' + (date1.getUTCMonth()+1)).slice(-2);
      
      var hours = ('0' + (date1.getUTCHours())).slice(-2);
      var minutes = ('0' + (date1.getUTCMinutes())).slice(-2);
      var seconds = date1.getUTCSeconds();

      var convertedDate = {};
      convertedDate.date = new Date(year+"-"+month+"-"+date);

      convertedDate.time = $scope.hours_am_pm(hours+""+minutes);
      return convertedDate ;  
    } else {
      var convertedDate = {};
      convertedDate.date = null;
      convertedDate.time = null;
      return convertedDate ;
    }
  };

$scope.getFormattedDate = function(today1) {
    console.log('today1' , today1 );
    var today = new Date(today1);
    console.log('today' , today );
    var weekdayFullNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var weekdayShortNames = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    var monthsFullName = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' ,'October' , 'November' , 'December');
    var monthsShortName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' , 'Sep' ,'Oct' , 'Nov' , 'Dec');
    var shortDay  = weekdayShortNames[today.getDay()];
    var fullDay  = weekdayFullNames[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var mon   = monthsShortName[today.getMonth()];
    var month   = monthsFullName[today.getMonth()];
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return shortDay+'.  '+mon+' '+dd+', '+yyyy+'  at '+hour+':'+minu;
// Fri. Jul 1, 2016 at 12:00pm 
}




    //Default Event
    if (!$stateParams.eventId) {
      var href = 'create_event_step1';
    }
    else{
      var href = 'create_series_step1'; 
    }
    

  $scope.events = [{
      "name": "Single Event",
      'id': 1,
      'href':href
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
  $scope.selected = $scope.events[1];
  
  if ($scope.total_venue != "") {
    $scope.selected1 = $scope.venues[0];
  }else{
    $scope.selected1 = $scope.venues[1];
  }
 
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
        
    /*var bounds = new google.maps.LatLngBounds();
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


    */
  }



 $scope.saveQuestionLocation = function(data ,id ) {
  console.log('saveQuestionLocation');
   console.log('id' , id);
    console.log('data' , data);

    $scope.questionLocationData = {};
    $scope.questionLocationData.id = id;
    $scope.questionLocationData.view_question_location =  parseInt(data[id]);
    console.log('$scope.questionLocationData ' , $scope.questionLocationData) ;


     $questionService.saveQuestionLocationPosition($scope.questionLocationData, function(response) {
            if (response.code == 200) {
              
            console.log('data saved');

            } else {
                $scope.error_message = response.error;
            }

        });
         
        }


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


    //service created to get event detail

     $venueService.getSeriesEvent({ 'event_id': eventId }, function(response) {
 //console.log(response.results[0]);
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

         $scope.data.eventinventory=response.results[0].inventory;

         $scope.data.selected_venue = response.results[0].venue_id;
         console.log($scope.data.selected_venue);
         console.log("===========================");
         $scope.venue_info($scope.data,2);
         console.log($scope.data.selected_venue);
         console.log("===========================");
         
         
        ///////////////////////// Venue Info  /////////////////////////////




 $rootScope.sales_status = 'live';
       
        if(response.results[0].pause_sales  == 1) {
            $scope.data.sales_pause_status = 'Sales Paused';
        }
        else {
            $scope.data.sales_pause_status = 'Pause Sales';
            }


            if(response.results[0].favorite_event  == 1) {
            $scope.data.favorite_status = 'Added as Favorite';
        }
        else {
            $scope.data.favorite_status = 'Add To Favorite';
            }


        
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





      console.log('---------------------------------------------------------------------------------------');
console.log( $scope.data); 
       

      });






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





    // To get Price level.
    $scope.availQuantity=0;
    $scope.totalRemainings=0;
    $scope.totalRemainingsError = false;
    $scope.eventInventoryCalc=function()
    {
      // console.log("ineventpricecalc")
      $scope.availQuantity=0;
      $scope.totalRemainings=0;

      $venueService.getPricelevel({'eventId':$scope.eventId},function(response){
        $scope.price_level=response.results;

        $scope.priceLevel=response.results;
        var pricelevelData=$scope.priceLevel;
        var pricelevelDataLength = pricelevelData.length;
        // console.log("pricelevelDataLength" , pricelevelDataLength , pricelevelData)
        for( var i=0 ; i < pricelevelDataLength ; i++ )
        {
          $scope.availQuantity=$scope.availQuantity+pricelevelData[i].quantity_available;
          // console.log($scope.availQuantity)
        }

        if ($scope.data.eventinventory) {
            // console.log("in if")
            $scope.inventoryTextVal=$scope.data.eventinventory;
            // console.log($scope.inventoryTextVal , parseInt($scope.inventoryTextVal) , $scope.availQuantity , parseInt($scope.availQuantity))
            $scope.totalRemainings=  parseInt($scope.inventoryTextVal) - parseInt($scope.availQuantity);

            if ($scope.totalRemainings < 0) {
                $scope.totalRemainingsError = true;
                $scope.totalRemainings = "Error";
            }

            $scope.eventinventory= $scope.inventoryTextVal;

            $scope.inventory_remaining = $scope.totalRemainings;
        }
      });
    }


    $scope.eventInventoryCalc();




$scope.delEventSeries = function(event_id) {
    console.log('delEvent called' , event_id);

  $venueService.delEventSeries({'event_id':event_id},function(response) {
    if(response.code==200) {
      $location.path("/view_all_event");
    }
  }); 
}


$scope.pauseSalesSeries = function(event_id) {
    console.log('pauseSales called' , event_id);
  $venueService.pauseSalesSeries({'event_id':event_id},function(response) {
    if(response.code==200) {
        $rootScope.sales_status = 'offline';
     // $location.path("/view_all_event);
     $scope.sales_pause_status = 'Sales Paused' ;
    }
  }); 
}

$scope.addFavouriteEventSeries = function(event_id) {
    console.log('addFavouriteEvent called' , event_id);
  $venueService.addFavouriteEventSeries({'event_id':event_id},function(response) {
    if(response.code==200) {
        $scope.favorite_status = 'Added as Favorite' ;
    }
  }); 
}

 $questionService.getQuestionsOfEvent({ 'userId': userId , 'eventId' : eventId  }, function(response) {
       

        var ques = [];
        for (var key in response.result ) {
          var id = response.result[key].id;
          var view_question_location = response.result[key].view_question_location;
          var obj = {};
           obj[id] = view_question_location;

          ques.push(obj);
          response.result[key].locDetails = obj;
        }

        console.log('ques ' , ques);
         console.log('response.result ---------  ' , response.result) ;

        $scope.getQuestions = response.result;

       $scope.tableParamsQuestions = new ngTableParams(
        {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {id:'asc'},
                    
            },
            {
                   // data:$scope.get_price_level
                    data:$scope.getQuestions
        }); 

        

    });  


    $discountService.getDiscountsOfEvent({ 'userId': userId , 'eventId' : eventId }, function(response) {
        console.log('response.result ' , response.result) ;
        $scope.getDiscounts = response.result;

       $scope.tableParamsDiscounts = new ngTableParams(
        {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {id:'asc'},
                    
            },
            {
                    data:$scope.getDiscounts
        }); 
    }); 

     $discountService.getCountDiscountsOfEvent({ 'userId': userId , 'eventId' : eventId }, function(response) {
       
        $scope.getCountDiscountsOfEvent = response.result[0].count;
         console.log('response.result[0].count ' , response.result[0].count ) ;
         console.log('$scope.getCountDiscountsOfEvent ' , $scope.getCountDiscountsOfEvent);
    }); 


   $venueService.getEmailReportSeries({ 'user_id': userId , 'eventId' : eventId }, function(response) {
       
        $rootScope.EmailReportsListSeries = response.result;
         console.log('  $rootScope.EmailReportsListSeries  ' , $rootScope.EmailReportsListSeries  ) ;
    }); 



 //Add email Report pop up

  $scope.items = {};
  if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
    $scope.items.eventId = $stateParams.eventId;
  } 

  $scope.animationsEnabled = true;
  $scope.add_emailReportSeries = function(size,  emailReportId) {
    $rootScope.emailReportId = emailReportId;
    console.log('emailReportId' , emailReportId , '$rootScope.emailReportId ' ,$rootScope.emailReportId );

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalEmailReport.html',
      controller: 'ModalInstanceEmailReportSeriesCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };


 $scope.delete_emailReportSeries = function(size,  emailReportId) {
    $rootScope.deleteEmailReportId = emailReportId;
    console.log('deleteEmailReportId' , emailReportId , '$rootScope.deleteEmailReportId ' ,$rootScope.deleteEmailReportId );

    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalEmailReport.html',
      controller: 'ModalInstanceEmailReportSeriesCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };





  $scope.assignTemplateAnimationsEnabled = true;
  $scope.assignTemplate = function(size,  emailReportId) {
    var modalInstance = $uibModal.open({
      animation: $scope.assignTemplateAnimationsEnabled,
      templateUrl: 'myModalAssignTemplate.html',
      controller: 'ModalInstanceAssignTemplateCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };










});



/*
Code for product popup
*/
angular.module('alisthub').controller('ModalInstanceEmailReportSeriesCtrl', function($scope, $uibModalInstance, $rootScope, $localStorage, $injector, $timeout,items) {
  
  $scope.report = {};

 // var eventId = $stateParams.eventId;
  //  $scope.eventId = eventId;

$scope.hours = hours;
$scope.minutes = minutes;
$scope.seconds = seconds;

  var $serviceTest = $injector.get("venues");
  
  $scope.items = items;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


if($rootScope.deleteEmailReportId != undefined) {
    console.log('getEmailReportById');

        $scope.report.id = $rootScope.deleteEmailReportId ;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        $scope.loader = true;
        $serviceTest.deleteEmailReportByIdSeries($scope.report, function(response) {
            $scope.loader = false;
            if (response.code == 200) {
              
            $serviceTest.getEmailReportSeries({ 'user_id': $scope.report.user_id  , 'eventId' : $scope.report.eventId }, function(response) {
            $rootScope.EmailReportsListSeries = response.result;
            console.log('EmailReportsListSeries ' , $rootScope.EmailReportsListSeries ) ;
            }); 
            $scope.cancel();

            } else {
                $scope.error_message = response.error;
            }

        });


        }



        if($rootScope.emailReportId != undefined) {
    console.log('getEmailReportById');

        $scope.report.id = $rootScope.emailReportId ;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        $scope.loader = true;
        $serviceTest.getEmailReportByIdSeries($scope.report, function(response) {
            $scope.loader = false;
            if (response.code == 200) {
               $scope.report = response.result[0];
               var time = $scope.report.send_time ;
               var timeArray = time.split(':');

                $scope.report.send_time = {};

                $scope.report.send_time.hours =  timeArray[0];
                $scope.report.send_time.minutes=  timeArray[1];
                $scope.report.send_time.seconds =  timeArray[2];

if(timeArray[0].substring(0,1) == 0 ) { $scope.report.send_time.hours  = timeArray[0].substring(1,2); }
if(timeArray[1].substring(0,1) == 0 ) { $scope.report.send_time.minutes  = timeArray[1].substring(1,2); }
if(timeArray[2].substring(0,1) == 0 ) { $scope.report.send_time.seconds  = timeArray[2].substring(1,2); }

            } else {
                $scope.error_message = response.error;
            }

        });


        }




$scope.addEmailReportSeries =  function (report) {

    console.log('in add email report ' , report);

    if ($localStorage.userId != undefined) {
        $scope.report = report;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        var hh = $scope.report.send_time.hours;
        var mm = $scope.report.send_time.minutes;
        var ss = $scope.report.send_time.seconds;

        if(hh.length == 1 ) { hh = '0'+hh;}
        if(mm.length == 1 ) { mm = '0'+mm;}
        if(ss.length == 1 ) { ss = '0'+ss;}

        $scope.report.send_time.hours =  hh;
        $scope.report.send_time.minutes=  mm;
        $scope.report.send_time.seconds =  ss;

        $scope.report.send_time = hh+":"+mm+":"+ss ;
        
        console.log('$scope.report');
        console.log($scope.report);

        $scope.loader = true;
        $serviceTest.addEmailReportSeries($scope.report, function(response) {
            console.log('response', response);
            $scope.loader = false;
            if (response.code == 200) {
      
                $scope.successEmailReport = global_message.saveEmailReport;
                $scope.success_message_email_report = true;
                $timeout(function() {
                  $scope.successEmailReport = '';
                  $scope.success_message_email_report = false;
                }, 3000);

                 $serviceTest.getEmailReportSeries({ 'user_id': $scope.report.user_id  , 'eventId' : $scope.report.eventId }, function(response) {
         $rootScope.EmailReportsListSeries = response.result;
         console.log('EmailReportsListSeries ' , $rootScope.EmailReportsListSeries ) ;
    }); 
$scope.cancel();
            } else {
                $scope.error_message = response.error;
            }

        });

    }

}

 
 
 $scope.edit_emailReportSeries =  function (report) {

console.log('edit_emailReportSeries ' , report );

}



});



angular.module('alisthub').controller('ModalInstanceAssignTemplateCtrl', function($scope, $uibModalInstance, $rootScope, $localStorage, $injector, $timeout,items) {
  
  $scope.templateData = {};

 // var eventId = $stateParams.eventId;
  //  $scope.eventId = eventId;
console.log('hours ' , hours );




  var $lookAndFeelService = $injector.get("Lookservice");

  $scope.items = items;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };





if( $scope.items.eventId != undefined) {
    console.log('getEmailReportByIdSeries');
        //$scope.template.eventId = $scope.items.eventId;
        $lookAndFeelService.getlookAndFeel( {} , function(response) {
            if (response!=null && response.code == 200) {
                $scope.templates=response.result;
                console.log('$rootScope.template_id ' , $rootScope.template_id );
                $scope.choosen_template_id = $scope.templateData.template_id  = $rootScope.template_id; 
            }
            else{
                $scope.templates=[];   
            }

        });
}



$scope.assignEmailTemplateSeries =  function (templateData) {

    console.log('in assignEmailTemplateSeries ' , templateData);

        $scope.templateData.template_id = templateData.template_id;
        $scope.templateData.eventId = $scope.items.eventId;

        console.log(' $scope.templateData ' ,  $scope.templateData);

           $lookAndFeelService.assignEmailTemplateSeries($scope.templateData, function(response) {
           
            if (response.code == 200) {
      
                /*
                $scope.successEmailReport = global_message.saveEmailReport;
                $scope.success_message_email_report = true;
                $timeout(function() {
                  $scope.successEmailReport = '';
                  $scope.success_message_email_report = false;
                }, 3000);

                */

                 $lookAndFeelService.getEmailTemplateOfEventSeries({ 'eventId' :  $scope.items.eventId }, function(response) {
                        $rootScope.template_name = response.results[0].template_name;
                        $rootScope.template_id = response.results[0].template_id;

                 }); 
                $scope.cancel();
            } else {
                $scope.error_message = response.error;
            }

        });



}

 

});

