/*
CREATED :6 April 2016
CREATED BY: Deepak khokhar
Description: It defined routes to call different files.It will provide you directions where to go.
*/
'use strict';
angular.module("communicationModule", []);
// Declare app level module which depends on filters, and services


var routerApp = angular.module('alisthub', ['ui.router', ,'ngStorage','oc.lazyLoad','communicationModule', 'ui.bootstrap','ckeditor','google.places', 'angucomplete','ngTable','color.picker','reCAPTCHA','720kb.tooltips'])


  .config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
     $urlRouterProvider.otherwise('/login');
      
 
    // You can also load via resolve
    $stateProvider.
      
      /* Setting for login screen setup */
      state('login', {
        url: "/login", // root route
        views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/authentication/showclix_services.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/authentication/controller.js']);
                })
           }]
          
          
        }
      })

      /* Setting for Sign up screen setup */
        .state('signup', {
            url: '/signup',
            
            views: {
          "lazyLoadView": {
            controller: 'signupcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/signup.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/authentication/showclix_services.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/authentication/controller.js']);
                })
           }]
        }
        })
        
        /* Setting for email confirmation screen */
        .state('confirm_email', {
            url: '/confirm_email/:confirm_email_id',
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
                
        /* Setting for forgot password screen */
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
        
        /* Setting for new password screen */
        .state('new_password', {
            url: '/forget_password/:forget_password_id',
            
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
            
        /* Setting for event dashboard screen */
        .state('dashboard', {
            url: '/dashboard',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/dashboard.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/events/controller.js']);
                })
              }]
            }
        })
        
        /* Setting for Create event screen */
        .state('create_an_event', {
            url: '/create_an_event',
             views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/create_an_event.html'
                } 
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/events/controller.js']);
                })
              }]
            }
            
        })
        
        /* Setting for view event screen */
        .state('view_event', {
            url: '/view_event',
            views: {
                "lazyLoadView": {
                  controller: 'eventhomeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/events/views/view_event.html'
                },
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/events/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/events/controller.js']);
                })
              }]
            }
        })
        
        /* Setting for Create Event step1 screen */
        .state('create_event_step1', {
            url: '/create_event_step1/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'stepeventController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/views/create_event_step1.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/step_event/controller.js','javascripts/bootstrap-timepicker.js']);
                    })
               
              }]
            }
        })
	 /* Setting for Create Event step2 screen */
        .state('create_event_step2', {
            url: '/create_event_step2/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'stepevent2Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/step2/views/create_event_step2.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/step_event/step2/controller.js']);
                    })
               
              }]
            }
        })
        
         /* Setting for Create Event step2 screen */
        .state('create_event_step3', {
            url: '/create_event_step3/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'stepevent3Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/step3/views/create_event_step3.html',
		},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/step3/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/step_event/step3/controller.js']);
                    })
               
              }]
            }
        })
        
         /* Setting for Create Event step4 screen */
        .state('create_event_step4', {
            url: '/create_event_step4/:eventId',
            
            views: { 
                "lazyLoadView": {
                  controller: 'stepevent4Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/step4/views/create_event_step4.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/step4/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/step_event/step4/controller.js','javascripts/bootstrap-timepicker.js']);
                    })
               
              }]
            }
        })
		
        
        /*********create series.****************/

        /*.state('create_series', {
            url: '/create_series',
            
            views: {
                "lazyLoadView": {
                  controller: 'createseriesController',
                  templateUrl: 'modules/event_series/views/create_event_series.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_series/controller.js','javascripts/bootstrap-timepicker.js']);
                })
              }]
            }
          
        })*/
         
         .state('create_series_step1', {
            url: '/create_series_step1/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'seriesStep1Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_series/step1/views/create_series_step1.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/event_series/step1/controller.js','javascripts/bootstrap-timepicker.js']);
                    })
               
              }]
            }
        })
         
         
         /* Setting for Create Series Event step2 screen */
        .state('create_series_step2', {
            url: '/create_series_step2/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'seriesStep2Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_series/step2/views/create_series_step2.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/event_series/step2/controller.js']);
                    })
               
              }]
            }
        })
        
         /* Setting for Create Series Event step2 screen */
        .state('create_series_step3', {
            url: '/create_series_step3/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'seriesStep3Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_series/step3/views/create_series_step3.html',
		},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/step3/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/event_series/step3/controller.js']);
                    })
               
              }]
            }
        })
        
         /* Setting for Create Series Event step4 screen */
        .state('create_series_step4', {
            url: '/create_series_step4/:eventId',
            
            views: {
                "lazyLoadView": {
                  controller: 'seriesStep4Controller', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_series/step4/views/create_series_step4.html',
				},
				
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/step4/service.js').then(function(){
                    return $ocLazyLoad.load(['modules/event_series/step4/controller.js','javascripts/bootstrap-timepicker.js']);
                    })
               
              }]
            }
        })
         
         
         ////////////////*************EVENT PACKAGE****************************/////
           .state('create_package', {
            url: '/create_package',
            
            views: {
                "lazyLoadView": {
                  controller: 'createpackageController',
                  templateUrl: 'modules/event_package/views/event_package.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_package/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_package/controller.js']);
                })
              }]
            }
          
        })


