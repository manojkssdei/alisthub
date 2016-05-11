angular.module('alisthub').controller('accountinfoController', function($scope,$localStorage,$injector,$http,$state,$location,$timeout) {

    var $serviceTest = $injector.get("profile");
    console.log($localStorage);
    $scope.basictab   = false;
    $scope.producttab = false;
    $scope.discounttab = false;
    $scope.questiontab = false;
    $scope.socialtab = false;
    
    $scope.basictabclass     = "fa-caret-down";
    $scope.producttabclass   = "fa-caret-down";
    $scope.discounttabclass  = "fa-caret-down";
    $scope.questiontabclass  = "fa-caret-down";
    $scope.socialtabclass    = "fa-caret-down";

    $scope.success_message=false;
    $scope.success="";
    $scope.data = {};

    $scope.openTab = function(id)
    {
        if (id == 1) {
            $scope.basictab     = true;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            
            // class
            $scope.basictabclass     = "fa-caret-up";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 2) {
            $scope.basictab     = false;
            $scope.producttab   = true;
            $scope.discounttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-up";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 3) {
            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.discounttab  = true;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-up";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 4) {
            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab  = true;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-up";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 5) {
            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab  = false;
            $scope.socialtab  = true;
            
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-up";
        }
        
    }
    
    $scope.updateUser = function(data) {
    
        if ($localStorage.userId!=undefined) {
            $scope.data.user_id   = $localStorage.userId;
            $serviceTest.updateUser($scope.data,function(response){
                //console.log(response);
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success="User information updated successfully.";
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };
    $scope.data ={"email":"manojks@smartdatainc.net"};
    $scope.updateEmail = function() {
    
        if ($localStorage.userId!=undefined) {
            //$scope.data.user_id   = $localStorage.userId;
            console.log($scope.data);
            console.log(webservices.updateEmail);

            $http({
            url: webservices.updateEmail,
            method: 'POST',
            data: $scope.data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "application/json",
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
            });
            /*return false;
            $serviceTest.updateEmail($scope.data,function(response){
                console.log(response);
                return false;
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success="User Email updated successfully.";
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
            });*/
        }
    };

    $scope.updatePassword = function(data) {
    
        if ($localStorage.userId!=undefined) {
            $scope.data.user_id   = $localStorage.userId;
            $serviceTest.updatePassword($scope.data,function(response){
                console.log(response);
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success="Password updated successfully.";
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };

    $scope.updateSocial = function(data) {
        //console.log($scope.data); return false;
        if ($localStorage.userId!=undefined && $scope.data!=undefined) {
            $scope.data.user_id   = $localStorage.userId;
            $serviceTest.updateSocial($scope.data,function(response){
                console.log(response);
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success="Information updated successfully.";
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };

    $scope.getData = function() {
        if ($localStorage.userId!=undefined) {
            $scope.data.userId      = $localStorage.userId;
            //$scope.loader = true;
            $serviceTest.getData($scope.data,function(response){
                console.log(response);
                $scope.loader = false;
                if (response.code == 200) {
                   $scope.data = response.result[0];
                   console.log($scope.data.first_name);
                } else {
                   $scope.error_message = response.error;
                }
            });
        }
    };

    $scope.getData();

});


