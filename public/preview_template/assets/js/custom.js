var app = angular.module('alistApp', []);
app.controller('alistController', function($scope) {
 if(window.innerWidth>767){ 
 $scope.navCollapsed = false;	  
 }else{
$scope.navCollapsed = true;
 $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
        };	  
 }
});