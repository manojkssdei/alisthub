/** 
Anguler Controller to manage look and feel 
Created : 2016-05-26
Created By: Deepak khokkar  
Module : Step 3 Event step  
*/

angular.module('alisthub').controller('step3Controller', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad) {
    $scope.templates=[
        {'image':'images/templates-1.jpg'},{'image':'images/templates-2.jpg'},{'image':'images/templates-1.jpg'},{'image':'images/templates-2.jpg'}
    ];
    
    $scope.module_div=true;
    $scope.preview_btn=function($index)
    {
        console.log($index);
    }
    
    $scope.select_btn=function($index)
    {
        console.log($index);
    }
});