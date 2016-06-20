/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('allEventController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams) { 
    
    $rootScope.class_status=false;
    var eventService = $injector.get("events");
    
    if(window.innerWidth>767) { 
      $scope.navCollapsed = false;	  
    } else {
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };	  
    }

    //upcomming event list
    $scope.getAllEvent = function(allevent) {
      eventService.getAllEvent({ 'user_id' : $localStorage.userId , 'allevent' : allevent },function(response) {
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

    $scope.getAllEvent();

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
})
