angular.module('alisthub').controller('createpackageControllerTwo', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state) {
   
  //For Step 2
var $serviceTest = $injector.get("event_package");
  //////////////////////////////////////////////////////

    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }
  ///////////////////////////////////////////////////////////

  $scope.data = {};
  $scope.loader = false;
  $scope.showBundleList = $rootScope.showBundleList=true;
  $scope.showProductsList = $rootScope.showProductsList = true;
  
  $scope.success_message = $scope.error_time_message = true;
  $rootScope.success_message1 = false;


    var packageId = '';
    var userId = '';

  if($stateParams.packageId!=undefined && $stateParams.packageId!='') {
    packageId = $rootScope.packageId = $stateParams.packageId;
  } 

  if ($localStorage.userId != undefined) {
    $scope.data.user_id = $localStorage.userId;
    userId = $localStorage.userId;
  }


  $scope.data = {
    price_type: 0
  };

  //To get steps
  $scope.steps=[
     { "title":"DETAILS","icon":'fa fa-calendar','id':1},
     { "title":"PRICING","icon":'fa fa-tags','id':2},
     { "title":"OPTIONS","icon":'fa fa-cog','id':3},
   ];

  $scope.error_message = true;


  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
   $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
   $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
    $scope.popup3 = {
    opened: false
  };
    $scope.popup4 = {
    opened: false
  };




  




    $serviceTest.getPackage({'package_id':packageId , 'user_id' : userId },function(response){
        $scope.data=response.results[0];
        console.log('$scope.data.price_type ' , $scope.data.price_type );
    });
	

    $serviceTest.getEventsInPackage({'package_id':packageId},function(response){
        $rootScope.eventsInPackage  = $scope.eventsInPackage = response.results;
        console.log('$scope.eventsInPackage ' , $scope.eventsInPackage );
    });
  
  /*$serviceTest.getEventCat({'event_id':event_id},function(response){
	 
	 angular.forEach(response.result,function(value, key){
	 var k=key+1;
	 if(k==1){
	 $scope.data.category1=(value.category_id).toString();
	 }
	 if(k==2){
	 $scope.data.category2=(value.category_id).toString();
	 }
	 if(k==3){
	 $scope.data.category3=(value.category_id).toString();
	 }
	 });
	}); */


  $scope.eventBundle = {};
  //$scope.eventBundle.eventId = $stateParams.eventId;
  $scope.eventBundle.eventsInPackage = $scope.eventsInPackage; 
  $scope.eventBundle.user_id = userId;
  $scope.eventBundle.package_id = packageId;
    console.log('$scope.eventBundle ' , $scope.eventBundle );

  //To get bundles
  $serviceTest.getBundlesInPackage($scope.eventBundle, function(response) {
    //$rootScope.bundleList = response.results;
    $scope.loader_bundle = true;
    if(response.results) {
      $scope.loader_bundle = false;
      $rootScope.bundleInPackageList = response.results;
    }
  });


  /* To fetch the product data related to specific event*/ 
  $scope.product = {};
  $scope.product.eventsInPackage = $scope.eventsInPackage; 
  $scope.product.package_id = packageId;
  $scope.product.user_id = userId;
  console.log('$scope.product ' , $scope.product );

  $serviceTest.getProductsInPackage($scope.product, function(response) {
    //$rootScope.eventProductList = response.result;
    $scope.loader_product = true;
    if(response.results) {
      $scope.loader_product = false;
      $rootScope.productInPackageList = response.results;
    }
  });
  
   //update price level
   $scope.getPrice=function(id){
        $rootScope.data={};
        $serviceTest.getSinglePricelevel({'id':id},function(response){
            if (response.code==200) {
                $scope.open_price_level('lg');
                
                $rootScope.data=response.results[0];
                if (!$rootScope.data.description) {
                  $rootScope.data.description = '';
                }
                $rootScope.maximum_quantitiy_available_value = parseInt($rootScope.data.quantity_available) + parseInt($rootScope.inventory_remaining);
                // console.log("line 503 max quantity value - ", $rootScope.maximum_quantitiy_available_value)
            }
        }); 
    }
    

    // To get Price level.
    $scope.availQuantity=0;
    $scope.totalRemainings=0;
    $scope.totalRemainingsError = false;
    $rootScope.eventInventoryCalc=function()
    {
      // console.log("ineventpricecalc")
      $scope.availQuantity=0;
      $scope.totalRemainings=0;

      if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
        var pricelevelEventId = $stateParams.eventId;
      } else {
        var pricelevelEventId = $localStorage.eventId;
      }

