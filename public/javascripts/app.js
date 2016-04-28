// app.js
/**************
CREATED :6 April 2016
CREATED BY: Deepak khokhar
Montive: It defined routes to call different files.It will provide you directions where to go.
********************/
'use strict';
angular.module("communicationModule", []);
// Declare app level module which depends on filters, and services

var routerApp = angular.module('alisthub', ['ui.router', ,'ngStorage','oc.lazyLoad','communicationModule', 'ui.bootstrap','ckeditor','google.places', 'angucomplete','angularUtils.directives.dirPagination'])

  .config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
     $urlRouterProvider.otherwise('/login');
    

    // You can also load via resolve
    $stateProvider.
    //login screen
      state('login', {
        url: "/login", // root route
        views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
      })
       //Authentication screen=================================
        .state('signup', {
            url: '/signup',
            
            views: {
          "lazyLoadView": {
            controller: 'signupcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/signup.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        
        //Email Confirmation screen=================================
        .state('confirm_email', {
            url: '/confirm_email/:id',
            views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }        
        })
                
        //Authentication screen=================================
        .state('forgot-password', {
            url: '/forgot-password',
            
            views: {
          "lazyLoadView": {
            controller: 'forgotcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/forgot.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        // New Password
        .state('new_password', {
            url: '/forget_password/:id',
            
            views: {
          "lazyLoadView": {
            controller: 'forgotcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/newpassword.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
            
         //Events dashoard screen=================================
        .state('dashboard', {
            url: '/dashboard',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/dashboard.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
        })
        
         //Create Event screen=================================
        .state('create_an_event', {
            url: '/create_an_event',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/create_an_event.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
            
        })
        
        //View Event screen=================================
        .state('view_event', {
            url: '/view_event',
            views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/view_event.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', function($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/controller.js');
              }]
            }
        })
        
        //Create Event step1=================================
        .state('create_event_step1', {
            url: '/create_event_step1',
            
            views: {
                "lazyLoadView": {
                  controller: 'stepeventController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/views/create_event_step1.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/step_event/controller.js','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js','https://cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js','http://jdewit.github.io/bootstrap-timepicker/js/bootstrap-timepicker.js']);
                    })
               
              }]
            }
        })
        // Module : Event Setting Start
        // Submodule : Venue Management
        .state('add_venue', {
            url: '/add_venue',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/add_venue.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
        .state('view_venues', {
            url: '/view_venues/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/view_venues.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
        .state('edit_venue', {
            url: '/edit_venue/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/add_venue.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
        .state('event_setting', {
            url: '/event_setting',
            
            views: {
                "lazyLoadView": {
                  controller: 'eventSettingController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/event_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
        .state('venue_overview', {
            url: '/venue_overview/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'eventSettingController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/venue_overview.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
    
  }).run(['$rootScope', '$location','$state', '$localStorage',function($rootScope,$location, $state,$localStorage) {
    //To add class
    if($localStorage.isuserloggedIn){
        $rootScope.menu=$rootScope.after_login_footer_div=false;
        $rootScope.footer_login_div=true;
        $rootScope.email=$localStorage.email;
        $rootScope.name=$localStorage.name;
        $rootScope.access_token=$localStorage.access_token;
        $rootScope.phone_no=$localStorage.phone_no;
        $rootScope.userId=$localStorage.userId;
        $rootScope.address=$localStorage.address;
        $state.go('dashboard');
    }else{
       $rootScope.menu=$rootScope.after_login_footer_div=true;
       $rootScope.footer_login_div=false; 
    }
    
    $rootScope.logout=function(){
        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
       localStorage.clear();
        $state.go('login');
    }
    }]);;
