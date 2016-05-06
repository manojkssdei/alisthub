angular.module('alisthub')
.controller('bundleController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
  var $serviceTest = $injector.get("bundles");
    
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
     { "title":"Quantities","icon":'fa fa-cog','id':2},
     { "title":"Price","icon":'fa fa-tags','id':3}
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

      
  $scope.addBundle = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
       // $scope.data.imgdata     = $scope.userNewPic;
        $scope.data.step        = step;
        console.log(' control is public , modules , event_setting_bundle_controller ',$scope.data);
        $serviceTest.addBundle($scope.data,function(response){
            console.log('returned response -',response);
            if (response.code == 200) {
                    console.log("================");
                    console.log('response.result.id - ',response.result.insertId);
                    if (step == 1) {
                      $scope.data.id = response.result.insertId;
                    }
                    
                    console.log("================");
                    console.log(" $scope.data.id " , $scope.data.id);
                    //$scope.uploadFiles(response.id);
                    //$location.path("/view_Bundles/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  $scope.getBundle = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getBundles($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.bundledata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
  };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getBundle();
  }
  
  $scope.page_title = 'ADD';
  $scope.callfunction = 0;
  $scope.saveBundle = function(step)
  {
    if ($scope.callfunction == 0) {
        $scope.addBundle(step);
    }
    if ($scope.callfunction == 1) {
        $scope.editBundle(step);
    }
  }
  
  // Edit Venue 
  if ($state.params.id)
  {
    $scope.callfunction = 1;
    
    $scope.page_title = 'EDIT';
    $scope.getBundleDetail = function() {
    
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
    $scope.getBundleDetail();
    ////////////////////////////////////////
    $scope.editBundle = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $scope.data.step        = step;
        $serviceTest.addBundle($scope.data,function(response){
            if (response.code == 200) {
              $scope.idata = {};
              if($scope.userNewPic != "")
              {
                    $scope.idata.imgdata     = $scope.userNewPic;
                    $scope.idata.id          = $scope.data.id;
                    $serviceTest.uploadBundleImage($scope.idata,function(iresponse){
                      
                    })
              }
                   if(step == 4){           
                   $location.path("/view_bundles/list");
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

.controller('manageBundleController', function($scope,$localStorage,$injector,$http,$state,$location) {
  var $serviceTest = $injector.get("bundles");
    
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
    $scope.getBundle = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getBundles($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.bundledata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getBundle();
  }
   
  
  //////////////////// Duplicate Venue ////////////////
  
    $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeBundleStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getBundle();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  $scope.delBundle = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteBundle($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getQuestion();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
    
})


