/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('guestListController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$stateParams) { 
    
    $rootScope.class_status=false;
    var eventService = $injector.get("events");
    $scope.eventloader = false;
    if(window.innerWidth>767) { 
      $scope.navCollapsed = false;	  
    } else {
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };	  
    }
    console.log($stateParams);
    
    
    $scope.seller_id = $localStorage.userId;
    //upcomming event list
    $rootScope.getEvent = function() {
      $scope.eventloader = true;
      
      eventService.getEvent({ 'event_id' : $stateParams.eventId },function(response) {
        $scope.eventloader = false;
        if (response!=null) {
          if (response.code == 200) {
            console.log(response);
          }
        } 
      });
    }
    
  $scope.getEvent();
  
  if (!$localStorage.isuserloggedIn) {
    $state.go('login');
  }

});



/*
Code for product popup
*/
angular.module('alisthub').controller('ModalDateCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {
  $scope.items = items;
  $scope.data = {};
  $scope.eventProduct = {};

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
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
    minDate: new Date()
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    minDate: new Date("2016/01/01"),
    startingDay: 1,
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

  $scope.popup1 = {
    opened: false
  };
  
  $scope.popup2 = {
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

  if($rootScope.searchFromDate!=undefined) {
    console.log($rootScope.searchFromDate);
    $scope.searchFromDate = $rootScope.searchFromDate;
  }
  if($rootScope.searchToDate!=undefined) {
    $scope.searchToDate = $rootScope.searchToDate                                                                                                                                                 ;
  }

  $scope.searchDate = function(dateEvent,allevent) {
    $rootScope.searchFromDate = dateEvent.searchFromDate;
    $rootScope.searchToDate = dateEvent.searchToDate;
    $scope.cancel();
    $rootScope.getAllEvent();
  }

});