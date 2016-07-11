angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('singleEventViewController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
    $rootScope.class_status = false;
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }

     var holdval = [];
    
    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }


    var $eventService = $injector.get("events");
    var $venueService = $injector.get("venues");
    var $questionService = $injector.get("questions");
    var $discountService = $injector.get("discounts");
    var $lookAndFeelService = $injector.get("Lookservice");
    
    $scope.data = {};
    $scope.error_message = true;
    var userId =  $localStorage.userId;
    var eventId = $stateParams.eventId;
        $rootScope.eventId = eventId;

    $scope.userId = userId;
    $scope.eventId = eventId;
     $scope.sales_pause_status = 'Pause Sales';
      $scope.favorite_status = 'Add To Favorite';
    
    console.log('eventId ' , eventId) ;


    $scope.questionLocations = [
        { "name": "Ticket", 'id': 1 },
        { "name": "Event", 'id': 2 },
        { "name": "Sale", 'id': 3 },
    ];

$lookAndFeelService.getlookAndFeel({},function(response){
            if (response!=null && response.code == 200) {
                $scope.templates=response.result;
            }
            else{
                $scope.templates=[];   
            }
        });


$scope.hours_am_pm = function(time) {
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


$scope.delEvent = function(event_id) {
    console.log('delEvent called' , event_id);

  $eventService.deleteEvent({'event_id':event_id},function(response) {
    if(response.code==200) {
      $location.path("/view_all_event");
    }
  }); 
}


$scope.pauseSales = function(event_id) {
    console.log('pauseSales called' , event_id);
  $eventService.pauseSales({'event_id':event_id},function(response) {
    if(response.code==200) {
        $rootScope.sales_status = 'offline';
     // $location.path("/view_all_event);
     $scope.sales_pause_status = 'Sales Paused' ;
    }
  }); 
}

$scope.addFavouriteEvent = function(event_id , favorite_event_status ) {
    console.log('addFavouriteEvent called' , event_id);
    console.log('favorite_event_status called' , favorite_event_status);
  $eventService.addFavouriteEvent({'event_id':event_id , favorite_event_status : favorite_event_status },function(response) {
    if(response.code==200) {
        $rootScope.favorite_event = response.updated_favorite_event;
        $scope.favorite_status = 'Added as Favorite' ;

    }
  }); 
}

$scope.unassignQuestionEvent = function(question_assignment_id , question_id , event_id) {
    console.log('unassignQuestionEvent called' , question_assignment_id , question_id , event_id );

  $questionService.unassignQuestionEvent({'id':question_assignment_id , 'question_id' : question_id ,  'event_id' : event_id },function(response) {
    if(response.code==200) {
      $rootScope.getQuestionsOfEvent();
      //http://localhost:4004/#/series_event_overview/2377
      //$location.path("/view_all_event");
    }
  }); 

  
}


$scope.getDateTime = function(openDate) {
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

      convertedDate.time = $scope.hours_am_pm(hours+""+minutes);
      return convertedDate ;  
    } else {
      var convertedDate = {};
      convertedDate.date = null;
      convertedDate.time = null;
      return convertedDate ;
    }
  };

