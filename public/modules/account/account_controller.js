angular.module('alisthub')
.controller('accountController', function($scope,$localStorage,$injector,$http,$state,$location) {
  if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   } 
  var $serviceTest = $injector.get("account");
    
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;	  
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };	  
 }
  $scope.data = {};
  $scope.user = {};
  
  $scope.user.country = "US";
  $scope.enableState = true;
  $scope.showState = function()
  {
    if ($scope.user.country != "US") {
      $scope.enableState = false;
    }
    else{
      $scope.enableState = true;
    }
    
  }
  ////////////////////////////////////////////
  
  
  $scope.showDiv = function()
  {
    $scope.div_1 = false;
    $scope.div_2 = false;
    $scope.div_3 = false;
    $scope.div_4 = false;
    if($scope.data.question_type == "Multiple Choice")
    {
      $scope.div_1 = true;
    }
        
    if($scope.data.question_type == "Waiver")
    {
      $scope.div_2 = true;
    }
    
    if($scope.data.question_type == "Address")
    {
      $scope.div_3 = true;
    }
  }
  ////////////////////////////////////////////
  
  
  $scope.addQuestion = function() {
    
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.required    = $scope.data.required == true ? 1 : 0;
        if ($scope.data.question_type == "Address") {
          $scope.data.address_map_bill    = $scope.data.address_map_bill == true ? 1 : 0;
          $scope.data.address_map_ship    = $scope.data.address_map_ship == true ? 1 : 0;
        }
        
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
                   //$scope.place = response.result[0].address;
                   $scope.data.required    = response.result[0].required == 1 ? true : false;
                   
                   if ($scope.data.question_type == "Waiver") {
                    $scope.div_2 = true;
                   }
                   if ($scope.data.question_type == "Multiple Choice") {
                    $scope.div_4 = true;
                    $scope.quesoptions = response.options;
                    $scope.data.option = [];
                    $scope.quesoptions.forEach(function(entry){
                       $scope.data.option[entry.id] = entry.option;
                    })
                                      
                   }
                   if ($scope.data.question_type == "Address") {
                    $scope.div_3 = true;
                    $scope.data.address_map_bill    = $scope.data.address_map_bill == 1 ? true : false;
                    $scope.data.address_map_ship    = $scope.data.address_map_ship == 1 ? true : false;
                   }
                   
                   /////////////////////////////////////////////////////
                   $scope.quesassignment = response.quesassignment;
                   
                   //////////////////////////////////////////////////////
                  }else{
                   $scope.error_message = response.error;
            }
            
        });
        
        }
    };
    //$scope.getQuestionDetail();
    ////////////////////////////////////////
    $scope.editQuestion = function() {
        if ($localStorage.userId!=undefined) {
        $scope.data.seller_id   = $localStorage.userId;
        $scope.data.id          = $state.params.id;
        $scope.data.required    = $scope.data.required == true ? 1 : 0;
        
        if ($scope.data.question_type == "Address") {
          $scope.data.address_map_bill    = $scope.data.address_map_bill == true ? 1 : 0;
          $scope.data.address_map_ship    = $scope.data.address_map_ship == true ? 1 : 0;
        }
        
        
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
    $scope.delAssignment = function(id,event)
    {
      $scope.ques = {};
       if ($localStorage.userId!=undefined) {
        $scope.ques.question_id   = id;
        $scope.ques.event_id     = event;
               
        $serviceTest.delAssignment($scope.ques,function(response){
            if (response.code == 200) {
                    $scope.getQuestionDetail();
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
            }
            
        });
        }
    }
    
  }
  
 //////////////////////////////////////////////////////////////////////////
})

