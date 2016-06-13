/** 
Angular Discount Controller
Created : 2016-05-16
Created By: Harpreet Kaur
Module : Discount 
*/
angular.module('alisthub')
.controller('discountController', function($scope, $localStorage, $injector, $http, $state, $location, $rootScope, $timeout, $sce) {

    /*Default setting of discount*/
    $scope.data = {};
    $scope.error_message = false;
    $scope.success_message = false;
    $scope.edit_note = false;

    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    var $serviceTest = $injector.get("discounts");

    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }
    
    $scope.coupon_type_options = [
        { 'type': "Discount", 'description': 'Discount Coupons are applied per ticket—except for bundled tickets, which applies coupons per bundle. Create a Discount Coupon to offer a discount on each ticket or bundle.' },
        { 'type': "Automatic", 'description': 'Automatic Coupons are applied per order. Create an Automatic Coupon to offer a discount on an order when that reaches a target dollar amount.' },
        { 'type': "Reserve", 'description': 'Create a Reserve Coupon to hold specific seats for customers. (Reserve Coupons can only be applied to reserved seating events.)' },
        { 'type': "Presale", 'description': 'Presale Coupons provide access to otherwise restricted event pages and tickets, before the event is on sale to the general public.  Limits on the number of presale ORDERS and the number of TICKETS PER ORDER may be set.' },
        { 'type': "Complimentary", 'description': 'Complimentary Coupons are applied per ticket—except for bundled tickets, which applies coupons per bundle. Create a Complimentary Coupon to waive the entire cost of the ticket (including the face value and service fee). Please note: Unless otherwise specified, your account will be debited a small service fee. Please contact an account manager for more info.' },
        { 'type': "Price Level", 'description': 'Price Level Coupons grant customers access to a specified price level.' },
    ];

    $scope.coupon_code_div = true;
    $scope.amount_type_div = true;
    $scope.amount_div = true;

    /*Default page layout of add discount*/
    $scope.showPageLayout = function() {
        $scope.coupon_code_div = false;
        $scope.amount_type_div = false;
        $scope.amount_div = false;
        $scope.amount_target_div = false;
        if ($scope.data.coupon_type == "Discount") {
            $scope.coupon_code_div = true;
            $scope.amount_type_div = true;
            $scope.amount_div = true;
        }
        if ($scope.data.coupon_type == "Automatic") {
            $scope.amount_type_div = true;
            $scope.amount_div = true;
            $scope.amount_target_div = true;
        }
        if ($scope.data.coupon_type == "Reserve" || $scope.data.coupon_type == "Presale" || $scope.data.coupon_type == "Complimentary" || $scope.data.coupon_type == "Access Code") {
            $scope.coupon_code_div = true;
        }
    }

    $scope.amount_type = [
        { model: "Percentage", 'symbol': " (%)" },
        { model: "Flat", 'symbol': " ($)" },
    ];

    /*Add discount coupon by seller*/
    $scope.addDiscount = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            $serviceTest.addDiscount($scope.data, function(response) {
                if (response.code == 200) {
                    $rootScope.success_message = true;
                    $rootScope.success = global_message.discountAdded;
                    $location.path("/view_discounts/list");
                } else {
                    $scope.error_message = true;
                    $scope.error = '';
                    for (var index in response.error) {
                        $scope.error += $sce.trustAsHtml(response.error[index]);
                    }
                    $scope.trustedHtml = $sce.trustAsHtml($scope.error);

                  $timeout(function() {
                    $scope.error_message = false;
                    $scope.error = '';
                  }, 3000);
                }

            });
        }
    };

    /*Get all discount coupons of seller*/
    $scope.getDiscount = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.userId = $localStorage.userId;
            $scope.loader = true;
            $serviceTest.getDiscounts($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.discountdata = response.result;
                } else {
                    $scope.error_message = response.error;
                }
            });
        }
    };

    /*View listing of all discount coupons of seller*/
    if ($state.params.list) {
        $scope.getDiscount();
    }

    /*Check if all required fields are filled or not */
    $scope.checkMandatoryFields = function(mandatoryFields) {
        var errorExist = 0;
        var errorList = [];
        for (var key in mandatoryFields) {
            if (!$scope.data[key] || $scope.data[key] == undefined || $scope.data[key] == "" || $scope.data[key] == "NULL") {
                errorExist = 1;
                errorList.push('Enter ' + key);
            }
        }
        if (errorExist) {
            return errorList;
        }
    }

    /* Default setting for add discount coupon page*/
    $scope.page_title = 'ADD';
    $scope.callfunction = 0;

    /* Check unique coupon for seller*/
    $scope.checkUniqueDiscount = function() {
        if ($localStorage.userId != undefined && $scope.data.coupon_code != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            if ($scope.callfunction == 1) {
                $scope.data.id = $state.params.id;
            }
            $serviceTest.checkUniqueDiscount($scope.data, function(response) {
                if (response.code == 101) {
                    $scope.error_message = true;
                    $scope.error = response.error;

                    $timeout(function() {
                    $scope.error_message = false;
                    $scope.error = '';
                  }, 3000);

                }
                if (response.code == 200) {
                    $scope.error_message = false;
                }
            });
        }
    }

    /* Submit form data of discount coupons */
    $scope.saveDiscount = function() {
        var mandatoryFields = { 'coupon_type': 'Enter coupon type' };

        if ($scope.data.coupon_type == "Discount") {
            $scope.data.amount_target = undefined;
            mandatoryFields = {
                'coupon_name': 'Coupon Name is required',
                'coupon_code': 'A code is required for this coupon type',
                'amount_type': 'Select amount type',
                'amount': 'A valid monetary amount is required for this coupon type',
            };
        }

        if ($scope.data.coupon_type == "Automatic") {
            $scope.data.coupon_code = undefined;
            mandatoryFields = {
                'coupon_name': 'Coupon Name is required',
                'amount_type': 'Select amount type',
                'amount': 'A valid monetary amount is required for this coupon type',
                'amount_target': 'A valid monetary target amount is required for this coupon type',
            };
        }

        if ($scope.data.coupon_type == "Reserve" || $scope.data.coupon_type == "Presale" || $scope.data.coupon_type == "Complimentary" || $scope.data.coupon_type == "Access Code") {
            mandatoryFields = {
                'coupon_name': 'Coupon Name is required',
                'coupon_code': 'A code is required for this coupon type',
            };
        }

        var errorMsg = $scope.checkMandatoryFields(mandatoryFields);
        if (!errorMsg) {
            if ($scope.callfunction == 0) {
                $scope.addDiscount();
            }
            if ($scope.callfunction == 1) {
                $scope.editDiscount();
            }
        } else {
            $scope.error_message = true;
            $scope.error = global_message.fillMandatoryField;

            $timeout(function() {
                    $scope.error_message = false;
                    $scope.error = '';
                  }, 3000);
        }
    }

    /* Edit discount coupon of seller using coupon id */
    if ($state.params.id) {
        $scope.callfunction = 1;

        $scope.page_title = 'EDIT';
        $scope.edit_note = true;
        $scope.getDiscountDetail = function() {

            if ($localStorage.userId != undefined) {
                $scope.data.id = $state.params.id;
                $scope.loader = true;
                $serviceTest.discountOverview($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.data = {};
                        $scope.data = response.result[0];
                        $scope.showPageLayout();
                    } else {
                        $scope.error_message = response.error;
                    }

                });

            }
        };

    /* Get details of discount coupon of seller using coupon id */
        $scope.getDiscountDetail();
    /* Update details of discount coupon of seller using coupon id */
        $scope.editDiscount = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.data.id = $state.params.id;
                $serviceTest.addDiscount($scope.data, function(response) {
                    if (response.code == 200) {
                         $rootScope.success_message = true;
                         $rootScope.success = global_message.discountUpdated;
                        $location.path("/view_discounts/list");
                    } else {
                        $scope.error_message = true;
                        $scope.error = '';
                        for (var index in response.error) {
                            $scope.error += $sce.trustAsHtml(response.error[index]);
                        }
                        $scope.trustedHtml = $sce.trustAsHtml($scope.error);
                    }

                });
            }
        };
    }

    /* Assign discount coupon to the events of seller */
    $scope.assignDiscount = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.seller_id = $localStorage.userId;
            $serviceTest.assignDiscount($scope.data, function(response) {
                if (response.code == 200) {
                    $location.path("/view_discounts/list");
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }
            });
        }
    };
})

