
angular.module('alisthub')
    .controller('customerController', function($scope, $localStorage,$http, $state, $location,ngTableParams, $timeout,$window,$rootScope,$injector ,$uibModal,$ocLazyLoad)
 {


  $scope.customerimport = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.customerimport = global_message.customerimport;
  }, function(e) {
    console.log(e);
  });


  $scope.customer_blacklist = '';

  $ocLazyLoad.inject('alisthub').then(function() {
    $scope.customer_blacklist = global_message.customer_blacklist;
  }, function(e) {
    console.log(e);
  });


     
    $scope.user = {};
     $scope.cus_id = [];
 $scope.user.seller_id = $localStorage.userId;

   //$scope.seller= $scope.user.seller_id;

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
                       $scope.seller_id=$localStorage.userId;

                       $scope.userData.forEach(function(value) {
                        $scope.cus_id.push(value.id);
                    });

                    
            } else {
                        $scope.error_message = response.error;
                    }

                });

            }
        };

       if ($state.params.id) {}else
       {
        $scope.getCustomer();
    }



$scope.getBlacklist = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $serviceTest.getBlacklist($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.customerData = response.result;
                       
                       $scope.tableParams = new ngTableParams(
                                {
                                    page: 1,            // show first page
                                    count: 3,           // count per page
                                    sorting: {name:'dec'}
                                },
                                {
                                    data:$scope.customerData
                                });
                       $scope.seller_id=$localStorage.userId;

                       $scope.customerData.forEach(function(value) {
                        $scope.cus_id.push(value.id);
                    });

                    
            } else {
                        $scope.error_message = response.error;
                    }

                });

            }
        };

       if ($state.params.id) {}else
       {
        $scope.getBlacklist();
       }



        /*edit user details*/
        if ($state.params.id) {
       
            $scope.page_title = 'EDIT';
            $scope.getCustmerDetail = function() {

                if ($localStorage.userId != undefined) {
                    $scope.user.id = $state.params.id;
                    $scope.loader = true;
                    $serviceTest.customerOverview($scope.user, function(response) {
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
                            $state.go('view_customer');
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

     $scope.exportCSV = function() {
      $scope.adata={};
                $serviceTest.exportCSV($scope.adata, function(response) {
                    if (response.code == 200) {
                        //$scope.eventdata = response.result;
                        $rootScope.question = $localStorage.question = "";
                    } else {
                        //console.log('error' );
                        //  $scope.eventdata = "";
                    }

                });
            }


$scope.items = ['item1'];

  $scope.animationsEnabled = true;

  $scope.open = function(size) {
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'customerimport.html',
      controller: 'customCtrl',
      size: size,
      resolve: { 
        items: function() {
          return $scope.items;
        }
      }
    });
  };



  $scope.open1 = function(size) {
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'customer_blacklist.html',
      controller: 'custom_blacklistCtrl',
      size: size,
      resolve: { 
        items: function() {
          return $scope.items;
        }
      }
    });
  };




});

angular.module('alisthub').controller('customCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout,
               $http) {




  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

          var $serviceTest = $injector.get("customers");
          //cancle button
           $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  //upload import csv files
   $scope.uploadFile = function(myfile, callback) {

     var file = $scope.myFile;

     var fileNameArr = [];

     console.log('file is', file);

     if (file == undefined || file == "") {
         callback("FILE_NA", myfile);
     } else {
         fileNameArr = file.name.substr(file.name.lastIndexOf('.') + 1);
     }
     console.log(fileNameArr);
     if (fileNameArr == "csv") {
         var uploadUrl = "/customers/uploadfilecsv";
         var fd = new FormData();
         fd.append('file', file);
         fd.append('user', $localStorage.userId);


         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: { 'Content-Type': undefined },
         })

         .success(function(res) {

             if (res.code == 200) {
              location.reload();
                 callback(null, myfile);


             } else {

                 $scope.error_message = res.message

             }
         }).error(function(err) {

             $scope.error_message = "Error! There are some problem in file uploading. Check if csv file is valid.";

         });

     } else {

         $scope.error_message = "Error! Uploading file should be correct format only!";

     }

      $uibModalInstance.close($scope.selected.item);

 }

});

angular.module('alisthub').controller('custom_blacklistCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout,
               $http) {

       var $serviceTest = $injector.get("customers");
        

           $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

//upload blacklist customercsv

  $scope.uploadBlacklist = function(myfile, callback) {
        var file = $scope.myFile;
        var fileNameArr = [];
       
        if (file == undefined || file == "") {
            callback("FILE_NA", myfile);
        } else {
            fileNameArr = file.name.substr(file.name.lastIndexOf('.') + 1);
        }
        console.log(fileNameArr);
        if (fileNameArr == "csv") {


            var uploadUrl = "/customers/uploadBlacklist";
            var fd = new FormData();
            fd.append('file', file);
            fd.append('user', $localStorage.userId);
                // $scope.loader=true;
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined },
                 // $scope.loader=true;
            })

            .success(function(res) {

                if (res.status === 200) {

                    callback(null, myfile);

                } else {

                    $scope.error_message = res.message
                    
                }
            }).error(function(err) {

                $scope.error_message = "Error! There are some problem in file uploading. Check if csv file is valid.";
            
            });

        } else {

            $scope.error_message = "Error! Uploading file should be correct format only!";
          
        }




}

});




