/** 
Angular Controller for SignUp ,Login, Forget Password ,Email Confirmation 
Created : 2016-05-17
Created By: Deepak Khokkar
Module : SignUp ,Login, Forget Password Module ,Email Confirmation 
*/
angular.module('alisthub').controller('loginController', function($http, $location, $timeout, $scope, $ocLazyLoad, $rootScope, $state, $timeout, $localStorage) {

    if ($localStorage.isuserloggedIn) {
        $rootScope.class_status = 0;
        $state.go('dashboard');
    }
    $rootScope.class_status = 1;

    $scope.activation_message = false;
    //$rootScope.SignupSuccessMessage = false;
    $rootScope.signup_success_message = true;
    if ($rootScope.SignupSuccessMessage) {
        $rootScope.signup_success_message = false;
    }
    $scope.user = {};

    /*  
    Created By: Deepak Khokkar
    Module : Email Confirmation - signup process
    */
    if ($state.params.id) {
        
        var serviceUrl = webservices.confirmationEmail;
        $scope.user.token = $state.params.id;
        var jsonData = $scope.user;
        $http({
            url: serviceUrl,
            method: 'POST',
            data: jsonData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
            }
        }).success(function(data, status, headers, config) {

            if (data == 200) {
                $scope.activation_message = global_message.ActivatedMessage;
            } else {
                $scope.activation_message = global_message.ErrorInActivation;
            }
        });
    }


    $scope.error_message = true;
             
    /*  
    Created By: Deepak Khokkar
    Module : User Login
    */
    $scope.submitForm = function() {
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            var serviceUrl = webservices.getUserlogin;
            var jsonData = $scope.user;
            $http({
                url: serviceUrl,
                method: 'POST',
                data: jsonData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json",
                }
            }).success(function(data, status, headers, config) {

                if ((data.message == 'error') || (data.user == undefined)) {
                    if (data.errorMsg == 'AccountBlocked') {
                        $scope.error = global_message.LoginAuthNotMatchingError;
                        $scope.error_message = false;
                        $timeout(function() {
                            $scope.error = '';
                            $scope.error_message = true;
                        }, 3000);
                    } else {
                        $scope.error = global_message.LoginNotMatchingError;
                        $scope.error_message = false;
                        $timeout(function() {
                            $scope.error = '';
                            $scope.error_message = true;
                        }, 3000);
                    }

                } else {
                    $rootScope.class_status = 0;
                    $localStorage.isuserloggedIn = $rootScope.isuserloggedIn = $rootScope.footer_login_div = true;
                    $localStorage.menu = $localStorage.after_login_footer_div = $rootScope.menu = $rootScope.after_login_footer_div = false;

                    $rootScope.email = $localStorage.email = data.user.User.email;
                    $rootScope.name = $localStorage.name = data.user.User.first_name + " " + data.user.User.last_name;
                    $rootScope.access_token = $localStorage.access_token = data.user.User.access_token;
                    $rootScope.auth_token = $localStorage.auth_token = data.saveres.User.token;
                    $rootScope.phone_no = $localStorage.phone_no = data.user.User.phone_no;
                    $rootScope.userId = $localStorage.userId = data.user.User.id;
                    $rootScope.address = $localStorage.address = data.user.User.address;
                    $state.go('dashboard');
                }
            });
        }

    };
}).controller('signupcontroller', function($http, $location, $timeout, $scope, $ocLazyLoad, $rootScope, $state, $timeout, $localStorage) {

    // function to submit the form after all validation has occurred            
    $scope.unique = false;
    $scope.message = "";
    $scope.unique_type = 0;
    //$scope.disabledBtn = false;
    $rootScope.class_status = 1;

    /*  
    Created By: Deepak Khokkar
    Module : Sign Up Process
    */
    $scope.submitRegistrationform = function() {
        var serviceUrl = webservices.getUserregister;
        $scope.user.hosturl = servicebaseUrl;
        var jsonData = $scope.user;

        $http({
            url: serviceUrl,
            method: 'POST',
            data: jsonData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
            }
        }).success(function(data, status, headers, config) {

            if (data == 101) {
                $scope.message = global_message.EmailExist;
            } else if (data == "err") {
                $scope.message = global_message.SavingError;
            } else {
                $rootScope.SignupSuccessMessage = global_message.SignupSuccess;
                $scope.message = global_message.SignupSuccess;
                /*$timeout(function() {
                   $scope.message = global_message.SignupSuccess;
                 },3000);
                 */
                $location.path("/login");
            }

        });
    };

    /*  
    Created By: Deepak Khokkar
    Module : Check Unique Email
    */
    $scope.checkUnique = function() {
        var serviceUrl = webservices.checkUnique;
        var jsonData = $scope.user;
        console.log('$scope.user.email ', $scope.user.email);
        if ($scope.user.email) {
            $http({
                url: serviceUrl,
                method: 'POST',
                data: jsonData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json",
                }
            }).success(function(data, status, headers, config) {
                if (data == 300) {
                    //$scope.disabledBtn = true;
                    $scope.unique_type = 1;
                    $scope.unique = global_message.EmailAvailable;
                    $timeout(function() {
                        $scope.unique = '';
                        $scope.unique_type = '';
                    }, 3000);

                } else {
                    $scope.unique = global_message.EmailExist;
                    $scope.unique_type = 2;
                }
            });
        } else {
            console.log('in else 3');
            $scope.unique = global_message.EmailEmpty;
            $scope.unique_type = 3;
        }
    };

}).controller('forgotcontroller', function($http, $location, $timeout, $scope, $ocLazyLoad, $rootScope, $state, $timeout, $localStorage) {
    $scope.menu = true;
    $rootScope.class_status = 1;

    /*  
    Created By: Deepak Khokkar
    Module : Forgot Password
    */
    $scope.forgotPassword = function() {

        $scope.message = false;
        var serviceUrl = webservices.forgetPassword;
        $scope.user.hosturl = servicebaseUrl;
        var jsonData = $scope.user;
        $http({
            url: serviceUrl,
            method: 'POST',
            data: jsonData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
            }
        }).success(function(data, status, headers, config) {
            if (data == 200) {
                $scope.message = global_message.ForgetPassword;
                $scope.errormessage = '';
            } else {
                $scope.errormessage = global_message.ForgetEmailError;
                $scope.message = '';
            }
            $timeout(function() {
                $scope.errormessage = '';
                $scope.message = '';
            }, 3000);
        });
    }

    /*  
    Created By: Deepak Khokkar
    Module : Set New Password
    */
    if ($state.params.id) {
        $scope.user = {};
        $scope.message = false;

        $scope.setPassword = function() {
            if ($scope.user.password == $scope.user.repassword) {
                var serviceUrl = webservices.resetPassword;
                $scope.user.token = $state.params.id;
                $scope.user.password = $scope.user.password;
                var jsonData = $scope.user;
                $http({
                    url: serviceUrl,
                    method: 'POST',
                    data: jsonData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json",
                    }
                }).success(function(data, status, headers, config) {
                    if (data == 200) {
                        $scope.message = global_message.passwordChanged;
                        $scope.errormessage = '';
                    } else {
                        $scope.message = global_message.serverErrorPasswordReset;
                        $scope.errormessage = '';
                    }
                })

            } else {
                $scope.errormessage = global_message.retypeSamePassword;
            }
        }
    }
});