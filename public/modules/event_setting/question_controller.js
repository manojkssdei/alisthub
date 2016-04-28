angular.module('alisthub')
.controller('questionController', function($scope,$localStorage,$injector,$http,$state,$location) {
   
  var $serviceTest = $injector.get("questions");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
 $scope.data = {};
    
  $scope.addQuestion = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $serviceTest.addQuestion($scope.data,function(response){
            console.log(response);
            if (response.code == 200) {
                    $location.path("/view_questions/list");
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
  $scope.getQuestion = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getQuestions($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.questiondata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
  };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getQuestion();
  }
  
  $scope.page_title = 'ADD';
  $scope.callfunction = 0;
  $scope.saveQuestion = function()
  {
    if ($scope.callfunction == 0) {
        $scope.addQuestion();
    }
    if ($scope.callfunction == 1) {
        $scope.editQuestion();
    }
  }
  
  // Edit Venue 
  if ($state.params.id)
  {
    $scope.callfunction = 1;
    
    $scope.page_title = 'EDIT';
    $scope.getQuestionDetail = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.id      = $state.params.id;
        $scope.loader = true;
        console.log($state.params.id);
        $serviceTest.questionOverview($scope.data,function(response){
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
    $scope.getQuestionDetail();
    ////////////////////////////////////////
    $scope.editQuestion = function() {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $serviceTest.addQuestion($scope.data,function(response){
            if (response.code == 200) {
                    $location.path("/view_questions/list");
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

.controller('manageQuestionController', function($scope,$localStorage,$injector,$http,$state,$location) {
  var $serviceTest = $injector.get("questions");
    
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
    $scope.getQuestion = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.userId      = $localStorage.userId;
        $scope.loader = true;
        $serviceTest.getQuestions($scope.data,function(response){
            console.log(response);
            $scope.loader = false;
            if (response.code == 200) {
                   $scope.questiondata = response.result;
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
  
  /// View listing venues 
  if ($state.params.list) {
    $scope.getQuestion();
  }
   
  
  //////////////////// Duplicate Venue ////////////////
  
    $scope.changeStatus = function(id,status) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
         $scope.data.status   = status==1?0:1;
        $serviceTest.changeQuestionStatus($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getQuestion();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  $scope.delQuestion = function(id) {
        $scope.data = {};
        if ($localStorage.userId!=undefined) {
        $scope.data.id   = id;
        $serviceTest.deleteQuestion($scope.data,function(response){
            if (response.code == 200) {
                    $scope.getQuestion();
                  }else{
                    $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
  };
  
    
})


