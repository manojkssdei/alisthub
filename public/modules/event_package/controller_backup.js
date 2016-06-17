
angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('createpackageController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location) { 
   //For Step 1
     $scope.data = {};
    var $serviceTest = $injector.get("event_package");
    $scope.select_delect_event=$scope.monthly_div=$scope.days_div=$scope.error_message=$scope.error_time_message=true;
  //////////////////////////////////////////////////////
   $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data = [
            {id:4110591, event:'The Lion King',desc:'Minskoff theatre (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'10',inventory:'900'},
            {id:4110592, event:'The Lion King2',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'20',inventory:'500'},
            {id:4110593, event:'The Lion King3',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'30',inventory:'600'}
        ];
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }
  ///////////////////////////////////////////////////////////
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
  

  $scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
  // Called when the editor is completely ready.
  $scope.onReady = function () {
    // ...
  };
////////////////////////////
  $scope.location_event_div=$scope.price_and_link_div=$scope.setting_div=$scope.dynamic_age_div=$scope.return_age_text_div=true;
  $scope.custom_age=function(){
     $scope.age_div=$scope.age_text_div=true; 
     $scope.dynamic_age_div=$scope.return_age_text_div=false;
     $scope.data1.ages='';
  }
////////////////
  $scope.custom_default_age=function(){
     $scope.age_div=$scope.age_text_div=false; 
     $scope.dynamic_age_div=$scope.return_age_text_div=true;
     $scope.data1.dynamic_age='';
  }
//////////////////////////////
  $scope.ages = [
  { "name": "All Ages",'id':0},
  {"name": "18 and  over",'id':18},
  {"name": "19 and over",'id':19},
  {"name": "21 and over",'id':21},
  ]
///////////////////////////////  
  $scope.events = [
 
    {"name": "Multiple Event",'id':1}
  ]
 //////////////////////////////////// 
  $scope.venues = [
    { "name": "Add New Venue",'id':3},
    {"name": "Use Past Location",'id':4}
  ]
 ////////////////////////////////////// 
  $scope.steps=[
     { "title":"DETAILS","icon":'fa fa-calendar','id':5},
     { "title":"PRICING","icon":'fa fa-tags','id':6},
     { "title":"OPTIONS","icon":'fa fa-cog','id':8},
   ];
  /////////////////////   
  $scope.selected=$scope.events[0];
  $scope.selected1=$scope.venues[0];
  $scope.selected2=$scope.steps[0];
   

  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
  $scope.click_menu=function(menu) {

    if (menu.id==5) {
      $scope.eventdetail_div=false;
      $scope.price_and_link_div=$scope.setting_div=true;
    }

    if (menu.id==6) {
      $scope.eventdetail_div=$scope.setting_div=true;
      $scope.price_and_link_div=false;
    }

     if (menu.id==8) {
      $scope.eventdetail_div=$scope.price_and_link_div=true;
      $scope.setting_div=false;
    }
    $scope.selected2 = menu;  
  }

  /** 
  Method: select_venue
  Description:Function for vanue select 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */
     
  $scope.select_venue=function(venue){
    if(venue.id==3) {
      $scope.venue_event_div=false;
      $scope.location_event_div=true;
    } else {
      $scope.venue_event_div=true;
      $scope.location_event_div=false;
    }
    $scope.selected1 = venue; 
  }

  /** 
  Method: select
  Description:Function for select event type : single / multiple   
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */


  $scope.select= function(item) {
    
     $scope.data.eventtype='multiple';
     $scope.multiple_event_div=false;
     $scope.single_event_div=true;      
    
    $scope.selected = item; 
  };

  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
  $scope.isActive1 = function(venue) {
    return $scope.selected1 === venue;
  };
 
  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };
 
  //For Step 2
  $scope.items = ['item1'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  $scope.add_bundle = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentBundle.html',
      controller: 'ModalInstanceBundleCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  
  $scope.add_product = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentProduct.html',
      controller: 'ModalInstanceProductCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  
  
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

  
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['yyyy-MM-dd','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

 
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
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

 /*Encode imgae as base64 URL*/
        $scope.encodeImageFileAsURL = function(str, id) {
            var filesSelected = document.getElementById("inputFileToLoad_" + id).files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; 

                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    newImage.style.height = '100px';
                    newImage.style.width = '200px';

                    if (id == 1) {
                        //$scope.data.userNewPic_1 = srcData;
                        $scope.data.imageData = srcData;
                    }

                    document.getElementById("imgTest_" + id).innerHTML = newImage.outerHTML;
                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }


      /** Method : Date Time Merge
      **/
      $scope.combine = function(dt, timeString) {
          var startDateTime;
          var parts = /^(\d+):(\d+) (AM|PM)$/.exec(timeString);
          if (parts) {
          hours = parseInt(parts[1], 10);
          minutes = parseInt(parts[2], 10);
          if (parts[3] === "PM" && hours !== 12) {
          hours += 12;
          }
          else if (parts[3] === "AM" && hours === 12) {
          hours = 0;
          }
          if (!isNaN(hours) && !isNaN(minutes)) {
          startDateTime = new Date(dt.getTime());
          startDateTime.setHours(hours);
          startDateTime.setMinutes(minutes);
          }
          }
          return startDateTime;
      }

    $rootScope.FinalEvents = [];
    $rootScope.choosenEventsArea = false;
    $rootScope.eventsChoosedFlag = false;
    $scope.data.event_type = 1;
    $scope.data.immidiately = 0;

    $scope.stepOne = function() {
      console.log('stepOne data' , $scope.data);
      var error = $scope.myForm.$error;
      angular.forEach(error.required, function(field){
          if(field.$invalid){
              var fieldName = field.$name;
              console.log('Error in field ---> invalid fieldName' , fieldName);
          }
        /*
          if(field.$dirty){
              var fieldName = field.$name;
              console.log('dirty fieldName' , fieldName);
          }

          if(field.$pristine){
              var fieldName = field.$name;
              console.log('pristine fieldName' , fieldName);
          }

          if(field.$untouched){
              var fieldName = field.$name;
              console.log('untouched fieldName' , fieldName);
          }

          */
    });



if($scope.data.online_sales_open_date && $scope.data.online_sales_open_time) {
  $scope.data.online_sales_open_date_time = $scope.combine($scope.data.online_sales_open_date , $scope.data.online_sales_open_time);
}
    
if($scope.data.online_sales_close_date && $scope.data.online_sales_close_time) {
  $scope.data.online_sales_close_date_time = $scope.combine($scope.data.online_sales_close_date , $scope.data.online_sales_close_time);
}


console.log('$rootScope.eventcheckboxGlobalIds' , $rootScope.eventcheckboxGlobalIds);
$scope.data.event_ids = $rootScope.eventcheckboxGlobalIds;
console.log('$scope.data ' , $scope.data);

            //$scope.loader = false;
          if ($localStorage.userId != undefined) {
                $scope.data.user_id=$localStorage.userId;
                //$scope.loader = true;
                $serviceTest.stepOneEventPackage($scope.data, function(response) {
                  console.log('response' , response);
                    //$scope.loader = false;
                    if (response.code == 200) {
                        $scope.data.package_id = response.result;
                    } else {
                        $scope.error_message = response.error;
                    }

                });

            }

            

  }


   ///// Start Event Popup
        $scope.showEventPopup = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'eventModalContent.html',
                controller: 'EventModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });
        };
        
        ///// End Event Pupup


        $scope.disableOpenDateTime = function () {
          // body...
        };


});


