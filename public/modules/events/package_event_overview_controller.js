angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('packageOverviewController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
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


    //var $eventService = $injector.get("events");
    //var $venueService = $injector.get("venues");
    var $questionService = $injector.get("questions");
    var $discountService = $injector.get("discounts");
   // var $lookAndFeelService = $injector.get("Lookservice");

    var $packageService = $injector.get("event_package");
    
    $scope.data = {};
    $rootScope.data = {};
    $scope.error_message = true;
    var userId =  $localStorage.userId;
    var packageId = $stateParams.packageId;

    $scope.userId = userId;
    $scope.packageId = packageId;
    $scope.data.sales_pause_status = 'Pause Sales';
    $rootScope.data.favorite_status = 'Add To Favorite';
    
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


    $packageService.getPackage({ 'package_id': packageId, 'user_id': userId }, function(response) {

            $scope.data = response.results[0];

            $scope.data.package_name = response.results[0].package_name;
            $scope.package_events = response.package_events;
            $scope.data.sales_pause_status = 'Pause Sales';
            $rootScope.data.favorite_status = 'Add To Favorite';

           
            $scope.data.image_1 = $scope.data.image ;
            $scope.event_ids = [];
            $scope.event_idsStr = '';
            for (var index in $scope.package_events) {
                var valId = $scope.package_events[index].event_id;
                $scope.event_ids.push(valId);
                $scope.event_idsStr += valId + ",";
            }

            $rootScope.choosenSelectedEventsIds = $scope.event_ids;
            console.log('$rootScope.choosenSelectedEventsIds' , $rootScope.choosenSelectedEventsIds) ;
            console.log('$scope.data.event_ids', $scope.event_ids);
            console.log('$scope.data.event_idsStr', $scope.event_idsStr);

            $scope.viewEvents();
            $scope.getQuestionsOfEventOfPackage();
        });

        $scope.viewEvents = function() {
            $scope.eventPostData = {};
            $scope.eventPostData.user_id = userId;
            $scope.eventPostData.choosenEventsIds = $scope.event_idsStr;

            console.log('$scope.eventPostData', $scope.eventPostData);
            $packageService.viewSelectedEvents($scope.eventPostData, function(response) {
                if (response.code == 200) {
                    $scope.choosenEventsArea = true;
                    $scope.eventsChoosedFlag = true;
                    $rootScope.FinalEvents = $scope.FinalEvents = response.result;

                    $scope.tableParams = new ngTableParams({
                        page: 1, // show first page
                        count: 5, // count per page
                        sorting: { name: 'asc' },
                    }, {
                        data: $rootScope.FinalEvents
                    });

                    /* $scope.eventdata.forEach(function(value) {
                        $scope.event_id.push(value.id);
                    }); */

                }
            });

        };

  $scope.eventBundle = {};
  $scope.eventBundle.user_id =  userId;
  $scope.eventBundle.package_id = packageId;

  $scope.showBundleList=false;
  console.log('hide showBundleList ');
  $packageService.getBundlesInPackage($scope.eventBundle, function(response) {
    console.log('response.result' , response.results);
    if(response.results) {
      $scope.showBundleList=true;
       $scope.bundleInPackageList = response.results;
      console.log('$scope.bundleInPackageList' , $scope.bundleInPackageList);
      
    }
  });


 $scope.getQuestionsOfEventOfPackage = function() {
            $scope.getQuestionData = {};
            $scope.getQuestionData.userId = userId;
            $scope.getQuestionData.choosenEventsIds = $scope.event_idsStr;
            console.log('$scope.getQuestionData', $scope.getQuestionData);
            $packageService.getQuestionsOfEventOfPackage($scope.getQuestionData, function(response) {
                if (response.code == 200) {
                    $scope.getQuestions = response.result;
                    $scope.tableParamsQuestions = new ngTableParams({
                        page: 1, // show first page
                        count: 5, // count per page
                        sorting: { id: 'asc' },
                    }, {
                        data: $scope.getQuestions
                    });
                }
            });
        };





$scope.delPackage = function(package_id) {
    console.log('delPackage called' , event_id);

  $packageService.delPackage({'package_id':package_id , 'user_id' : userId },function(response) {
    if(response.code==200) {
      $location.path("/dashboard");
    }
  }); 
}


$scope.addFavouritePackage = function(package_id) {
    console.log('addFavouritePackage called' , package_id);
  $packageService.addFavouritePackage({'package_id':package_id  , 'user_id' : userId },function(response) {
    if(response.code==200) {
        $rootScope.data.favorite_status = 'Added as Favorite' ;
    }
  }); 
}



});



/*
Code for product popup
*/
angular.module('alisthub').controller('ModalInstanceEmailReportCtrl', function($scope, $uibModalInstance, $rootScope, $localStorage, $injector, $timeout,items) {
  
  $scope.report = {};

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

