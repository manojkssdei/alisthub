/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('eventhomeController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state) { 
    $rootScope.class_status=false;
    
   var eventService = $injector.get("events");
   
   eventService.getEventUser({'user_id':$localStorage.userId},function(response){
            
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =response.results;
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