/*
      $serviceTest.getPricelevel({'eventId' : pricelevelEventId},function(response){
        $rootScope.price_level=response.results;

        $scope.priceLevel=response.results;
        var pricelevelData=$scope.priceLevel;
        var pricelevelDataLength = pricelevelData.length;
        // console.log("pricelevelDataLength" , pricelevelDataLength , pricelevelData)
        for( var i=0 ; i < pricelevelDataLength ; i++ )
        {
          $scope.availQuantity=$scope.availQuantity+pricelevelData[i].quantity_available;
          // console.log($scope.availQuantity)
        }

        if ($scope.data.eventinventory) {
            // console.log("in if")
            $scope.inventoryTextVal=$scope.data.eventinventory;
            // console.log($scope.inventoryTextVal , parseInt($scope.inventoryTextVal) , $scope.availQuantity , parseInt($scope.availQuantity))
            $scope.totalRemainings=  parseInt($scope.inventoryTextVal) - parseInt($scope.availQuantity);

            if ($scope.totalRemainings < 0) {
                $scope.totalRemainingsError = true;
                $scope.totalRemainings = "Error";
            }

            $rootScope.eventinventory= $scope.inventoryTextVal;

            $rootScope.inventory_remaining = $scope.totalRemainings;
        }
      });

      */
    }

    $rootScope.eventInventoryCalc();

    //change status of price level
    $scope.changeStatus = function(id,status) {
        
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
         $scope.loader = true;
        $serviceTest.changePricelevelStatus($scope.data,function(response){
            
            if (response.code == 200) {
                     $eventId=$localStorage.eventId;
                    $serviceTest.getPricelevel({'eventId':$eventId},function(response){
                        
                        $rootScope.price_level=response.results;
                    });
                    $scope.loader = false;
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
                    $scope.loader = false;
            }
            
        });
        }
    };



  //To get ages
  /*
  $serviceTest.postEventdata({
    'var': 'ages'
  }, function(response) {

    if (response !== null) {
      if (response.code === 200) {
        $scope.ages = response.results;

        $scope.data.custom_ages = ($scope.ages[0].age).toString();
      }
    }


  });

  */



  ///////////////////////////////steps event///////////////



  //To get Event Category
  /* $serviceTest.postEventdata({
    'var': 'event_category'
  }, function(response) {


    if (response.code === 200) {
      $scope.cat1 = $scope.cat2 = $scope.cat3 = response.results;
      $scope.data.category1 = ($scope.cat1[0].category_id).toString();


    }

  }); */

  //To save step2 data.
  // price_and_link_data 
  $scope.postSecondStepPackageData = function(data) {
    // data.eventId = $localStorage.eventId;
    data.packageId = $rootScope.packageId ;
    console.log('data ' , data);
    $serviceTest.postSecondStepPackageData(data, function(response) {
      if (response.code == 200) {
        $scope.success = global_message.save_package;

        $scope.success_message = false;
        $timeout(function() {
          $scope.success = '';
          $scope.success_message = true;
        }, 3000);
        // window.location.reload();
      }
    });
  }





  //$scope.multiple_event_div = $scope.venue_event_div = $scope.price_and_link_div = $scope.look_and_feel_div = $scope.setting_div = $scope.dynamic_age_div = $scope.return_age_text_div = true;

  //To show custom age div

  $scope.custom_age = function() {
    $scope.age_div = $scope.age_text_div = true;
    $scope.dynamic_age_div = $scope.return_age_text_div = false;
    $scope.data.ages = '';
  }

  //To show default age
  $scope.custom_default_age = function() {
      $scope.age_div = $scope.age_text_div = false;
      $scope.dynamic_age_div = $scope.return_age_text_div = true;
      $scope.data.dynamic_age = '';
    }


  // To show selected  step.

  $scope.selected2 = $scope.steps[1];


  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

  $scope.click_menu = function(menu, data, valid) {
    
    console.log('$stateParams.packageId ' , $stateParams.packageId);
    console.log('m here');
    console.log('menu' , menu);
    console.log('menu.id' , menu.id);


    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 1) {
console.log('$stateParams.packageId ' , $stateParams.packageId);
console.log('$rootScope.packageId ' , $rootScope.packageId);

      if($stateParams.packageId == $rootScope.packageId) {
        $location.path("/edit_event_step1/"+$rootScope.packageId); 
        return false;

      }
      
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 2) {
      console.log('------2----');
      if (objectForm.myForm.$valid === true) {
          $scope.selectedClass = 2;
          if($stateParams.packageId != null && $stateParams.packageId !=undefined && $stateParams.packageId !='') {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
          
      } else {
        $scope.selectedClass = 1;
        $scope.success_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.success_message = true;
          $scope.error = '';
        }, 3000);
      }
    }

    if (menu.id === 3) {
            console.log('-----3----');

      $scope.selectedClass = 3;
          if($stateParams.packageId!=undefined && $stateParams.packageId!='' && $stateParams.packageId!= null) {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
    }
    //$scope.selected2 = menu;
  }
  



  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
  $scope.isActive1 = function(venue) {
    return $scope.selected1 === venue;
  };

  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

  //For Step 2
  $scope.items = ['item1'];

  $scope.animationsEnabled = true;

  // Add Price level
  $scope.open_price_level = function(size) {
    $rootScope.data = {};
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentPrice.html',
      controller: 'ModalInstancePriceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };

  /* evnt inventory */
  $rootScope.eventinventory = $scope.data.eventinventory

  //Schedule Price change
  $scope.price_change = function(size, priceid) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'pricechange.html',
      controller: 'PricechangeCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.price_change_id = priceid;
          return $scope.items;
        }
      }
    });

  }


  //delete Price level
  $scope.delete_price_level = function(size, index, price_id) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deletePricelevel.html',
      controller: 'DeletePricelevelCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.delete_price_level_id = index;
          $rootScope.price_leveldelete_id = price_id;
          return $scope.items;
        }
      }
    });
  };

  //Add bundle pop up
  $scope.add_bundle = function(size, bundleId) {
    $rootScope.editBundleId = bundleId;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentBundle.html',
      controller: 'ModalInstanceBundleCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };

  //Add Product pop up
  $scope.add_product = function(size, packageProductId, productId) {
    $rootScope.packageProductId = packageProductId;
    $rootScope.productId = productId;
    console.log('$rootScope.productId' , productId ,'$rootScope.packageProductId ' , $rootScope.packageProductId , ' packageProductId ' , packageProductId)
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentProduct.html',
      controller: 'ModalInstanceProductCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };


   


  /** Module: Event page Step 2*/
 $scope.eventBundle = {};
  $scope.success_message_bundle = false;
  $scope.loader_bundle = false;
  //change status of Bundle
  $scope.changePackageBundleStatus = function(id, status) {
    $scope.data = {};
    if ($localStorage.userId !== undefined) {
      $scope.data.id = id;
      $scope.data.status = status;
      $scope.loader_bundle = true;
      $serviceTest.changePackageBundleStatus($scope.data, function(response) {
        if (response.code === 200) {
$scope.loader_bundle = false;
          $scope.success_message_bundle = true;
          $scope.success_bundle = global_message.bundle_save;
          $timeout(function() {
            $scope.error = '';
            $scope.success_message_bundle = false;
            $scope.success_bundle = '';
          }, 3000);

         //To get bundles
  $scope.eventBundle.user_id = $localStorage.userId;
  $scope.eventBundle.package_id = $localStorage.packageId;
  $rootScope.showBundleList=false;
  console.log('hide showBundleList ');
  $serviceTest.getBundlesInPackage($scope.eventBundle, function(response) {
    console.log('response.result' , response.results);
    if(response.results) {
      $rootScope.showBundleList=true;
       console.log('show showBundleList ');
      $rootScope.bundleInPackageList = response.results;
      console.log('$rootScope.bundleInPackageList' , $rootScope.bundleInPackageList);
      
    }
  });


        } else {
          $scope.activation_message = global_message.ErrorInActivation;
          $scope.loader_bundle = false;
        }
      });
    }
  };

  //delete Bundle
  $scope.delete_bundle = function(size, index, bundle_id) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deleteBundle.html',
      controller: 'deleteBundleCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.bundleIdDelete = index;
          $rootScope.bundleDeleteId = bundle_id;
          return $scope.items;
        }
      }
    });
  };

  //delete event poduct
  $scope.delete_event_product = function(size, index, packageProductId) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deleteEventProduct.html',
      controller: 'deleteEventProductCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.packageProductIdDelete = index;
          $rootScope.packageProductDeleteId = packageProductId;
          return $scope.items;
        }
      }
    });
  };


});


