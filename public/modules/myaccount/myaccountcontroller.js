angular.module('alisthub').controller('accountinfoController', function($scope,$localStorage,$injector,$http,$state,$location,$timeout,$window) {

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
    $scope.success="";
    $scope.data = {};
    $scope.social = {};
    $scope.userdetail = {};
    $scope.email = {};

    $scope.openTab = function(id)
    {
        if (id == 1) {

console.log('$scope.basictab' , $scope.basictab);
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
            $serviceTest.updateUser($scope.userdetail,function(response){
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success=global_message.userInfoUpated;
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
                            $scope.success_message = true;
                            $scope.success=global_message.successChangeEmail;
                             $timeout(function() {
                                   $scope.unique = '';
                                   $scope.unique_type  = '';
                              },3000);
                             }
                             else{
                             $scope.error_message = true;
                             $scope.error=global_message.errorChangeEmail;
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
                         console.log(data);
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
            
            
            
            /*$http({
            url: webservices.updateEmail,
            method: 'POST',
            data: $scope.email,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "application/json",
                }
            }).success(function(data, status, headers, config) {
            });*/
        }
    };

    /*Update password of user*/
    $scope.updatePassword = function(data) {
        if ($localStorage.userId!=undefined) {
            $scope.data.user_id   = $localStorage.userId;
	    
	    /////////////////////////////////////////////////////////////////
	    var url = webservices.updatePassword+"?data="+JSON.stringify($scope.data)+"&callback=jsonp_callback2";
                    
            $http.jsonp(url);
                      
            $window.jsonp_callback2 = function(data) {
                    if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success=global_message.passwordChanged;
                    $timeout(function() {
                        $scope.error='';
                        $scope.success_message=false;
                        $scope.success='';
                    },3000);
                } else {
                   $scope.activation_message = global_message.ErrorInActivation;
                }
                                                
                         
                } 
	
	    ///////////////////////////////////////////////////////////////
	    	    
           /* $serviceTest.updatePassword($scope.data,function(response){
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success=global_message.passwordChanged;
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

    /*Update social details of user*/
    $scope.updateSocial = function(social) {
        if ($localStorage.userId!=undefined && $scope.social!=undefined) {
            $scope.social.user_id   = $localStorage.userId;
            $serviceTest.updateSocial($scope.social,function(response){
                if (response.code == 200) {
                    $location.path("/view_account");
                    $scope.success_message = true;
                    $scope.success=global_message.infoSaved;
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
   
    /*Get details of user*/
    $scope.getData = function() {
        if ($localStorage.userId!=undefined) {
           var serviceUrl = webservices.getData;
            $scope.data.userId      = $localStorage.userId;
             $http({
                        url: serviceUrl,
                        method: 'POST',
                        data: $scope.data,
                        headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json",
                        }
                        }).success(function(data, status, headers, config) {
                            if(data!=undefined) 
                            {
                                   $scope.social.facebook_link = data.facebook_link;
				   $scope.social.twitter_link = data.twitter_link;
				   $scope.social.google_plus = data.google_plus;

				   $scope.userdetail.first_name = data.first_name;
				   $scope.userdetail.last_name = data.last_name;
				   $scope.userdetail.timezone = data.timezone;
				   $scope.userdetail.phone_no = data.phone_no;
				   $scope.userdetail.fax = data.fax;
				   
				   $scope.email.email = data.email;
                            }
                        })
          /*  $serviceTest.getData($scope.data,function(response){
                $scope.loader = false;
                if (response.code == 200) {
                   $scope.password = response.result[0];
                   $scope.social.facebook_link = response.result[0].facebook_link;
                   $scope.social.twitter_link = response.result[0].twitter_link;
                   $scope.social.google_plus = response.result[0].google_plus;

                   $scope.userdetail.first_name = response.result[0].first_name;
                   $scope.userdetail.last_name = response.result[0].last_name;
                   $scope.userdetail.timezone = response.result[0].timezone;
                   $scope.userdetail.phone_no = response.result[0].phone_no;
                   $scope.userdetail.fax = response.result[0].fax;
                   
                   $scope.email.email = response.result[0].email;
                } else {
                   $scope.error_message = response.error;
                }
            });*/
        }
    };

    $scope.getData();

});


