angular.module('alisthub').controller('trackingController', function($scope, $localStorage, $http, $injector, $state, $timeout, $rootScope, $uibModal, ngTableParams, $location) {

var $serviceTag = $injector.get("tracking");

    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }

    $scope.open = function(size, trackingID) {

        $state.params.id = trackingID;
  

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add_tracking_tag.html',
            controller: function($scope, $uibModalInstance) {

                $scope.Cancel = function() {

                    $uibModalInstance.dismiss('cancel');
                };

                $scope.data = {};

                $serviceTag.getUser({ 'seller_id': $localStorage.userId }, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.userData = response.result;
                        
                    }
                });

               
                if (size == 'lg') {
                    $scope.saveTag = function() {
                        if ($localStorage.userId != undefined) {
                            $scope.data.seller_id = $localStorage.userId;
                            $scope.loader = true;
                          $serviceTag.saveTag($scope.data, function(response) {
                                $scope.loader = false;
                                if (response.code == 200) {

                                    $uibModalInstance.dismiss('cancel');
                                     // $scope.success_message = false;
                                   window.location.reload();
                                } else {
                                    $scope.activation_message = global_message.ErrorInActivation;
                                }
                            });
                        }
                    };
                } else if (size == 'lg1') {
                    if ($state.params.id) {
                        $scope.page_title = 'EDIT';
                        $scope.getTagDetail = function() {
                            $scope.data = {};
                            if ($localStorage.userId != undefined) {
                                $scope.data.id = trackingID;
                                $scope.data.seller_id = $localStorage.userId;
                                $scope.loader = true;
                                $serviceTag.getTagDetail($scope.data, function(response) {
                                    $scope.loader = false;
                                    if (response.code == 200) {
                                        $scope.data = response.result[0];

                                    } else {
                                        $scope.error_message = response.error;
                                    }
                                });
                            }
                        };
                        $scope.getTagDetail();

                        $scope.saveTag = function() {
                            if ($localStorage.userId != undefined) {
                                $scope.data.seller_id = $localStorage.userId;
                                $scope.loader = true;
                                $serviceTag.saveTag($scope.data, function(response) {
                                    $scope.loader = false;
                                    if (response.code == 200) {

                                        $uibModalInstance.dismiss('cancel');
                                       window.location.reload();

                                    } else {
                                        $scope.activation_message = global_message.ErrorInActivation;
                                    }

                                });
                            }

                            $uibModalInstance.dismiss('cancel');

                        };

                    }
                }
            }
        });
    };
    $scope.delete = function(size, trackingID) {
        console.log(trackingID);
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            $scope.data.id = trackingID;
            $scope.loader = true;
            $serviceTag.deleteTag($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    window.location.reload();
                }
            });
        }
       
    };
    $scope.data = {};
    $scope.page_title = 'ADD';
    /*get user details*/
    $scope.getTag = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            $scope.loader = true;
            $serviceTag.getTag($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.userData = response.result;

                    $scope.tableParams = new ngTableParams({
                        page: 1, // show first page
                        count: 3, // count per page
                        sorting: { name: 'asc' }
                    }, {
                        data: $scope.userData
                    });
                } else {
                    $scope.error_message = response.error;
                }

            });

        }
    };


    if ($state.params.id) {} else {
        $scope.getTag();
    }




    $scope.open1 = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'link.html',
            controller: function($scope, $uibModalInstance) {

                $scope.Cancel = function() {

                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    };



});
