'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.add_schedule = function(jsondata,callback){
       communicationService.resultViaPost(webservices.add_schedule,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.saverecurringschedule = function(jsondata,callback){
   
       communicationService.resultViaPost(webservices.saverecurringschedule,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
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