$scope.getFormattedDate = function(today1) {
    console.log('today1' , today1 );
    var today = new Date(today1);
    console.log('today' , today );
    var weekdayFullNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var weekdayShortNames = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    var monthsFullName = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' ,'October' , 'November' , 'December');
    var monthsShortName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' , 'Sep' ,'Oct' , 'Nov' , 'Dec');
    var shortDay  = weekdayShortNames[today.getDay()];
    var fullDay  = weekdayFullNames[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var mon   = monthsShortName[today.getMonth()];
    var month   = monthsFullName[today.getMonth()];
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return shortDay+'.  '+mon+' '+dd+', '+yyyy+'  at '+hour+':'+minu;
// Fri. Jul 1, 2016 at 12:00pm 
}




 $scope.saveQuestionLocation = function(data ,id ) {
  console.log('saveQuestionLocation');
   console.log('id' , id);
    console.log('data' , data);

    $scope.questionLocationData = {};
    $scope.questionLocationData.id = id;
    //$scope.questionLocationData.view_question_location =  parseInt(data[id]);
    $scope.questionLocationData.view_question_location =  parseInt(data);

    console.log('$scope.questionLocationData ' , $scope.questionLocationData) ;
     $questionService.saveQuestionLocationPosition($scope.questionLocationData, function(response) {
            if (response.code == 200) {
              
            console.log('data saved');

            } else {
                $scope.error_message = response.error;
            }

        });
         
        }


    //service created to get event detail

    $eventService.getEvent({ 'event_id': eventId }, function(response) {

        console.log('response ' , response) ;
     
        $scope.data = response.results[0];
        
        $scope.title = response.results[0].title;
        $scope.event_date = $scope.getFormattedDate(response.results[0].eventdate);
        $scope.venue_name = response.results[0].venue_name;
        //$scope.event_address = response.results[0].event_address;
        $scope.event_address = response.results[0].address;
        $scope.city = response.results[0].city;
        $scope.state = response.results[0].state;
        $scope.country = response.results[0].country;

        $scope.user_id = response.results[0].seller_id;
        $scope.event_id = eventId;
        $rootScope.template_name = response.results[0].template_name;
        $rootScope.template_id = response.results[0].template_id;
        $rootScope.favorite_event = response.results[0].favorite_event;


      $scope.event_url_for_share = response.results[0].event_url_for_share;

       $rootScope.sales_status = 'live';
       // online_sales_close
       // 

if(response.results[0].pause_sales  == 1) {
    $scope.sales_pause_status = 'Sales Paused';
}
else {
    $scope.sales_pause_status = 'Pause Sales';
    }


    if(response.results[0].favorite_event  == 1) {
    $scope.favorite_status = 'Added as Favorite';
}
else {
    $scope.favorite_status = 'Add To Favorite';
    }


       console.log('online_sales_close ' ,response.results[0].online_sales_close );
        console.log('sales_close_date ' ,response.results[0].sales_close_date );
       $scope.online_sales_close = $scope.getFormattedDate(response.results[0].online_sales_close);

       $scope.inventory = response.results[0].inventory;

       /*
        var eventdate = $scope.getDateTime(response.results[0].eventdate);
        $scope.event_date = eventdate.date;
        $scope.event_time = eventdate.time;
        console.log('event_url_for_share ' , event_url_for_share);
        console.log('event_date ' , event_date);
        console.log('event_time ' , event_time);
*/
 
        $scope.content2 = $sce.trustAsHtml(response.results[0].description);
        

        $scope.start_date = response.results[0].start_date;
        $scope.start_time = response.results[0].start_time;
        $scope.end_time = response.results[0].end_time;
        $scope.zipcode = response.results[0].zipcode;


      });


    $venueService.getPricelevel({ 'eventId': eventId }, function(response) {
        console.log('response getPricelevel ' , response) ;
        $scope.getPricelevel = response.results;

        $scope.tableParams = new ngTableParams(
        {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {price_level_name:'asc'},
                    
            },
            {
                   // data:$scope.get_price_level
                    data:$scope.getPricelevel
        });

    });

$rootScope.getQuestionsOfEvent = function() {
    $questionService.getQuestionsOfEvent({ 'userId': userId , 'eventId' : eventId  }, function(response) {
        console.log('response ' , response) ;
        $scope.getQuestions = response.result;

         for(i in response.result){
          //holdval[i] = response.result[i].id;
          holdval[i] = response.result[i].question_id;
        }

       $scope.tableParamsQuestions = new ngTableParams(
        {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {id:'asc'},
                    
            },
            {
                   // data:$scope.get_price_level
                    data:$scope.getQuestions
        }); 

        

    }); 
}


  $rootScope.getQuestionsOfEvent();

    $discountService.getDiscountsOfEvent({ 'userId': userId , 'eventId' : eventId }, function(response) {
        console.log('response.result ' , response.result) ;
        $scope.getDiscounts = response.result;

       $scope.tableParamsDiscounts = new ngTableParams(
        {
                    page: 1,            // show first page
                    count: 5,           // count per page
                    sorting: {id:'asc'},
                    
            },
            {
                    data:$scope.getDiscounts
        }); 
    }); 

     $discountService.getCountDiscountsOfEvent({ 'userId': userId , 'eventId' : eventId }, function(response) {
       
        $scope.getCountDiscountsOfEvent = response.result.count;
         console.log('response.result[0].count ' , response.result[0].count ) ;
    }); 


  $eventService.getEmailReport({ 'user_id': userId , 'eventId' : eventId }, function(response) {
       
        $rootScope.EmailReportsList = response.result;
         console.log('  $rootScope.EmailReportsList  ' , $rootScope.EmailReportsList  ) ;
    }); 


// Checkbox to assign question
    $scope.enableAssign = false;
    $scope.listQues = 0;
    $scope.checkbox = [];

    $scope.getcheckedbox = function(id) {
        $scope.checkbox.push(id);
        if (id != "" && id != null && id != "undefined") {
            $scope.enableAssign = true;
        } else {
            $scope.enableAssign = false;
        }
    }

    /*Select all the questions checkbox*/

    $scope.all_check_point = 1;
    $scope.toggleAll = function(id) {
        console.log('toggleAll ' , toggleAll);
        console.log('id ' , id);
       
       if (id == 1) {
        $scope.all_check_point = 2;
        var toggleStatus = true;
        $scope.enableAssign = true;
        $scope.listQues = 1;
       }
        if (id == 2) {
        $scope.all_check_point = 1;
        var toggleStatus = false;
        $scope.enableAssign = false;
       }
      
       angular.forEach($scope.getQuestions, function(itm) { itm.selected = toggleStatus; });

    }
    
    $scope.pdata = {};

    /*Push/pop the checked questions to/from array*/
    $scope.optionToggled = function(idn) {
           
            if ($scope.checkbox.indexOf(idn) !== -1) {
                $scope.checkbox.pop(idn);
            } else {
                $scope.checkbox.push(idn);
            }
            if ($scope.checkbox.length > 0) {
                $scope.enableAssign = true;
            } else {
                $scope.enableAssign = false;
            }

            $scope.isAllSelected = $scope.getQuestions.every(function(itm) {
                return itm.selected; })
        }



    //get comment  
    $scope.array = [];


    // popup creation to get all the questions//
 // popup creation to get all the questions//
    $scope.open1 = function(size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'questions.html',
            controller: function($scope, $uibModalInstance) {
                
                $scope.Cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
                console.log(holdval);

                $scope.question_ids = []; 

                $questionService.getQuestions({ 'userId': userId, exclude : holdval }, function(response) {
                    $scope.getQuestionsList = response.result;

                     $scope.getQuestionsList.forEach(function(value) {
                        $scope.question_ids.push(value.id);
                    });

                    $scope.tableParams = new ngTableParams({
                        page: 1, // show first page
                        count: 5, // count per page
                        sorting: { id: 'asc' },

                    }, {
                        data: $scope.getQuestionsList
                    });
                });




              $scope.enableAssign = false;
              $scope.listEvent = 0;
              $scope.all_check_point = 1;

    $scope.toggleAllQuestions = function(id) {
      console.log('toggleAllQuestions called' , 'id' , id );
        if (id == 1) {
        $scope.all_check_point = 2;
        var toggleStatus = true;
        $scope.enableAssign = true;
        $scope.listEvent = 1;
        }
        if (id == 2) {
        $scope.all_check_point = 1;
        var toggleStatus = false;
        $scope.enableAssign = false;
        $scope.listEvent = 0;
        }

        angular.forEach($scope.getQuestionsList , function(itm) { itm.selected = toggleStatus; });
    }

              $scope.checkbox = [];
              $scope.optionToggled = function(idn) {
                       console.log('optionToggled caleled ' , 'idn ' , idn );

                        if ($scope.checkbox.indexOf(idn) !== -1) {
                            $scope.checkbox.pop(idn);
                        } else {
                            $scope.checkbox.push(idn);
                        }
                        if ($scope.checkbox.length > 0) {
                            $scope.enableAssign = true;
                        } else {
                            $scope.enableAssign = false;
                        }
               $scope.isAllSelected = $scope.getQuestionsList.every(function(itm) {
            return itm.selected; })


console.log('$scope.isAllSelected  ' , $scope.isAllSelected ) ;
                    }




    $scope.makeAssignment = function() {
      console.log('makeAssignment called');

        $scope.adata = {};
        console.log('$localStorage.userId' , $localStorage.userId);
        if ($localStorage.userId != undefined) { 

            $scope.adata.seller_id = $localStorage.userId;

            if ($scope.listEvent == 1) {
                $scope.adata.question = $scope.question_ids;
            } else {
                $scope.adata.question = $scope.checkbox;
            }

            $scope.adata.event = $rootScope.eventId;
            $scope.adata.child_series_event = $rootScope.child_series_event ;

            console.log('$scope.adata' , $scope.adata)

           $questionService.makeAssignmentOverview($scope.adata, function(response) {
                if (response.code == 200) {
                  //  $rootScope.question = $localStorage.question = "";
              
for(var key in $scope.adata.question) {
  var q_id = $scope.adata.question[key];
  holdval.push(q_id);
}

console.log('holdval' , holdval);
$scope.Cancel();
$rootScope.getQuestionsOfEvent();
                   
                } 
            });

            


        } else {
            $scope.eventdata = "";
        }
    };



            }
        });
    };


     //Add email Report pop up

  $scope.items = {};
  if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
    $scope.items.eventId = $stateParams.eventId;
  } 

  $scope.animationsEnabled = true;
  $scope.add_emailReport = function(size,  emailReportId) {
    $rootScope.emailReportId = emailReportId;
    console.log('emailReportId' , emailReportId , '$rootScope.emailReportId ' ,$rootScope.emailReportId );

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalEmailReport.html',
      controller: 'ModalInstanceEmailReportCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };


 $scope.delete_emailReport = function(size,  emailReportId) {
    $rootScope.deleteEmailReportId = emailReportId;
    console.log('deleteEmailReportId' , emailReportId , '$rootScope.deleteEmailReportId ' ,$rootScope.deleteEmailReportId );

    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalEmailReport.html',
      controller: 'ModalInstanceEmailReportCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };





  $scope.assignTemplateAnimationsEnabled = true;
  $scope.assignTemplate = function(size,  emailReportId) {
    var modalInstance = $uibModal.open({
      animation: $scope.assignTemplateAnimationsEnabled,
      templateUrl: 'myModalAssignTemplate.html',
      controller: 'ModalInstanceAssignTemplateCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };

});



/*
Code for product popup
*/
angular.module('alisthub').controller('ModalInstanceEmailReportCtrl', function($scope, $uibModalInstance, $rootScope, $localStorage, $injector, $timeout,items) {
  
  $scope.report = {};

 // var eventId = $stateParams.eventId;
  //  $scope.eventId = eventId;

$scope.hours = hours;
$scope.minutes = minutes;
$scope.seconds = seconds;

  var $serviceTest = $injector.get("events");
  
  $scope.items = items;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


if($rootScope.deleteEmailReportId != undefined) {
    console.log('getEmailReportById');

        $scope.report.id = $rootScope.deleteEmailReportId ;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        $scope.loader = true;
        $serviceTest.deleteEmailReportById($scope.report, function(response) {
            $scope.loader = false;
            if (response.code == 200) {
              
            $serviceTest.getEmailReport({ 'user_id': $scope.report.user_id  , 'eventId' : $scope.report.eventId }, function(response) {
            $rootScope.EmailReportsList = response.result;
            console.log('EmailReportsList ' , $rootScope.EmailReportsList ) ;
            }); 
            $scope.cancel();

            } else {
                $scope.error_message = response.error;
            }

        });


        }



        if($rootScope.emailReportId != undefined) {
    console.log('getEmailReportById');

        $scope.report.id = $rootScope.emailReportId ;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        $scope.loader = true;
        $serviceTest.getEmailReportById($scope.report, function(response) {
            $scope.loader = false;
            if (response.code == 200) {
               $scope.report = response.result[0];
               var time = $scope.report.send_time ;
               var timeArray = time.split(':');

                $scope.report.send_time = {};

                $scope.report.send_time.hours =  timeArray[0];
                $scope.report.send_time.minutes=  timeArray[1];
                $scope.report.send_time.seconds =  timeArray[2];

if(timeArray[0].substring(0,1) == 0 ) { $scope.report.send_time.hours  = timeArray[0].substring(1,2); }
if(timeArray[1].substring(0,1) == 0 ) { $scope.report.send_time.minutes  = timeArray[1].substring(1,2); }
if(timeArray[2].substring(0,1) == 0 ) { $scope.report.send_time.seconds  = timeArray[2].substring(1,2); }

            } else {
                $scope.error_message = response.error;
            }

        });


        }




$scope.addEmailReport =  function (report) {

    console.log('in add email report ' , report);

    if ($localStorage.userId != undefined) {
        $scope.report = report;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        var hh = $scope.report.send_time.hours;
        var mm = $scope.report.send_time.minutes;
        var ss = $scope.report.send_time.seconds;

        if(hh.length == 1 ) { hh = '0'+hh;}
        if(mm.length == 1 ) { mm = '0'+mm;}
        if(ss.length == 1 ) { ss = '0'+ss;}

        $scope.report.send_time.hours =  hh;
        $scope.report.send_time.minutes=  mm;
        $scope.report.send_time.seconds =  ss;

        $scope.report.send_time = hh+":"+mm+":"+ss ;
        
        console.log('$scope.report');
        console.log($scope.report);

        $scope.loader = true;
        $serviceTest.addEmailReport($scope.report, function(response) {
            console.log('response', response);
            $scope.loader = false;
            if (response.code == 200) {
      
                $scope.successEmailReport = global_message.saveEmailReport;
                $scope.success_message_email_report = true;
                $timeout(function() {
                  $scope.successEmailReport = '';
                  $scope.success_message_email_report = false;
                }, 3000);

                 $serviceTest.getEmailReport({ 'user_id': $scope.report.user_id  , 'eventId' : $scope.report.eventId }, function(response) {
         $rootScope.EmailReportsList = response.result;
         console.log('EmailReportsList ' , $rootScope.EmailReportsList ) ;
    }); 
$scope.cancel();
            } else {
                $scope.error_message = response.error;
            }

        });

    }

}

 
 
 $scope.edit_emailReport =  function (report) {

console.log('edit_emailReport ' , report );

}



});



angular.module('alisthub').controller('ModalInstanceAssignTemplateCtrl', function($scope, $uibModalInstance, $rootScope, $localStorage, $injector, $timeout,items) {
  
  $scope.templateData = {};

 // var eventId = $stateParams.eventId;
  //  $scope.eventId = eventId;
console.log('hours ' , hours );




  var $lookAndFeelService = $injector.get("Lookservice");

  $scope.items = items;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };





if( $scope.items.eventId != undefined) {
    console.log('getEmailReportById');
        //$scope.template.eventId = $scope.items.eventId;
        $lookAndFeelService.getlookAndFeel( {} , function(response) {
            if (response!=null && response.code == 200) {
                $scope.templates=response.result;
                console.log('$rootScope.template_id ' , $rootScope.template_id );
                $scope.choosen_template_id = $scope.templateData.template_id  = $rootScope.template_id; 
            }
            else{
                $scope.templates=[];   
            }

        });
}



$scope.assignEmailTemplate =  function (templateData) {

    console.log('in assignEmailTemplate ' , templateData);

        $scope.templateData.template_id = templateData.template_id;
        $scope.templateData.eventId = $scope.items.eventId;

        console.log(' $scope.templateData ' ,  $scope.templateData);

           $lookAndFeelService.assignEmailTemplate($scope.templateData, function(response) {
           
            if (response.code == 200) {
      
                /*
                $scope.successEmailReport = global_message.saveEmailReport;
                $scope.success_message_email_report = true;
                $timeout(function() {
                  $scope.successEmailReport = '';
                  $scope.success_message_email_report = false;
                }, 3000);

                */

                 $lookAndFeelService.getEmailTemplateOfEvent({ 'eventId' :  $scope.items.eventId }, function(response) {
                        $rootScope.template_name = response.results[0].template_name;
                        $rootScope.template_id = response.results[0].template_id;

                 }); 
                $scope.cancel();
            } else {
                $scope.error_message = response.error;
            }

        });



}

 

});