//**************add more scheduling***********************//

 .state('add_schedule', {
            url: '/add_schedule',
            
            views: {
                "lazyLoadView": {
                  controller: 'schedule_controller',
                  templateUrl: 'modules/event_series/views/add_schedule.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_series/schedule_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_series/schedule_controller.js','javascripts/bootstrap-timepicker.js']);
                })
              }]
            }
          
        })



        // Module : Event Setting Start
        /* Setting for Venue Management screen */
        .state('add_venue', {
            url: '/add_venue',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/venue/add_venue.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/venue_service.js').then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
               
              }]
                        
            }
        })
        
        /* Setting for view Venue screen */
        .state('view_venues', {
            url: '/view_venues/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageVenueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/venue/view_venues.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,    
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/venue_service.js').then(function(){
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
              }]
            }
        })
        
        /* Setting for edit Venue screen */
        .state('edit_venue', {
            url: '/edit_venue/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/venue/add_venue.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication, 
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/venue_service.js').then(function(){
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
              }]
            }
        })
        
        /* Setting for event setting screen */
        .state('event_setting', {
            url: '/event_setting',
            
            views: {
                "lazyLoadView": {
                  controller: 'eventSettingController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/event_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/venue_service.js').then(function(){
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                    })
              }]
            }
        })
        
        /* Setting for venue overview screen */
        .state('venue_overview', {
            url: '/venue_overview/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'venueController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/venue/venue_overview.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/venue_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/controller.js']);
                })
              }]
            }
        })
        
        /* Setting for add question screen */
        .state('add_question', {
            url: '/add_question',
            
            views: {
                "lazyLoadView": {
                  controller: 'questionController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/question/add_question.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/question_service.js').then(function(){
                    }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/question_controller.js']);
                    })
              }]
            }
        })
        
        /* Setting for edit question screen */
        .state('edit_question', {
            url: '/edit_question/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'questionController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/question/add_question.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication, 
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/question_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/question_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for view question screen */
        .state('view_questions', {
            url: '/view_questions/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageQuestionController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/question/view_question.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication, 
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/question_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/question_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for assign question screen */
        .state('assign_question', {
            url: '/assign_question/:assign',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageQuestionController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/question/assign_question.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/question_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/question_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for add product screen */
        .state('add_product', {
            url: '/add_product',
            
            views: {
                "lazyLoadView": {
                  controller: 'productController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/product/add_product.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/product_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/product_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for edit product screen */
        .state('edit_product', {
            url: '/edit_product/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'productController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/product/add_product.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/product_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/product_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for view products screen */
        .state('view_products', {
            url: '/view_products/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageProductController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/product/view_product.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/product_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/product_controller.js']);
                })
              }]
            }
        })

        // DISCOUNT Module  
        /* Setting for add discount screen */
        .state('add_discount', {
            url: '/add_discount',
            
            views: {
                "lazyLoadView": {
                  controller: 'discountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/add_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for edit discount screen */
        .state('edit_discount', {
            url: '/edit_discount/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'discountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/add_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js']);
                })
              }]
            }
        })
        
        
        /* Setting for view discount screen */
        .state('view_discounts', {
            url: '/view_discounts/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageDiscountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/view_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js']);
                })
              }]
            }
        })

        /* Setting for assign discount screen */
        .state('assign_discount', {
            url: '/assign_discount/:assign',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageDiscountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/assign_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for new assign discount screen */
        .state('new_assign_discount', {
            url: '/new_assign_discount/:assign',
            
            views: {
                "lazyLoadView": {
                  controller: 'assignDiscountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/new_assign_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js','javascripts/bootstrap-timepicker.js']);
                })
              }]
            }
        })

          /* Setting for edit global assign discount screen */
        .state('edit_assign_discount', {
            url: '/edit_assign_discount/:edit_dis_assignId',
            
            views: {
                "lazyLoadView": {
                  controller: 'assignDiscountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/edit_assign_discount.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js','javascripts/bootstrap-timepicker.js']);
                })
              }]
            }
        })


        /* Discount Assignment Overview */
        .state('discount_assignment_overview', {
            url: '/discount_assignment_overview/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'assignDiscountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/discount/discount_assignment_overview.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/discount_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/discount_controller.js','javascripts/bootstrap-timepicker.js']);
                })
              }]
            }
        })
            

        //DISCOUNT END
        
        // start bundle routing
        /* Setting for add bundle screen */
        .state('add_bundle', {
            url: '/add_bundle',
            
            views: {
                "lazyLoadView": {
                  controller: 'bundleController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/bundle/add_bundle.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/bundle_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/bundle_controller.js']);
                })
              }]
            }
        })
        
        /* Setting for edit bundle screen */
        .state('edit_bundle', {
            url: '/edit_bundle/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'bundleController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/bundle/add_bundle.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/bundle_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/bundle_controller.js']);
                })
              }]
            }
        })
        

        /* Setting for product overview screen */
         .state('product_overview', {
            url: '/product_overview/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'productController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/product/product_overview.html'

                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/product_service.js').then(function(){
                }).then(function(){
                    return $ocLazyLoad.load(['modules/event_setting/product_controller.js']);
                })
              }]
            }
        })

        /* Setting for product setting screen */
        .state('product_setting', {
            url: '/product_setting',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageProductController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/event_setting/views/product/product_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/event_setting/services/product_service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/event_setting/product_controller.js']);
                })
              }]
            }
        })
        // End Product Module
   
    // Start Manage Section :
    /* Setting for view user screen */   
    .state('view_user', {
            url: '/view_user',
            
            views: {
                "lazyLoadView": {
                  controller: 'userController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/manage/views/user/user.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
               authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/manage/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/manage/user_controller.js']);
                })
              }]
            }
        })

        /* Setting for add user screen */
        .state('add_user', {
            url: '/add_user',
            
            views: {
                "lazyLoadView": {
                  controller: 'userController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/manage/views/user/add_user.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/manage/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/manage/user_controller.js']);
                })
              }]
            }
        })

        /* Setting for edit user screen */
        .state('edit_user', {
            url: '/edit_user/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'userController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/manage/views/user/add_user.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/manage/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/manage/user_controller.js']);
                })
              }]
            }
        })

        /*setting for delete user from screen*/
      .state('delete_user', {
            url: '/delete_user/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'userController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/manage/views/user/add_user.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/manage/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/manage/user_controller.js']);
                })
              }]
            }
        })
