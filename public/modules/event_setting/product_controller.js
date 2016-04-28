angular.module('alisthub')
.controller('productController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
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
   
   $scope.steps=[
     { "title":"Details","icon":'fa fa-calendar','id':1},
     { "title":"Pricing","icon":'fa fa-tags','id':2},
     { "title":"Options","icon":'fa fa-cog','id':3}
    ];
  
  ////////////// upload files //////////////////////
  $scope.file = {};
  $scope.addmore = [1];
  $scope.count = 1;
  $scope.addMoreRow = function()
  {
    $scope.count = $scope.count+1;
    $scope.addmore.push($scope.count);
  }
  $scope.removeMoreRow = function()
  {
    $scope.count = $scope.count-1;
    $scope.addmore.push($scope.count);
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
                          $scope.userNewPic =  {id:srcData};                         
                          document.getElementById("imgTest_"+id).innerHTML = newImage.outerHTML;
                      }
                      fileReader.readAsDataURL(fileToLoad);
                  }
              }
  
  
  $scope.click_menu=function(menu)
     {
       
       if (menu.id==1) {
        $scope.step_1=true;
        $scope.step_2=$scope.step_3=false;
       }
       if (menu.id==2) {
        $scope.step_2=true;
        $scope.step_1=$scope.step_3=false;
       }
       if (menu.id==3) {
        $scope.step_3=true;
        $scope.step_2=$scope.step_1=false;
       }
       
        $scope.selected2 = menu;  
     }
  $scope.click_menu({id:1});
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
            
            console.log($scope.files);
        };

      
  $scope.addProduct = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.imgdata     = $scope.userNewPic;
        $scope.data.step        = step;
        //console.log($scope.data);
        $serviceTest.addProduct($scope.data,function(response){
            console.log(response);
            if (response.code == 200) {
                    console.log("================");
                    console.log(response.id);
                    if (step == 1) {
                      $scope.data.id = response.result.insertId;
                    }
                    
                    console.log("================");
                    //$scope.uploadFiles(response.id);
                    //$location.path("/view_products/list");
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
                  
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
    $scope.getProductDetail();
    ////////////////////////////////////////
    $scope.editProduct = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $scope.data.step        = step;
        $serviceTest.addProduct($scope.data,function(response){
            if (response.code == 200) {
              $scope.idata = {};
              if($scope.userNewPic != "")
              {
                    $scope.idata.imgdata     = $scope.userNewPic;
                    $scope.idata.id          = $scope.data.id;
                    $serviceTest.uploadProductImage($scope.idata,function(iresponse){
                      
                    })
              }
                   if(step == 4){           
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
                    $scope.getQuestion();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
    
})