angular.module('alisthub').controller('advanceSetting', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad) {

  if (!$localStorage.isuserloggedIn) {
    $state.go('login');
  }

  var $serviceTest = $injector.get("event_package");

  $scope.data = {};

  $scope.getAdvanceSetting = function() {

    if ($localStorage.userId !== undefined) {
      $scope.data.seller_id = $localStorage.userId;
      $scope.data.event_id = 10;
      $serviceTest.getAdvanceSetting($scope.data, function(response) {
        $scope.loader = false;
        if (response.code === 200) {
          $scope.data = {};
          $scope.data = response.result[0];
        } else {
          $scope.error_message = response.error;
        }

      });

    }
  };
  $scope.getAdvanceSetting();

  $scope.saveAdvanceSettings = function() {
    if ($localStorage.userId !== undefined) {
      $scope.data.event_id = 10;
      $scope.data.seller_id = $localStorage.userId;
      $serviceTest.saveAdvanceSettings($scope.data, function(response) {
        if (response.code === 200) {
          $rootScope.success_message = true;
          $rootScope.success = global_message.advanceSettingSaved;
          $scope.data = response.result[0];
        } else {
          $scope.error_message = true;
          $scope.error = global_message.advanceSettingSavingError;

          $timeout(function() {
            $scope.error_message = false;
            $scope.error = '';
          }, 3000);
        }

      });
    }
  }


  /* Edit advance settings of seller*/



});


angular.module('alisthub').controller('deleteBundleCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  //Remove Bundle data
  $scope.removeBundle = function() {
    var $serviceTest = $injector.get("event_package");
    $serviceTest.removePackageBundle({
      'bundleDeleteId': $rootScope.bundleDeleteId
    }, function(response) {
      if (response.code === 200) {

        $rootScope.success_message_bundle = true;
        $rootScope.success_bundle = global_message.bundle_save;
        $timeout(function() {
          $rootScope.error = '';
          $rootScope.success_message_bundle = false;
          $rootScope.success_bundle = "";

        }, 3000);
        $rootScope.bundleInPackageList.splice($rootScope.bundleIdDelete, 1);
      }
      $uibModalInstance.close($scope.selected.item);
    });
  }

});


angular.module('alisthub').controller('DeletePricelevelCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  //Remove Price level
  $scope.remove = function() {

    var $serviceTest = $injector.get("event_package");
    $serviceTest.removepricelevel({
      'price_leveldelete_id': $rootScope.price_leveldelete_id
    }, function(response) {
      if (response.code === 200) {
        $rootScope.success_message1 = true;
        $rootScope.success1 = global_message.price_level_remove;
        $timeout(function() {
          $rootScope.error = '';
          $rootScope.success_message1 = false;
          $rootScope.success1 = '';
        }, 3000);
        // $rootScope.price_level.splice($rootScope.delete_price_level_id, 1);
        $rootScope.eventInventoryCalc();
      }
      $uibModalInstance.close($scope.selected.item);

    });

  }

});