angular.module('alisthub').controller('EventModalInstanceCtrl', function($localStorage, $scope, $uibModalInstance, items, $rootScope, $injector,ngTableParams) {
    var $serviceTest = $injector.get("discounts");
    $scope.all_check_point = 1;
    $scope.eventtoggleAll = function(id) {
            if (id == 1) {
                $scope.all_check_point = 2;
                var toggleStatus = true;
                $scope.enableEventAssign = true;
                $scope.listEvent = 1;
            }
            if (id == 2) {
                $scope.all_check_point = 1;
                var toggleStatus = false;
                $scope.enableEventAssign = false;
            }
            angular.forEach($scope.eventdata, function(itm) { itm.selected = toggleStatus; });
        }


        $scope.eventcheckbox = [];
        $rootScope.eventcheckboxGlobalIds = [];

        $scope.eventoptionToggled = function(idn) {
            if ($scope.eventcheckbox.indexOf(idn) !== -1) {
                $scope.eventcheckbox.pop(idn);
            } else {
                $scope.eventcheckbox.push(idn);
            }
            if ($scope.eventcheckbox.length > 0) {
                $scope.enableEventAssign = true;
                $rootScope.eventcheckboxGlobalIds = $scope.eventcheckbox;
            } else {
                $scope.enableEventAssign = false;
            }

            $scope.eventisAllSelected = $scope.eventdata.every(function(itm) {
                return itm.selected; })
        }


        $scope.eventmakeAssignment = function() {
                
            if( $rootScope.eventcheckboxGlobalIds != []){
                 $uibModalInstance.dismiss('cancel');
                 
            }

            $scope.eventInfo = {};
            if ($localStorage.userId != undefined) {
                $scope.eventInfo.user_id = $localStorage.userId;
                $scope.eventInfo.eventcheckboxGlobalIds = $rootScope.eventcheckboxGlobalIds;
                
            } 
          
           
          

            $rootScope.choosenEventsArea = true;
             for( var key in $scope.eventInfo.eventcheckboxGlobalIds ) {
              var eventId = $scope.eventInfo.eventcheckboxGlobalIds[key];
              $rootScope.FinalEvents.push($rootScope.allEvents[eventId]);
            } 
            
            console.log('before $rootScope.eventsChoosedFlag ' , $rootScope.eventsChoosedFlag );
            $rootScope.eventsChoosedFlag = true;
            console.log('$rootScope.eventcheckboxGlobalIds' ,  $rootScope.eventcheckboxGlobalIds) ;
            console.log('after $rootScope.eventsChoosedFlag ' , $rootScope.eventsChoosedFlag );

   
        };
        
    /** View list of all Events for assigning discount coupons ***/
        $scope.event_id = [];
       
        $scope.loader = false;
        $scope.viewEvents = function() {
            $scope.data = {};
            if ($localStorage.userId != undefined) {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                if ($scope.dt) {
                    $scope.data.search_date = $scope.dt;
                }
                if ($scope.search_type) {
                    $scope.data.search_type = $scope.search_type;
                }
                $serviceTest.viewEvents($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {
                        $rootScope.allEvents = [];
                        $scope.eventdata = response.result;

                        for(var index in $scope.eventdata) {
                        var valId = $scope.eventdata[index].id;
                        var val = $scope.eventdata[index];
                            var obj = {};
                            obj[valId] = val;
                            //$rootScope.allEvents.push(obj);
                            //$rootScope.allEvents[valId] = obj;
                            $rootScope.allEvents[valId] = val;
                            $scope.event_id.push(valId);
                        }
                        $scope.tableParams = new ngTableParams(
                  {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {name:'asc'},
                                            
                  },
                  {
                    data:$scope.eventdata
                  });
                        
                        /* $scope.eventdata.forEach(function(value) {
                            $scope.event_id.push(value.id);
                        }); */

                    } else {
                        $scope.eventdata = "";
                    }

                });
            } else {
                $scope.eventdata = "";
            }
    };
    
    $scope.viewEvents();
    
    $scope.items = items;
       
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.remove = function() {

        $uibModalInstance.close($scope.selected.item);
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    ////////////////////////////////////////////////////////////////////////////////////
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
        $scope.onReady = function() {
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
        $scope.events = [{
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
    ///////////////////////////////////////////////////////////////////////////////////
});
