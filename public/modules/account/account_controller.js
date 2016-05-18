angular.module('alisthub')
.controller('accountController', function($scope,$localStorage,$injector,$http,$state,$location,$sce) {
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   } 
  var $serviceTest = $injector.get("account");
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }

 
  $scope.user = {};
  $scope.user.country = "US";
  $scope.enableState = true;
  $scope.error_message = false;
  $scope.success_message = false; 

/* View state field when country is US and disble in all other country cases*/
  $scope.showState = function()
  {
    if ($scope.user.country != "US") {
      $scope.enableState = false;
    }
    else{
      $scope.enableState = true;
    }
  }

/* Fetch the existing financial details of seller*/
  if ($localStorage.userId!=undefined) {
        $scope.user.userId      = $localStorage.userId;
        $serviceTest.getFinancialDetails($scope.user,function(response){
            if (response.code == 200) {
                   $scope.user = response.result[0];
                  }
        });
        
  }
  
/* Check mandatory fields */
  $scope.checkMandatoryFields = function(mandatoryFields) {
          var errorExist = 0;
          var errorList = [];
          for(var key in mandatoryFields) { 
           if(!$scope.user[key] || $scope.user[key] == undefined || $scope.user[key] == "" || $scope.user[key] == "NULL"){
              errorExist = 1;
              errorList.push('Enter '+key);
            }
          }
          if(errorExist) {
            return errorList;
          }
  }

/*Save financial details of seller*/
  $scope.addFinancialDetails = function() {
        if ($localStorage.userId!=undefined) {
        $scope.user.seller_id   = $localStorage.userId;
        $serviceTest.addFinancialDetails($scope.user,function(response){
            if (response.code == 200) {
                 $scope.success_message = true;
                 $scope.success = 'Financial information saved successfully';
                  }else{
                 $scope.error_message = true;
                 $scope.error = response.error;
            }
            
        });
        }
  };

/* Submit form data*/
  $scope.submitFinancialDetails = function()
  {
    var mandatoryFields = { 
                        'first_name':'Enter First Name' ,
                        'last_name':'Enter Last Name' ,
                        'email':'Enter Email' ,
                        'cheque_name':'Enter Name For Cheque' ,
                        'address':'Enter address' ,
                        'country':'Select a Country' ,
                        };

    var errorMsg =  $scope.checkMandatoryFields( mandatoryFields );
    if(!errorMsg) {
        $scope.addFinancialDetails();
    }
    else{
       $scope.error_message = true;
       $scope.error = 'Enter all required fields.';
       /*for(var index in errorMsg) { 
       $scope.error+=errorMsg[index];
       }*/
    }
  }


})