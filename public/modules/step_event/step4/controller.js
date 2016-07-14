/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event setting  
*/

angular.module('alisthub').controller('stepevent4Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad , $http,$stateParams,$anchorScroll) {
  var $serviceTest = $injector.get("event_setting");
  $scope.error_message = true;
  
  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

if($stateParams.eventId!==undefined){
  $scope.RefEvnetId = $stateParams.eventId;
  var event_id=$stateParams.eventId;
    $serviceTest.getEvent({'event_id':event_id},function(response) {
      $scope.data=response.results[0];
    })
}


$scope.click_menu = function(menu, data, valid) {
    //console.log($stateParams.eventId+':4');
    //console.log(menu.id);
    //console.log(data);
    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 5) {
      if($stateParams.eventId!=undefined){
        $location.path("/create_event_step1/"+$stateParams.eventId);
      } else {
        $location.path("/create_event_step1");
      }
      
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 6) {
      if(objectForm.myForm!=undefined) {
        if (objectForm.myForm.$valid === true) {
            $scope.selectedClass = 2;
            if ($stateParams.eventId == null) {
              if(data != undefined) {
                if (data.eventtype=='single') {
                  if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                    data.eventdate=$scope.single_start_date;
                    
                    data.startevent_time=$scope.startevent_time;
                    data.endevent_time=$scope.endevent_time;
                    
                    data.userId=$localStorage.userId;
                    $serviceTest.saveEvent(data,function(response){
                      if (response.code == 200) {
                        $scope.success=global_message.event_step1;
                        $stateParams.eventId = response.result;
                        $scope.error_message=false;
                        $timeout(function() {
                          $scope.success='';
                          $scope.error_message=true;
                        },3000);

                        console.log(response.result);
                        $location.path("/create_event_step2/"+$stateParams.eventId);
                        
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
            } else {
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step2/"+$stateParams.eventId);
              }
            }
        } else {
          $scope.selectedClass = 1;
          $scope.error_message = false;
          $scope.error = global_message.event_step1_msg;
          $timeout(function() {
            $scope.error = '';
            $scope.error_message = true;
            $scope.error = '';
          }, 3000);
        }
      } else {
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step2/"+$stateParams.eventId);
        } 
      }
    }

    //look and feel div
    if (menu.id === 7) {
      if(objectForm.myForm1!=undefined) {
      if (objectForm.myForm1.$valid === true) {

        if(data != undefined) {
          data.eventId = $stateParams.eventId;
          $serviceTest.postSecondStepdata(data, function(response) {
            if (response.code == 200) {
              $scope.selectedClass = 3;
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step3/"+$stateParams.eventId);
              }     
            }
          });
        } else {
          $scope.selectedClass = 3;
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step3/"+$stateParams.eventId);
          } 
        }
      } else {
        $scope.selectedClass = 2;
        $scope.error_message = false;
        $scope.error = global_message.event_step2_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000); 
      }

        
      } else {
       
        $scope.selectedClass = 3;
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step3/"+$stateParams.eventId);
        } 

      }
    }

    //Event Setting div
    if (menu.id === 8) {
      $scope.selectedClass = 4;
      //if (objectForm.myForm.$valid === true) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step4/"+$stateParams.eventId);
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
    //$scope.selected2 = menu;
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


  // Called when the editor is completely ready.
  $scope.onReady = function() {
  
  };
 
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  $scope.options1 = {
    customClass: getDayClass,
    initDate: new Date(),
    showWeeks: false
  };
  $scope.options3 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };
  $scope.options4 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

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

  $scope.next_func = function(formdata) {
    console.log(formdata);
    $http.post('/event/postCreateEventStepFour' , formdata).then(function(response) {
      console.log("Response", response)
    })
  }

  /** Method : Date Time Merge 
  **/

  $scope.combine = function(dt, timeString) {
    var startDateTime = '';
    var parts = /^(\d+):(\d+) (AM|PM)$/.exec(timeString);
    if (parts) {
      hours = parseInt(parts[1], 10);
      minutes = parseInt(parts[2], 10);
      if (parts[3] === "PM" && hours !== 12) {
        hours += 12;
      } else if (parts[3] === "AM" && hours === 12) {
        hours = 0;
      }
      if (!isNaN(hours) && !isNaN(minutes)) {
        startDateTime = new Date(dt.getTime());
        startDateTime.setHours(hours);
        startDateTime.setMinutes(minutes);
      }
    }
    var d = new Date();
    var n = d.getTimezoneOffset(); 
    if (n > 0) {
      var newdate = new Date(startDateTime .getTime() + n*60000);
    } else {
      var newdate = new Date(startDateTime .getTime() - n*60000);
    }
    return newdate;
  }

  $scope.success_message = false;
  $scope.success_setting_message = '';

  $scope.save_setting = function(formdata) {
    if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
      $scope.formdata.event_id = $stateParams.eventId;
    } 

    $scope.formdata.online_sales_open = $scope.combine($scope.formdata.online_sales_open.date,$scope.formdata.online_sales_open.time);
    $scope.formdata.online_sales_close = $scope.combine($scope.formdata.online_sales_close.date,$scope.formdata.online_sales_close.time);

    if($scope.formdata.print_enable_date!=undefined && $scope.formdata.print_enable_date.date!=undefined && $scope.formdata.print_enable_date.time!=undefined && $scope.formdata.print_enable_date.date!='' && $scope.formdata.print_enable_date.time!=''){
      $scope.formdata.print_enable_date = $scope.combine($scope.formdata.print_enable_date.date,$scope.formdata.print_enable_date.time);  
    } 
    if($scope.formdata.print_disable_date!=undefined && $scope.formdata.print_disable_date.date!=undefined && $scope.formdata.print_disable_date.time!=undefined && $scope.formdata.print_disable_date.date!='' && $scope.formdata.print_disable_date.time!=''){
      $scope.formdata.print_disable_date = $scope.combine($scope.formdata.print_disable_date.date,$scope.formdata.print_disable_date.time);
    }

    console.log($scope.formdata);

    if ($localStorage.userId !== undefined) {
      $scope.formdata.user_id = $localStorage.userId;
      $scope.formdata.showclix_token     = $localStorage.showclix_token;
      $scope.formdata.showclix_user_id   = $localStorage.showclix_user_id;
      $scope.formdata.showclix_seller_id = $localStorage.showclix_seller_id;
      $scope.formdata.showclix_id        = $scope.data.showclix_id;
      $serviceTest.saveSetting($scope.formdata, function(response) {

          if (response.code === 200) {
            $scope.getSetting();
            $anchorScroll();
            $scope.success_setting_message = "Settings has been saved successfuly";
            $scope.success_message = true;

            $timeout(function() {
              $scope.error = '';
              $scope.success_message = false;
              $scope.success_setting_message = '';
              //$location.path("/view_all_event");
            }, 5000);

          } else {
            $scope.activation_message = global_message.ErrorInActivation;
          }

      });

    }
  }

  $scope.getSetting = function() {

    $scope.eventSetting = {};
    
    if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
      $scope.eventSetting.eventId = $stateParams.eventId;
    } 
    $scope.pageloader = true;
    $scope.eventSetting.userId = $localStorage.userId;
    //To get settings
    $serviceTest.getSettings($scope.eventSetting, function(response) {
      $scope.pageloader = false;
      $scope.formdata = response.result[0];
      if($scope.formdata!=undefined){
        $scope.formdata.will_call = parseInt($scope.formdata.will_call);
        $scope.formdata.sales_immediatly = parseInt($scope.formdata.sales_immediatly);
        $scope.immediate();
        $scope.formdata.donation = parseInt($scope.formdata.donation);
        $scope.formdata.custom_fee = parseInt($scope.formdata.custom_fee);
        $scope.formdata.question_required = parseInt($scope.formdata.question_required);
        $scope.formdata.collect_name = parseInt($scope.formdata.collect_name);

        var openDateTime = getDateTime($scope.formdata.online_sales_open);
        $scope.formdata.online_sales_open = {};
        $scope.formdata.online_sales_open.date = openDateTime.date;
        $scope.formdata.online_sales_open.time = openDateTime.time;

        var closeDateTime = getDateTime($scope.formdata.online_sales_close);
        $scope.formdata.online_sales_close = {};
        $scope.formdata.online_sales_close.date = closeDateTime.date;
        $scope.formdata.online_sales_close.time = closeDateTime.time;

        var enableDateTime = getDateTime($scope.formdata.print_enable_date);
        $scope.formdata.print_enable_date = {};
        $scope.formdata.print_enable_date.date = null;
        $scope.formdata.print_enable_date.time = null;
        
        if(enableDateTime.date!='' && enableDateTime.time!=''){
          $scope.formdata.print_enable_date.date = enableDateTime.date;
          $scope.formdata.print_enable_date.time = enableDateTime.time;  
        }

        var disableDateTime = getDateTime($scope.formdata.print_disable_date);
        $scope.formdata.print_disable_date = {};
        $scope.formdata.print_disable_date.date = disableDateTime.date;
        $scope.formdata.print_disable_date.time = disableDateTime.time;
      }

    });

  }

  $scope.getSetting();
  
  $scope.immediate = function()
  {
    if($scope.formdata.sales_immediatly == 1)
    {
        $scope.show_imm = 1;
    }else{
        $scope.show_imm = 0;
    }
  }
  
  function toBoolean(value) {
    var strValue = String(value).toLowerCase();
    strValue = ((!isNaN(strValue) && strValue !== '0') &&
      strValue !== '' &&
      strValue !== 'null' &&
      strValue !== 'undefined') ? '1' : strValue;
    return strValue === 'true' || strValue === '1' ? true : false
  };

  function hours_am_pm(time) {
    var hours = time[0] + time[1];
    var min = time[2] + time[3];
    if (hours < 12) {
      return hours + ':' + min + ' AM';
    } else {
      hours=hours - 12;
      hours=(hours.length < 10) ? '0'+hours:hours;
      return hours+ ':' + min + ' PM';
    }
  }


  function getDateTime(openDate) {
    var date1 = new Date(openDate);
    
    if(date1!="Invalid Date" && openDate!=null) {
      console.log(openDate);
      var date = ('0' + (date1.getUTCDate())).slice(-2);
      var year = date1.getUTCFullYear();
      var month = ('0' + (date1.getUTCMonth()+1)).slice(-2);
      
      var hours = ('0' + (date1.getUTCHours())).slice(-2);
      var minutes = ('0' + (date1.getUTCMinutes())).slice(-2);
      var seconds = date1.getUTCSeconds();

      var convertedDate = {};
      convertedDate.date = new Date(year+"-"+month+"-"+date);

      convertedDate.time = hours_am_pm(hours+""+minutes);
      return convertedDate ;  
    } else {
      var convertedDate = {};
      convertedDate.date = null;
      convertedDate.time = null;
      return convertedDate ;
    }
  };
  
  $scope.goto_list = function()
  {
    $location.path("/view_all_event/single");
    
  }

});