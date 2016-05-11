angular.module('alisthub')
.controller('discountController', function($scope,$localStorage,$injector,$http,$state,$location) {
   if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
  var $serviceTest = $injector.get("discounts");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 $scope.data = {};
    
  $scope.addDiscount = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $serviceTest.addDiscount($scope.data,function(response){
            console.log(response);
            if (response.code == 200) {
                    $location.path("/view_discounts/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };

  
  $scope.getDiscount = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getDiscounts($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.discountdata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
  };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getDiscount();
  }
  
  $scope.page_title = 'ADD';
  $scope.callfunction = 0;
  $scope.saveDiscount = function()
  {
    if ($scope.callfunction == 0) {
        $scope.addDiscount();
    }
    if ($scope.callfunction == 1) {
        $scope.editDiscount();
    }
  }
  
  // Edit Venue 
  if ($state.params.id)
  {
    $scope.callfunction = 1;
    
    $scope.page_title = 'EDIT';
    $scope.getDiscountDetail = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.id      = $state.params.id;
        $scope.loader = true;
        console.log($state.params.id);
        $serviceTest.discountOverview($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.data  = {};
                   $scope.data = response.result[0];
                   $scope.place = response.result[0].address;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
    $scope.getDiscountDetail();
    ////////////////////////////////////////
    $scope.editDiscount = function() {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $serviceTest.addDiscount($scope.data,function(response){
            if (response.code == 200) {
                    $location.path("/view_discounts/list");
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
    };
    
    ///////////////////////////////////////
  }


  
  $scope.assignDiscount = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $serviceTest.assignDiscount($scope.data,function(response){
            console.log(response);
            if (response.code == 200) {
                    $location.path("/view_discounts/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
 //////////////////////////////////////////////////////////////////////////
})

.controller('manageDiscountController', function($scope,$localStorage,$injector,$http,$state,$location) {
  
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
   
  var $serviceTest = $injector.get("discounts");
    
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
    $scope.getDiscount = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getDiscounts($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.discountdata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getDiscount();
  }
   
  
  //////////////////// Duplicate Venue ////////////////
  
    $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeDiscountStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getDiscount();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  $scope.delDiscount = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteDiscount($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getDiscount();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
    
})


