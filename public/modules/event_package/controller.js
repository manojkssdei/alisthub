
angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('createpackageController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location) { 
   //For Step 1
     $scope.data = {};
    var $serviceTest = $injector.get("event_package");
    $scope.select_delect_event=$scope.monthly_div=$scope.days_div=$scope.error_message=$scope.error_time_message=true;
  //////////////////////////////////////////////////////
   $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data = [
            {id:4110591, event:'The Lion King',desc:'Minskoff theatre (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'10',inventory:'900'},
            {id:4110592, event:'The Lion King2',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'20',inventory:'500'},
            {id:4110593, event:'The Lion King3',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'30',inventory:'600'}
        ];
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }
  ///////////////////////////////////////////////////////////
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
   $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
   $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
    $scope.popup3 = {
    opened: false
  };
    $scope.popup4 = {
    opened: false
  };
  

  $scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
  // Called when the editor is completely ready.
 // Called when the editor is completely ready.
  $scope.onReady = function() {
  
  };
 
  // $scope.options = {
  //   customClass: getDayClass,
  //   minDate: new Date(),
  //   showWeeks: false
  // };

  // $scope.options1 = {
  //   customClass: getDayClass,
  //   initDate: current,
  //   showWeeks: true
  // };
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

////////////////////////////
  $scope.location_event_div=$scope.price_and_link_div=$scope.setting_div=$scope.dynamic_age_div=$scope.return_age_text_div=true;
  $scope.custom_age=function(){
     $scope.age_div=$scope.age_text_div=true; 
     $scope.dynamic_age_div=$scope.return_age_text_div=false;
     $scope.data1.ages='';
  }
////////////////
  $scope.custom_default_age=function(){
     $scope.age_div=$scope.age_text_div=false; 
     $scope.dynamic_age_div=$scope.return_age_text_div=true;
     $scope.data1.dynamic_age='';
  }
//////////////////////////////
  $scope.ages = [
  { "name": "All Ages",'id':0},
  {"name": "18 and  over",'id':18},
  {"name": "19 and over",'id':19},
  {"name": "21 and over",'id':21},
  ]
///////////////////////////////  
  $scope.events = [
 
    {"name": "Multiple Event",'id':1}
  ]
 //////////////////////////////////// 
  $scope.venues = [
    { "name": "Add New Venue",'id':3},
    {"name": "Use Past Location",'id':4}
  ]
 ////////////////////////////////////// 
  $scope.steps=[
     { "title":"DETAILS","icon":'fa fa-calendar','id':5},
     { "title":"PRICING","icon":'fa fa-tags','id':6},
     { "title":"OPTIONS","icon":'fa fa-cog','id':8},
   ];
  /////////////////////   
  $scope.selected=$scope.events[0];
  $scope.selected1=$scope.venues[0];
  $scope.selected2=$scope.steps[0];
   

  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
  $scope.click_menu=function(menu) {

    if (menu.id==5) {
      $scope.eventdetail_div=false;
      $scope.price_and_link_div=$scope.setting_div=true;
    }

    if (menu.id==6) {
      $scope.eventdetail_div=$scope.setting_div=true;
      $scope.price_and_link_div=false;
    }

     if (menu.id==8) {
      $scope.eventdetail_div=$scope.price_and_link_div=true;
      $scope.setting_div=false;
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
    
     $scope.data.eventtype='multiple';
     $scope.multiple_event_div=false;
     $scope.single_event_div=true;      
    
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
  $scope.add_bundle = function (size) {
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

  
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

 
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
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
return startDateTime;
}


  $scope.stepOne = function() {
    console.log('stepOne data' , $scope.data);
    console.log('$localStorage.userId' , $localStorage.userId);

            //$scope.loader = false;
           if ($localStorage.userId != undefined) {

if($scope.data.online_sales_open_date && $scope.data.online_sales_open_time) {
  $scope.data.online_sales_open_date_time = $scope.combine($scope.data.online_sales_open_date , $scope.data.online_sales_open_time);
}
    
if($scope.data.online_sales_close_date && $scope.data.online_sales_close_time) {
  $scope.data.online_sales_close_date_time = $scope.combine($scope.data.online_sales_close_date , $scope.data.online_sales_close_time);
}
            
                $scope.data.user_id=$localStorage.userId;
                //$scope.loader = true;
                $serviceTest.stepOneEventPackage($scope.data, function(response) {
                  console.log('response' , response);
                    //$scope.loader = false;
                    if (response.code == 200) {
                        //$scope.data = response.result[0];
                    } else {
                        //$scope.error_message = response.error;
                    }

                });

            }

  }

});


