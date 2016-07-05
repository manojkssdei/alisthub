/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('allEventController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$stateParams) { 
    
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
    $rootScope.getAllEvent = function(allevent) {
      $scope.eventloader = true;
      if(allevent==undefined){
        allevent = $rootScope.allevent;
      }
      var dateRange = {};
 
      if($rootScope.searchFromDate!=undefined){
        dateRange.searchFromDate = $rootScope.searchFromDate;
      }
      if($rootScope.searchToDate!=undefined) {
        dateRange.searchToDate = $rootScope.searchToDate;
      }
      
      eventService.getAllEvent({ 'user_id' : $localStorage.userId , 'allevent' : allevent, 'dateRange': dateRange },function(response) {
        $scope.eventloader = false;
        if (response!=null) {
          if (response.code == 200) {
            $scope.upcoming_event_data = $scope.event_package_data =response.results;
            $scope.tableParams = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 50,           // count per page
                                    sorting: {name:'asc'},
                                  },{
                                    data:$scope.upcoming_event_data
                                  });
          }
        } else {
          $scope.upcoming_event_data = [];   
        }
      });
    }
    
    

    if ($stateParams.type) {
	$scope.allevent = {};
	$scope.getAllEvent({eventType:$stateParams.type});
	$scope.allevent.eventType = $stateParams.type;
    }
    else{
	$scope.getAllEvent();
    }
    
    
    $scope.recurringHref = function(eventId,recurringOrNot) {
      console.log(eventId+"__"+recurringOrNot); //return false;
      if(recurringOrNot==0){
        $location.path("/create_event_step1/" + eventId);  
      } else {
        $location.path("/create_series_step1/" + eventId);
      }
    }


$scope.viewHref = function(eventId,recurringOrNot) {
      if(recurringOrNot==0){
        $location.path("/view_event/" + eventId);  
      } else {
        $location.path("/view_series/" + eventId);
      }
    }

    $scope.delEvent=function(event_id) {
      eventService.deleteEvent({'event_id':event_id},function(response) {
        if(response.code==200) {
          $scope.getAllEvent();
    	  }
      });
    }
 
    if (!$localStorage.isuserloggedIn) {
      $state.go('login');
    }

    $scope.animationsEnabled = true;

    //Add Product pop up
    $scope.add_product = function(size,alleventData) {
      $rootScope.allevent = alleventData;
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContentDate.html',
        controller: 'ModalDateCtrl',
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