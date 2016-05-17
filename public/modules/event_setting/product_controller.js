angular.module('alisthub')
.controller('productController', function($scope,$localStorage,$injector,$http,$state,$location) {
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   } 
  var $serviceTest = $injector.get("products");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 $scope.data = {};
 $scope.cdata = {};
   
   $scope.steps=[
     { "title":"Details","icon":'fa fa-calendar','id':1},
     { "title":"Pricing","icon":'fa fa-tags','id':2},
     { "title":"Options","icon":'fa fa-cog','id':3}
    ];
   $scope.selected2 = $scope.steps[0];
  ////////////// upload files //////////////////////
  $scope.file = {};
  $scope.addmore = [1];
  $scope.count = 2;
  $scope.addMoreRow = function()
  {
    $scope.count = $scope.count+1;
    $scope.addmore.push($scope.count);
  }
  
  
  $scope.removeMoreRow = function(key)
  {
    //$scope.addmore.pop(key);
    $scope.addmore.splice(key, 1);
    $scope.addmore.pop(key);
  }
  $scope.removeMoreRowKey = function(key,id)
  {
    $scope.componentdata.splice(key, 1);
    console.log("============");
    console.log(id);
    console.log($scope.cdata[id]);
    console.log("============");
    $scope.cdata[id] = null;
  }
  
  
  $scope.encodeImageFileAsURL = function(str,id){
                  var filesSelected = document.getElementById("inputFileToLoad_"+id).files;
                 
                  //console.log(filesSelected);
                  if (filesSelected.length > 0)
                  {   console.log(filesSelected.length);
                      var fileToLoad = filesSelected[0];
              
                      var fileReader = new FileReader();
              
                      fileReader.onload = function(fileLoadedEvent) {
                          var srcData = fileLoadedEvent.target.result; // <--- data: base64
              
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
                          
                          document.getElementById("imgTest_"+id).innerHTML = newImage.outerHTML;
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
              }
  
  $scope.step_1=true;
  $scope.step_2=$scope.step_3=false;
  $scope.selected2 = $scope.steps[0];
  
  $scope.click_menu=function(menu)
  {
        console.log(menu);
       if (menu.id==1) {
        $scope.step_1=true;
        $scope.step_2=$scope.step_3=false;
        $scope.selected2 = $scope.steps[0];
       }
       if (menu.id==2) {
        console.log(menu);
        $scope.step_2=true;
        $scope.step_1=$scope.step_3=false;
        $scope.selected2 = $scope.steps[1];
                       
       }
       if (menu.id==3) {
        $scope.step_3=true;
        $scope.step_2=$scope.step_1=false;
        $scope.selected2 = $scope.steps[2];
                     
        
       }
       
        $scope.selected2 = menu;  
  }
  
  
   $scope.isActive2 = function(step2) {
        
        return $scope.selected2 === step2;
   };
   $scope.isActive2(0);
  // GET THE FILE INFORMATION.
  $scope.files = [];
        $scope.getFileDetails = function (e) {

            //$scope.files = [];
            $scope.$apply(function () {
                console.log(e.files.length);
                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
            
            
        };

  $scope.calculateBuyerPrice = function()
  {
    if ($scope.data.retail_price != "" && $scope.data.ship_cost != "" && $scope.data.ship_cost != null && $scope.data.ship_cost != "undefined") {
      $scope.data.buyer_pays = $scope.data.retail_price + $scope.data.ship_cost;
    }
    
  }
  
  $scope.showConfig = function()
  {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    if ($scope.data.configuration == true) {
      $scope.data_configuration = true;
    }
    if ($scope.data.configuration == false) {
      $scope.data_configuration = false;
    }
    
  }
  
      
  $scope.addProduct = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
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
        $scope.data.status = $scope.data.status == true ? 1:0;
        $scope.data.shippable = $scope.data.shippable == true ? 1:0;
        //$scope.data.shippable = $scope.data.shippable == true ? 1:0;
        $scope.data.taxable   = $scope.data.taxable == true ? 1:0;
        $scope.data.configuration   = $scope.data.configuration == true ? 1:0;
        $scope.data.purchsable_ticket   = $scope.data.purchsable_ticket == true ? 1:0;
        $scope.data.print_voucher       = $scope.data.print_voucher == true ? 1:0;
        
        $scope.data.step        = step;
        
        if (step == 3 || step == 4) {
         $scope.data.component     = $scope.cdata;
        }
        
        //console.log($scope.data);
        $serviceTest.addProduct($scope.data,function(response){
            console.log(response);
            if (response.code == 200) {
                                      
                    if (step == 1) {
                      $scope.data.id = response.result.insertId;
                      $scope.step_2=true;
                      $scope.step_1=$scope.step_3=false;
                      $scope.click_menu($scope.steps[1]);
                    }
                    
                    if (step == 2) {
                      //$scope.data.id = response.result.insertId;
                      $scope.step_3=true;
                      $scope.step_1=$scope.step_2=false;
                      $scope.click_menu($scope.steps[2]);
                    }
                    
                    if (step == 3) {
                      $scope.step_3=true;
                      $scope.step_1=$scope.step_2=false;
                      $scope.successmessage = "Product has been saved successfully.";
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
                    
                   
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  $scope.getProduct = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getProducts($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.productdata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
  };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getProduct();
  }
  
  $scope.page_title = 'ADD';
  $scope.callfunction = 0;
  $scope.saveProduct = function(step)
  {
    if ($scope.callfunction == 0) {
        $scope.addProduct(step);
    }
    if ($scope.callfunction == 1) {
        $scope.editProduct(step);
    }
  }
  
  // Edit Venue 
  if ($state.params.id)
  {
    $scope.callfunction = 1;
    
    $scope.page_title = 'EDIT';
    $scope.getProductDetail = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.id = $state.params.id;
        $scope.loader  = true;
        console.log($state.params.id);
        $serviceTest.productOverview($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                  $scope.data  = {};
                  $scope.data = response.result[0];
                  
                  if ($scope.data.configuration == 1) {
                    console.log("+++++++++++++++++++++++++++");
                        $scope.data_configuration = true;
                  }
                  if ($scope.data.configuration == 0) {
                    console.log("------------------------------------");
                        $scope.data_configuration = false;
                  }
                   
                  $scope.data.status = $scope.data.status == 1 ? true:false;
                  $scope.data.shippable = $scope.data.shippable == 1 ? true:false;
                  $scope.data.taxable   = $scope.data.taxable == 1 ? true:false;
                  $scope.data.configuration   = $scope.data.configuration == 1 ? true:false;
                  $scope.data.purchsable_ticket   = $scope.data.purchsable_ticket == 1 ? true:false;
                  $scope.data.print_voucher       = $scope.data.print_voucher == 1 ? true:false;
                  
                  
                  
                  $scope.componentdata = response.component;
                  $scope.cdata = [];
                  $scope.componentdata.forEach(function(entry){
                    
                    $scope.cdata[entry.id] = {};
                    $scope.cdata[entry.id].sku = entry.sku;
                    $scope.cdata[entry.id].internal_name = entry.internal_name;
                    $scope.cdata[entry.id].display_name = entry.display_name;
                    $scope.cdata[entry.id].description = entry.description;
                    $scope.cdata[entry.id].pre_sale_limit = entry.pre_sale_limit;
                    $scope.cdata[entry.id].inventory = entry.inventory;
    
                    $scope.cdata[entry.id].active = entry.active == 1 ? true : false;
                    $scope.cdata[entry.id].print_voucher = entry.print_voucher == 1 ? true : false;
                      // $scope.compdata[entry.id].sku    = entry.sku;
                  })
                  console.log($scope.cdata);
                  //console.log($scope.compdata);
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
    $scope.getProductDetail();
    if ($scope.data.configuration == 1) {
                    console.log("+++++++++++++++++++++++++++");
                        $scope.data_configuration = true;
                  }
     console.log("+++++++++++++++++++++++++++");             
     console.log($scope.data_configuration);
     console.log("+++++++++++++++++++++++++++");
    ////////////////////////////////////////
    $scope.editProduct = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
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
        $scope.data.status = $scope.data.status == true ? 1:0;
        $scope.data.shippable = $scope.data.shippable == true ? 1:0;
        //$scope.data.shippable = $scope.data.shippable == true ? 1:0;
        $scope.data.taxable   = $scope.data.taxable == true ? 1:0;
        $scope.data.configuration   = $scope.data.configuration == true ? 1:0;
        $scope.data.purchsable_ticket   = $scope.data.purchsable_ticket == true ? 1:0;
        $scope.data.print_voucher       = $scope.data.print_voucher == true ? 1:0;
        $scope.data.step        = step;
        
        if (step == 3 || step == 4) {
         $scope.data.component     = $scope.cdata;
        }
        $serviceTest.addProduct($scope.data,function(response){
            if (response.code == 200) {
              $scope.idata = {};
              
                   if (step == 1) {
                      //$scope.data.id = response.result.insertId;
                      $scope.step_2=true;
                      $scope.step_1=$scope.step_3=false;
                      $scope.click_menu($scope.steps[1]);
                    }
                    
                    if (step == 2) {
                      //$scope.data.id = response.result.insertId;
                      $scope.step_3=true;
                      $scope.step_1=$scope.step_2=false;
                      $scope.click_menu($scope.steps[2]);
                    }
                    
                    if (step == 3) {
                      $scope.step_3=true;
                      $scope.step_1=$scope.step_2=false;
                      $scope.successmessage = "Product has been saved successfully."
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
                    
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
    };
    
    ///////////////////////////////////////
  }
  
      /**********************************************************************************************************
  ************************************delete product in productController************************************/

    $scope.delProduct = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteProduct($scope.data,function(response){
            if (response.code == 200) {
                    console.log("================");
                    $location.path("/view_products/list");
                    console.log(response);
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  /******************************************************************************************************
  ***************************************change status in product_controller*****************************/
    $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeProductStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getProduct();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  
 //////////////////////////////////////////////////////////////////////////
})

.directive('fileModel', ['$parse', function ($parse) {
return {
restrict: 'A',
link: function(scope, element, attrs) {
var model = $parse(attrs.fileModel);
var modelSetter = model.assign;
console.log('working');
element.bind('change', function(){
scope.$apply(function(){
//modelSetter(scope, element[0].files[0]); //use for only one file
modelSetter(scope, element[0].files); // use for multiple files
});
});
}
};
}])

.controller('manageProductController', function($scope,$localStorage,$injector,$http,$state,$location) {
  
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
  
  var $serviceTest = $injector.get("products");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
    }
 
 /////////////////////////////////////////////////////////////////////////////
    $scope.data = {};
   
         
 ////////////////////////////////////////////////////////////////////////////
    $scope.getProduct = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getProducts($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.productdata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getProduct();
  }
   
  
  //////////////////// Duplicate Venue ////////////////
  
    $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeProductStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getProduct();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  $scope.delProduct = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteProduct($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getProduct();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  /************save product_setting*************************************
  *********************************************************************/
  $scope.products = {};
  
  
  $scope.getProductSetting=function()
  {
    $scope.sdata = {};
    //$scope.products = {};
    //alert('sdfsdfsdf');  
    $scope.sdata.seller_id   = $localStorage.userId; 
    
   //alert(JSON.stringify(productSettingData))   
    $serviceTest.getProductSetting($scope.sdata,function(response){
            if (response.code == 200) {
                 $scope.activation_message = 'saved';
                 $scope.products = response.result[0];
                 $scope.products.setting_id = $scope.products.id;
                 console.log($scope.products.setting_id);
                 // $location.path("/view_products/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });

  }
  
  $scope.getProductSetting();
  
  $scope.saveProductSetting=function()
  {
    //alert('sdfsdfsdf');  
    $scope.products.seller_id   = $localStorage.userId;
     console.log($scope.products.setting_id);
    if ($scope.products.setting_id) {
      $scope.products.setting_id = $scope.products.setting_id;
    }
   // var productSettingData={'seller_id' : $scope.seller_id, 'taxRate':$scope.products.taxRate,'serviceFlatFree':$scope.products.serviceFlatFee,'serviceFeeCovered':$scope.products.serviceFee, 'description':$scope.products.descriptions};
   //alert(JSON.stringify(productSettingData))   
    $serviceTest.productSettingsData($scope.products,function(response){
            if (response.code == 200) {
                 $scope.activation_message = 'saved';
                  $location.path("/view_products/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });

  }
  
    
})