angular.module('alisthub').controller('ModalInstancePriceCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {
  var $serviceTest = $injector.get("event_package");




  if ($rootScope.data.id === undefined) {
    $scope.data = {
      hide_online: 0,
      hide_in_box_office: 0
    };

    $rootScope.maximum_quantitiy_available_value = false;

  } else {
    $scope.data.price_level = $rootScope.data.price_level_name;
    $scope.data.price_type = $rootScope.data.price_level_type;
    $scope.data.minimum_per_order = $rootScope.data.min_per_order;
    $scope.data.maximum_per_order = $rootScope.data.max_per_order;

    $scope.data = $rootScope.data;

    if ($rootScope.data.description == "undefined") {
      $scope.data.description = '';
    }    
  }

  $scope.QuanAvailClear = function() {
    $scope.data.minimum_per_order = null;
    $scope.data.maximum_per_order = null;
  }




  $scope.items = items;
  $scope.min_price = true;
  //To change Price type function
  $scope.change_price_type = function() {

      if ($scope.data.price_type === 'name_your_price') {
        $scope.min_price = false;
        $scope.online_price = true;
      } else {
        $scope.online_price = false;
        $scope.min_price = true;
      }
    }
    //Online price function
  $scope.onlinePricefunc = function() {

      $scope.data.box_office_price = $scope.data.online_price;
    }
    //Suggested Price function
  $scope.suggestedPricefunc = function() {

    $scope.data.box_office_price = $scope.data.suggested_price;
  }

  $scope.selected = {
    item: $scope.items[0]
  };



  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  //For step 2 Save Price level
  $scope.savepriceleveldata = function(data) {
    data.userId = $localStorage.userId;
    data.eventId = $localStorage.eventId;

    $serviceTest.savepriceleveldata(data, function(response) {

      if (response !== null) {
        if (response.code === 200) {
          $scope.data = $rootScope.price_level = [];
          $serviceTest.getPricelevel({
            'eventId': data.eventId
          }, function(response) {
            $rootScope.success_message1 = true;
            if (data.id !== undefined) {
              $rootScope.success1 = global_message.price_level_update;
            } else {
              $rootScope.success1 = global_message.price_level_add;
            }



            $timeout(function() {
              $rootScope.error = '';
              $rootScope.success_message1 = false;
              $rootScope.success1 = '';
            }, 3000);
            $rootScope.price_level = response.results;

            $rootScope.data={};
          });
          $rootScope.eventInventoryCalc();
          $uibModalInstance.dismiss('cancel');
        }
      }

      $rootScope.data={};
    });
  }

   

 /* CREATED BY DEEPAK K */ 

  
  $scope.eventInventory = $rootScope.inventory_remaining;
  if ($rootScope.maximum_quantitiy_available_value)
    $scope.eventInventory=$rootScope.maximum_quantitiy_available_value;

  // console.log($scope.eventInventory)
  /***********************************************/
 

});

/*
Module for the bundle popup
*/

