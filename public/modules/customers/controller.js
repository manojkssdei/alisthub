
angular.module('alisthub')
    .controller('customerController', function($scope, $localStorage,$http, $state, $location,ngTableParams, $timeout,$window,$rootScope,$injector)
 {
     
    $scope.user = {};
      
        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }

          var $serviceTest = $injector.get("customers");
          var $serviceTestCommon = $injector.get("common");

            if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }

         $scope.user.country = "United States";
        $scope.enableState = true;
        $scope.error_message = false;
        $scope.success_message = false;
        $scope.payFlow_div = false;
        $scope.page_title = 'ADD';
        $scope.button_title = 'Add';
        $scope.countriesOptions = [];
        $scope.usaStatesOptions = [];
        
          if ($localStorage.userId != undefined )
        {
            $scope.user.seller_id = $localStorage.userId;
        }
        $scope.data = {};
        $scope.steps = [
            { "title": "Details", "icon": 'fa fa-calendar', 'id': 1 },
            { "title": "Pricing", "icon": 'fa fa-tags', 'id': 2 },
            { "title": "Options", "icon": 'fa fa-cog', 'id': 3 }
        ];
        $scope.page_title = 'ADD';
        if($state.current.url != "/view_customer") {
        /*Get list of countries */
        $serviceTestCommon.getCountries($scope.user, function(response) {
                if (response.code == 200) {
                     $scope.countries = response.result;
                    for (var key in $scope.countries) {
                       // conCode = $scope.countries[key].countryCode;
                        //$scope.countriesOptions.push({label:$scope.countries[key].countryName,value:conCode});
                        $scope.countriesOptions.push($scope.countries[key].countryName);
                    }
                }
        });
        /*Get list of usa states */
        $serviceTestCommon.getUSAStates($scope.user, function(response) {
                if (response.code == 200) {
                     $scope.usaStates = response.result;
                    for (var key in $scope.usaStates) {
                        $scope.usaStatesOptions.push($scope.usaStates[key].state_name);
                    }
                }
        });
     }


        /* View state field when country is US and disble in all other country cases*/
        $scope.showState = function() {
            if ($scope.user.country != "United States") {
                $scope.enableState = false;
            } else {
                $scope.enableState = true;
            }
        }



 $scope.getCustomer = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $serviceTest.getCustomer($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.userData = response.result;
                       
                       $scope.tableParams = new ngTableParams(
                                {
                                    page: 1,            // show first page
                                    count: 3,           // count per page
                                    sorting: {name:'dec'}
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
        $scope.getCustomer();
    }



        /*edit user details*/
        if ($state.params.id) {
       
            $scope.page_title = 'EDIT';
            $scope.getCustmerDetail = function() {

                if ($localStorage.userId != undefined) {
                    $scope.user.id = $state.params.id;
                    $scope.loader = true;
                    $serviceTest.userOverview($scope.user, function(response) {
                        $scope.loader = false;
                        if (response.code == 200) {
                            $scope.user = {};
                            $scope.user = response.result[0];
                            // $scope.user.email1=1;
                        } else {
                            $scope.error_message = response.error;
                        }
                    });
                }
            };
            $scope.getCustmerDetail();
        }
/*get user details*/
        $scope.addCustomer = function() {
            if ($localStorage.userId != undefined) {
                    $scope.user.seller_id = $localStorage.userId;
                    $serviceTest.addCustomer($scope.user, function(response) {
                        if (response.code == 200) {
                     
                             $location.path("/view_customer");
                        } else {
                            $scope.activation_message = global_message.ErrorInActivation;
                        }

                    });
                }
            };

     /*change status active or inactive*/

     $scope.changeCustomerStatus = function(id, status) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $scope.data.customer_status = status == 1 ? 0 : 1;
            $serviceTest.changeCustomerStatus($scope.data, function(response) {
                if (response.code == 200) {
                    $scope.getCustomer();
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };


            //delete user/////////

        $scope.deleteCustomer = function(id) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $serviceTest.deleteCustomer($scope.data, function(response) {
                if (response.code == 200) {
                        $scope.getCustomer();
                       
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };


});