/** 
Angular Manage Discount Controller
Created : 2016-05-16
Created By: Harpreet Kaur
Module : Discount 
*/
.controller('manageDiscountController', function($scope, $localStorage, $injector, $http, $state, $rootScope, $location , $timeout , ngTableParams) {

        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        if ($localStorage.userId != undefined) {
            $scope.seller_id = $localStorage.userId;
        }

        var $serviceTest = $injector.get("discounts");

        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }

        $scope.data = {};
        $scope.disc_id = [];
        $scope.event_count = [];

        if ($rootScope.success_message) {
                $scope.success_message = true;
                $scope.success = $rootScope.success;
                $timeout(function() {
                    $scope.success_message = false;
                    $scope.success = '';
                    $rootScope.success = '';
                }, 3000);
            }


/*Get discount coupons using seller id*/
        $scope.getDiscount = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.userId = $localStorage.userId;
                $scope.loader = true;
                $serviceTest.getDiscounts($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.discountdata = response.result;
                        
                        $scope.tableParams = new ngTableParams(
                        {
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: {name:'asc'},
                                    
                            },
                            {
                                    data:$scope.discountdata
                        });
                        
                        $scope.discountdata.forEach(function(value) {
                            $scope.disc_id.push(value.id);
                        });

                          response.counts.forEach(function(value) {
                        $scope.event_count[value.discount_id] = value.count;
                    });

                    } else {
                        $scope.error_message = response.error;
                    }
                });
            }
        };

        /*View listing of all discount coupons */
        if ($state.params.list) {
            $scope.getDiscount();
        }

        /*Enable the status of discount coupon */
        $scope.changeStatus = function(id, status) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.id = id;
                $scope.data.status = status == 1 ? 0 : 1;
                $serviceTest.changeDiscountStatus($scope.data, function(response) {
                    if (response.code == 200) {
                        $scope.getDiscount();
                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }

                });
            }
        };

        /*Delete discount coupon */
        $scope.delDiscount = function(id) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.id = id;
                $serviceTest.deleteDiscount($scope.data, function(response) {
                    if (response.code == 200) {
                        $scope.getDiscount();
                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }
                });
            }
        };

        // Checkbox to assign discount
        $scope.enableAssign = false;
        $scope.listQues = 0;
        $scope.checkbox = [];

        /*Get value of checked discount coupon */
        $scope.getcheckedbox = function(id) {
            $scope.checkbox.push(id);
            if (id != "" && id != null && id != "undefined") {
                $scope.enableAssign = true;
            } else {
                $scope.enableAssign = false;
            }
        }

        /*check all discount coupons */
        $scope.all_check_point = 1;
        $scope.toggleAll = function(id) {
            
             if (id == 1) {
                $scope.all_check_point = 2;
                var toggleStatus = true;
                $scope.enableAssign = true;
                $scope.listQues = 1;
             }
             if (id == 2) {
                $scope.all_check_point = 1;
                var toggleStatus = false;
                $scope.enableAssign = false;
             }
             
           
            angular.forEach($scope.discountdata, function(itm) { itm.selected = toggleStatus; });
        }
        $scope.pdata = {};
        $scope.data = {};
        $scope.optionToggled = function(idn) {

                if ($scope.checkbox.indexOf(idn) !== -1) {
                    $scope.checkbox.pop(idn);
                } else {
                    $scope.checkbox.push(idn);
                }
                if ($scope.checkbox.length > 0) {
                    $scope.enableAssign = true;
                } else {
                    $scope.enableAssign = false;
                }

                $scope.isAllSelected = $scope.discountdata.every(function(itm) {
                    return itm.selected; })
            }
            //#/assign_discount/assign
            //$rootScope.address=$localStorage.address=data.user.User.address;
        $scope.goPath = function() {
            //console.log(' $scope.listQues = ' , $scope.listQues , ' scope.disc_id = ' ,$scope.disc_id , '$scope.checkbox =' , $scope.checkbox );
            if ($scope.listQues == 1) {
                $rootScope.discount = $localStorage.discount = $scope.disc_id;
            } else {
                $rootScope.discount = $localStorage.discount = $scope.checkbox;
            }
            $location.path("/new_assign_discount/assign");
        }


        /** View list of all Events for assigning discount coupons ***/
        $scope.event_id = [];
        $scope.viewEvents = function() {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                if ($scope.dt) {
                    $scope.data.search_date = $scope.dt;
                }
                if ($scope.search_type) {
                    $scope.data.search_type = $scope.search_type;
                }
                $serviceTest.viewEvents($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.eventdata = response.result;
                        $scope.eventdata.forEach(function(value) {
                            $scope.event_id.push(value.id);
                        });

                    } else {
                        $scope.eventdata = "";
                    }

                });
            } else {
                $scope.eventdata = "";
            }
        };
        if ($state.params.assign) {
            $scope.viewEvents();
        }

        $scope.enableEventAssign = false;
        $scope.listEvent = 0;

        $scope.eventtoggleAll = function() {
            if ($scope.eventisAllSelected) {
                var toggleStatus = true;
                $scope.enableEventAssign = true;
                $scope.listEvent = 1;
            } else {
                var toggleStatus = false;
                $scope.enableEventAssign = false;
            }
            angular.forEach($scope.eventdata, function(itm) { itm.selected = toggleStatus; });
        }

        $scope.eventcheckbox = [];
        $scope.eventoptionToggled = function(idn) {

            if ($scope.eventcheckbox.indexOf(idn) !== -1) {
                $scope.eventcheckbox.pop(idn);
            } else {
                $scope.eventcheckbox.push(idn);
            }
            if ($scope.eventcheckbox.length > 0) {
                $scope.enableEventAssign = true;
            } else {
                $scope.enableEventAssign = false;
            }

            $scope.eventisAllSelected = $scope.eventdata.every(function(itm) {
                return itm.selected; })
        }

        /*Assign discount coupons to events */
        $scope.makeAssignment = function() {
            $scope.adata = {};
            if ($localStorage.userId != undefined) {
                $scope.adata.seller_id = $localStorage.userId;

                if ($scope.listEvent == 1) {
                    $scope.adata.events = $scope.event_id;
                } else {
                    $scope.adata.events = $scope.eventcheckbox;
                }

                $scope.adata.discount = $localStorage.discount;

                $serviceTest.makeDiscountAssignment($scope.adata, function(response) {
                    if (response.code == 200) {
                        $rootScope.discount = $localStorage.discount = "";
                        $location.path("/view_discounts/list");
                    } 
                });
            } else {
                $scope.eventdata = "";
            }
        };