angular.module('alisthub').controller('ModalInstanceBundleCtrl', function($scope, $uibModalInstance, items, $rootScope, $injector, $localStorage, $location, $timeout) {
  var $serviceTest = $injector.get("event_package");
  $scope.data = {};
  $scope.eventBundle = {};
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.bundle = {};
  $scope.editBundle = {};
  $scope.totalQty = 0;
  $localStorage.bundleId = '';
  $scope.error = '';
  $scope.error_message = true;

  $scope.bundleInPackageList = $rootScope.bundleInPackageList;
  //Bundle Steps
  $scope.steps = [{
    "title": "Details",
    "icon": 'fa fa-calendar',
    'id': 1
  }, {
    "title": "Quantities",
    "icon": 'fa fa-cog',
    'id': 2
  }, {
    "title": "Price",
    "icon": 'fa fa-tags',
    'id': 3
  }];



  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

  /* bundle tab stop */
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
    //console.log('$rootScope.packageId' , $rootScope.packageId);
    //console.log('REdirect Path is :----- ' , "/event_package_step_2/"+$rootScope.packageId);
    //$location.path("/event_package_step_2/"+$rootScope.packageId);
  };

  function toBoolean(value) {
    var strValue = String(value).toLowerCase();
    strValue = ((!isNaN(strValue) && strValue !== '0') &&
      strValue !== '' &&
      strValue !== 'null' &&
      strValue !== 'undefined') ? '1' : strValue;
    return strValue === 'true' || strValue === '1' ? true : false
  };

  /* Function for editing the detail */
  $scope.getBundleDetail = function() {
    if ($localStorage.userId !== undefined) {
      $scope.editBundle.userId = $localStorage.userId;
      $scope.editBundle.editBundleId = $rootScope.editBundleId;
console.log('$scope.editBundle' , $scope.editBundle);
      $serviceTest.getBundleDetailOfPackage($scope.editBundle, function(response) {
        $scope.loader = false;
        if (response.code === 200) {
          $scope.bundle = {};
          $scope.bundle.id = response.result[0].id;
          $scope.bundle.bundle_name = response.result[0].bundle_name;
          $scope.bundle.bundle_description = response.result[0].bundle_description;
          $scope.bundle.bundle_limit = response.result[0].bundle_limit;
          $scope.bundle.bundle_minimum_purchase = response.result[0].bundle_minimum_purchase;
          $scope.bundle.assign_inventory = response.result[0].assign_inventory;
          $scope.bundle.hide_online = toBoolean(response.result[0].hide_online);
          $scope.bundle.assign_inventory = toBoolean(response.result[0].assign_inventory);
          $scope.bundle.multiple_ticket_holder = toBoolean(response.result[0].multiple_ticket_holder);
          $scope.bundle.hide_in_box_office = toBoolean(response.result[0].hide_in_box_office);
          $scope.bundle.status = toBoolean(response.result[0].status);
          $scope.bundle.bundle_inventory = response.result[0].bundle_inventory;
          $scope.bundle.totalQty = response.result[0].total_qty;
          $scope.bundle.totalOnlineShow = response.result[0].total_online;
          $scope.bundle.totalBoxofficeShow = response.result[0].total_boxoffice;
        } else {
          $scope.error_message = response.error;
        }
      });
    }
  };

  // get bundle details at edit time
  if ($rootScope.editBundleId !== undefined) {
    $scope.getBundleDetail();
  }


  $scope.addBundle = function(bundle) {
    if ($localStorage.userId !== undefined) {
      $scope.bundle.seller_id = $localStorage.userId;
      $scope.bundle.step = 1;
     // $scope.bundle.event_id = $localStorage.eventId;
      $scope.bundle.package_id = $rootScope.packageId;

console.log('$scope.bundle' , $scope.bundle);

       $serviceTest.addBundleInPackage($scope.bundle, function(response) {

        if (response.code === 200) {
          if (bundle.id === undefined) {

            $localStorage.bundleId = response.result.insertId;
            $scope.bundle.id = $localStorage.bundleId;
            $scope.success = global_message.bundle_add;
          } else {
            $localStorage.bundleId = bundle.id;
            $scope.success = global_message.bundle_update;

  //To get bundles
  $scope.eventBundle.user_id = $localStorage.userId;
  $scope.eventBundle.package_id = $localStorage.packageId;
  $rootScope.showBundleList=false;
  console.log('hide showBundleList ');
  $serviceTest.getBundlesInPackage($scope.eventBundle, function(response) {
    console.log('response.result' , response.results);
    if(response.results) {
      $rootScope.showBundleList=true;
       console.log('show showBundleList ');
       $rootScope.bundleInPackageList = response.results;
      console.log('$rootScope.bundleInPackageList' , $rootScope.bundleInPackageList);
      
    }
  });
          }

          $scope.success_message = true;

          $timeout(function() {
            $scope.error = '';
            $scope.success_message = false;
            $scope.success = '';
          }, 3000);
        } else {
          $scope.activation_message = global_message.ErrorInActivation;
        }
      });

      
    }
  };


  //To get Total of Bundle
  $scope.getTotal = function() {
    var totalQty = 0;
    var totalOnline = 0;
    var totalBoxoffice = 0;

    for (var i = 0; i < $scope.price_level.length; i++) {
      var quantity = $scope.price_level[i].qty;
      if(quantity == '' || quantity == undefined || quantity == 0) {
        quantity = 0;
      }
      totalQty += parseInt(quantity);
      totalOnline += parseFloat(quantity * $scope.price_level[i].online_price);
      totalBoxoffice += parseFloat(quantity * $scope.price_level[i].box_office_price);
    }

    for (var i = 0; i < $scope.productList.length; i++) {
      var quantity = $scope.productList[i].qty;
       if(quantity == '' || quantity == undefined || quantity == 0) {
        quantity = 0;
      }
      totalQty += parseInt(quantity);
      totalOnline += parseFloat(quantity * $scope.productList[i].retail_price);
      totalBoxoffice += parseFloat(quantity * $scope.productList[i].retail_price);
    }

    $scope.totalQty = totalQty;
    $scope.totalOnlineShow = totalOnline;
    $scope.totalBoxofficeShow = totalBoxoffice;
    $scope.totalOnline = totalOnline;
    $scope.totalBoxoffice = totalBoxoffice;
  }



  $scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  };
  //Update quantity
  $scope.updateQty = function(status) {
console.log('localStorage.bundleId ' , localStorage.bundleId );

    $scope.bundle.bundle_id = $localStorage.bundleId;
    $scope.bundle.totalQty = $scope.totalQty;
    $scope.bundle.totalOnline = $scope.totalOnline;
    $scope.bundle.totalBoxoffice = $scope.totalBoxoffice;
    $scope.bundle.price_level = $scope.price_level;
    $scope.bundle.productList = $scope.productList;

console.log('$scope.bundle' , $scope.bundle) ;

    $serviceTest.updateBundleInPackage($scope.bundle, function(response) {

      if (response.code === 200) {
       
  //To get bundles
  $scope.eventBundle.user_id = $localStorage.userId;
  $scope.eventBundle.package_id = $localStorage.packageId;
  $rootScope.showBundleList=false;
  console.log('hide showBundleList ');
  $serviceTest.getBundlesInPackage($scope.eventBundle, function(response) {
    console.log('response.result' , response.results);
    if(response.results) {
      $rootScope.showBundleList=true;
       $rootScope.bundleInPackageList = response.results;
      console.log('$rootScope.bundleInPackageList' , $rootScope.bundleInPackageList);
      
    }
  });




        if (status === 'submit') {

          $scope.success_message_bundle = true;
          $scope.success_bundle = global_message.bundle_save;
          $timeout(function() {
            $scope.error = '';
            $scope.success_message_bundle = false;
            $scope.success_bundle = '';
          }, 3000);

          $scope.cancel();   
            
        }

        $scope.success = global_message.bundle_update;
        $timeout(function() {
          $scope.error = '';
          $scope.success_message = false;
          $scope.success = '';
        }, 3000);



          

      } else {
        $scope.activation_message = global_message.ErrorInActivation;
      }
    });
  };
  //To get Products
  $scope.getProduct = function() {
    if ($localStorage.userId !== undefined) {
      $scope.data.userId = $localStorage.userId;

      if ($rootScope.editBundleId === undefined) {
        $scope.data.bundleId = $localStorage.bundleId;
      } else {
        $scope.data.bundleId = $rootScope.editBundleId;
      }

      $serviceTest.getProducts($scope.data, function(response) {
        $scope.loader = false;
        if (response.code === 200) {
          $scope.productList = response.result;
        } else {
          $scope.error_message = response.error;
        }
      });
    }
  };

   //To get Products
  $scope.getBundleProductsInPackage = function() {
    if ($localStorage.userId !== undefined) {
      $scope.data.userId = $localStorage.userId;

      if ($rootScope.editBundleId === undefined) {
        $scope.data.bundleId = $localStorage.bundleId;
      } else {
        $scope.data.bundleId = $rootScope.editBundleId;
      }
console.log('at line 1122 $scope.data ' , $scope.data) ;
      $serviceTest.getBundleProductsInPackage($scope.data, function(response) {
        $scope.loader = false;
        if (response.code === 200) {
          $scope.productList = response.result;
        } else {
          $scope.error_message = response.error;
        }
      });
    }
  };


  $scope.eventPrice = {};
  $scope.allEventsPriceLevels = [];
  $scope.getAllEventsPriceLevelInPackage = function() {
    if ($localStorage.userId !== undefined) {
      $scope.eventPrice.userId = $localStorage.userId;
      $scope.eventPrice.allEventId = $rootScope.eventsInPackage;
      //$scope.eventPrice.eventId = $localStorage.eventId;
      //$scope.allEventId =  $rootScope.eventsInPackage;
      $scope.allEventId = $rootScope.eventsInPackage; ;
      var allEventIdStr = '';



  for (var index in $rootScope.eventsInPackage) {
      event_id = $rootScope.eventsInPackage[index].event_id ;
      console.log('event_id' , event_id);
      allEventIdStr+=event_id+",";
      }

    console.log('allEventIdStr' , allEventIdStr);
      $scope.eventPrice.allEventIdStr = allEventIdStr;

      if ($rootScope.editBundleId === undefined) {
        $scope.eventPrice.bundleId = $localStorage.bundleId;
      } else {
        $scope.eventPrice.bundleId = $rootScope.editBundleId;
      }


      var allEventId = $scope.allEventId;
      var allEventIdLength = allEventId.length;

          $serviceTest.getAllEventsPriceLevelInPackage($scope.eventPrice, function(response) {
              $scope.loader = false;
              if (response.code === 200) {
                $scope.eventsInPackage = $rootScope.eventsInPackage;
                $scope.price_level = response.result;
                //$scope.allEventsPriceLevels.push(response.result);
                //console.log('$scope.allEventsPriceLevels' , $scope.allEventsPriceLevels );
              } else {
                $scope.error_message = response.error;
              }
            });
        

        /*
         for( var i=0 ; i < allEventIdLength ; i++ )
        {
          console.log('eventId = ' , $scope.allEventId[i].event_id );
          $scope.eventPrice.eventId = $scope.allEventId[i].event_id ;

          $serviceTest.getEventPriceLevelInPackage($scope.eventPrice, function(response) {
              $scope.loader = false;
              if (response.code === 200) {

                $scope.price_level = response.result;
                $scope.allEventsPriceLevels.push(response.result);
                console.log('$scope.allEventsPriceLevels' , $scope.allEventsPriceLevels );
              } else {
                $scope.error_message = response.error;
              }
            });
        } 

        */

    }
  };


  $scope.click_menu = function(menu , bundle) {
    console.log('i am here at line 1161')
    var bundleForm = this;

    $scope.selectedClass = 1;
    if (menu.id === 1) {
      $scope.selectedClass = 1;
      $scope.step_1 = true;
      $scope.step_2 = $scope.step_3 = false;
    }
    if (menu.id === 2) {
      if (bundleForm.bundleForm.$valid === true) {
console.log('$localStorage.bundleId' , $localStorage.bundleId);

        if (!$localStorage.bundleId) {

            if ($localStorage.userId !== undefined) {
              $scope.bundle.seller_id = $localStorage.userId;
              $scope.bundle.step = 1;
              $scope.bundle.event_id = $localStorage.eventId;

              $serviceTest.addBundle($scope.bundle, function(response) {
                if (response.code === 200) {
                  if (bundle.id === undefined) {
                    $localStorage.bundleId = response.result.insertId;
                    $scope.bundle.id = $localStorage.bundleId;
                    $scope.success = global_message.bundle_add;
                    $scope.selectedClass = 2;
                    $scope.step_2 = true;
                    $scope.step_1 = $scope.step_3 = false;

                    // Get product list 
                    $scope.getBundleProductsInPackage();
                    
                    //var getEventPriceLevelInPackage = $scope.getEventPriceLevelInPackage();
                    //console.log('------------ getEventPriceLevelInPackage -------------');
                    //console.log(getEventPriceLevelInPackage);


                    var getAllEventsPriceLevelInPackage = $scope.getAllEventsPriceLevelInPackage();
                    console.log('------------ getAllEventsPriceLevelInPackage -------------');
                    console.log(getAllEventsPriceLevelInPackage);



                  } else {
                    $localStorage.bundleId = bundle.id;
                    $scope.success = global_message.bundle_update;

                    $scope.eventBundle.eventId = $localStorage.eventId;
                    $scope.eventBundle.userId = $localStorage.userId;
  $scope.eventBundle.package_id = $localStorage.packageId;




                    $serviceTest.getBundlesInPackage($scope.eventBundle, function(res2) {
      $rootScope.bundleInPackageList = response.results;
                            $scope.selectedClass = 2;
                      $scope.step_2 = true;
                      $scope.step_1 = $scope.step_3 = false;

                      // Get product list 
                      $scope.getBundleProductsInPackage();
                    //var getEventPriceLevelInPackage = $scope.getEventPriceLevelInPackage();
                   // console.log('------------ getEventPriceLevelInPackage -------------');
                    //console.log(getEventPriceLevelInPackage);

                          var getAllEventsPriceLevelInPackage = $scope.getAllEventsPriceLevelInPackage();
                    console.log('------------ getAllEventsPriceLevelInPackage -------------');
                    console.log(getAllEventsPriceLevelInPackage);
                    });
                  }

                  $scope.success_message = true;

                  $timeout(function() {
                    $scope.error = '';
                    $scope.success_message = false;
                    $scope.success = '';
                  }, 3000);
                } else {
                  $scope.activation_message = global_message.ErrorInActivation;
                  $scope.selectedClass = 2;
                  $scope.step_2 = true;
                  $scope.step_1 = $scope.step_3 = false;

                  // Get product list 
                  $scope.getBundleProductsInPackage();
                  //$scope.getEventPriceLevelInPackage();

                  // var getEventPriceLevelInPackage = $scope.getEventPriceLevelInPackage();
                   // console.log('------------ getEventPriceLevelInPackage -------------');
                    //console.log(getEventPriceLevelInPackage);

                          var getAllEventsPriceLevelInPackage = $scope.getAllEventsPriceLevelInPackage();
                    console.log('------------ getAllEventsPriceLevelInPackage -------------');
                    console.log(getAllEventsPriceLevelInPackage);
                }
              });
            }
        }
        else {
          $scope.selectedClass = 2;
          $scope.step_2 = true;
          $scope.step_1 = $scope.step_3 = false;

          // Get product list 
          $scope.getBundleProductsInPackage();
          //$scope.getEventPriceLevelInPackage();

           //var getEventPriceLevelInPackage = $scope.getEventPriceLevelInPackage();
              //      console.log('------------ getEventPriceLevelInPackage -------------');
             //       console.log(getEventPriceLevelInPackage);

                          var getAllEventsPriceLevelInPackage = $scope.getAllEventsPriceLevelInPackage();
                    console.log('------------ getAllEventsPriceLevelInPackage -------------');
                    console.log(getAllEventsPriceLevelInPackage);
        }



      } else {
        $scope.error_message = false;
        $scope.error = global_message.error_in_step1;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 5000);
      }
    }

    if (menu.id === 3) {
      if (bundleForm.bundleForm.$valid === true) {
        $scope.getTotal();
        $scope.selectedClass = 3;
        $scope.step_3 = true;
        $scope.step_2 = $scope.step_1 = false;
      } else {
        $scope.error_message = false;
        $scope.error = global_message.error_in_step1;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 5000);
      }


    }

  }
  $scope.click_menu({
    id: 1
  });



});


