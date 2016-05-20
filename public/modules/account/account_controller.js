/** 
Angular Controller for the finacial setting of user 
Created : 2016-05-17
Created By: Harpreet Kaur
Module : Financial Setting Module  
*/
angular.module('alisthub')
    .controller('accountController', function($scope, $localStorage, $injector, $http, $state, $location, $sce, $rootScope, $timeout) {
        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        var $serviceTest = $injector.get("account");
        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }

        /*Default setting for financial information */
        $scope.user = {};
        $scope.user.country = "US";
        $scope.enableState = true;
        $scope.error_message = false;
        $scope.success_message = false;
        $scope.payFlow_div = false;
        $scope.page_title = 'ADD';
        $scope.button_title = 'Add';

        /* View state field when country is US and disble in all other country cases*/
        $scope.showState = function() {
            if ($scope.user.country != "US") {
                $scope.enableState = false;
            } else {
                $scope.enableState = true;
            }
        }

        /*showPageLayout*/
        $scope.showPageLayout = function() {
            if ($scope.user.merchant_type == "PayFlow") { $scope.payFlow_div = true; } else { $scope.payFlow_div = false; }
            $scope.checkAlreadyAddedMerchant();
        }

        /* Fetch the existing financial details of seller*/
        if ($localStorage.userId != undefined && $state.current.name == "add_financial_setting") {
            $scope.user.seller_id = $localStorage.userId;
            $serviceTest.getFinancialDetails($scope.user, function(response) {
                if (response.code == 200) {
                    $scope.user = response.result[0];
                }
            });
        }

        /* Check mandatory fields */
        $scope.checkMandatoryFields = function(mandatoryFields) {
            var errorExist = 0;
            var errorList = [];
            for (var key in mandatoryFields) {
                if (!$scope.user[key] || $scope.user[key] == undefined || $scope.user[key] == "" || $scope.user[key] == "NULL") {
                    errorExist = 1;
                    errorList.push('Enter ' + key);
                }
            }
            if (errorExist) {
                return errorList;
            }
        }

        /*Save financial details of seller*/
        $scope.addFinancialDetails = function() {
            if ($localStorage.userId != undefined) {
                $scope.user.seller_id = $localStorage.userId;
                $serviceTest.addFinancialDetails($scope.user, function(response) {
                    if (response.code == 200) {
                        $scope.success_message = true;
                        $scope.success = global_message.savedFinancialInformation;
                    } else {
                        $scope.error_message = true;
                        $scope.error = response.error;
                    }

                });
            }
        };

        /* Submit alist financial details form data*/
        $scope.submitFinancialDetails = function() {
            var mandatoryFields = {
                'first_name': global_message.enterFirstName,
                'last_name': global_message.enterLastName,
                'email': global_message.enterEmail,
                'cheque_name': global_message.enterChequeName,
                'address': global_message.enterAddress,
                'country': global_message.selectCountry,
            };

            var errorMsg = $scope.checkMandatoryFields(mandatoryFields);
            if (!errorMsg) {
                $scope.addFinancialDetails();
            } else {
                $scope.error_message = true;
                $scope.error = global_message.fillMandatoryField;
                /*for(var index in errorMsg) { 
                $scope.error+=errorMsg[index];
                }*/
            }
        }

        /* Submit custom financial details form data*/
        $scope.submitCustomFinancialDetails = function() {
            var mandatoryFields = {
                'merchant_type': global_message.selectMerchantType,
                'currency_code': global_message.selectCurrencyCode,
                'account_id': global_message.emptyAccountiD,
                'account_password': global_message.emptyPassword,
            };

            var errorMsg = $scope.checkMandatoryFields(mandatoryFields);
            if (!errorMsg) {
                $scope.addCustomFinancialDetails();
            } else {
                $scope.error_message = true;
                $scope.error = global_message.fillMandatoryField;
                /*for(var index in errorMsg) { 
                $scope.error+=errorMsg[index];
                }*/
            }
        }


        /*Save custom financial details of seller*/
        $scope.addCustomFinancialDetails = function() {
            if ($localStorage.userId != undefined) {
                $scope.user.seller_id = $localStorage.userId;
                $serviceTest.addCustomFinancialDetails($scope.user, function(response) {
                    if (response.code == 200) {
                        $scope.success_message = true;
                        $scope.success = global_message.savedMerchantFinancialInformation;
                        $rootScope.success = $scope.success;
                        $location.path("/view_custom_financial_setting/list");
                    } else {
                        $scope.error_message = true;
                        $scope.error = response.error;
                    }

                });
            }
        };

        /* Checks if the financial details of particular merchant already exist in the database,if yes then redirect the seller to update it*/
        $scope.checkAlreadyAddedMerchant = function() {
            if ($localStorage.userId != undefined) {
                $scope.user.seller_id = $localStorage.userId;
                console.log('$scope .user', $scope.user);
                $serviceTest.checkAlreadyAddedMerchant($scope.user, function(response) {
                    console.log(response);
                    $scope.loader = false;
                    if (response.code == 200) {
                        if (response.result[0] != undefined) {
                            $rootScope.success_already = global_message.merchantTypeExist;
                            console.log('response.result[0]', response.result[0]);
                            $location.path("/edit_financial_setting/" + response.result[0].id);
                        }
                    } else {
                        $scope.error_message = response.error;
                    }

                });
            }
        }

        /*Edit custom Merchant Financial Settings*/
        if ($state.params.id) {
            $scope.callfunction = 1;
            $scope.page_title = 'EDIT';
            $scope.button_title = 'Edit';
            $scope.success_message_already = false;
            $scope.success_message = false;

            if ($rootScope.success) {
                $scope.success_message_already = true;
                $scope.success_already = $rootScope.success_already;
            }

            $scope.getCustomFinancialDetail = function() {
                if ($localStorage.userId != undefined) {
                    $scope.user.id = $state.params.id;
                    $scope.user.seller_id = $localStorage.userId;
                    $scope.loader = true;
                    $serviceTest.getCustomFinancialSetting($scope.user, function(response) {
                        $scope.loader = false;
                        if (response.code == 200) {
                            //$scope.user  = {};
                            $scope.user = response.result[0];
                            $scope.showPageLayout();
                        } else {
                            $scope.error_message = response.error;
                        }
                    });
                }
            };
            $scope.getCustomFinancialDetail();

            $scope.editCustomFinancialDetail = function() {
                if ($localStorage.userId != undefined) {
                    $scope.user.seller_id = $localStorage.userId;
                    $scope.user.id = $state.params.id;
                    $serviceTest.addCustomFinancialDetails($scope.user, function(response) {
                        if (response.code == 200) {} else {
                            $scope.error_message = true;
                            $scope.error = response.error;
                        }
                    });
                }
            };
        }
    })

.controller('manageAccountController', function($scope, $localStorage, $injector, $http, $state, $location, $sce, $rootScope, $timeout) {
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    var $serviceTest = $injector.get("account");
    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }

    $scope.user = {};
    $scope.disc_id = [];

    /* Listing of the custom merchant financial accounts*/
    $scope.viewCustomFinancialSetting = function() {
        if ($localStorage.userId != undefined) {
            $scope.user.seller_id = $localStorage.userId;
            $scope.loader = true;
            $scope.success_message = false;
            if ($rootScope.success) {
                $scope.success_message = true;
                $scope.success = $rootScope.success;
                $timeout(function() {
                    $scope.success_message = false;
                    $scope.success = '';
                    $rootScope.success = '';
                }, 3000);
            }
            $serviceTest.viewCustomFinancialSetting($scope.user, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.merchantFinancialData = response.result;
                } else {
                    $scope.error_message = response.error;
                }

            });
        }
    };

    if ($state.params.list) {
        $scope.viewCustomFinancialSetting();
    }

});