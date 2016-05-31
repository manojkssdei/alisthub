/** 
Angular User Controller
Created : 2016-04-2
Created By: Deepak Khokkar
Module : User 
*/
angular.module('alisthub')
    .controller('userController', function($scope, $localStorage,$http, $state, $location,ngTableParams, $timeout,$window,$rootScope,$injector) {
        $scope.user = {};
        event_count=[];
        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        var $serviceTest = $injector.get("users");

        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }
        $scope.data = {};

        $scope.steps = [
            { "title": "Details", "icon": 'fa fa-calendar', 'id': 1 },
            { "title": "Pricing", "icon": 'fa fa-tags', 'id': 2 },
            { "title": "Options", "icon": 'fa fa-cog', 'id': 3 }
        ];
        $scope.page_title = 'ADD';
        /*get user details*/
        $scope.getUser = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $serviceTest.getUser($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.userData = response.result;
                       
                       $scope.tableParams = new ngTableParams(
                                {
                                    page: 1,            // show first page
                                    count: 3,           // count per page
                                    sorting: {name:'asc'}
                                },
                                {
                                    data:$scope.userData
                                });
                    
            } else {
                        $scope.error_message = response.error;
                    }

                });

            }
        };

       if ($state.params.id) {}else{
        $scope.getUser();
    }

        /*edit user details*/
        if ($state.params.id) {
       
            $scope.page_title = 'EDIT';
            $scope.getuserDetail = function() {

                if ($localStorage.userId != undefined) {
                    $scope.user.id = $state.params.id;
                    $scope.loader = true;
                    $serviceTest.userOverview($scope.user, function(response) {
                        $scope.loader = false;
                        if (response.code == 200) {
                            $scope.user = {};
                            $scope.user = response.result[0];
                            $scope.user.email1=1;
                        } else {
                            $scope.error_message = response.error;
                        }
                    });
                }
            };
            $scope.getuserDetail();
        }

        /*submit user details*/
        $scope.submitCreateUserForm = function(step) {
                if ($localStorage.userId != undefined) {
                    $scope.user.seller_id = $localStorage.userId;
                    $serviceTest.addUsers($scope.user, function(response) {
                        if (response.code == 200) {
                          
                            $location.path("/view_user");
                        } else {
                            $scope.activation_message = global_message.ErrorInActivation;
                        }

                    });
                }
            };
 
/*change status active or inactive*/

     $scope.changeStatus = function(id, status) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $scope.data.status = status == 1 ? 0 : 1;
            $serviceTest.changeUserStatus($scope.data, function(response) {
                if (response.code == 200) {
                    $scope.getUser();
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };

   ////////unique email///////////

        
    $scope.unique = false;
    $scope.message = "";
    
    $scope.unique_type = 0;
    



   ///////////////////////////////
         $scope.checkuniqueUser = function() 
         {
          $serviceTest.checkuniqueUser({'email':$scope.user.email},function(response){
            console.log(response);
            if(response.result[0].cnt<1)
            {
                $scope.success_message = true;
                $scope.error_message = false;
                $scope.user.email1=1;
                $scope.unique = "Available";
            }
            else{
                $scope.error_message = true;
                $scope.success_message = false;
                $scope.user.email1='';
                $scope.unique = "This email ID already exists";
            }
          });

        };


//delete user/////////

        $scope.deleteUser = function(id) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $serviceTest.deleteUser($scope.data, function(response) {
                if (response.code == 200) {
                        $scope.getUser();
                       
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };
 });