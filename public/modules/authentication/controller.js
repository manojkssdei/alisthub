/** 
Angular Controller for SignUp ,Login, Forget Password ,Email Confirmation 
Created : 2016-05-17
Created By: Deepak Khokkar
Module : SignUp ,Login, Forget Password Module ,Email Confirmation 
*/
angular.module('alisthub').controller('loginController', function($http,$location,$timeout,$scope, $ocLazyLoad,$rootScope,$state,$localStorage,$window,$injector) {
        var showclix = $injector.get("showclix");
        if ($localStorage.isuserloggedIn) {
                $rootScope.class_status = 0;
                $state.go('dashboard');
        }
        $rootScope.class_status=1;
        
        $scope.activation_message = false;
        //$rootScope.SignupSuccessMessage = false;
        $rootScope.signup_success_message = true;
        if($rootScope.SignupSuccessMessage) {
            $rootScope.signup_success_message = false;
             $timeout(function() {
                        $scope.signup_success_message=true;
             },6000);
        }
        
       
        
        $scope.user = {};
        if ($state.params.confirm_email_id) {
              //  confirmationEmail
                var serviceUrl = webservices.confirmationEmail;
                $scope.user.token = $state.params.confirm_email_id;
                var jsonData=$scope.user;
                                     
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
                           $timeout(function() {
                                 $scope.activation_message='';
                            },3000);
                          }else{
                           $scope.activation_message = global_message.ErrorInActivation;
                           $timeout(function() {
                                 $scope.activation_message='';
                            },3000);
                          }
                        });
        }


   
    /*  
    Created By: Deepak Khokkar
    Module : Email Confirmation - signup process
    */
    if ($state.params.confirm_email_id) {
        var serviceUrl = webservices.confirmationEmail;
        $scope.user.token = $state.params.confirm_email_id;
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
                $timeout(function() {
                         $scope.activation_message='';
                    },3000);
            } else {
                $scope.activation_message = global_message.ErrorInActivation;
                $timeout(function() {
                         $scope.activation_message='';
                    },3000);
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
        if ($scope.userForm.$valid)
        {
            var serviceUrl = webservices.getUserlogin;
            var jsonData = $scope.user;
            
            //////////////  SHOWCLIX SERVICE ////////////////////
            $scope.showclix_data = {};
            $scope.showclix_data = {"email":"manojks@smartdatainc.net","password":"manojks@2015"};
                /////////////////////////////////////////////////////////////////////////////
                var url = webservices.getUserlogin+"?data="+JSON.stringify(jsonData)+"&callback=jsonp_callback9";
                    
                $http.jsonp(url);
                          
                $window.jsonp_callback9 = function(data) {
                    if ((data.message == 'error') || (data.user == undefined)) {

                        showclix.checkSellerSubUser({ 'userData' : jsonData },function(seller_response) {
                            if(seller_response.code==101 && seller_response.result[0]==undefined) {
                                if (data.errorMsg == 'AccountNotActivated') {
                                    $scope.error = global_message.LoginAuthNotMatchingError;
                                    $scope.error_message = false;
                                    $timeout(function() {
                                        $scope.error = '';
                                        $scope.error_message = true;
                                    }, 3000);
                                } else {
                                    console.log('data.message: ' + data.message + 'data.user: ' + data.user);
                                    $scope.error = global_message.LoginNotMatchingError;
                                    $scope.error_message = false;
                                    $timeout(function() {
                                        $scope.error = '';
                                        $scope.error_message = true;
                                    }, 3000);
                                }
                            } else {
                               

                               $http({
                                    url: showclix_webservices.generateToken,
                                    method: 'POST',
                                    data: $scope.showclix_data,
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "Accept": "application/json",
                                    }
                                }).success(function(datas, status, headers, config) {
                                    var response = JSON.parse(datas.body);

                                    if (response != null && response != "" && response.token) {
                                        $rootScope.class_status = 0;
                                        $localStorage.isuserloggedIn = $rootScope.isuserloggedIn = $rootScope.footer_login_div = true;
                                        $localStorage.menu = $localStorage.after_login_footer_div = $rootScope.menu = $rootScope.after_login_footer_div = false;

                                        $rootScope.email = $localStorage.email = seller_response.result[0].email;
                                        $rootScope.name = $localStorage.name = seller_response.result[0].first_name + " " + seller_response.result[0].last_name;
                                        //$rootScope.access_token = $localStorage.access_token = data.user.User.access_token;
                                        //$rootScope.auth_token = $localStorage.auth_token = data.saveres.User.token;
                                        $rootScope.phone_no = $localStorage.phone_no = seller_response.result[0].phone;
                                        $rootScope.userId = $localStorage.userId = seller_response.result[0].seller_id;
                                        $rootScope.userType = $localStorage.userType = 'sellerSubUser';
                                        $rootScope.sellerSubUserId = $localStorage.sellerSubUserId = seller_response.result[0].id;
                                        
                                        /// Showclix storage start
                                        $rootScope.showclix_token     = $localStorage.showclix_token     = response.token;
                                        $rootScope.showclix_user_id   = $localStorage.showclix_user_id   = response.user_id;
                                        $rootScope.showclix_seller_id = $localStorage.showclix_seller_id = response.seller_id;
                                        /// Showclix storage end

                                        showclix.getPerModules({ 'userId' : seller_response.result[0].id },function(perm_seller) {
                                            $localStorage.permission = perm_seller.result;
                                        });

                                        $state.go('dashboard');
                                    } else { 
                                        $scope.error = global_message.LoginNotMatchingError;
                                        $scope.error_message = false;
                                        $timeout(function() {
                                            $scope.error = '';
                                            $scope.error_message = true;
                                        }, 3000);   
                                    }
                                });
                            }
                        });
                    } else {
                       
                       $http({
                            url: showclix_webservices.generateToken,
                            method: 'POST',
                            data: $scope.showclix_data,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "Accept": "application/json",
                            }
                        }).success(function(datas, status, headers, config) {
                        var response = JSON.parse(datas.body);

                        
                        
                        if (response != null && response != "" && response.token) {
                         
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
                        $rootScope.userType = $localStorage.userType = 'seller';
                        $rootScope.sellerSubUserId = $localStorage.sellerSubUserId = null;
                        
                        /// Showclix storage start
                        $rootScope.showclix_token     = $localStorage.showclix_token     = response.token;
                        $rootScope.showclix_user_id   = $localStorage.showclix_user_id   = response.user_id;
                        $rootScope.showclix_seller_id = $localStorage.showclix_seller_id = response.seller_id;
                        /// Showclix storage end
                        $localStorage.permission = {};
                        $state.go('dashboard');
                        
                        }
                        else
                        { //checkshowclix
                          
                         $scope.error = global_message.LoginNotMatchingError;
                         $scope.error_message = false;
                            $timeout(function() {
                                $scope.error = '';
                                $scope.error_message = true;
                            }, 3000);   
                         }
                       });
                        
                    }

                    /*
                    if ((data.message == 'error') || (data.user == undefined)) {
                        if (data.errorMsg == 'AccountNotActivated') {
                            $scope.error = global_message.LoginAuthNotMatchingError;
                            $scope.error_message = false;
                            $timeout(function() {
                                $scope.error = '';
                                $scope.error_message = true;
                            }, 3000);
                        } else {
                            console.log('data.message: ' + data.message + 'data.user: ' + data.user);
                            $scope.error = global_message.LoginNotMatchingError;
                            $scope.error_message = false;
                            $timeout(function() {
                                $scope.error = '';
                                $scope.error_message = true;
                            }, 3000);
                        }

                    } else {
                       
                       $http({
                            url: showclix_webservices.generateToken,
                            method: 'POST',
                            data: $scope.showclix_data,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "Accept": "application/json",
                            }
                        }).success(function(datas, status, headers, config) {
                        var response = JSON.parse(datas.body);

                        
                        
                        if (response != null && response != "" && response.token) {
                         
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
                        
                        /// Showclix storage start
                        $rootScope.showclix_token     = $localStorage.showclix_token     = response.token;
                        $rootScope.showclix_user_id   = $localStorage.showclix_user_id   = response.user_id;
                        $rootScope.showclix_seller_id = $localStorage.showclix_seller_id = response.seller_id;
                        /// Showclix storage end
                        
                        $state.go('dashboard');
                        
                        }
                        else
                        { //checkshowclix
                          
                         $scope.error = global_message.LoginNotMatchingError;
                         $scope.error_message = false;
                            $timeout(function() {
                                $scope.error = '';
                                $scope.error_message = true;
                            }, 3000);   
                         }
                       });
                        
                    }*/
                                                    
                             
                }
                
                /////////////////////////////////////////////////////////////////////////////       
                
        }

       };


    /*  
    Created By: Deepak Khokkar
    Module : User Login
    */
    $scope.submitForm1 = function() {
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid)
        {
            var serviceUrl = webservices.getUserlogin;
            var jsonData = $scope.user;
            
            showclix.checkSellerSubUser({ 'userData' : jsonData },function(seller_response) {

                if(seller_response.code==101) {
                    console.log('data.message: ' + data.message + 'data.user: ' + data.user);
                    $scope.error = global_message.LoginNotMatchingError;
                    $scope.error_message = false;
                    $timeout(function() {
                        $scope.error = '';
                        $scope.error_message = true;
                    }, 3000);
                } else {
                    $rootScope.class_status = 0;
                    $localStorage.isuserloggedIn = $rootScope.isuserloggedIn = $rootScope.footer_login_div = true;
                    $localStorage.menu = $localStorage.after_login_footer_div = $rootScope.menu = $rootScope.after_login_footer_div = false;

                    $rootScope.email = $localStorage.email = seller_response.result[0].email;
                    $rootScope.name = $localStorage.name = seller_response.result[0].first_name + " " + seller_response.result[0].last_name;
                    $rootScope.phone_no = $localStorage.phone_no = seller_response.result[0].phone;
                    $rootScope.userId = $localStorage.userId = seller_response.result[0].seller_id;
                    $rootScope.userType = $localStorage.userType = 'sellerSubUser';
                    $rootScope.sellerSubUserId = $localStorage.sellerSubUserId = seller_response.result[0].id;
                    
                    showclix.getPerModules({ 'userId' : seller_response.result[0].id },function(perm_seller) {
                        $localStorage.permission = perm_seller.result;
                    });

                    $state.go('dashboard');
                }
            });
                
        }

       };

}).controller('signupcontroller',function($http,$location,$timeout,$scope, $ocLazyLoad, $rootScope,$state,$localStorage,reCAPTCHA,$window){

    // function to submit the form after all validation has occurred            
    $scope.unique = false;
    $scope.message = "";
    $scope.user = {};
    $scope.unique_type = 0;
    //$scope.disabledBtn = false;
    $rootScope.class_status = 1;
    
     /*****************CREATED BY DEEPAK K*********************************/
        reCAPTCHA.setPublicKey('6LdgDyUTAAAAAHlJqEPPfg59c9e14SUxn0mL3C5u');
     /*===================================================================*/


        $scope.submitRegistrationform = function()
        {
         
                var serviceUrl = webservices.getUserregister;
                $scope.user.hosturl  = servicebaseUrl;
                var jsonData=$scope.user;
                
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
                         $scope.errormessage = global_message.EmailExist;
                         $timeout(function() {
                                   $scope.errormessage = '';
                                   
                              },3000);
                        }
                        else if (data == "err") {
                         $scope.errormessage = global_message.SavingError;
                         $timeout(function() {
                                   $scope.errormessage = '';
                                   
                              },3000);
                        }
                        else {
                          $rootScope.SignupSuccessMessage = global_message.SignupSuccess;
                          $scope.message = global_message.SignupSuccess;
                          $timeout(function() {
                             $scope.message = global_message.SignupSuccess;
                           },3000);
                           
                          $state.go('login');
                        }
                    
                    });
         
        
        };
        
        $scope.checkUnique = function() {
        var serviceUrl = webservices.checkUnique;
        var jsonData = $scope.user;
        console.log('$scope.user.email ' , $scope.user.email);
        if($scope.user.email)
        {
             /////////////////////////////////////////////////////////////////////
                var url = serviceUrl+"?data="+JSON.stringify($scope.user)+"&callback=jsonp_callback";
                    
                $http.jsonp(url);
                      
                $window.jsonp_callback = function(data) {
                         console.log(data);
                         if (data.code == 300) {
                             $scope.unique_type  = 1;
                             $scope.unique = global_message.EmailAvailable;
                             $timeout(function() {
                                   $scope.unique = '';
                                   $scope.unique_type  = '';
                              },3000);
                             }
                             else{
                             $scope.unique = global_message.EmailExist;
                             $scope.unique_type  = 2;
                             }
                                                
                         
                } 
          
            ////////////////////////////////////////////////////////////////////
          
           }else{
            console.log('in else 3');
                 $scope.unique = global_message.EmailEmpty;
                 $scope.unique_type  = 3;
           }
        };
    
    }).controller('forgotcontroller',function($http,$location,$timeout,$scope, $ocLazyLoad,$rootScope,$state,$localStorage,$window){
        $scope.menu=true;
        $rootScope.class_status=1;
        $scope.user = {}; 
        $scope.forgotPassword=function(){
            if (!$scope.user.email) {
                $scope.errormessage = global_message.ForgetEmailBlank;
                $scope.message = '';
                $timeout(function() {
                 
                    $scope.errormessage='';
                    $scope.message='';
                },3000);
            }
            else
            {               
                $scope.message = false;
                $scope.user.hosturl  = servicebaseUrl;
                
                /////////////////////////////////////////////////////////////////
                var serviceUrl = webservices.forgetPassword;
                var url = serviceUrl+"?data="+JSON.stringify($scope.user)+"&callback=jsonp_callback";
            
                $http.jsonp(url);
              
                $window.jsonp_callback = function(data) {
                 console.log(data);
                 if (data.code == 200) {
                     $scope.message = global_message.ForgetPassword;
                     $scope.errormessage ='';
                     $timeout(function() {
                 
                    $scope.errormessage='';
                    $scope.message='';
                  },3000);
                     }
                     else{
                     $scope.errormessage = global_message.ForgetEmailError;
                     $scope.message = '';
                     $timeout(function() {
                 
                    $scope.errormessage='';
                    $scope.message='';
                     },3000);
                     }
                }
                ////////////////////////////////////////////////////////////////
           }
        }
        if ($state.params.forget_password_id)
        {
            $scope.user = {};
            $scope.message = false;
            
            $scope.setPassword=function()
            {
                
                if($scope.user.password == $scope.user.repassword)
                {
                   var serviceUrl = webservices.resetPassword;
                   $scope.user.token  = $state.params.forget_password_id;
                   $scope.user.password  = $scope.user.password;
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
                             if (data == 200)
                             {
                             $scope.message = "Password has been changed successfully.";
                             $scope.errormessage = '';
                             $timeout(function() {
                 
                                $scope.errormessage='';
                                $scope.message='';
                              },3000);
                             }
                             else
                             {
                             $scope.message = "There some problem in server side to set new password , try after some time .";
                             $scope.errormessage = '';
                             $timeout(function() {
                 
                                $scope.errormessage='';
                                $scope.message='';
                             },3000);
                             }
                        })
                   
                }
                else{
                     $scope.errormessage = "Please retype same password.";
                     $timeout(function() {
                 
                    $scope.errormessage='';
                    $scope.message='';
                  },3000);
                }
              
                
           }

        }


})
