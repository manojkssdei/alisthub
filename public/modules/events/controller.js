/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('eventhomeController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$http) { 
<<<<<<< HEAD
=======

>>>>>>> pb/master
    
    $rootScope.class_status=false;
    var eventService = $injector.get("events");
    
    if(window.innerWidth>767) { 
      $scope.navCollapsed = false;    
    } else {
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };    
    }
    
    // if seller has no event then
                  if ($localStorage.userId) {
                     $http({
                        url: webservices.getEvents,
                        method: 'POST',
                        data: "user_id="+$localStorage.userId,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "Accept": "application/json",
                        }
                    }).success(function(datae, status, headers, config) {
                        
                        if (datae && datae != "") {
                             
                        }
                        else{
                               $state.go('create_an_event'); 
                        }
                    });
                  }
                    
     //////
     
     
    $scope.UPCtab = false;
    $scope.UPCtabclass = "fa-caret-down";
    $scope.id1 = 1;
    $scope.openTabUPC = function(id) {
        if (id == 1) {
            $scope.id1 = 2;
            $scope.UPCtab = true;
            $scope.UPCtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id1 = 1;
            $scope.UPCtab = false;
            $scope.UPCtabclass = "fa-caret-down";
        }
    }

    $scope.PASTtab = false;
    $scope.PASTtabclass = "fa-caret-down";
    $scope.id2 = 1;
    $scope.openTabPAST = function(id) {
        if (id == 1) {
            $scope.id2 = 2;
            $scope.PASTtab = true;
            $scope.PASTtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id2 = 1;
            $scope.PASTtab = false;
            $scope.PASTtabclass = "fa-caret-down";
        }
    }

    $scope.PAKtab = false;
    $scope.PAKtabclass = "fa-caret-down";
    $scope.id3 = 1;
    $scope.openTabPAK = function(id) {
        if (id == 1) {
            $scope.id3 = 2;
            $scope.PAKtab = true;
            $scope.PAKtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id3 = 1;
            $scope.PAKtab = false;
            $scope.PAKtabclass = "fa-caret-down";
        }
    }

    $scope.recurringHref = function(eventId,recurringOrNot){
      if(recurringOrNot==0){
        $location.path("/#/create_event_step1/" + eventId);  
      } else {
        $location.path("/#/create_series_step1/" + eventId);
      }
    }

    //upcomming event list
    $scope.getUpcommingEvent = function(eventType) {
      type = 0;      
      if(eventType == 'series') {
        type = 1;
      }

      eventService.getUpcommingEvent({'user_id':$localStorage.userId,'type':type},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.upcoming_event_data = response.results;
            $scope.tableParams = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  },{
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data:$scope.upcoming_event_data
                                  });
          }
        } else {
          $scope.upcoming_event_data = [];   
        }
      });
    }

    //PAST event list
    $scope.getPastEvent = function(eventType) {
      type = 0;      
      if(eventType == 'series') {
        type = 1;
      }
      eventService.getPastEvent({'user_id':$localStorage.userId,'type':type},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.past_event_data = response.results;
            
            $scope.tableParams1 = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  }, {
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data:$scope.past_event_data
                                  });
          }
        } else {
          $scope.past_event_data = [];   
        }
      });
    }

    //PAST event list
    $scope.getEventSeries = function() {
      eventService.getEventSeries({'user_id':$localStorage.userId},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.event_package_data = response.results;
            
            $scope.tableParams2 = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  },{
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data : $scope.event_package_data
                                  });
          }
        } else {
          $scope.event_package_data = [];   
        }
      });
    }

    $scope.getUpcommingEvent();
    $scope.getPastEvent();
    $scope.getEventSeries();

    $scope.delEvent=function(event_id)
    {
    
     eventService.deleteEvent({'event_id':event_id},function(response){
       if(response.code==200)
     {
     eventService.getEventUser({'user_id':$localStorage.userId},function(response){
              
              if (response!=null) {

              if (response.code == 200)
              {
                $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =response.results;
               $scope.tableParams = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 50,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data:$scope.upcoming_event_data
                              });
               $scope.tableParams1 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data1:$scope.past_event_data
                              });
              $scope.tableParams2 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data2:$scope.event_package_data
                              });
              }

              }else{
               $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =[];   
              }
              
          });
     }
     });
    }
 
   if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
})
