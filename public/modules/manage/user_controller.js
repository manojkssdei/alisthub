/** 
Angular User Controller
Created : 2016-04-2
Created By: Deepak Khokkar
Module : User 
*/
angular.module('alisthub')
    .controller('userController', function($scope, $localStorage, $injector, $http, $state, $location,ngTableParams) {
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

        $scope.getUser();

        /*edit user details*/
        if ($state.params.id) {
            // $scope.callfunction = 1;

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
            }
   


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