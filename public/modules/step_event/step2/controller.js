angular.module('alisthub').controller('stepevent2Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state) {
  $scope.loader = false;
  

  //For Step 1
  var $serviceTest = $injector.get("venues");
  
   // To done toggle block
  $scope.enable_1 = $scope.enable_2 = $scope.enable_3 = $scope.enable_4 = $scope.enable_5 = "fa-caret-down";
  $scope.block_1  = $scope.block_2  = $scope.block_3  = $scope.block_4  = $scope.block_5  = true;
  $scope.str_1    = $scope.str_2    = $scope.str_3    = $scope.str_4    = $scope.str_5 = 1;
  $scope.toggle_block = function(id,str)
  {
    if (id == 1) {
      str == 1?$scope.block_1=false:true;
      str == 2?$scope.block_1=true:false;
      if (str == 1) { $scope.str_1 = 2;$scope.enable_1 = "fa-caret-up"; }
      else{
	$scope.str_1 = 1;$scope.enable_1 = "fa-caret-down"; }
    }
    if (id == 2) {
      
      str == 1?$scope.block_2=false:true;
      str == 2?$scope.block_2=true:false;
      if (str == 1) { $scope.str_2 = 2;$scope.enable_2 = "fa-caret-up"; }
      else{ $scope.str_2 = 1;$scope.enable_2 = "fa-caret-down"; }
    }
    if (id == 3) {
      str == 1?$scope.block_3=false:true;
      str == 2?$scope.block_3=true:false;
      if (str == 1) { $scope.str_3 = 2;$scope.enable_3 = "fa-caret-up"; }else{ $scope.str_3 = 1;$scope.enable_3 = "fa-caret-down"; }
    }
    if (id == 4) {
      $scope.enable_4 = "fa-caret-up";
      str == 1?$scope.block_4=false:true;
      str == 2?$scope.block_4=true:false;
      if (str == 1) { $scope.str_4 = 2;$scope.enable_4 = "fa-caret-up"; }else{ $scope.str_4 = 1;$scope.enable_4 = "fa-caret-down"; }
    }
    if (id == 5) {
      str == 1?$scope.block_5=false:true;
      str == 2?$scope.block_5=true:false;
      if (str == 1) { $scope.str_5 = 2;$scope.enable_5 = "fa-caret-up"; }
      else{ $scope.str_5 = 1;$scope.enable_5 = "fa-caret-down"; }
    }
  }
  
  //To show or hide divs
  $scope.select_delect_event = $scope.monthly_div = $scope.days_div = $scope.error_message = $scope.error_time_message = true;
  $rootScope.success_message1 = false;
  $scope.data1 = {};
    

  $eventId = $localStorage.eventId;
    
    var event_id = '';
    if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
      event_id = $stateParams.eventId;
    } else {
      event_id = $localStorage.eventId;
    }
    $scope.pageloader = true; 
    $serviceTest.getEvent({'event_id':event_id},function(response){
      $scope.pageloader = false;
        $scope.data1=response.results[0];
	$localStorage.showclix_id = response.results[0].showclix_id;
	        $scope.data1.type_of_event = response.results[0].type_of_event == null?0:response.results[0].type_of_event;
		$scope.data1.price = response.results[0].price == null || response.results[0].price == ""?0:response.results[0].price;
		
		$scope.data1.facebook=response.results[0].facebook_url != null?response.results[0].facebook_url:"";
		$scope.data1.twitter=response.results[0].twitter_url != null?response.results[0].twitter_url:"";
		$scope.data1.eventwebsite=response.results[0].website_url != null?response.results[0].website_url:"";
    		$scope.data1.eventinventory=response.results[0].inventory;
        $scope.data1.price = response.results[0].price_type;
        $scope.ageDropdown = 0;
        if(response.results[0].define_custom_age == 1) {
          $scope.ageDropdown = 1;
        }
    });
	$serviceTest.getEventCat({'event_id':event_id},function(response){
	 
	 angular.forEach(response.result,function(value, key){
	 var k=key+1;
	 if(k==1){
	 $scope.data1.category1=(value.category_id).toString();
	 }
	 if(k==2){
	 $scope.data1.category2=(value.category_id).toString();
	 }
	 if(k==3){
	 $scope.data1.category3=(value.category_id).toString();
	 }
	 });
	});
  $scope.eventBundle = {};
  
  if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
    $scope.eventBundle.eventId = $stateParams.eventId;
  }
  $scope.eventBundle.userId = $localStorage.userId;
  //To get bundles
  $serviceTest.getBundles($scope.eventBundle, function(response) {
    //$rootScope.bundleList = response.results;
    $rootScope.bundleList = response.result;
  });


  /* To fetch the product data related to specific event*/ 
  $scope.product = {};
  if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
    $scope.product.eventId = $stateParams.eventId;
  } 
  
  $scope.product.userId = $localStorage.userId;
  $serviceTest.getEventProducts($scope.product, function(response) {
    $rootScope.eventProductList = response.result;
  });
  
   //update price level
   $scope.getPrice=function(id){
        $rootScope.data1={};
        $serviceTest.getSinglePricelevel({'id':id},function(response){
            if (response.code==200) {
                $scope.open_price_level('lg');
                
                $rootScope.data1=response.results[0];
                if (!$rootScope.data1.description) {
                  $rootScope.data1.description = '';
                }
                $rootScope.maximum_quantitiy_available_value = parseInt($rootScope.data1.quantity_available) + parseInt($rootScope.inventory_remaining);
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
      }

      var eventInventory = null;
      if($scope.data1!=undefined && $scope.data1.eventinventory!=undefined && $scope.data1.eventinventory!=''){
        eventInventory = $scope.data1.eventinventory;
      }
      

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

        if ($scope.data1.eventinventory) {
            // console.log("in if")
            $scope.inventoryTextVal=$scope.data1.eventinventory;
            // console.log($scope.inventoryTextVal , parseInt($scope.inventoryTextVal) , $scope.availQuantity , parseInt($scope.availQuantity))
            $scope.totalRemainings=  parseInt($scope.inventoryTextVal) - parseInt($scope.availQuantity);

            if ($scope.totalRemainings < 0) {
                $scope.totalRemainingsError = true;
                $scope.totalRemainings = "Error";
            }

            $rootScope.eventinventory= $scope.inventoryTextVal;
            console.log("eventinventory: " + $rootScope.eventinventory);
            $scope.saveInventory($rootScope.eventinventory);
            $rootScope.inventory_remaining = $scope.totalRemainings;
        }
      });
    }

    $rootScope.saveInventory=function(eventInventory) {
      $scope.formdata = {};
      $scope.formdata.eventinventory = eventInventory;
      if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
        $scope.formdata.event_id = $stateParams.eventId;
      } 

      $serviceTest.saveInventory($scope.formdata,function(response) {
        if (response.code == 200) { }
      });
    }

    $rootScope.eventInventoryCalc();

    //change status of price level
    $scope.changeStatus = function(id,status,showclix_price_id) {
        
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
	$scope.data.showclix_price_id   = showclix_price_id;
        $scope.data.status              = status==1?0:1;
	$scope.data.showclix_token      = $localStorage.showclix_token;
        $scope.data.showclix_user_id    = $localStorage.showclix_user_id;
        $scope.data.showclix_seller_id  = $localStorage.showclix_seller_id;
        $scope.loader = true;
        $serviceTest.changePricelevelStatus($scope.data,function(response){
            
            if (response.code == 200) {
                     var eventId=$stateParams.eventId;
                    $serviceTest.getPricelevel({'eventId':eventId},function(response){
                        
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


  $scope.data1 = {};

$scope.data1.type_of_event=0;
$scope.data1.price=0;


  // $scope.data1 = {
  //   type_of_event: 0,
  //   price: 0
  // };


 


  //To get ages
  $serviceTest.postEventdata({
    'var': 'ages'
  }, function(response) {

    if (response !== null) {
      if (response.code === 200) {
        $scope.ages = response.results;

        $scope.data1.custom_ages = ($scope.ages[0].age).toString();
      }
    }


  });

  //To get steps
  $scope.steps = [

    {
      "title": "Events Details",
      "icon": 'fa fa-calendar',
      'id': 5,
      "formname": 'myForm'
    }, {
      "title": "Price & Links",
      "icon": 'fa fa-tags',
      'id': 6,
      "formname": 'myForm'
    }, {
      "title": "Look & Feel",
      "icon": 'fa fa-eye',
      'id': 7,
      "formname": 'myForm1'
    }, {
      "title": "Setting",
      "icon": 'fa fa-cog',
      'id': 8,
      "formname": 'event-form'
    }

  ];


  ///////////////////////////////steps event///////////////



  //To get Event Category
  $serviceTest.postEventdata({
    'var': 'event_category'
  }, function(response) {


    if (response.code === 200) {
      $scope.cat1 = $scope.cat2 = $scope.cat3 = response.results;
      $scope.data1.category1 = ($scope.cat1[0].category_id).toString();


    }

  });

  //To save step2 data.
  $scope.price_and_link_data = function(data1) {
    data1.eventId = $localStorage.eventId;
    console.log("data:258");
    data.showclix_token     = $localStorage.showclix_token;
    data.showclix_user_id   = $localStorage.showclix_user_id;
    data.showclix_seller_id = $localStorage.showclix_seller_id;
    $serviceTest.postSecondStepdata(data1, function(response) {
      if (response.code == 200) {
        $scope.success = global_message.event_step2;

        $scope.error_message = false;
        $timeout(function() {
          $scope.success = '';
          $scope.error_message = true;
        }, 3000);
        // window.location.reload();
      }
    });
  }

 $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  ////
  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  ////

  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
  //////
  $scope.popup3 = {
    opened: false
  };
  $scope.popup4 = {
    opened: false
  };
$scope.success_message = false;
  $scope.error_message = true;

  $scope.multiple_event_div = $scope.venue_event_div = $scope.price_and_link_div = $scope.look_and_feel_div = $scope.setting_div = $scope.dynamic_age_div = $scope.return_age_text_div = true;

  //To show custom age div

  $scope.custom_age = function() {
    $scope.age_div = $scope.age_text_div = true;
    $scope.dynamic_age_div = $scope.return_age_text_div = false;
    $scope.data1.ages = '';
  }

  //To show default age
  $scope.custom_default_age = function() {
      $scope.age_div = $scope.age_text_div = false;
      $scope.dynamic_age_div = $scope.return_age_text_div = true;
      $scope.data1.dynamic_age = '';
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
    console.log($stateParams.eventId+':2');
    console.log(menu.id);
    console.log(data);
    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 5) {
      if($stateParams.eventId!=undefined){
        $location.path("/create_event_step1/"+$stateParams.eventId);
      } else {
        $location.path("/create_event_step1");
      }
      
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 6) {
      if(objectForm.myForm!=undefined) {
        if (objectForm.myForm.$valid === true) {
            $scope.selectedClass = 2;
            if ($stateParams.eventId == null) {
              if(data != undefined) {
                if (data.eventtype=='single') {
                  if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                    data.eventdate=$scope.single_start_date;
                    
                    data.startevent_time=$scope.startevent_time;
                    data.endevent_time=$scope.endevent_time;
                    
                    data.userId=$localStorage.userId;
                    $serviceTest.saveEvent(data,function(response){
                      if (response.code == 200) {
                        $scope.success=global_message.event_step1;
                        $stateParams.eventId = response.result;
                        $scope.error_message=false;
                        $timeout(function() {
                          $scope.success='';
                          $scope.error_message=true;
                        },3000);

                        console.log(response.result);
                        $location.path("/create_event_step2/"+$stateParams.eventId);
                        
                      }
                    });
                  }  
                } else {
                  data.userId=$localStorage.userId;
                  $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
                    if (response.code == 200) {
                      $scope.success=global_message.event_step1;
                      $scope.data={};
                      $scope.error_message=false;
                      $timeout(function() {
                       $scope.success='';
                       $scope.error_message=true;
                      },3000);
                      window.location.reload();
                    }
                  }); 
                }
              }
            } else {
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step2/"+$stateParams.eventId);
              } 
            }
        } else {
          $scope.selectedClass = 1;
          $scope.error_message = false;
          $scope.error = global_message.event_step1_msg;
          $timeout(function() {
            $scope.error = '';
            $scope.error_message = true;
            $scope.error = '';
          }, 3000);
        }
      } else {
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step2/"+$stateParams.eventId);
        } 
      }
    }

    //look and feel div
    if (menu.id === 7) {
      if(objectForm.myForm1!=undefined) {
      if (objectForm.myForm1.$valid === true) {

        if(data != undefined) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            data.eventId = $stateParams.eventId;
          }
	  data.showclix_token     = $localStorage.showclix_token;
          data.showclix_user_id   = $localStorage.showclix_user_id;
          data.showclix_seller_id = $localStorage.showclix_seller_id;
          //console.log(data); return false;
          $serviceTest.postSecondStepdata(data, function(response) {
            if (response.code == 200) {
              $scope.selectedClass = 3;
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step3/"+$stateParams.eventId);
              }     
            }
          });
        } else {
          $scope.selectedClass = 3;
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step3/"+$stateParams.eventId);
          } 
        }
      } else {
        $scope.selectedClass = 2;
        $scope.error_message = false;
        $scope.error = global_message.event_step2_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000); 
      }

        
      } else {
       
        $scope.selectedClass = 3;
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step3/"+$stateParams.eventId);
        } 
      }
    }

    //Event Setting div
    if (menu.id === 8) {
      $scope.selectedClass = 4;
      //if (objectForm.myForm.$valid === true) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step4/"+$stateParams.eventId);
          } 
     /* } else {

        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }*/

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
  //$scope.items = ['item1'];

  
  $scope.items = {};
  if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
    $scope.items.eventId = $stateParams.eventId;
    console.log("::::::::::::::::::::::::::::::::");
    console.log($scope.items.eventId+"===="+$localStorage.showclix_id);
    console.log("::::::::::::::::::::::::::::::::");
  } 

  $scope.animationsEnabled = true;

  // Add Price level
  $scope.open_price_level = function(size) {
    $rootScope.data1 = {};
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
  $rootScope.eventinventory = $scope.data1.eventinventory

  //Schedule Price change
  $scope.price_change = function(size, priceid, showclix_price_id, type) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'pricechange.html',
      controller: 'PricechangeCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.price_change_id   = priceid;
	  $rootScope.showclix_price_id = showclix_price_id;
	  $rootScope.formtype          = type;
          return $scope.items;
        }
      }
    });

  }
  
  


  //delete Price level
  $scope.delete_price_level = function(size, index, price_id, showclix_price_id) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deletePricelevel.html',
      controller: 'DeletePricelevelCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.delete_price_level_id = index;
          $rootScope.price_leveldelete_id  = price_id;
	  $rootScope.showclix_price_id     = showclix_price_id;
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
  $scope.add_product = function(size, eventProductId) {
    $rootScope.eventProductId = eventProductId;
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
  $scope.changeBundleStatus = function(id, status) {
    $scope.data = {};
    if ($localStorage.userId !== undefined) {
      $scope.data.id = id;
      $scope.data.status = status;
      $scope.loader_bundle = true;
      $serviceTest.changeBundleStatus($scope.data, function(response) {
        if (response.code === 200) {

          $scope.success_message_bundle = true;
          $scope.success_bundle = global_message.bundle_save;
          $timeout(function() {
            $scope.error = '';
            $scope.success_message_bundle = false;
            $scope.success_bundle = '';
          }, 3000);

          $scope.eventBundle.eventId = $stateParams.eventId;
          $scope.eventBundle.userId = $localStorage.userId;
          $serviceTest.getBundles($scope.eventBundle, function(response) {
            $rootScope.bundleList = response.result;
          });
          $scope.loader_bundle = false;
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
  $scope.delete_event_product = function(size, index, eventproduct_id) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'deleteEventProduct.html',
      controller: 'deleteEventProductCtrl',
      size: size,
      resolve: {
        items: function() {
          $rootScope.eventProductIdDelete = index;
          $rootScope.eventProductDeleteId = eventproduct_id;
          return $scope.items;
        }
      }
    });
  };


});


angular.module('alisthub').controller('advanceSetting', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams) {

  if (!$localStorage.isuserloggedIn) {
    $state.go('login');
  }

  var $serviceTest = $injector.get("venues");

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
      $scope.data.event_id = $stateParams.eventId;
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
    var $serviceTest = $injector.get("venues");
    $serviceTest.removeBundle({
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
        $rootScope.bundleList.splice($rootScope.bundleIdDelete, 1);
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

    var $serviceTest = $injector.get("venues");
    
    $serviceTest.removepricelevel({
      'price_leveldelete_id': $rootScope.price_leveldelete_id,
      'showclix_token':$localStorage.showclix_token,
      'showclix_user_id':$localStorage.showclix_user_id,
      'showclix_seller_id':$localStorage.showclix_seller_id,
      'showclix_price_id':$rootScope.showclix_price_id
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
  var $serviceTest = $injector.get("venues");

  if ($rootScope.data1.id === undefined) {
    $scope.data1 = {
      hide_online: 0,
      hide_in_box_office: 0
    };

    $rootScope.maximum_quantitiy_available_value = false;

  } else {
    $scope.data1.price_level = $rootScope.data1.price_level_name;
    $scope.data1.price_type = $rootScope.data1.price_level_type;
    $scope.data1.minimum_per_order = $rootScope.data1.min_per_order;
    $scope.data1.maximum_per_order = $rootScope.data1.max_per_order;

    $scope.data1 = $rootScope.data1;

    if ($rootScope.data1.description == "undefined") {
      $scope.data1.description = '';
    }    
  }
   
  $scope.QuanAvailClear = function() {
    $scope.data1.minimum_per_order = null;
    $scope.data1.maximum_per_order = null;
  }

  $scope.items = items;
  $scope.min_price = true;
  //To change Price type function
  $scope.change_price_type = function() {

      if ($scope.data1.price_type === 'name_your_price') {
        $scope.min_price = false;
        $scope.online_price = true;
      } else {
        $scope.online_price = false;
        $scope.min_price = true;
      }
    }
    //Online price function
  $scope.onlinePricefunc = function() {

      $scope.data1.box_office_price = $scope.data1.online_price;
    }
    //Suggested Price function
  $scope.suggestedPricefunc = function() {

    $scope.data1.box_office_price = $scope.data1.suggested_price;
  }

  $scope.selected = {
    item: $scope.items[0]
  };



  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  console.log("==============");
  console.log($scope.data1);
  console.log("==============");
  //For step 2 Save Price level
  $scope.savepriceleveldata = function(data1) {
    data1.userId            = $localStorage.userId;
    data1.eventId           = items.eventId;
    data1.showclix_id       = $localStorage.showclix_id;
    data1.showclix_token    = $localStorage.showclix_token;
    if ($scope.data1.showclix_price_id && $scope.data1.showclix_price_id !== undefined && $scope.data1.showclix_price_id != "") {
      data1.showclix_price_id = $scope.data1.showclix_price_id;
    }
        
    $serviceTest.savepriceleveldata(data1, function(response) {

      if (response !== null) {
        if (response.code === 200) {
          $scope.data1 = $rootScope.price_level = [];
          $serviceTest.getPricelevel({
            'eventId': data1.eventId
          }, function(response) {
            $rootScope.success_message1 = true;
            if (data1.id !== undefined) {
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

            $rootScope.data1={};
          });
          $rootScope.eventInventoryCalc();
          $uibModalInstance.dismiss('cancel');
        }
      }

      $rootScope.data1={};
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
  var $serviceTest = $injector.get("venues");
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
  
  $scope.bundleList = $rootScope.bundleList;
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
      $scope.pageloader = false;
      $serviceTest.getBundleDetail($scope.editBundle, function(response) {
        $scope.pageloader = true;
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
      $scope.bundle.event_id = $scope.items.eventId;


      $serviceTest.addBundle($scope.bundle, function(response) {

        if (response.code === 200) {
          if (bundle.id === undefined) {

            $localStorage.bundleId = response.result.insertId;
            $scope.bundle.id = $localStorage.bundleId;
            $scope.success = global_message.bundle_add;
          } else {
            $localStorage.bundleId = bundle.id;
            $scope.success = global_message.bundle_update;

            $scope.eventBundle.eventId = $scope.items.eventId;
            $scope.eventBundle.userId = $localStorage.userId;

            $serviceTest.getBundles($scope.eventBundle, function(response) {
              $rootScope.bundleList = response.result;
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
    // Case 1:
    for (var i = 0; i < $scope.price_level.length; i++) {
      if ($scope.price_level[i].qty == null || $scope.price_level[i].qty === undefined) {
	var quantity = 0;
      }
      else{
        var quantity = $scope.price_level[i].qty;
      }
      
    if ($scope.price_level[i].online_price == null || $scope.price_level[i].online_price === undefined) {
	var online_price = 0;
      }
      else{
        var online_price = $scope.price_level[i].online_price;
      }
      
    if ($scope.price_level[i].box_office_price == null || $scope.price_level[i].box_office_price === undefined) {
	var box_office_price = 0;
      }
      else{
        var box_office_price = $scope.price_level[i].box_office_price;
      }
      
      totalQty += parseInt(quantity);
      totalOnline += parseFloat(quantity * online_price);
      totalBoxoffice += parseFloat(quantity * box_office_price);
    }
    // case 2: 
    for (var i = 0; i < $scope.productList.length; i++) {
      if ($scope.productList[i].qty == null || $scope.productList[i].qty === undefined) {
	var quantity = 0;
      }
      else{
        var quantity = $scope.productList[i].qty;
      }
      
      if ($scope.productList[i].retail_price == null || $scope.productList[i].retail_price === undefined) {
	var retail_price = 0;
      }
      else{
        var retail_price = $scope.productList[i].retail_price;
      }
                  
      totalQty += parseInt(quantity);
      totalOnline += parseFloat(quantity * retail_price);
      totalBoxoffice += parseFloat(quantity * retail_price);
      
    }
    $scope.totalQty        = totalQty;
    $scope.totalOnlineShow = totalOnline;
    $scope.totalBoxofficeShow = totalBoxoffice;
    $scope.totalOnline     = totalOnline;
    $scope.totalBoxoffice  = totalBoxoffice;
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

    $scope.bundle.bundle_id = $localStorage.bundleId;

    $scope.bundle.totalQty = $scope.totalQty;
    $scope.bundle.totalOnline = $scope.totalOnline;
    $scope.bundle.totalBoxoffice = $scope.totalBoxoffice;
    $scope.bundle.price_level = $scope.price_level;
    $scope.bundle.productList = $scope.productList;


    $serviceTest.updateBundle($scope.bundle, function(response) {

      if (response.code === 200) {
        $scope.eventBundle.eventId = $scope.items.eventId;
        $scope.eventBundle.userId = $localStorage.userId;

        $serviceTest.getBundles($scope.eventBundle, function(response) {
          $rootScope.bundleList = response.result;
        });

        if (status === 'submit') {
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
  $scope.getBundleProducts = function() {
    if ($localStorage.userId !== undefined) {
      $scope.data.userId = $localStorage.userId;

      if ($rootScope.editBundleId === undefined) {
        $scope.data.bundleId = $localStorage.bundleId;
      } else {
        $scope.data.bundleId = $rootScope.editBundleId;
      }

      $serviceTest.getBundleProducts($scope.data, function(response) {
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
  $scope.getEventPriceLevel = function() {
    if ($localStorage.userId !== undefined) {
      $scope.eventPrice.userId = $localStorage.userId;
      $scope.eventPrice.eventId = $scope.items.eventId;

      if ($rootScope.editBundleId === undefined) {
        $scope.eventPrice.bundleId = $localStorage.bundleId;
      } else {
        $scope.eventPrice.bundleId = $rootScope.editBundleId;
      }

      $serviceTest.getEventPriceLevel($scope.eventPrice, function(response) {
        $scope.loader = false;
        if (response.code === 200) {

          $scope.price_level = response.result;
        } else {
          $scope.error_message = response.error;
        }
      });
    }
  };


  $scope.click_menu = function(menu , bundle) {
    var bundleForm = this;

    $scope.selectedClass = 1;
    if (menu.id === 1) {
      $scope.selectedClass = 1;
      $scope.step_1 = true;
      $scope.step_2 = $scope.step_3 = false;
    }
    if (menu.id === 2) {
      if (bundleForm.bundleForm.$valid === true) {

        if (!$localStorage.bundleId) {

            if ($localStorage.userId !== undefined) {
              $scope.bundle.seller_id = $localStorage.userId;
              $scope.bundle.step = 1;
              $scope.bundle.event_id = $scope.items.eventId;

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
                    $scope.getBundleProducts();
                    $scope.getEventPriceLevel();
                  } else {
                    $localStorage.bundleId = bundle.id;
                    $scope.success = global_message.bundle_update;

                    $scope.eventBundle.eventId = $scope.items.eventId;
                    $scope.eventBundle.userId = $localStorage.userId;

                    $serviceTest.getBundles($scope.eventBundle, function(res2) {
                      $rootScope.bundleList = res2.result;
                      $scope.selectedClass = 2;
                      $scope.step_2 = true;
                      $scope.step_1 = $scope.step_3 = false;

                      // Get product list 
                      $scope.getBundleProducts();
                      $scope.getEventPriceLevel();
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
                  $scope.getBundleProducts();
                  $scope.getEventPriceLevel();
                }
              });
            }
        }
        else {
          $scope.selectedClass = 2;
          $scope.step_2 = true;
          $scope.step_1 = $scope.step_3 = false;

          // Get product list 
          $scope.getBundleProducts();
          $scope.getEventPriceLevel();
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

  var $serviceTest = $injector.get("venues");
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


  $scope.getAllProduct = function() {
    if ($localStorage.userId != undefined) {
      $scope.data.userId = $localStorage.userId;
      $serviceTest.getAllProducts($scope.data, function(response) {

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

  $scope.getEventProductDetail = function() {
    $scope.eventProduct.id = $rootScope.eventProductId;
    $serviceTest.getEventProductDetail($scope.eventProduct, function(response) {
      $scope.loader = false;
      if (response.code === 200) {
        $scope.product = response.result[0];
        $scope.product.placement_listing = toBoolean(response.result[0].placement_listing);
        $scope.product.placement_confirmation = toBoolean(response.result[0].placement_confirmation);
        $scope.product.hide_in_box_office = toBoolean(response.result[0].hide_in_box_office);
        $scope.product_retail_price = response.result[0].retail_price;
        $scope.product.product_id = response.result[0].product_id;

        $scope.products = {};
        $scope.products.eventId = $scope.items.eventId;
        $scope.products.userId = $localStorage.userId;
        $serviceTest.getEventProducts($scope.products, function(response) {
          $rootScope.eventProductList = response.result;
        });
      } else {
        $scope.error_message = response.error;
      }
    });
  }

  if ($rootScope.eventProductId !== undefined) {
    $scope.getEventProductDetail();
  }

  $scope.addEventProduct = function(product) {
    if ($localStorage.userId !== undefined) {
      $scope.product.seller_id = $localStorage.userId;
      $scope.product.event_id = $scope.items.eventId;

      $serviceTest.addEventProduct($scope.product, function(response) {

        if (response.code === 200) {
          if (product.id === undefined) {
            $localStorage.eventProductId = response.result.insertId;
            $scope.product.id = $localStorage.eventProductId;
            $rootScope.success_message_product = true;
            $rootScope.success_product = global_message.event_product_add;

            $scope.product = {};
            $scope.product.eventId = $scope.items.eventId;
            $scope.product.userId = $localStorage.userId;
            $serviceTest.getEventProducts($scope.product, function(response) {
              $rootScope.eventProductList = response.result;
            });

          } else {
            $localStorage.eventProductId = product.id;
            $rootScope.success_message_product = true;
            $rootScope.success_product = global_message.event_product_update;

            $scope.product = {};
            $scope.product.eventId = $scope.items.eventId;
            $scope.product.userId = $localStorage.userId;
            $serviceTest.getEventProducts($scope.product, function(response) {
              $rootScope.eventProductList = response.result;
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
    var $serviceTest = $injector.get("venues");
    $serviceTest.removeEventProduct({
      'eventProductDeleteId': $rootScope.eventProductDeleteId
    }, function(response) {
      if (response.code === 200) {

        $rootScope.success_message_product = true;
        $rootScope.success_product = global_message.event_product_delete;
        $timeout(function() {
          $rootScope.error = '';
          $rootScope.success_message_product = false;
          $rootScope.success_product = "";

        }, 3000);
        $rootScope.eventProductList.splice($rootScope.eventProductIdDelete, 1);
      }
      $uibModalInstance.close($scope.selected.item);
    });
  }

});

/*
  Code for product popup
  */
angular.module('alisthub').controller('PricechangeCtrl', function($scope, $uibModalInstance, items, $rootScope, $localStorage, $injector, $timeout) {
  var $serviceTest = $injector.get("venues");
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.popup1 = {
    opened: false
  };
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
    id: 1,
    name: 'All'
  }, {
    id: 2,
    name: 'Online Sales'
  }, {
    id: 3,
    name: 'Box Office'
  }, ];
  
  // Get price level
  var data5 = {};
  $scope.schedules = {};
  data5.showclix_price_id   = $rootScope.showclix_price_id;
  data5.showclix_id         = $localStorage.showclix_id;
  $serviceTest.getPriceLevelChange(data5, function(response) {
      if (response.code === 200) {
	console.log(response.result);
	$scope.schedules = response.result;
      }
  });
  
  
  //Price change function
  $scope.pricechangefunc = function(data2) {
    $rootScope.success_message1 = true;
    data2.price_change_id = $rootScope.price_change_id;
    data2.showclix_token      = $localStorage.showclix_token;
    data2.showclix_user_id    = $localStorage.showclix_user_id;
    data2.showclix_seller_id  = $localStorage.showclix_seller_id;
    data2.showclix_price_id   = $rootScope.showclix_price_id;
    data2.showclix_id         = $localStorage.showclix_id;
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
