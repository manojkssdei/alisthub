angular.module('alisthub').controller('createpackageController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad , $http,$stateParams) {
  //var $serviceTest = $injector.get("event_setting");
  var $serviceTest = $injector.get("event_package");

  $scope.success_message = false;
  $scope.error_message = false;
  

    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }


  $scope.click_menu = function(menu, data, valid) {
    console.log('$stateParams.packageId ' , $stateParams.packageId);
    console.log('menu.id ' , menu.id );
    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 1) {
      $location.path("/create_event_step1");
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 2) {
      console.log('------2----');
      if (objectForm.myForm.$valid === true) {
          $scope.selectedClass = 2;
          if($stateParams.packageId != null && $stateParams.packageId !=undefined && $stateParams.packageId !='') {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
          
      } else {
        $scope.selectedClass = 1;
        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }
    }

    if (menu.id === 3) {
            console.log('-----3----');

      $scope.selectedClass = 3;
          if($stateParams.packageId!=undefined && $stateParams.packageId!='' && $stateParams.packageId!= null) {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
    }
    //$scope.selected2 = menu;
  }
  

    //To get steps
  $scope.steps=[
     { "title":"DETAILS","icon":'fa fa-calendar','id':1},
     { "title":"PRICING","icon":'fa fa-tags','id':2},
     { "title":"OPTIONS","icon":'fa fa-cog','id':3},
   ];
   
  $scope.loader = false;

  $scope.selected2 = $scope.steps[2];
  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

  $scope.data = {};

  if($stateParams.packageId!=undefined && $stateParams.packageId!='') {
    $scope.data.package_id = $stateParams.packageId;
  } else {
    $scope.data.package_id = $localStorage.packageId;
  }

$scope.data.seller_id = $localStorage.userId;

 $scope.getAdvanceSetting = function() {
  console.log('calling getAdvanceSetting');
  console.log('$scope.data' ,  $scope.data);
   
            $serviceTest.getAdvanceSettingOfPackage($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.data = response.result[0];

                    console.log('$scope.data' , $scope.data);
                } else {
                    $scope.error_message = response.error;
                }

            });

        };
  $scope.getAdvanceSetting();

  $scope.saveAdvanceSettings = function() {


             console.log('------------- calling saveAdvanceSetting');

              

  if($stateParams.packageId!=undefined && $stateParams.packageId!='') {
    $scope.data.package_id = $stateParams.packageId;
  } else {
    $scope.data.package_id = $localStorage.packageId;
  }

$scope.data.seller_id = $localStorage.userId;

  console.log('$scope.data' ,  $scope.data);
            $serviceTest.saveAdvanceSettingsOfPackage($scope.data, function(response) {
                if (response.code == 200) {
                    $rootScope.success_message = true;
                    $rootScope.success = global_message.advanceSettingSaved;
                    $scope.data = response.result[0];
                } else {
                    $scope.error_message = true;
                    $scope.error =  global_message.advanceSettingSavingError;

                  $timeout(function() {
                    $scope.error_message = false;
                    $scope.error = '';
                  }, 3000);
                }

            });
  }











});