/*
Code for product popup
*/
angular.module('alisthub').controller('ModalInstanceProductCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {
  $scope.items = items;
  $scope.data = {};
  $scope.eventProduct = {};

  var $serviceTest = $injector.get("event_package");
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


  $scope.getAllProduct = function() {
    if ($localStorage.userId != undefined) {
      $scope.data.userId = $localStorage.userId;
      $scope.data.packageId = $localStorage.packageId;
      if($rootScope.packageProductId != '') {
      $scope.data.packageProductId = $rootScope.packageProductId;
      $scope.data.productId = $rootScope.productId
    }

      $serviceTest.getAllProductsInPackage($scope.data, function(response) {

        $scope.loader = false;
        if (response.code === 200) {
          $scope.productList = response.result;
        } else {
          $scope.error_message = response.error;
        }
      });

    }
  };

  // Get product list 
  $scope.getAllProduct();

  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] === 'object') {
        objects = objects.concat(getObjects(obj[i], key, val));
      } else if (i === key && obj[key] === val) {
        objects.push(obj);
      }
    }
    return objects;
  }

  $scope.product_retail_price = 0;
  $scope.showPrice = function() {
    var productJson = getObjects($scope.productList, 'id', parseInt($scope.product.product_id));
    $scope.product_retail_price = productJson[0].retail_price;
  };

  function toBoolean(value) {
    var strValue = String(value).toLowerCase();
    strValue = ((!isNaN(strValue) && strValue !== '0') &&
      strValue !== '' &&
      strValue !== 'null' &&
      strValue !== 'undefined') ? '1' : strValue;
    return strValue === 'true' || strValue === '1' ? true : false
  };

  $scope.getPackageProductDetail = function() {
    $scope.eventProduct.id = $rootScope.packageProductId;
    $serviceTest.getPackageProductDetail($scope.eventProduct, function(response) {
      $scope.loader = false;
      if (response.code === 200) {
        $scope.product = response.result[0];
        $scope.product.placement_listing = toBoolean(response.result[0].placement_listing);
        $scope.product.placement_confirmation = toBoolean(response.result[0].placement_confirmation);
        $scope.product.hide_in_box_office = toBoolean(response.result[0].hide_in_box_office);
        $scope.product_retail_price = response.result[0].retail_price;
        $scope.product.product_id = response.result[0].product_id;

        $scope.products = {};
        $scope.products.packageId = $localStorage.packageId;
        $scope.products.userId = $localStorage.userId;

        $serviceTest.getPackageProducts($scope.products, function(response) {
          $rootScope.productInPackageList = response.result;
        });
      } else {
        $scope.error_message = response.error;
      }
    });
  }

  if ($rootScope.packageProductId !== undefined) {
    $scope.getPackageProductDetail();
  }

  $scope.addEventProduct = function(product) {
    if ($localStorage.userId !== undefined) {
      $scope.product.seller_id = $localStorage.userId;
      //$scope.product.event_id = $localStorage.eventId;
      $scope.product.package_id = $rootScope.packageId;

      $serviceTest.addEventProductInPackage($scope.product, function(response) {

        if (response.code === 200) {
          if (product.id === undefined) {
            $localStorage.eventProductId = response.result.insertId;
            $scope.product.id = $localStorage.eventProductId;
            $rootScope.success_message_product = true;
            $rootScope.success_product = global_message.event_product_add;

            $scope.product = {};
           // $scope.product.eventId = $localStorage.eventId;
            $scope.product.packageId = $scope.product.package_id;
            $scope.product.userId = $localStorage.userId;
            $serviceTest.getEventProductsInPackage($scope.product, function(response) {
              $rootScope.productInPackageList = response.result;
            });


  $scope.product = {};
  $scope.product.package_id = $localStorage.packageId;
  $scope.product.user_id = $localStorage.userId;

  $serviceTest.getProductsInPackage($scope.product, function(response) {
    $scope.loader_product = true;
    if(response.results) {
      $scope.loader_product = false;
      $rootScope.productInPackageList = response.results;
    }
  });

          } else {
            $localStorage.eventProductId = product.id;
            $rootScope.success_message_product = true;
            $rootScope.success_product = global_message.event_product_update;

          
  $scope.product = {};
  $scope.product.package_id = $localStorage.packageId;
  $scope.product.user_id = $localStorage.userId;

  $serviceTest.getProductsInPackage($scope.product, function(response) {
    $scope.loader_product = true;
    if(response.results) {
      $scope.loader_product = false;
      $rootScope.productInPackageList = response.results;
    }
  });

          }

          $scope.cancel();

          $timeout(function() {
            $scope.error = '';
            $rootScope.success_message_product = false;
            $rootScope.success_product = '';
          }, 5000);

        } else {
          $scope.activation_message = global_message.ErrorInActivation;
        }
      });
    }
  };

});


