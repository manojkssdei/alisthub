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
  
  ////////////////////////////////////////////
  $scope.addmore = [1];
  $scope.count = 1;
  $scope.addMoreRow = function()
  {
    $scope.count = $scope.count+1;
    $scope.addmore.push($scope.count);
  }
  $scope.addMoreRowKey = function()
  {
    $scope.count = $scope.quesoptions.length+1;
    
    $scope.quesoptions.push({id:1,question_id:1,option:"",created:""});
  }
  $scope.removeMoreRow = function(key)
  {
    //$scope.addmore.pop(key);
    $scope.addmore.splice(key, 1);
    $scope.addmore.pop(key);
  }
  $scope.removeMoreRowKey = function(key,id)
  {
    $scope.quesoptions.splice(key, 1);
    console.log("============");
    console.log(id);
    console.log($scope.data.option[id]);
    console.log("============");
    $scope.data.option[id] = null;
  }
  
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
    $scope.getQuestionDetail();
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

.controller('manageQuestionController', function($scope,$localStorage,$injector,$rootScope,$http,$state,$location) {
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
    $scope.ques_id = [];
    $scope.event_count = [];
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
                   
                   $scope.questiondata.forEach(function(value) {
                    $scope.ques_id.push(value.id);
                   });
                   
                   response.counts.forEach(function(value) {
                    $scope.event_count[value.question_id] = value.count;
                   });
                   
                   
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
  
  // Checkbox to assign question
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
     angular.forEach($scope.questiondata, function(itm){ itm.selected = toggleStatus; });
  }
  $scope.pdata = {};
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
     
      $scope.isAllSelected = $scope.questiondata.every(function(itm){  return itm.selected; })
  }
  //#/assign_question/assign
  //$rootScope.address=$localStorage.address=data.user.User.address;
  $scope.goPath = function()
  {
    if ($scope.listQues == 1) {
          //$scope.adata.question    = $scope.ques_id;
          $rootScope.question = $localStorage.question = $scope.ques_id;
        }
        else{
          //$scope.adata.question    = $scope.checkbox;
          $rootScope.question = $localStorage.question = $scope.checkbox;
        }
    $location.path("/assign_question/assign");    
        
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
        
        $scope.adata.question     = $localStorage.question;
               
        $serviceTest.makeAssignment($scope.adata,function(response){
            if (response.code == 200) {
                    //$scope.eventdata = response.result;
                    $rootScope.question = $localStorage.question = "";
                    $location.path("/view_questions/list");
                    
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


