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
    
    $scope.data = {};
    $scope.error_message = true;
    var event_id = $stateParams.eventId;
    console.log('event_id ' , event_id) ;



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

    $eventService.getEvent({ 'event_id': event_id }, function(response) {

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


    $venueService.getPricelevel({ 'event_id': event_id }, function(response) {
        console.log('response ' , response) ;
        $scope.data = response.results[0];
    });





    //get comment  
    $scope.array = [];



    //add the comments 

   





});
