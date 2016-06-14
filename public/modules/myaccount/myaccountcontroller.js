angular.module('alisthub').controller('accountinfoController', function($scope,$localStorage,$injector,$http,$state,$location,$timeout,$window,$rootScope) {

    if (!$localStorage.isuserloggedIn) {
      $state.go('login');
    } 
    var $serviceTest = $injector.get("profile");
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
    $scope.faluire_message=false;
    $scope.success="";
    $scope.data = {};
    $scope.social = {};
    $scope.userdetail = {};
    $scope.email = {};
    $scope.advSetting = {};

   $scope.openTab = function(id)
    {
        if (id == 1) {

            //console.log('$scope.basictab' , $scope.basictab);
             if( $scope.basictab == true) {
            $scope.basictab     = false;
            $scope.basictabclass     = "fa-caret-down";
             }
             else {
            $scope.basictab     = true;
            $scope.basictabclass     = "fa-caret-up";
             }

            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;

            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 2) {

            if( $scope.producttab == true) {
            $scope.producttab     = false;
            $scope.producttabclass     = "fa-caret-down";
             }
             else {
            $scope.producttab     = true;
            $scope.producttabclass     = "fa-caret-up";
             }

            $scope.basictab   = false;
            $scope.discounttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 3) {

            if( $scope.discounttab == true) {
            $scope.discounttab     = false;
            $scope.discounttabclass     = "fa-caret-down";
             }
             else {
            $scope.discounttab     = true;
            $scope.discounttabclass     = "fa-caret-up";
             }

            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 4) {

            if( $scope.questiontab == true) {
            $scope.questiontab     = false;
            $scope.questiontabclass     = "fa-caret-down";
             }
             else {
            $scope.questiontab     = true;
            $scope.questiontabclass     = "fa-caret-up";
             }
            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }
        if (id == 5) {

            if( $scope.socialtab == true) {
            $scope.socialtab     = false;
            $scope.socialtabclass     = "fa-caret-down";
             }
             else {
            $scope.socialtab     = true;
            $scope.socialtabclass     = "fa-caret-up";
             }

            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab  = false;
            
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
        }
        
    }
    
    /*Update user details*/
    $scope.updateUser = function(userdetail) {
        if ($localStorage.userId!=undefined) {
            $scope.userdetail.user_id   = $localStorage.userId;
            var url = webservices.updateUser+"?data="+JSON.stringify($scope.userdetail)+"&callback=jsonp_callback9";
                    
            $http.jsonp(url);
                      
            $window.jsonp_callback9 = function(data) {
                         
                          if (data.code == 200) {
                              $location.path("/view_account");
                              $scope.success_message = true;
                              $scope.success  = global_message.userInfoUpated;
                              $rootScope.name = $localStorage.name = $scope.userdetail.first_name + " " +$scope.userdetail.last_name;
                              $timeout(function() {
                                  $scope.error='';
                                  $scope.success_message=false;
                                  $scope.success='';
                              },3000);
                          }
                          else
                          {
                          $scope.error_message = true;
                          $scope.error=global_message.errorChangeEmail;
                          }
                                                
                         
            }
            
            
        }
    };

    /*Update email of user*/
    $scope.checkUnique = function() {
        var serviceUrl = webservices.checkEmailUnique;
        var jsonData = $scope.email;
        $scope.email.id = $localStorage.userId;
        if($scope.email.email)
        {
             /////////////////////////////////////////////////////////////////////
                var url = serviceUrl+"?data="+JSON.stringify($scope.email)+"&callback=jsonp_callback";
                    
                $http.jsonp(url);
                      
                $window.jsonp_callback = function(data) {
                         console.log(data);
                         if (data.code == 300) {
                            //$scope.success_message = true;
                            //$scope.success=global_message.successChangeEmail;
                             //$timeout(function() {
                             //      $scope.unique = '';
                             //      $scope.unique_type  = '';
                             // },3000);
                             }
                             else{
                             $scope.error_message = true;
                             $scope.error=global_message.errorExistChangeEmail;
                             }
                                                
                         
                } 
          
            ////////////////////////////////////////////////////////////////////
          
           }else{
            console.log('in else 3');
                 $scope.unique = global_message.EmailEmpty;
                 $scope.unique_type  = 3;
           }
        };
    $scope.updateEmail = function(email) {
        if ($localStorage.userId!=undefined) {
            $scope.email.id = $localStorage.userId; 
            var url = webservices.updateEmailAccount+"?data="+JSON.stringify($scope.email)+"&callback=jsonp_callback";
                    
                $http.jsonp(url);
                      
                $window.jsonp_callback = function(data) {
                         
                         if (data.code == 300) {
                             $scope.m = global_message.EmailAvailable;
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
   
        }
    };

     /*Update password of user*/
    $scope.updatePassword = function(data) {
        if ($localStorage.userId!=undefined) {
            $scope.passsetting = {};
            $scope.passsetting.user_id   = $localStorage.userId;
            $scope.passsetting.oldpass   = $scope.data.oldpass;
            $scope.passsetting.newpass   = $scope.data.newpass;
        
        /////////////////////////////////////////////////////////////////
        var url = webservices.updatePassword+"?data="+JSON.stringify($scope.passsetting)+"&callback=jsonp_callback2";
                    
            $http.jsonp(url);
                      
            $window.jsonp_callback2 = function(data) {
                    if (data.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success=global_message.passwordChanged;
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                }
                else if(data.code==102) {
                    $scope.faluire_message=true;
                    $scope.used_old_password = global_message.used_old_password;
                    $timeout(function() {
                    $scope.error='';
                    $scope.faluire_message=false;
                    $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
                                                
                         
                }
        /////////////////////////////////////////////////////////////////    
                
         }
    };

    
    /*Update social details of user*/
    $scope.updateUserAdvSetting = function(advSetting) {
        
        if ($localStorage.userId!=undefined && $scope.social!=undefined) {
            $scope.advSetting.user_id   = $localStorage.userId;
            console.log('advSetting' , advSetting);

            var url = webservices.updateUserAdvSetting+"?data="+JSON.stringify($scope.advSetting)+"&callback=jsonp_callback10";
            console.log('url ' , url);        
            $http.jsonp(url);

            $window.jsonp_callback10 = function(data) {
                console.log('data.code ', data);
                  if (data.code == 200) {
                      $location.path("/view_account");
                      $scope.success_message = true;
                      $scope.success=global_message.infoSaved;
                      $timeout(function() {
                          $scope.error='';
                          $scope.success_message=false;
                          $scope.success='';
                      },3000);
                  }
                  else
                  {
                  $scope.error_message = true;
                  $scope.error=global_message.errorChangeEmail;
                  }
            }
        } 
    };

    /*Update social details of user*/
    $scope.updateSocial = function(social) {
        if ($localStorage.userId!=undefined && $scope.social!=undefined) {
            $scope.social.user_id   = $localStorage.userId;
            var url = webservices.updateSocial+"?data="+JSON.stringify($scope.social)+"&callback=jsonp_callback8";
                    
            $http.jsonp(url);
                      
            $window.jsonp_callback8 = function(data) {
                         
                          if (data.code == 200) {
                              $location.path("/view_account");
                              $scope.success_message = true;
                              $scope.success=global_message.infoSaved;
                              $timeout(function() {
                                  $scope.error='';
                                  $scope.success_message=false;
                                  $scope.success='';
                              },3000);
                          }
                          else
                          {
                          $scope.error_message = true;
                          $scope.error=global_message.errorChangeEmail;
                          }
                                                
                         
            }
            
            
        }
    };
   
    /*Get details of user*/
    /////////////////////////////////////////////////////////////////
      if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
      var url = webservices.getData+"?data="+JSON.stringify({userId:$localStorage.userId})+"&callback=jsonp_callback7";
                    
            $http.jsonp(url);
                      
            $window.jsonp_callback7 = function(data) {
                    if (data.code == 200) {
                      console.log('data here ',data);
                      $scope.data       = data.data;
                      $scope.email      = data.data;
                      $scope.userdetail = data.data;
                      console.log('data.data.sidekick_thermal_printing0 ' , data.data.sidekick_thermal_printing);
                      $scope.advSetting.sidekick_thermal_printing = data.data.sidekick_thermal_printing;
                      console.log('$scope.advSetting.sidekick_thermal_printing ' , $scope.advSetting.sidekick_thermal_printing);

                    }
                    else {
                      $scope.activation_message = global_message.ErrorInActivation;
                    }
          }
    /////////////////////////////////////////////////////////////////
    
            $http({
                         url: webservices.getSocialData,
                         method: 'POST',
                         data: "userId="+$localStorage.userId,
                         headers: {
                          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                          "Accept": "application/json",
                         }
                        }).success(function(data, status, headers, config) {
                        
                         $scope.loader = false;
                          if (data && data.code == 200) {
                            console.log('data.result[0] ' , data.result[0]) ;
                             $scope.password = data.result[0];
                             $scope.social.facebook_link = data.result[0].facebook_link;
                             $scope.social.twitter_link = data.result[0].twitter_link;
                             $scope.social.google_plus = data.result[0].google_plus;
          
                             $scope.userdetail.first_name = data.result[0].first_name;
                             $scope.userdetail.last_name = data.result[0].last_name;
                             $scope.userdetail.timezone = data.result[0].timezone;
                             $scope.userdetail.phone_no = data.result[0].phone_no;
                             $scope.userdetail.fax = data.result[0].fax;
                            // $scope.userdetail.sidekick_thermal_printing = data.result[0].sidekick_thermal_printing;
                             $scope.email.email = data.result[0].email;
                          } else {
                             $scope.error_message = data.fetchError;
                          }
                  });

        }


});