angular.module('alisthub').controller('deleteEventProductCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  //Remove Bundle data
  $scope.removeEventProduct = function() {
    var $serviceTest = $injector.get("event_package");
    // $rootScope.packageProductIdDelete = index;
    // $rootScope.packageProductDeleteId = packageProductId;
    $serviceTest.removePackageProduct({
      'packageProductDeleteId': $rootScope.packageProductDeleteId,
      'userId' : $localStorage.userId
    }, function(response) {
      if (response.code === 200) {

        $rootScope.success_message_product = true;
        $rootScope.success_product = global_message.event_product_delete;
        $timeout(function() {
          $rootScope.error = '';
          $rootScope.success_message_product = false;
          $rootScope.success_product = "";

        }, 3000);
        $rootScope.productInPackageList.splice($rootScope.packageProductIdDelete, 1);
      }
      $uibModalInstance.close($scope.selected.item);
    });
  }

});

/*
  Code for product popup
  */
angular.module('alisthub').controller('PricechangeCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {
  var $serviceTest = $injector.get("event_package");
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.onReady = function() {
  
  };
 
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

 
 
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

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

  //To get Months
  $scope.months = [{
      id: '01',
      name: '1'
    }, {
      id: '02',
      name: '2'
    }, {
      id: '03',
      name: '3'
    }, {
      id: '04',
      name: '4'
    }, {
      id: '05',
      name: '5'
    }, {
      id: '06',
      name: '6'
    }, {
      id: '07',
      name: '7'
    }, {
      id: '08',
      name: '8'
    }, {
      id: '09',
      name: '9'
    }, {
      id: '10',
      name: '10'
    }, {
      id: '11',
      name: '11'
    }, {
      id: '12',
      name: '12'
    }, ]
    //To get time interval
  $scope.timeinterval = [{
    id: '00',
    name: '00'
  }, {
    id: '15',
    name: '15'
  }, {
    id: '30',
    name: '30'
  }, {
    id: '45',
    name: '45'
  }]
  $scope.interval = [{
    id: 'am',
    name: 'am'
  }, {
    id: 'pm',
    name: 'pm'
  }, ];
  $scope.apply = [{
    id: 'all',
    name: 'All'
  }, {
    id: 'online_price',
    name: 'Online Sales'
  }, {
    id: 'box_office',
    name: 'Box Office'
  }, ];
  //Price change function
  $scope.pricechangefunc = function(data2) {
    $rootScope.success_message1 = true;
    data2.price_change_id = $rootScope.price_change_id;
    $serviceTest.postPriceChange(data2, function(response) {
      if (response.code === 200) {
        $rootScope.success1 = global_message.price_level_update;
        $timeout(function() {
          $rootScope.error = '';
          $rootScope.success_message1 = false;
          $rootScope.success1 = '';
        }, 3000);
      } else {
        $rootScope.error1 = global_message.price_level_error;
        $timeout(function() {
          $rootScope.error1 = '';
          $rootScope.success_message1 = false;
          $rootScope.success1 = '';
        }, 3000);
      }
      $uibModalInstance.dismiss('cancel');
    });
  }
  $scope.data2 = {};
  $scope.data2.month = $scope.months[0].id;
  $scope.data2.time = $scope.timeinterval[0].id;
  $scope.data2.interval = $scope.interval[0].id;
  $scope.data2.apply = $scope.apply[0].id;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

