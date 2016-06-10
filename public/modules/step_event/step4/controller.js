/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event setting  
*/

angular.module('alisthub').controller('stepevent4Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad , $http) {
var $serviceTest = $injector.get("event_setting");
$scope.error_message = true;
  $scope.click_menu = function(menu, data, valid) {

    if (menu.id === 5) {
     $location.path("/create_event_step1/"+$localStorage.eventId);
    }

    ///TO move to price and level
    if (menu.id === 6) {

            
            $location.path("/create_event_step2/"+$localStorage.eventId);
     
    }

    //look and feel div
    if (menu.id === 7) {
        $location.path("/create_event_step3/"+$localStorage.eventId);
     }
    //Event Setting div
    if (menu.id === 8) {
      $location.path("/create_event_step4/"+$localStorage.eventId);
    }
    $scope.selected2 = menu;
  }

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
   $scope.selected2 = $scope.steps[3];
   $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

// Datepicker stuff



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
// Datepicker end

//timepicker
  // $scope.mytime = new Date();
// timepicker end

$scope.formdata = {};
$scope.enable_on = {};
$scope.disable_on = {};

$scope.next_func = function(formdata){
  console.log(formdata);
  $http.post('/event/postCreateEventStepFour' , formdata).then(function(response) {
    console.log("Response", response)
  })
}



});