/** 
Angular Export Discount Controller
Created : 2016-05-16
Created By: Harpreet Kaur
Module : Export Discount 
*/
        if ($scope.listQues == 1) {
            $scope.common_ids = $scope.disc_id;
        } else {
            $scope.common_ids = $scope.checkbox;
        }

        /*Export the discount coupons to CSV*/
        $scope.exportDiscountCSV = function() {
                $serviceTest.exportDiscountCSV($scope.adata, function(response) {
                    if (response.code == 200) {
                        //$scope.eventdata = response.result;
                        $rootScope.discount = $localStorage.discount = "";
                        //$location.path("/view_discounts/list");
                    } else {
                        //  $scope.eventdata = "";
                    }

                });
            }
        /* Code end to Export Discount module*/
        var now = new Date();
        if (now.getMonth() == 11) {
            var current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            //minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return '';
            //mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)
        }

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.option_ckeditor = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function() {
            // ...
        };
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.options1 = {
            customClass: getDayClass,
            initDate: current,
            showWeeks: true
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    })
    .controller('assignDiscountController', function($scope, $localStorage, $injector, $http, $state, $rootScope, $uibModal, $location ,$timeout) {

        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        if ($localStorage.userId != undefined) {
            $scope.seller_id = $localStorage.userId;
        }

        if ($localStorage.discount == "" || $localStorage.discount == "undefined") {
            $location.path("/view_discounts/list");
        }

        $scope.data = {};
        $scope.eventInfo = {};
        $scope.discountlist = {};
        $scope.alldiscountlist = {};
        var $serviceTest = $injector.get("discounts");

        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }

        /** 
        Method: Enable Discount limiting box
        Description:Enable Discount limiting box   
        Created : 2016-05-18
        Created By:  Manoj Kumar Singh  
        */
        $scope.enable_coupan_box = false;
        $scope.enable_event_box = false;
        $rootScope.assignedEventWithPriceLevel = false;
        $rootScope.priceLevelDiv = false;

        $rootScope.assignedEvents = [];
        $rootScope.assignedPriceLevels = [];
        $rootScope.eventsChoosed = 1;
        $rootScope.priceLevelChoosed = 1;
        $scope.endDateErrorStatus = 0;
        $scope.endTimeErrorStatus = 0;

        $scope.enableBox = function(id) {
            if (id == 1) {
                $scope.enable_coupan_box = true;
                $scope.enable_event_box = false;
                $scope.eventsChoosed = $rootScope.eventsChoosed = 1;
                $scope.priceLevelChoosed = $rootScope.priceLevelChoosed = 1;
                //console.log(' eventsChoosed ', $scope.eventsChoosed );
                $rootScope.assignedEventWithPriceLevel = false;
            }
            if (id == 2) {
                $scope.enable_coupan_box = true;
                $scope.enable_event_box = true;
                $scope.eventsChoosed = $rootScope.eventsChoosed = 0;
                $scope.priceLevelChoosed = $rootScope.priceLevelChoosed = 0;
                //console.log(' eventsChoosed ', $scope.eventsChoosed );
            }
        }

$scope.checkPriceLevelChoosed = function() {
 for(var key in $rootScope.assignedEvents) {
    var eventId = $rootScope.assignedEvents[key].id ;
    $scope.priceLevelChoosed = 1;
    $rootScope.priceLevelChoosed = 1;
    $scope.eventsChoosed =1 ;
    $rootScope.eventsChoosed = 1;
    if(!$scope.data.event_id[eventId])
        {
        $rootScope.priceLevelChoosed = 0;
        $scope.priceLevelChoosed = 0;
        }
  }
  //console.log('$scope.priceLevelChoosed' , $scope.priceLevelChoosed);
}


    $scope.changedendtime = function(){

        if ($scope.data.start_date !='' && $scope.data.start_date != undefined && $scope.data.end_date !='' && $scope.data.end_date != undefined) {
            if($scope.data.end_date < $scope.data.start_date){
                 //console.log('endDateError');
                $scope.endDateErrorStatus = 1; 
                $scope.endDateError = global_message.endDateError;
            }
            if($scope.data.end_date >= $scope.data.start_date){
                $scope.endDateErrorStatus = 0; 
            }

            var sd = $scope.data.start_date;
            var ed = $scope.data.end_date;
          

if(sd.getDate() == ed.getDate() && (sd.getMonth()+1) == (ed.getMonth()+1) && sd.getFullYear() == ed.getFullYear()) {
                
                if ($scope.data.start_time !='' && $scope.data.start_time != undefined &&  $scope.data.end_time != "" && $scope.data.end_time != undefined) {
                    var stt = new Date("January 01, 2016 " + $scope.data.start_time);
                    stt = stt.getTime();

                    var endt = new Date("January 01, 2016 " + $scope.data.end_time);
                    endt = endt.getTime();

                    if(stt >= endt) {
                    $scope.endTimeErrorStatus = 1;    
                    $scope.endTimeError = global_message.date_comparison;
                    }

                    if(stt < endt) {
                    $scope.endTimeErrorStatus = 0;    
                    }
                } 
             }
        }
    }

        $scope.saveFinalAssignmet = function() {
            //console.log('$scope.data ' , $scope.data );
             if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $scope.eventInfo.seller_id = $localStorage.userId;
                $scope.data.discount_id = $localStorage.discount;
                $scope.data.common_id = new Date().getTime();

//console.log('$rootScope.assignedPriceLevels' , $rootScope.assignedPriceLevels);

if($scope.data.events == "choose_events") {
//console.log('inside if');
    for(var event_id_key in $scope.data.event_id) {
        //console.log('event_id_key' , event_id_key);
        //console.log('$scope.data.event_id[event_id_key].price_levels' , $scope.data.event_id[event_id_key].price_levels);

          if($scope.data.event_id[event_id_key].price_levels == "all_price_levels") {
            var choosen_price_level = {};
            //console.log('choose all price levels for event ' , event_id_key );

            for( key in $rootScope.assignedPriceLevels) {
                //console.log(' rootscope price level key' , key);
               // push all price level of event to choosen_price_level key
               //var choosen_price_level = $scope.data.event_id[event_id_key].choosen_price_level;
              //console.log(' $rootScope.assignedPriceLevels[key].event_id' , $rootScope.assignedPriceLevels[key].event_id);
              //console.log(' $rootScope.assignedPriceLevels[key].id' , $rootScope.assignedPriceLevels[key].id);
              if($rootScope.assignedPriceLevels[key].event_id == event_id_key )
                {
                    var price_level_id = $rootScope.assignedPriceLevels[key].id;
                    choosen_price_level[price_level_id] = true;
                    //console.log('choosen_price_level' , choosen_price_level);
                    //$scope.data.event_id[event_id_key].choosen_price_level.push(choosen_price_level);
                $scope.data.event_id[event_id_key].choosen_price_level = choosen_price_level;
                }
             } 
             
         }
      }
}





                if ($scope.data.discount_id == "") {
                    $location.path("/view_discounts/list");
                }
                else{
                    //console.log('final scope data' , $scope.data );
                    //console.log('call saveFinalAssignmet');
                    $serviceTest.saveFinalAssignmet($scope.data, function(response) {
                        if (response.code == 200) {
                $scope.success_message = true;
                $scope.success = global_message.discountAssigned;
                $location.path("/view_discounts/list");
                /*
                $timeout(function() {
                    $scope.success_message = false;
                    $scope.success = '';

                }, 3000);
                */

                          
                        } else {
                            // display error here
                        }
                    });
                    

                }

            }
        }










    $scope.updateFinalAssignment = function() {
    console.log('$scope.data' , $scope.data);
    var error = $scope.userForm.$error;
    angular.forEach(error.required, function(field){
        if(field.$invalid){
            var fieldName = field.$name;
            console.log('fieldName' , fieldName);
        }
    });


    if ($localStorage.userId != undefined) {
     $scope.data.common_id = new Date().getTime();


//console.log('$rootScope.assignedPriceLevels' , $rootScope.assignedPriceLevels);
if($scope.data.events == "choose_events") {
console.log('inside if');
    for(var event_id_key in $scope.data.event_id) {
        //console.log('event_id_key' , event_id_key);
        //console.log('$scope.data.event_id[event_id_key].price_levels' , $scope.data.event_id[event_id_key].price_levels);

          if($scope.data.event_id[event_id_key].price_levels == "all_price_levels") {
            var choosen_price_level = {};
            //console.log('choose all price levels for event ' , event_id_key );

            for( key in $rootScope.assignedPriceLevels) {
                //console.log(' rootscope price level key' , key);
               // push all price level of event to choosen_price_level key
               //var choosen_price_level = $scope.data.event_id[event_id_key].choosen_price_level;
              //console.log(' $rootScope.assignedPriceLevels[key].event_id' , $rootScope.assignedPriceLevels[key].event_id);
              //console.log(' $rootScope.assignedPriceLevels[key].id' , $rootScope.assignedPriceLevels[key].id);
              if($rootScope.assignedPriceLevels[key].event_id == event_id_key )
                {
                    var price_level_id = $rootScope.assignedPriceLevels[key].id;
                    choosen_price_level[price_level_id] = true;
                    //console.log('choosen_price_level' , choosen_price_level);
                    //$scope.data.event_id[event_id_key].choosen_price_level.push(choosen_price_level);
                $scope.data.event_id[event_id_key].choosen_price_level = choosen_price_level;
                }
             } 
             
         }
      }
}





                if ($scope.data.discount_id == "") {
                    $location.path("/view_discounts/list");
                }
                else{
                    
                    $scope.data.old_start_date = $rootScope.old_start_date;
                    $scope.data.old_end_date = $rootScope.old_end_date;
                    
            
                    $serviceTest.updateFinalAssignment($scope.data, function(response) {
                        if (response.code == 200) {
                            //$scope.success_message = true;
                            //$scope.success = global_message.discountAssigned;
                            $location.path("/view_discounts/list");
                           

                          
                        } else {
                            // display error here
                        }
                    });
                    

                }

            }

          
}


        /** Description : To get selected discount codes details.
        Created : 2016-05-18
        Created By:  Manoj Kumar Singh  
        **/
        //assign
        $scope.getSelectedDiscount = function() {
            $scope.cdata = {};
            if ($localStorage.userId != undefined) {
                $scope.cdata.seller_id = $localStorage.userId;
                $scope.cdata.ids = $localStorage.discount;
                if ($scope.cdata.ids == "") {
                    $location.path("/view_discounts/list");
                } else {
                    $serviceTest.getSelectedDiscount($scope.cdata, function(response) {
                        if (response.code == 200) {
                            response.result.forEach(function(entry) {
                                $scope.discountlist[entry.id] = {};
                                $scope.discountlist[entry.id].coupon_name = entry.coupon_name;
                                $scope.discountlist[entry.id].coupon_code = entry.coupon_code;

                            })
                            response.allcode.forEach(function(entry2) {
                                $scope.alldiscountlist[entry2.id] = {};
                                $scope.alldiscountlist[entry2.id].coupon_name = entry2.coupon_name;
                                $scope.alldiscountlist[entry2.id].coupon_code = entry2.coupon_code;

                            })
                            /*
console.log(' --------------  in getSelectedDiscount function -------------- ' );
console.log(' --------------response.result-------------- ' );
console.log( response.result );
console.log(' --------------response.allcode-------------- ');
console.log( response.allcode);
console.log(' -------------- -------------- -------------- -------------- ');
*/
                        } else {
                            //  $scope.eventdata = "";
                        }
                    });

                }
            }
        }


        if ($state.params.assign) {
            $scope.getSelectedDiscount();
        }

  $scope.formats = ['yyyy-MM-dd','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.getAssignDiscountDetails = function(id) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.data.id = id;

                $serviceTest.getAssignDiscountDetails($scope.data, function(response) {
                    if (response.code == 200) {
                        $scope.data = response.result[0];
if($scope.data.event_type == "1" ){
    console.log(1);
    $scope.data.events = "all_events";
    $scope.enableBox(1);
} else {
    console.log(2);
    $scope.data.events = "choose_events";
    $scope.enableBox(2);
}
 
 $scope.data.start_date = new Date($scope.data.start_date);
 $scope.data.end_date = new Date($scope.data.end_date);
$rootScope.old_start_date = $scope.data.start_date;
$rootScope.old_end_date = $scope.data.end_date;

                      console.log('rootScope.old_end_date' , $rootScope.old_start_date);
                      console.log('rootScope.old_end_date' , $rootScope.old_end_date);
                      console.log('scope.data' , $scope.data);

                    } 
                });
            }
        }

        if ($state.params.edit_dis_assignId) {
            console.log('call edit_dis_assignId' , $state.params.edit_dis_assignId);
             $scope.getAssignDiscountDetails($state.params.edit_dis_assignId);
            // Coupon DiscountPreserve already has an assignment from 2016-05-04 12:00:00 to 2016-05-14 12:00:0
        }



        $scope.enableDiscountDiv = false;

        $scope.removeMoreRow = function(key, id) {
            $scope.discountlist[id] = "";
            //console.log(key +"::"+ id );
            delete $scope.discountlist[id];

            $scope.discountIds = $localStorage.discount;
            $scope.discountIds.pop(parseInt(id));
            $localStorage.discount = $scope.discountIds;

            //console.log($scope.discountlist);
            if ($scope.discountlist.length == 0) {
                $scope.enableDiscountDiv = true;
            }
            else{
                $scope.enableDiscountDiv = false;
            }
        }

        $scope.addMoreRow = function() {
            $scope.enableDiscountDiv = true;
        }

        $scope.pushDiscount = function() {
            //console.log('while adding more more discount , in pushDiscount');
            //console.log('$scope.alldiscountlist' , $scope.alldiscountlist);
            //console.log('$scope.add_code' , $scope.add_code);

                var current_data = $scope.alldiscountlist[$scope.add_code];
                $scope.discountlist[$scope.add_code] = {};
                $scope.discountlist[$scope.add_code].coupon_name = current_data.coupon_name;
                $scope.discountlist[$scope.add_code].coupon_code = current_data.coupon_code;
                //console.log('$scope.add_code' ,  $scope.discountlist);
                //console.log('$localStorage.discount' ,  $localStorage.discount);

                $scope.discountIds = $localStorage.discount;
                //console.log('$scope.discountIds before push' , $scope.discountIds);
                
                var alreadyExist = 0;
                for(var key in $scope.discountIds) {
                    var dis_code = $scope.discountIds[key];
                    if(dis_code == $scope.add_code)
                    {
                        alreadyExist = 1;
                    }
                }
                if ( alreadyExist != 1 ) {
                   $scope.discountIds.push(parseInt($scope.add_code));
                   //console.log('$scope.discountIds after push' , $scope.discountIds); 
                }

                //console.log('$scope.discountIds ' ,  $scope.discountIds);
                $localStorage.discount = $scope.discountIds;
                //console.log('$localStorage.discount' ,  $localStorage.discount);
            }
            //// Make Assign ment service start
        $scope.makeAssignment = function() {
            $scope.adata = {};
            if ($localStorage.userId != undefined) {
                $scope.adata.seller_id = $localStorage.userId;

                $scope.adata.discount = $localStorage.discount;

                $serviceTest.makeDiscountAssignment($scope.adata, function(response) {
                    if (response.code == 200) {
                        $rootScope.discount = $localStorage.discount = "";
                        $location.path("/view_discounts/list");

                    } else {
                        //  $scope.eventdata = "";

                    }

                });
            } else {
                $scope.eventdata = "";
            }
        };
        //// Make Assign ment service end
        $scope.items = {};
        ///// Start Event Popup
        $scope.showEventPopup = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'eventModalContent.html',
                controller: 'EventModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };
        
        ///// End Event Pupup
        
        ///////////////////   Date calender start
        $scope.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };

        var now = new Date();
        if (now.getMonth() == 11) {
            var current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',

            //minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return '';
            //mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)
        }

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.option_ckeditor = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function() {
            // ...
        };
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.options1 = {
            customClass: getDayClass,
            initDate: current,
            showWeeks: true
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }


        if ($state.params.id) {
            $scope.adata = {};
            if ($localStorage.userId != undefined) {
                $scope.adata.seller_id = $localStorage.userId;
                $scope.adata.id = $state.params.id;

                $serviceTest.discountAssignmentOverview($scope.adata, function(response) {
                    if (response.code == 200) {
                        $scope.discount = response.discount[0];
                        $scope.discountAssignments = response.discountAssignments;
                            $scope.discountAssignIds = [];
                            $scope.commonAssignIds = [];
                            //$scope.assignmentByCommonIds = [];


                            $scope.discountAssignments.forEach(function(value) {
                                $scope.discountAssignIds.push(value.id);

                                if ($scope.commonAssignIds.indexOf(value.common_id) == -1) {
                                 $scope.commonAssignIds.push(value.common_id);
                                } 
                            }); 

                            console.log('value.commonAssignIds' , $scope.commonAssignIds);

/*$scope.commonAssignIds.forEach(function(value) {
    console.log('value' , value );
    //$scope.assignmentByCommonIds[value]
  $scope.discountAssignments.forEach(function(value1) {
 console.log('value1.common_id' , value1.common_id);
 console.log('value' , value);
     if(value1.common_id == value) {

console.log('$scope.discountAssignments[value1]' , $scope.discountAssignments[value1]);
                var obj = {};
                obj[value] =$scope.discountAssignments[value1];
                $scope.assignmentByCommonIds.push(obj);
     }
  });


}); 
*/


                        if(response.globalDiscountAssignments[0]) {
                             $scope.globalAssignments = response.globalDiscountAssignments[0];
                        }
                        else{
                            $scope.globalAssignments = "undefined";
                        }
                    } 

                });
            } else {
                $scope.eventdata = "";
            }
        }

         /*Delete discount coupon */
        $scope.delDiscountAssignment = function(id) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                    if(typeof(id) == "object") {
                        $scope.data.id = id;
                    }
                    if(typeof(id) == "number") {
                       $scope.data.id = [];
                       $scope.data.id.push(id); 
                    }
                    

                $scope.data.seller_id = $localStorage.userId;
                if ($state.params.id) {
                      $scope.data.discount_id = $state.params.id;
                }
                $serviceTest.delDiscountAssignment($scope.data, function(response) {
                    if (response.code == 200) {
                         //$scope.activation_message = global_message.ErrorInActivation;
                         $location.path("/view_discounts/list");
                    } 
                });
                
            }
        };

        $scope.delPriceLevelDiscAssignment = function(common_id) {

            $scope.data = {};
            if ($localStorage.userId != undefined) {
                   
                $scope.data.seller_id = $localStorage.userId;
                $scope.data.common_id = common_id;
                if ($state.params.id) {
                      $scope.data.discount_id = $state.params.id;
                }
                console.log('$scope.data', $scope.data);
                
                $serviceTest.delPriceLevelDiscAssignment($scope.data, function(response) {
                    if (response.code == 200) {
                         $location.path("/view_discounts/list");
                    } 
                });
                
            }

        };



    })