//To view the customers
          .state('view_customer', {
            url: '/view_customer',
            
            views: {
                "lazyLoadView": {
                  controller: 'customerController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/customers/views/customer.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
               authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(['modules/customers/service.js','modules/common/service.js']).then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/customers/controller.js']);
                })
              }]
            }
        })

          /* Setting for edit customer screen */
        .state('edit_customer', {
            url: '/edit_customer/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'customerController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/customers/views/add_customer.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/customers/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/customers/controller.js']);
                })
              }]
            }
        })

  /*setting for delete customer from screen*/
      .state('delete_customer', {
            url: '/delete_customer/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'customerController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/customers/views/add_customer.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(['modules/customers/service.js','modules/common/service.js']).then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/customers/controller.js']);
                })
              }]
            }
        })

/*adding the customers module*/
   .state('add_customer', {
            url: '/add_customer',
            views: {
                "lazyLoadView": {
                  controller: 'customerController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/customers/views/add_customer.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(['modules/customers/service.js','modules/common/service.js']).then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/customers/controller.js']);
                })
              }]
            }
        })

/* Setting for view account screen */
       .state('view_account', {
            url: '/view_account',
            views: {
                "lazyLoadView": {
                  controller: 'accountinfoController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/myaccount/views/accountinfo/account_info.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/myaccount/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/myaccount/myaccountcontroller.js']);
                })
              }]
            }
        })

       /* Setting for add alist financial setting screen */
        .state('add_financial_setting', {
            url: '/add_financial_setting/alist',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/account/views/user/add_financial_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/account/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/account/account_controller.js']);
                })
              }]
            }
        })

        /* Setting for adding custom financial setting screen */
        .state('add_custom_financial_setting', {
            url: '/add_financial_setting/custom',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/account/views/user/custom_financial_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/account/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/account/account_controller.js']);
                })
              }]
            }
        })

        /* Setting for view the custom financial listing screen */
        .state('view_custom_financial_setting', {
            url: '/view_custom_financial_setting/:list',
            
            views: {
                "lazyLoadView": {
                  controller: 'manageAccountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/account/views/user/view_custom_financial_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/account/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/account/account_controller.js']);
                })
              }]
            }
        })

        /* Setting for edit custom financial merchant account details screen */
        .state('edit_financial_setting', {
            url: '/edit_financial_setting/:id',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/account/views/user/custom_financial_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/account/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/account/account_controller.js']);
                })
              }]
            }
        })


        // End Manage Section :
        /// start discount routes

        /* Setting for financial setting screen */
        .state('financial_setting', {
            url: '/financial_setting',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/account/views/user/financial_setting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/account/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/common/service.js']);
                }).then(function(){
                return $ocLazyLoad.load(['modules/account/account_controller.js']);
                })
              }]
            }
        })
        
        /// end Financial Setting routes
        
        /* advance_settings screen for create events */
        .state('advance_setting', {
            url: '/advance_setting',
            
            views: {
                "lazyLoadView": {
                  controller: 'advanceSetting', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/views/advance_setting.html',
        },
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/step_event/controller.js']);
                    })
               
              }]
            }
        })

 /* advance_settings screen for create events */
        .state('edit_advance_setting', {
            url: '/edit_advance_setting/:event_id',
            
            views: {
                "lazyLoadView": {
                  controller: 'advanceSetting', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/step_event/views/advance_setting.html',
        },
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,  
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/step_event/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/step_event/controller.js']);
                    })
               
              }]
            }
        })

