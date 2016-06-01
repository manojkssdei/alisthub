/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('eventhomeController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams) { 
    $rootScope.class_status=false;
    
   var eventService = $injector.get("events");
   
   eventService.getEventUser({'user_id':$localStorage.userId},function(response){
            
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =response.results;
             $scope.tableParams = new ngTableParams(
                            {
                                    page: 1,            // show first page
                                    count: 50,           // count per page
                                    sorting: {name:'asc'},
                                    
                            },
                            {
                                    data:$scope.upcoming_event_data
                            });
             $scope.tableParams1 = new ngTableParams(
                            {
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: {name:'asc'},
                                    
                            },
                            {
                                    data1:$scope.past_event_data
                            });
            $scope.tableParams2 = new ngTableParams(
                            {
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: {name:'asc'},
                                    
                            },
                            {
                                    data2:$scope.event_package_data
                            });
            }

            }else{
             $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =[];   
            }
            
        });
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 
   if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
})