angular.module('alisthub').controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items, $rootScope) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };


    $scope.remove = function() {

        delete $rootScope.selectevent_date;
        delete $rootScope.startevent_time;
        delete $rootScope.endevent_time;

        $uibModalInstance.close($scope.selected.item);
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
 
angular.module('alisthub').controller('EventModalInstanceCtrl', function($localStorage, $scope, $uibModalInstance, items, $rootScope, $injector,ngTableParams) {
    var $serviceTest = $injector.get("discounts");
    $scope.all_check_point = 1;
    $scope.eventtoggleAll = function(id) {
            if (id == 1) {
                $scope.all_check_point = 2;
                var toggleStatus = true;
                $scope.enableEventAssign = true;
                $scope.listEvent = 1;
            }
            if (id == 2) {
                $scope.all_check_point = 1;
                var toggleStatus = false;
                $scope.enableEventAssign = false;
            }
            angular.forEach($scope.eventdata, function(itm) { itm.selected = toggleStatus; });
        }


        $scope.eventcheckbox = [];
        $rootScope.eventcheckboxGlobalIds = [];

        $scope.eventoptionToggled = function(idn) {
            if ($scope.eventcheckbox.indexOf(idn) !== -1) {
                $scope.eventcheckbox.pop(idn);
            } else {
                $scope.eventcheckbox.push(idn);
            }
            if ($scope.eventcheckbox.length > 0) {
                $scope.enableEventAssign = true;
                $rootScope.eventcheckboxGlobalIds = $scope.eventcheckbox;
            } else {
                $scope.enableEventAssign = false;
            }

            $scope.eventisAllSelected = $scope.eventdata.every(function(itm) {
                return itm.selected; })
        }


        $scope.eventmakeAssignment = function() {
                
                //console.log('eventmakeAssignment called');
            if( $rootScope.eventcheckboxGlobalIds != []){
                 $uibModalInstance.dismiss('cancel');
                 //console.log( $rootScope.eventcheckboxGlobalIds);
            }

           //$scope.assignedEventWithPriceLevel = false;
            $scope.eventInfo = {};
            if ($localStorage.userId != undefined) {
                $scope.eventInfo.user_id = $localStorage.userId;
                $scope.eventInfo.eventcheckboxGlobalIds = $rootScope.eventcheckboxGlobalIds;
                //console.log('$localStorage.discount' , $localStorage.discount);
               // $scope.eventInfo.discount = $localStorage.discount;
                $serviceTest.getEventPriceLevels($scope.eventInfo, function(response) {
                    if (response.code == 200) {
                        $rootScope.assignedEventWithPriceLevel=true;
                        $rootScope.assignedEvents = response.events;
                        $rootScope.assignedPriceLevels = response.price_levels;


                        /* for(var key in $rootScope.assignedEvents) {
                            var eventId = $rootScope.assignedEvents[key].id ;
                            $scope.data.event_id[eventId].all_price_levels = true;
                            console.log('$scope.data.event_id[eventId].all_price_levels' , $scope.data.event_id[eventId].all_price_levels);
                        }
                        */


                        
                        //console.log('$rootScope.assignedEvents');
                        //console.log($rootScope.assignedEvents);
                        //console.log('$rootScope.assignedPriceLevels');
                        //console.log($rootScope.assignedPriceLevels);

                        $rootScope.eventsChoosed = 1;

                        //console.log('$rootScope.eventsChoosed' , $rootScope.eventsChoosed);
                       // $rootScope.discount = $localStorage.discount = "";
                        //$location.path("/view_discounts/list");

                    } else {
                        //  $scope.eventdata = "";

                    }

                });
            } 
            /*$scope.adata = {};
            if ($localStorage.userId != undefined) {
                $scope.adata.seller_id = $localStorage.userId;

                $scope.adata.discount = $localStorage.discount;

                $serviceTest.makeDiscountAssignment($scope.adata, function(response) {
                    if (response.code == 200) {
                        $rootScope.discount = $localStorage.discount = "";
                        $location.path("/view_discounts/list");

                    } else {
                        //  $scope.eventdata = "";

                    }

                });
            } else {
                $scope.eventdata = "";
            }
            */
        };
    
    
    
    /** View list of all Events for assigning discount coupons ***/
        $scope.event_id = [];
       
        $scope.loader = false;
        $scope.viewEvents = function() {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                if ($scope.dt) {
                    $scope.data.search_date = $scope.dt;
                }
                if ($scope.search_type) {
                    $scope.data.search_type = $scope.search_type;
                }
                $serviceTest.viewEvents($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $rootScope.allEvents = [];
                        $scope.eventdata = response.result;
                        
                        for(var index in $scope.eventdata) {
                        var valId = $scope.eventdata[index].id;
                        var val = $scope.eventdata[index];
                            var obj = {};
                            obj[valId] = val;
                            $rootScope.allEvents.push(obj);
                            $scope.event_id.push(valId);
                        }
                        //console.log('$scope.event_id ------- ' , $scope.event_id);
                        $scope.tableParams = new ngTableParams(
            			{
            				page: 1,            // show first page
            				count: 5,           // count per page
            				sorting: {name:'asc'},
                                            
            			},
            			{
            				data:$scope.eventdata
            			});
                        
                        /* $scope.eventdata.forEach(function(value) {
                            $scope.event_id.push(value.id);
                        }); */

                    } else {
                        $scope.eventdata = "";
                    }

                });
            } else {
                $scope.eventdata = "";
            }
    };
    
    $scope.viewEvents();
    
    $scope.items = items;
       
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.remove = function() {

        $uibModalInstance.close($scope.selected.item);
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
    var now = new Date();
        if (now.getMonth() == 11) {
            var current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',

            //minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return '';
            //mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)
        }

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.option_ckeditor = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function() {
            // ...
        };
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.options1 = {
            customClass: getDayClass,
            initDate: current,
            showWeeks: true
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    ///////////////////////////////////////////////////////////////////////////////////
});

