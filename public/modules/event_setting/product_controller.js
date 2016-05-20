angular.module('alisthub')
/** 
Angular Product Controller
Created : 2016-05-09
Created By: Manoj
Module : Product 
*/
    .controller('productController', function($scope, $localStorage, $injector, $http, $state, $location) {
        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        var $serviceTest = $injector.get("products");

        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }
        $scope.data = {};
        $scope.cdata = {};

        $scope.steps = [
            { "title": "Details", "icon": 'fa fa-calendar', 'id': 1 },
            { "title": "Pricing", "icon": 'fa fa-tags', 'id': 2 },
            { "title": "Options", "icon": 'fa fa-cog', 'id': 3 }
        ];
        $scope.selected2 = $scope.steps[0];
        $scope.file = {};
        $scope.addmore = [1];
        $scope.count = 2;
        /*Add more rows*/
        $scope.addMoreRow = function() {
            $scope.count = $scope.count + 1;
            $scope.addmore.push($scope.count);
        }

        /*Remove added rows*/
        $scope.removeMoreRow = function(key, id) {
            $scope.addmore.splice(key, 1);
            $scope.cdata[id] = null;
        }
        /*Remove added rows key*/
        $scope.removeMoreRowKey = function(key, id) {
            $scope.componentdata.splice(key, 1);
            $scope.cdata[id] = null;
        }
        /*Encode imgae as base64 URL*/
        $scope.encodeImageFileAsURL = function(str, id) {
            var filesSelected = document.getElementById("inputFileToLoad_" + id).files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; 

                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    if (id == 1) {
                        $scope.userNewPic_1 = srcData;
                    }
                    if (id == 2) {
                        $scope.userNewPic_2 = srcData;
                    }
                    if (id == 3) {
                        $scope.userNewPic_3 = srcData;
                    }
                    if (id == 4) {
                        $scope.userNewPic_4 = srcData;
                    }
                    if (id == 5) {
                        $scope.userNewPic_5 = srcData;
                    }

                    document.getElementById("imgTest_" + id).innerHTML = newImage.outerHTML;
                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }

        $scope.step_1 = true;
        $scope.step_2 = $scope.step_3 = false;
        $scope.selected2 = $scope.steps[0];

        /*Control the page layout*/
        $scope.click_menu = function(menu) {
            if (menu.id == 1) {
                $scope.step_1 = true;
                $scope.step_2 = $scope.step_3 = false;
                $scope.selected2 = $scope.steps[0];
            }
            if (menu.id == 2) {
                $scope.step_2 = true;
                $scope.step_1 = $scope.step_3 = false;
                $scope.selected2 = $scope.steps[1];
            }
            if (menu.id == 3) {
                $scope.step_3 = true;
                $scope.step_2 = $scope.step_1 = false;
                $scope.selected2 = $scope.steps[2];
            }
            $scope.selected2 = menu;
        }


        $scope.isActive2 = function(step2) {
            return $scope.selected2 === step2;
        };
        $scope.isActive2(0);
        $scope.files = [];

        /*Get files information*/
        $scope.getFileDetails = function(e) {
            $scope.$apply(function() {
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }
            });
        };

        /*Find Buyer product price*/
        $scope.calculateBuyerPrice = function() {
            if ($scope.data.retail_price != "" && $scope.data.ship_cost != "" && $scope.data.ship_cost != null && $scope.data.ship_cost != "undefined") {
                $scope.data.buyer_pays = $scope.data.retail_price + $scope.data.ship_cost;
            }
        }

        $scope.showConfig = function() {
            if ($scope.data.configuration == true) {
                $scope.data_configuration = true;
            }
            if ($scope.data.configuration == false) {
                $scope.data_configuration = false;
            }

        }

        /*Add product information*/
        $scope.addProduct = function(step) {
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                if ($scope.userNewPic_1) {
                    $scope.data.imgdata_1 = $scope.userNewPic_1;
                }
                if ($scope.userNewPic_2) {
                    $scope.data.imgdata_2 = $scope.userNewPic_2;
                }
                if ($scope.userNewPic_3) {
                    $scope.data.imgdata_3 = $scope.userNewPic_3;
                }
                if ($scope.userNewPic_4) {
                    $scope.data.imgdata_4 = $scope.userNewPic_4;
                }
                if ($scope.userNewPic_5) {
                    $scope.data.imgdata_5 = $scope.userNewPic_5;
                }
                //if(step == 2) {
                $scope.data.status = $scope.data.status == true ? 1 : 0;
                $scope.data.shippable = $scope.data.shippable == true ? 1 : 0;
                //$scope.data.shippable = $scope.data.shippable == true ? 1:0;
                $scope.data.taxable = $scope.data.taxable == true ? 1 : 0;
                $scope.data.configuration = $scope.data.configuration == true ? 1 : 0;
                $scope.data.purchsable_ticket = $scope.data.purchsable_ticket == true ? 1 : 0;
                $scope.data.print_voucher = $scope.data.print_voucher == true ? 1 : 0;

                $scope.data.step = step;

                if (step == 3 || step == 4) {
                    $scope.data.component = $scope.cdata;
                }

                $serviceTest.addProduct($scope.data, function(response) {
                    if (response.code == 200) {

                        if (step == 1) {
                            $scope.data.id = response.result.insertId;
                            $scope.step_2 = true;
                            $scope.step_1 = $scope.step_3 = false;
                            $scope.click_menu($scope.steps[1]);
                        }

                        if (step == 2) {
                            //$scope.data.id = response.result.insertId;
                            $scope.step_3 = true;
                            $scope.step_1 = $scope.step_2 = false;
                            $scope.click_menu($scope.steps[2]);
                        }

                        if (step == 3) {
                            $scope.step_3 = true;
                            $scope.step_1 = $scope.step_2 = false;
                            $scope.successmessage = global_message.productSaved;
                            if ($scope.data.configuration == 1) {
                                $scope.data_configuration = true;
                            }
                            if ($scope.data.configuration == 0) {
                                $scope.data_configuration = false;
                            }
                            $scope.click_menu($scope.steps[2]);
                        }

                        if (step == 4) {
                            $location.path("/view_products/list");
                        }


                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }

                });
            }
        };

        /*Get Buyer product price*/
        $scope.getProduct = function() {
            if ($localStorage.userId != undefined) {
                $scope.data.userId = $localStorage.userId;
                $scope.loader = true;
                $serviceTest.getProducts($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $scope.productdata = response.result;
                    } else {
                        $scope.error_message = response.error;
                    }
                });
            }
        };

        /*Get Listing of all product details*/
        if ($state.params.list) {
            $scope.getProduct();
        }

        $scope.page_title = 'ADD';
        $scope.callfunction = 0;

        /*Submit product details*/
        $scope.saveProduct = function(step) {
            if ($scope.callfunction == 0) {
                $scope.addProduct(step);
            }
            if ($scope.callfunction == 1) {
                $scope.editProduct(step);
            }
        }

        /*Edit product details*/
        if ($state.params.id) {
            $scope.callfunction = 1;

            $scope.page_title = 'EDIT';

            /*Get product details which need to edit*/
            $scope.getProductDetail = function() {
                if ($localStorage.userId != undefined) {
                    $scope.data.id = $state.params.id;
                    $scope.loader = true;
                    $serviceTest.productOverview($scope.data, function(response) {
                        $scope.loader = false;
                        if (response.code == 200) {
                            $scope.data = {};
                            $scope.data = response.result[0];

                            if ($scope.data.configuration == 1) {
                                $scope.data_configuration = true;
                            }
                            if ($scope.data.configuration == 0) {
                                $scope.data_configuration = false;
                            }

                            $scope.data.status = $scope.data.status == 1 ? true : false;
                            $scope.data.shippable = $scope.data.shippable == 1 ? true : false;
                            $scope.data.taxable = $scope.data.taxable == 1 ? true : false;
                            $scope.data.configuration = $scope.data.configuration == 1 ? true : false;
                            $scope.data.purchsable_ticket = $scope.data.purchsable_ticket == 1 ? true : false;
                            $scope.data.print_voucher = $scope.data.print_voucher == 1 ? true : false;

                            $scope.componentdata = response.component;
                            $scope.cdata = [];
                            $scope.componentdata.forEach(function(entry) {

                                $scope.cdata[entry.id] = {};
                                $scope.cdata[entry.id].sku = entry.sku;
                                $scope.cdata[entry.id].internal_name = entry.internal_name;
                                $scope.cdata[entry.id].display_name = entry.display_name;
                                $scope.cdata[entry.id].description = entry.description;
                                $scope.cdata[entry.id].pre_sale_limit = entry.pre_sale_limit;
                                $scope.cdata[entry.id].inventory = entry.inventory;

                                $scope.cdata[entry.id].active = entry.active == 1 ? true : false;
                                $scope.cdata[entry.id].print_voucher = entry.print_voucher == 1 ? true : false;
                            })
                        } else {
                            $scope.error_message = response.error;
                        }

                    });

                }
            };
            $scope.getProductDetail();
            if ($scope.data.configuration == 1) {
                $scope.data_configuration = true;
            }
            /*Update product details */
            $scope.editProduct = function(step) {
                if ($localStorage.userId != undefined) {
                    $scope.data.seller_id = $localStorage.userId;
                    $scope.data.id = $state.params.id;
                    if ($scope.userNewPic_1) {
                        $scope.data.imgdata_1 = $scope.userNewPic_1;
                    }
                    if ($scope.userNewPic_2) {
                        $scope.data.imgdata_2 = $scope.userNewPic_2;
                    }
                    if ($scope.userNewPic_3) {
                        $scope.data.imgdata_3 = $scope.userNewPic_3;
                    }
                    if ($scope.userNewPic_4) {
                        $scope.data.imgdata_4 = $scope.userNewPic_4;
                    }
                    if ($scope.userNewPic_5) {
                        $scope.data.imgdata_5 = $scope.userNewPic_5;
                    }
                    //if(step == 2) {
                    $scope.data.status = $scope.data.status == true ? 1 : 0;
                    $scope.data.shippable = $scope.data.shippable == true ? 1 : 0;
                    //$scope.data.shippable = $scope.data.shippable == true ? 1:0;
                    $scope.data.taxable = $scope.data.taxable == true ? 1 : 0;
                    $scope.data.configuration = $scope.data.configuration == true ? 1 : 0;
                    $scope.data.purchsable_ticket = $scope.data.purchsable_ticket == true ? 1 : 0;
                    $scope.data.print_voucher = $scope.data.print_voucher == true ? 1 : 0;
                    $scope.data.step = step;

                    if (step == 3 || step == 4) {
                        $scope.data.component = $scope.cdata;
                    }
                    $serviceTest.addProduct($scope.data, function(response) {
                        if (response.code == 200) {
                            $scope.idata = {};

                            if (step == 1) {
                                $scope.step_2 = true;
                                $scope.step_1 = $scope.step_3 = false;
                                $scope.click_menu($scope.steps[1]);
                            }

                            if (step == 2) {
                                $scope.step_3 = true;
                                $scope.step_1 = $scope.step_2 = false;
                                $scope.click_menu($scope.steps[2]);
                            }

                            if (step == 3) {
                                $scope.step_3 = true;
                                $scope.step_1 = $scope.step_2 = false;
                                $scope.successmessage = global_message.productSaved;
                                if ($scope.data.configuration == 1) {
                                    $scope.data_configuration = true;
                                }
                                if ($scope.data.configuration == 0) {
                                    $scope.data_configuration = false;
                                }
                                $scope.click_menu($scope.steps[2]);
                            }

                            if (step == 4) {
                                $location.path("/view_products/list");
                            }
                        } else {
                            $scope.activation_message = global_message.ErrorInActivation;
                        }
                    });
                }
            };
        }

        /*delete product information*/
        $scope.delProduct = function(id) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.id = id;
                $serviceTest.deleteProduct($scope.data, function(response) {
                    if (response.code == 200) {
                        $location.path("/view_products/list");
                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }

                });
            }
        };
        
        /*enable/disable the product information*/
        $scope.changeStatus = function(id, status) {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.id = id;
                $scope.data.status = status == 1 ? 0 : 1;
                $serviceTest.changeProductStatus($scope.data, function(response) {
                    if (response.code == 200) {
                        $scope.getProduct();
                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }
                });
            }
        };
    })

