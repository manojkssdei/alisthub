angular.module('alisthub').controller('widgetcontroller', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location) {
    //For Step 1
    var $servicewidget = $injector.get("widget");


    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }

    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'checkout_widgets.html',
            controller: function($scope, $uibModalInstance) {

                $scope.Cancel = function() {

                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
    };

    //////////////////////////////////////////////////
    $scope.data = {};

    $scope.page_title = 'ADD';
    /*get user details*/
    $scope.getWidget = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            $scope.loader = true;
            $servicewidget.getWidget($scope.data, function(response) {
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
        $scope.getWidget();
    }

    if ($state.params.id) {

        $scope.page_title = 'EDIT';
        $scope.getWidgetDetail = function() {
            $scope.data = {};

            if ($localStorage.userId != undefined) {
                $scope.data.id = $state.params.id;
                $scope.loader = true;
                $servicewidget.getWidgetDetail($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        // $scope.user = {};
                        $scope.data = response.result[0];
                        if ($scope.data.show_template_header === 1) {
                            $scope.data.show_template_header = true;
                        }
                        if ($scope.data.show_vanue_name === 1) {
                            $scope.data.show_vanue_name = true;
                        }
                        if ($scope.data.override_event_temlates === 1) {
                            $scope.data.override_event_temlates = true;
                        }
                        if ($scope.data.begin_calendar_view === 1) {
                            $scope.data.begin_calendar_view = true;
                        }
                        if ($scope.data.show_event_list === 1) {
                            $scope.data.show_event_list = true;
                        }
                        if ($scope.data.use_category_colors === 1) {
                            $scope.data.use_category_colors = true;
                        }

                    } else {
                        $scope.error_message = response.error;
                    }
                });
            }
        };
        $scope.getWidgetDetail();
    }

    /////////////////////////////////////////////
    $scope.savewidget = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            for (is in $scope.data) {
                if ($scope.data[is] === true) {
                    $scope.data[is] = 1;
                    
                } else if ($scope.data[is] === false) {
                    $scope.data[is] = 0;
                }
            }
            $scope.loader = true;
            $servicewidget.savewidget($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                  
                    $location.path("/widgets");
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }

            })
        }
    };


});
