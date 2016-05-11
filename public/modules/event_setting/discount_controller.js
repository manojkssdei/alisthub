angular.module('alisthub')
.controller('discountController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
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
    


 $scope.coupon_type_options = [
        {'type' : "Discount" , 'description' : 'Discount Coupons are applied per ticket—except for bundled tickets, which applies coupons per bundle. Create a Discount Coupon to offer a discount on each ticket or bundle.'},
        {'type' : "Automatic" , 'description' : 'Automatic Coupons are applied per order. Create an Automatic Coupon to offer a discount on an order when that reaches a target dollar amount.'},
        {'type' : "Reserve" , 'description' : 'Create a Reserve Coupon to hold specific seats for customers. (Reserve Coupons can only be applied to reserved seating events.)'},
        {'type' : "Presale" , 'description' : 'Presale Coupons provide access to otherwise restricted event pages and tickets, before the event is on sale to the general public.  Limits on the number of presale ORDERS and the number of TICKETS PER ORDER may be set.'},
        {'type' : "Complimentary" , 'description' : 'Complimentary Coupons are applied per ticket—except for bundled tickets, which applies coupons per bundle. Create a Complimentary Coupon to waive the entire cost of the ticket (including the face value and service fee). Please note: Unless otherwise specified, your account will be debited a small service fee. Please contact an account manager for more info.'},
        {'type' : "Price Level" , 'description' : 'Price Level Coupons grant customers access to a specified price level.'},
    ];

    $scope.coupon_code_div = true;
    $scope.amount_type_div = true;
    $scope.amount_div = true;
    

  $scope.showPageLayout = function()
  {
    $scope.coupon_code_div = false;
    $scope.amount_type_div = false;
    $scope.amount_div = false;
    $scope.amount_target_div = false;
    if($scope.data.coupon_type == "Discount")
    {
     $scope.coupon_code_div = true;
    $scope.amount_type_div = true;
    $scope.amount_div = true;
    }
        
    if($scope.data.coupon_type == "Automatic")
    {
    $scope.amount_type_div = true;
    $scope.amount_div = true;
    $scope.amount_target_div = true;
    }

    if($scope.data.coupon_type == "Reserve" || $scope.data.coupon_type == "Presale" || $scope.data.coupon_type == "Complimentary" || $scope.data.coupon_type == "Access Code")
    {
      $scope.coupon_code_div = true;
    }
  }


    $scope.amount_type = [
        {model : "Percentage", 'symbol' : " (%)"},
        {model : "Flat", 'symbol' : " ($)"},
    ];
  
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
  
  /// View listing of discount coupons 
  if ($state.params.list) {
    $scope.getDiscount();
  }
  

    $scope.checkMandatoryFields = function( mandatoryFields ) {
          /*
          for(var key in $scope.data) { 
          if($scope.data[key] == undefined){
             $scope.data[key] = '';
            }
          }
          */
          var errorExist = 0;
          var errorList = [];
          var errorShortMessage = 'Please enter mandatory fields.';
          for(var key in mandatoryFields) { 
            console.log('key - ' , key);
         
         /* if($scope.data[key] && $scope.data[key] != undefined && $scope.data[key] != "" && $scope.data[key] != "NULL"){
             // do nothing
            }
          else{
            errorExist = 1;
            errorList.push('Enter '+key);
          }
          */

           if(!$scope.data[key] || $scope.data[key] == undefined || $scope.data[key] == "" || $scope.data[key] == "NULL"){
              errorExist = 1;
              errorList.push('Enter '+key);
              console.log('errorList' , errorList);
            }
          }
          if(errorExist) {
            return errorShortMessage;
          }
  }


  $scope.page_title = 'ADD';
  $scope.callfunction = 0;


  var mandatoryFields = { 'amount':'amount' , 'amount_type':'amount_type' , 'coupon_code':'coupon_code' , 'coupon_name':'coupon_name' , 'coupon_type': ['number'] };
  $scope.saveDiscount = function()
  {
    if ($scope.callfunction == 0) {
       var errorMsg =  $scope.checkMandatoryFields( mandatoryFields );
       console.log('errorMsg' , errorMsg);
       if(!errorMsg)
        $scope.addDiscount();
    }
    if ($scope.callfunction == 1) {
        $scope.editDiscount();
    }
  }
  
  // Edit Discount 
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
                   $scope.showPageLayout();
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

.controller('manageDiscountController', function($scope,$localStorage,$injector,$rootScope,$http,$state,$location) {
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
    $scope.disc_id = [];
    $scope.event_count = [];  
         
 ////////////////////////////////////////////////////////////////////////////
    $scope.getDiscount = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getDiscounts($scope.data,function(response){
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.discountdata = response.result;

                    console.log('response.result' , response.result);
                   $scope.discountdata.forEach(function(value) {
                    $scope.disc_id.push(value.id);
                   });
                   
                   /*response.counts.forEach(function(value) {
                    $scope.event_count[value.question_id] = value.count;
                   });
                   */
                   
                   
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

    // Checkbox to assign discount
    $scope.enableAssign = false;
    $scope.listQues     = 0;
    $scope.checkbox = [];
    
    $scope.getcheckedbox = function(id)
    {
      console.log(id);
      $scope.checkbox.push(id);
      if (id != "" && id != null && id != "undefined") {
       $scope.enableAssign = true;
      }
      else{
       $scope.enableAssign = false; 
      }
      
      
    }
  
  $scope.toggleAll = function() {
    if ($scope.isAllSelected) {
      var toggleStatus    = true;
      $scope.enableAssign = true;
      $scope.listQues     = 1;
     }
     else{
      var toggleStatus    = false;
      $scope.enableAssign = false;
     }
     angular.forEach($scope.discountdata, function(itm){ itm.selected = toggleStatus; });
  }
  $scope.pdata = {};
  $scope.data = {};
  $scope.optionToggled = function(idn){
      
      if($scope.checkbox.indexOf(idn) !== -1) {
        $scope.checkbox.pop(idn);
      }
      else{
         $scope.checkbox.push(idn);
      }
      if ($scope.checkbox.length > 0) {
        $scope.enableAssign = true;
      }
      else{
        $scope.enableAssign = false; 
      }
     
      $scope.isAllSelected = $scope.discountdata.every(function(itm){  return itm.selected; })
  }
  //#/assign_discount/assign
  //$rootScope.address=$localStorage.address=data.user.User.address;
  $scope.goPath = function()
  {
    if ($scope.listQues == 1) {
          //$scope.adata.discount    = $scope.disc_id;
          $rootScope.discount = $localStorage.discount = $scope.disc_id;
        }
        else{
          //$scope.adata.discount    = $scope.checkbox;
          $rootScope.discount = $localStorage.discount = $scope.checkbox;
        }
        //console.log($rootScope.discount);
        console.log($localStorage.discount);
    $location.path("/assign_discount/assign");    
        
  }
  
  
 /** View Events for assignment ***/
  $scope.event_id = [];
  $scope.viewEvents = function() {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.loader = true;
        if ($scope.dt) {
          //console.log($scope.dt);
          $scope.data.search_date   = $scope.dt;
        }
        if ($scope.search_type) {
          //console.log($scope.search_type);
          $scope.data.search_type   = $scope.search_type;
        }
        $serviceTest.viewEvents($scope.data,function(response){
             $scope.loader = false;
            if (response.code == 200) {
                    $scope.eventdata = response.result;
                    $scope.eventdata.forEach(function(value) {
                    $scope.event_id.push(value.id);
                   });
                    
                  }else{
                    $scope.eventdata = "";
            }
            
        });
        }
        else{
          $scope.eventdata = "";
        }
  };
  //assign
  if ($state.params.assign) {
    $scope.viewEvents();
  }
  
  /// For event assignment checkbox
  $scope.enableEventAssign = false;
  $scope.listEvent    = 0;
     
  $scope.eventtoggleAll = function() {
    if ($scope.eventisAllSelected) {
      var toggleStatus    = true;
      $scope.enableEventAssign = true;
       $scope.listEvent    = 1;
     }
     else{
      var toggleStatus    = false;
      $scope.enableEventAssign = false;
     }
     angular.forEach($scope.eventdata, function(itm){ itm.selected = toggleStatus; });
  }
  
  $scope.eventcheckbox = [];
  $scope.eventoptionToggled = function(idn){
      
      if($scope.eventcheckbox.indexOf(idn) !== -1) {
        $scope.eventcheckbox.pop(idn);
      }
      else{
         $scope.eventcheckbox.push(idn);
      }
      if ($scope.eventcheckbox.length > 0) {
        $scope.enableEventAssign = true;
      }
      else{
        $scope.enableEventAssign = false; 
      }
     
      $scope.eventisAllSelected = $scope.eventdata.every(function(itm){  return itm.selected; })
  }
  
  //// Make Assign ment service start
  
  
  $scope.makeAssignment = function() {
        $scope.adata = {};
        if ($localStorage.userId!=undefined) {
        $scope.adata.seller_id   = $localStorage.userId;
        
        if ($scope.listEvent == 1) {
          $scope.adata.events      = $scope.event_id;
        }
        else{
          $scope.adata.events      = $scope.eventcheckbox; 
        }
        
        $scope.adata.discount     = $localStorage.discount;
               console.log('$scope.adata ', $scope.adata);
        $serviceTest.makeDiscountAssignment($scope.adata,function(response){
            if (response.code == 200) {
                    //$scope.eventdata = response.result;
                    $rootScope.discount = $localStorage.discount = "";
                    $location.path("/view_discounts/list");
                    
                  }else{
                  //  $scope.eventdata = "";
                  
            }
            
        });
        }
        else{
          $scope.eventdata = "";
        }
  };
  
  
  
  
  //// Make Assign ment service end
  
  ///////////////////   Date calender start
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
  $scope.onReady = function () {
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
  $scope.events = [
    {
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
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
  
  
   
})