angular.module('alisthub').directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var text;
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

angular.module('alisthub').directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            
            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
            var decimalCheck = clean.split('.');
            if(!angular.isUndefined(negativeCheck[1])) {
                negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                clean =negativeCheck[0] + '-' + negativeCheck[1];
                if(negativeCheck[0].length > 0) {
                    clean =negativeCheck[0];
                }
                
            }
              
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });

angular.module('alisthub').directive('tooltip', function ($document, $compile) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {

      var tip = $compile('<div ng-class="tipClass">{{ text }}<div class="tooltip-arrow"></div></div>')(scope),
          tipClassName = 'tooltip',
          tipActiveClassName = 'tooltip-show';

      scope.tipClass = [tipClassName];
      scope.text = attrs.tooltip;
      
      if(attrs.tooltipPosition) {
        scope.tipClass.push('tooltip-' + attrs.tooltipPosition);
      }
      else {
       scope.tipClass.push('tooltip-down'); 
      }
      $document.find('body').append(tip);
      
      element.bind('mouseover', function (e) {
        tip.addClass(tipActiveClassName);
        
        var pos = e.target.getBoundingClientRect(),
            offset = tip.offset(),
            tipHeight = tip.outerHeight(),
            tipWidth = tip.outerWidth(),
            elWidth = pos.width || pos.right - pos.left,
            elHeight = pos.height || pos.bottom - pos.top,
            tipOffset = 10;
        
        if(tip.hasClass('tooltip-right')) {
          offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
          offset.left = pos.right + tipOffset;
        }
        else if(tip.hasClass('tooltip-left')) {
          offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
          offset.left = pos.left - tipWidth - tipOffset;
        }
        else if(tip.hasClass('tooltip-down')) {
          offset.top = pos.top + elHeight + tipOffset;
          offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
        }
        else {
          offset.top = pos.top - tipHeight - tipOffset;
          offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
        }

        tip.offset(offset);
      });
      
      element.bind('mouseout', function () {
        tip.removeClass(tipActiveClassName);
      });

      tip.bind('mouseover', function () {
        tip.addClass(tipActiveClassName);
      });

      tip.bind('mouseout', function () {
        tip.removeClass(tipActiveClassName);
      });

      
    }
  }
});