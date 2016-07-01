angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('singleEventViewController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
    $rootScope.class_status = false;
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    
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

    $scope.userId = userId;
    $scope.eventId = eventId;
    
    console.log('eventId ' , eventId) ;


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


    //service created to get event detail

    $eventService.getEvent({ 'event_id': eventId }, function(response) {

        console.log('response ' , response) ;
     
        $scope.data = response.results[0];
        
        $scope.title = response.results[0].title;
        $scope.event_date = $scope.getFormattedDate(response.results[0].eventdate);
        $scope.venue_name = response.results[0].venue_name;
        $scope.event_address = response.results[0].event_address;
        $scope.city = response.results[0].city;
        $scope.state = response.results[0].state;
        $scope.country = response.results[0].country;

        $scope.user_id = response.results[0].user_id;
        $scope.event_id = response.results[0].event_id;
        $rootScope.template_name = response.results[0].template_name;
        $rootScope.template_id = response.results[0].template_id;


      $scope.event_url_for_share = response.results[0].event_url_for_share;

       $scope.sales_status = 'offline';
       $scope.sales_close_date = $scope.getFormattedDate(response.results[0].sales_close_date);

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


    $questionService.getQuestionsOfEvent({ 'userId': userId , 'eventId' : eventId  }, function(response) {
        console.log('response ' , response) ;
        $scope.getQuestions = response.result;

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






    //get comment  
    $scope.array = [];


     //Add Product pop up

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


  var $serviceTest = $injector.get("events");
  
  $scope.items = items;

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


$scope.hours_am_pm = function(time) {
    console.log('time ' , time);
    var hours = time[0] + time[1];
    var min = time[2] + time[3];
    var sec = 00;
    
    /*
    if (hours < 12) {
      return hours + ':' + min + ' AM';
    } else {
      hours=hours - 12;
      hours=(hours.length < 10) ? '0'+hours:hours;
      return hours+ ':' + min + ' PM';
    }
    */

    return hours + ':' + min + ':' + sec;
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

      //var convertedDate = {};
     // convertedDate.date = new Date(year+"-"+month+"-"+date);

      //convertedDate.time = $scope.hours_am_pm(hours+""+minutes);
      //return convertedDate ;  
      return $scope.hours_am_pm(hours+""+minutes); ; 
    } else {
      //var convertedDate = {};
      //convertedDate.date = null;
      convertedDate.time = null;
      //return convertedDate ;
      return convertedDate.time;
    }
  };

if($rootScope.emailReportId != undefined) {
    console.log('getEmailReportById');

        $scope.report.id = $rootScope.emailReportId ;
        $scope.report.user_id = $localStorage.userId;
        $scope.report.eventId = $scope.items.eventId;

        console.log('$scope.report');
        console.log($scope.report);

        $scope.loader = true;
        $serviceTest.getEmailReportById($scope.report, function(response) {
            $scope.loader = false;
            if (response.code == 200) {
               console.log('response', response);
               $scope.report = response.result[0];

               $scope.report.send_time = $scope.getDateTime($scope.report.send_time);
               console.log('$scope.report.send_time  ' , $scope.report.send_time ) ;

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
  
  $scope.report = {};

 // var eventId = $stateParams.eventId;
  //  $scope.eventId = eventId;

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
            }
            else{
                $scope.templates=[];   
            }

        });
}

$scope.assignEmailTemplate =  function (template) {

    console.log('in assignEmailTemplate ' , template);

        $scope.template = template;
        $scope.template.eventId = $scope.items.eventId;

           $lookAndFeelService.assignEmailTemplate($scope.template, function(response) {
           
            if (response.code == 200) {
      
                $scope.successEmailReport = global_message.saveEmailReport;
                $scope.success_message_email_report = true;
                $timeout(function() {
                  $scope.successEmailReport = '';
                  $scope.success_message_email_report = false;
                }, 3000);

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

