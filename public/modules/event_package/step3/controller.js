/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event setting  
*/

angular.module('alisthub').controller('createpackageController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad , $http,$stateParams) {
  
  //For Step 3
  var $serviceTest = $injector.get("event_setting");
  
  //////////////////////////////////////////////////////

    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }
  ///////////////////////////////////////////////////////////
  

  //var $serviceTest = $injector.get("event_package");
   //$scope.data = {};

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  
  $scope.open5 = function() {
    $scope.popup5.opened = true;
  };
  
  $scope.open6 = function() {
    $scope.popup6.opened = true;
  };
  
  $scope.popup1 = {
    opened: false
  };
  
  $scope.popup2 = {
    opened: false
  };
  
  $scope.popup3 = {
    opened: false
  };
  
  $scope.popup4 = {
    opened: false
  };
  ////
  $scope.popup5 = {
    opened: false
  };

  $scope.popup6 = {
    opened: false
  };



  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
$scope.loader = false;

  $scope.click_menu = function(menu, data, valid) {
    console.log($stateParams.eventId+':4');
    var objectForm = this;
    //To go to step1 event Details
    if (menu.id === 5) {
      $location.path("/create_event_step1");
    }

    ///TO move to price and level
    if (menu.id === 6) {

      if (objectForm.myForm.$valid === true) {
          if ($localStorage.eventId == null) {
              if (data.eventtype=='single') {
                if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                  data.eventdate=$scope.single_start_date;
                  
                  data.startevent_time=$scope.startevent_time;
                  data.endevent_time=$scope.endevent_time;
                  
                  data.userId=$localStorage.userId;
                  $serviceTest.saveEvent(data,function(response){
                    if (response.code == 200) {
                      $scope.success=global_message.event_step1;
                      $localStorage.eventId=response.result;
                      $scope.error_message=false;
                      $timeout(function() {
                        $scope.success='';
                        $scope.error_message=true;
                      },3000);

                      if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                        $location.path("/create_event_step2/"+$stateParams.eventId);
                      } else {
                        $location.path("/create_event_step2/"+$localStorage.eventId);
                      }
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
          else {
            if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
              $location.path("/create_event_step2/"+$stateParams.eventId);
            } else {
              $location.path("/create_event_step2/"+$localStorage.eventId);
            }
          }
      } else {
        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }
    }

    //look and feel div
    if (menu.id === 7) {
      if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
        $location.path("/create_event_step3/"+$stateParams.eventId);
      } else {
        $location.path("/create_event_step3/"+$localStorage.eventId);
      }
     /*if (objectForm.myForm.$valid === true) {
      $scope.eventdetail_div = $scope.price_and_link_div = $scope.setting_div = true;
      $scope.look_and_feel_div = false;
      } else {
        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }*/


    }
    //Event Setting div
    if (menu.id === 8) {

      //if (objectForm.myForm.$valid === true) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step4/"+$stateParams.eventId);
          } else {
            $location.path("/create_event_step4/"+$localStorage.eventId);
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
    $scope.selected2 = menu;
  }

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
   
  $scope.selected2 = $scope.steps[3];
  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

  // Datepicker stuff
  var now = new Date();
  if (now.getMonth() === 11) {
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

    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return '';
  }


function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
// Datepicker end

//timepicker
  // $scope.mytime = new Date();
// timepicker end

$scope.formdata = {};
$scope.enable_on = {};
$scope.disable_on = {};

$scope.next_func = function(formdata){
  console.log(formdata);
  $http.post('/event/postCreateEventStepFour' , formdata).then(function(response) {
    console.log("Response", response)
  })
}



});