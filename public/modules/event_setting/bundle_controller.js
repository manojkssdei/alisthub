angular.module('alisthub')
.controller('bundleController', function($scope,$localStorage,$injector,$http,$state,$location,$timeout) {
   
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
  } 
  
  var $serviceTest = $injector.get("bundles");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }

   
   $scope.steps=[
     { "title":"Details","icon":'fa fa-calendar','id':1},
     { "title":"Quantities","icon":'fa fa-cog','id':2},
     { "title":"Price","icon":'fa fa-tags','id':3}
    ];
  

  
  
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
        console.log($scope.data);
        $scope.step_3=true;
        $scope.step_2=$scope.step_1=false;
       }
       
        $scope.selected2 = menu;  
     }
  $scope.click_menu({id:1});

   $serviceTest.getBundles({'userId':$localStorage.userId},function(response){
    $scope.res=response.result;
   });
  $scope.addBundle = function(step) {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
       // $scope.data.imgdata     = $scope.userNewPic;
        $scope.data.step        = step;
        
       $scope.error_message=false;
       $serviceTest.addBundle($scope.data,function(response){
            console.log('returned response -',response);
            if (response.code == 200) {
                    
                    if (step == 1) {
                      $scope.error_message=false;
                      $scope.success = "Bundle data save successfully.";
                       $timeout(function() {
                          
                    $scope.success='';
                    $scope.error_message=true;
                  },3000);
                     $scope.data={};
                     $scope.data.bundle_name='Enter Bundle Name';
                    }
                    
                   
                    //$scope.uploadFiles(response.id);
                    //$location.path("/view_Bundles/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  
  
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

})



