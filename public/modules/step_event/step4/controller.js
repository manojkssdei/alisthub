/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event setting  
*/

angular.module('alisthub').controller('stepevent4Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad) {
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
});