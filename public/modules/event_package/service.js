'use strict';

angular.module('alisthub').factory('event_package', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.stepOneEventPackage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.stepOneEventPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };

  //get Package Data
  url.getPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  //get Events in Package 
  url.getEventsInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getEventsInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

    //get Bundles 
  url.getBundlesInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundlesInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };


    //get Bundles 
  url.getProductsInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getProductsInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.addBundleInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.addBundleInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  
  url.getBundleProductsInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundleProductsInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
  
   //get price level
  url.getEventPriceLevelInPackage = function(jsondata,callback) {
        console.log('in service getEventPriceLevelInPackage' );

    communicationService.resultViaPost(webservices.getEventPriceLevelInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };


 url.getAllEventsPriceLevelInPackage = function(jsondata,callback) {
        console.log('in service getAllEventsPriceLevelInPackage' );

    communicationService.resultViaPost(webservices.getAllEventsPriceLevelInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

//update bundles
  url.updateBundleInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.updateBundleInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };


return url;

}]);