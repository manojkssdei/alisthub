angular.module('alisthub').controller('downloadController', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location)
 {
    

/*Open the different tabs of event setting page as per request */
$scope.id1=1;
$scope.id2=1;

  $scope.openTab1 = function(id) {
        if (id == 1) {
        	 $scope.id1=2;
        	 $scope.windowTab=true;
        	  // $scope.windowTab=false;
        	 $scope.windowTab = "fa-caret-up";
        	  // $scope.windowTab = "fa-caret-down";



		}
}
});