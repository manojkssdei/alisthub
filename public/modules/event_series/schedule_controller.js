
angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('schedule_controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad) {

  //If user is not logged in and then log him out.
  if (!$localStorage.isuserloggedIn) {
    $state.go('login');
  }
  $scope.loader = false;
  $scope.step1html = '';


$localStorage.eventId = null;

$scope.priceLevel=[];
        $ocLazyLoad.inject('alisthub').then(function() {
            $scope.step1html = global_message.step1html;
        }, function(e) {
            console.log(e);
        });
    // For bundle html

  $scope.bundlehtml = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.bundlehtml = global_message.bundlehtml;
  }, function(e) {
    console.log(e);
  });
  //for Price level html
  $scope.pricelevelhtml = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.pricelevelhtml = global_message.pricelevelhtml;
  }, function(e) {
    console.log(e);
  });
  //For step 2 html
  $scope.step2html = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.step2html = global_message.step2html;
  }, function(e) {
    console.log(e);
  });
  //for step3 html
  $scope.step3html = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.step3html = global_message.step3html;
  }, function(e) {
    console.log(e);
  });
  //For step4 html
  $scope.step4html = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.step4html = global_message.step4html;
  }, function(e) {
    console.log(e);
  });
  //For Step 1
  var $serviceTest = $injector.get("venues");
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


  //$localStorage.eventId = 1977; 
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
    },]

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
        $scope.error = "Please select Start and End date";
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

   //update price level
    $scope.getPrice=function(id){
        $rootScope.data1={};
        $serviceTest.getSinglePricelevel({'id':id},function(response){
            if (response.code==200) {
                $scope.open_price_level('lg');
                
                $rootScope.data1=response.results[0];
                if (!$rootScope.data1.description) {
                  $rootScope.data1.description = '';
                }
                $rootScope.maximum_quantitiy_available_value = parseInt($rootScope.data1.quantity_available) + parseInt($rootScope.inventory_remaining);
                // console.log("line 503 max quantity value - ", $rootScope.maximum_quantitiy_available_value)
            }
        }); 
    }
    

    // To get Price level.
    $scope.availQuantity=0;
    $scope.totalRemainings=0;
    $scope.totalRemainingsError = false;
    $rootScope.eventInventoryCalc=function()
    {
      // console.log("ineventpricecalc")
      $scope.availQuantity=0;
      $scope.totalRemainings=0;

      
    }

    
    // // To get Price level.
    // $serviceTest.getPricelevel({'eventId':$eventId},function(response){
    //   $rootScope.price_level=response.results;
    // });
    
    /** 
    Method: savedata
    Description:Function for save the data of recurring event 
    Created : 2016-04-25
    Created By:  Deepak khokkar  
    */

    $scope.savedata=function(data) {
       
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


  $rootScope.starttime = '';
  $rootScope.endtime = '';
  $scope.data = {};
  $scope.locations = [];
  $scope.locations[0] = [];
  // To show google map
  
 
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


  ///////////////////////////////steps event///////////////

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
  $scope.onReady = function() {
    $scope.hello();
  };
  $scope.hello = function() {

  }
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

  //To show custom age div

  $scope.custom_age = function() {
    $scope.age_div = $scope.age_text_div = true;
    $scope.dynamic_age_div = $scope.return_age_text_div = false;
    $scope.data1.ages = '';
  }

    
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