/////////////////// Widgets setting///////////////////////
       .state('widgets', {
            url: '/widgets',
            
            views: {
                "lazyLoadView": {
                  controller: 'controller',
                  templateUrl: 'modules/widgets/views/list_widget.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/widgets/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/widgets/controller.js']);
                })
              }]
            }
          
        })

       ///////////////////////////add checkout widget///////////////



        .state('widgets/add', {
            url: '/widgets/add',
            
            views: {
                "lazyLoadView": {
                  controller: 'controller',
                  templateUrl: 'modules/widgets/views/checkout_widget.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/widgets/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/widgets/controller.js']);
                })
              }]
            }
          
        })


////////////////////add event widget ////////////////////
        .state('widgets/add_event', {
            url: '/widgets/add_event',
            
            views: {
                "lazyLoadView": {
                  controller: 'controller',
                  templateUrl: 'modules/widgets/views/event_widget.html'
                }
            },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/widgets/service.js').then(function(){
                }).then(function(){
                return $ocLazyLoad.load(['modules/widgets/controller.js']);
                })
              }]
            }
          
        })


  }).run(['$rootScope', '$location','$state', '$localStorage', '$http', '$timeout','$window','$stateParams',function($rootScope,$location, $state,$localStorage, $http,$timeout,$window,$stateParams) {

    /*$timeout(callAtTimeout, 20*20*3000);
    
    function callAtTimeout()
    {
        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
                    
                    $rootScope.email=$localStorage.email="";
                    $rootScope.name=$localStorage.name="";
                    $rootScope.access_token=$localStorage.access_token="";
                    $rootScope.auth_token=$localStorage.auth_token="";
                    $rootScope.phone_no=$localStorage.phone_no="";
                    $rootScope.userId=$localStorage.userId="";
                    $rootScope.address=$localStorage.address="";
                    
                    localStorage.clear();
                    $state.go('login');
    } */
    
    //To add class
 
   if($stateParams.confirm_email_id != undefined || !$stateParams.confirm_email_id || $stateParams.forget_password_id != undefined || !$stateParams.forget_password_id){}else{
    if(!$localStorage.isuserloggedIn){
        $location.path("/login");
    }
   }
  
    if($localStorage.isuserloggedIn){
        $rootScope.menu=$rootScope.after_login_footer_div=false;
        $rootScope.footer_login_div=true;
        $rootScope.email=$localStorage.email;
        $rootScope.name=$localStorage.name;
        $rootScope.access_token=$localStorage.access_token;
        $rootScope.phone_no=$localStorage.phone_no;
        $rootScope.userId=$localStorage.userId;
        $rootScope.address=$localStorage.address;
        $rootScope.class_status = false;
    ////////////////////////////////////////////////
     
        
    /*var serviceUrl = webservices.checkTokenExpiry; 
    var url = serviceUrl+"?token="+$localStorage.auth_token+"&callback=jsonp_callback";

    $http.jsonp(url);
  
    $window.jsonp_callback = function(data) {
     
     if (data.code == 101)
                {   console.log("Token Test"); 
                    $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
                    $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
                    
                    $rootScope.email=$localStorage.email="";
                    $rootScope.name=$localStorage.name="";
                    $rootScope.access_token=$localStorage.access_token="";
                    $rootScope.auth_token=$localStorage.auth_token="";
                    $rootScope.phone_no=$localStorage.phone_no="";
                    $rootScope.userId=$localStorage.userId="";
                    $rootScope.address=$localStorage.address="";
                    
                    localStorage.clear();
                    $state.go('login');
                    
                    
                }
    }*/
    ///////////////////////////////////////////////
        
    }else{
       $rootScope.menu=$rootScope.after_login_footer_div=true;
       $rootScope.footer_login_div=false;
       
    }
    
    $rootScope.logout=function(){
        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
        
        $rootScope.email=$localStorage.email="";
        $rootScope.name=$localStorage.name="";
        $rootScope.access_token=$localStorage.access_token="";
        $rootScope.auth_token=$localStorage.auth_token="";
        $rootScope.phone_no=$localStorage.phone_no="";
        $rootScope.userId=$localStorage.userId="";
        $rootScope.address=$localStorage.address="";
        
        localStorage.clear();
        $state.go('login');
    }

    
    
    }])
