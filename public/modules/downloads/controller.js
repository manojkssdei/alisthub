angular.module('alisthub').controller('downloadController', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location) {
    /*Open the different tabs of event setting page as per request */


  
  

    $scope.id1 = false;
    $scope.id2 = false;
    $scope.id3=false;
      $scope.id4=false;
    $scope.openTab1 = function()
     {
        var ele = angular.element(document.querySelector("#div1"));
        if($scope.id1 === false){
            ele.removeClass('ng-hide');
            $scope.id1 = true;
        }
        else if($scope.id1 === true){
            ele.addClass('ng-hide');
            $scope.id1 = false;
        }
    }

     $scope.openTab2 = function()
      {
        var ele = angular.element(document.querySelector("#div2"));
        if($scope.id2 === false){
            ele.removeClass('ng-hide');
            $scope.id2 = true;
        }
        else if($scope.id2 === true){
            ele.addClass('ng-hide');
            $scope.id2 = false;
        }
    }

     $scope.openTab3 = function() 
     {
        var ele = angular.element(document.querySelector("#div3"));
        if($scope.id3 === false){
            ele.removeClass('ng-hide');
            $scope.id3 = true;
        }
        else if($scope.id3 === true){
            ele.addClass('ng-hide');
            $scope.id3 = false;
        }
    } 

    $scope.openTab4 = function() 
    {
        var ele = angular.element(document.querySelector("#div4"));
        if($scope.id4 === false){
            ele.removeClass('ng-hide');
            $scope.id4 = true;
        }
        else if($scope.id4 === true){
            ele.addClass('ng-hide');
            $scope.id4 = false;
        }
    }


});
