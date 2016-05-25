'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  // url.saveEvent = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.saveEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
////////////save package///////////////
  //   url.savePackage = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.savePackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
  //     callback(res.data);
  //   });
      
  // };
  
  // url.saverecurringEvent = function(jsondata,callback){
   
  //      communicationService.resultViaPost(webservices.saverecurringEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
  //saverecurringPackage///
  //   url.saverecurringPackage = function(jsondata,callback){
   
  //      communicationService.resultViaPost(webservices.saverecurringPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
  //     callback(res.data);
  //   });
      
  // };
  
  // url.savepriceleveldata = function(jsondata,callback){
   
  //      communicationService.resultViaPost(webservices.savepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
  
  // url.getPricelevel = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.getPricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };


  
  
return url;

}]);