/********************CREATED BY DEEPAK K*******************************************/

    .config(function (reCAPTCHAProvider) {
            reCAPTCHAProvider.setPublicKey('6LevjBMTAAAAAP6gdHNyBQ6NDbB8vyPwhFFQlv7x');
            reCAPTCHAProvider.setOptions({
                theme: 'white',
                tabindex : 3

            });
        })
    .config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
  tooltipsConfProvider.configure({
    'smart':true,
    'size':'small', // 'large', 'small',  'medium'
    'speed': 'slow', //'fast', 'slow', 'medium'
    //'side' : 'right', // 'left','right','top','bottom'
    //etc...
  });
}])
/*================================================================================*/

 .directive('ngConfirmClicks', [

    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])
 .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);

routerApp.logauthentication = function($rootScope,$localStorage,$location,$http,$state,$timeout,$window)
{

    /*$timeout(callAtTimeout, 20*20*3000);

    function callAtTimeout()
    {
        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
                    
                    $rootScope.email=$localStorage.email="";
                    $rootScope.name=$localStorage.name="";
                    $rootScope.access_token=$localStorage.access_token="";
                    $rootScope.auth_token=$localStorage.auth_token="";
                    $rootScope.phone_no=$localStorage.phone_no="";
                    $rootScope.userId=$localStorage.userId="";
                    $rootScope.address=$localStorage.address="";
                    localStorage.clear();
                    $state.go('login');
    }*/
    // checktoken expiry time
    // check web services

   /* var serviceUrl = webservices.checkTokenExpiry; 

    var url = serviceUrl+"?token="+$localStorage.auth_token+"&callback=jsonp_callback";

    $http.jsonp(url);
  
    $window.jsonp_callback = function(data) {
     
     if (data.code == 101)
                {
                    console.log("Token expire");
                    $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
                    $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
                    
                    $rootScope.email=$localStorage.email="";
                    $rootScope.name=$localStorage.name="";
                    $rootScope.access_token=$localStorage.access_token="";
                    $rootScope.auth_token=$localStorage.auth_token="";
                    $rootScope.phone_no=$localStorage.phone_no="";
                    $rootScope.userId=$localStorage.userId="";
                    $rootScope.address=$localStorage.address="";
                    
                    localStorage.clear();
                    $state.go('login');
                    
                    
                }
                else
                {
                    console.log("Token live");
                    //$state.go('dashboard');
                }
     
     
    }*/
    
    if(!$localStorage.isuserloggedIn){
        $location.path("/login");
    }
       
};