.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files); // use for multiple files
                });
            });
        }
    };
}])

/** 
Angular Manage Product Controller
Created : 2016-05-09
Created By: Manoj
Module : Product 
*/
.controller('manageProductController', function($scope, $localStorage, $injector, $http, $state, $location) {

    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }

    var $serviceTest = $injector.get("products");

    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }

    $scope.data = {};
/*Get the product details which need to edit*/
    $scope.getProduct = function() {
        if ($localStorage.userId != undefined) {
            $scope.data.userId = $localStorage.userId;
            $scope.loader = true;
            $serviceTest.getProducts($scope.data, function(response) {
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.productdata = response.result;
                } else {
                    $scope.error_message = response.error;
                }

            });

        }
    };

    if ($state.params.list) {
        $scope.getProduct();
    }

/*Enable/diable the product status*/
    $scope.changeStatus = function(id, status) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $scope.data.status = status == 1 ? 0 : 1;
            $serviceTest.changeProductStatus($scope.data, function(response) {
                if (response.code == 200) {
                    $scope.getProduct();
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }

            });
        }
    };

/*Delete the product status*/
    $scope.delProduct = function(id) {
        $scope.data = {};
        if ($localStorage.userId != undefined) {
            $scope.data.id = id;
            $serviceTest.deleteProduct($scope.data, function(response) {
                if (response.code == 200) {
                    $scope.getProduct();
                } else {
                    $scope.activation_message = global_message.ErrorInActivation;
                }

            });
        }
    };

/*get Product setting*/
    $scope.products = {};
    $scope.getProductSetting = function() {
        $scope.sdata = {};
        $scope.sdata.seller_id = $localStorage.userId;
        $serviceTest.getProductSetting($scope.sdata, function(response) {
            if (response.code == 200) {
                $scope.activation_message = 'saved';
                $scope.products = response.result[0];
                $scope.products.setting_id = $scope.products.id;
            } else {
                $scope.activation_message = global_message.ErrorInActivation;
            }

        });

    }

/*save product setting*/
    $scope.getProductSetting();
    $scope.saveProductSetting = function() {
        $scope.products.seller_id = $localStorage.userId;
        if ($scope.products.setting_id) {
            $scope.products.setting_id = $scope.products.setting_id;
        }
        $serviceTest.productSettingsData($scope.products, function(response) {
            if (response.code == 200) {
                $scope.activation_message = 'saved';
                $location.path("/view_products/list");
            } else {
                $scope.activation_message = global_message.ErrorInActivation;
            }
        });
    }
})