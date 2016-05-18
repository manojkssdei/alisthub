'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.saveEvent = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.saverecurringEvent = function(jsondata,callback){
   
       communicationService.resultViaPost(webservices.saverecurringEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.savepriceleveldata = function(jsondata,callback){
    communicationService.resultViaPost(webservices.savepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.getPricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getPricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  
  url.removepricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.removepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };

  url.addBundle = function(jsondata,callback){
    communicationService.resultViaPost(webservices.addBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.updateBundle = function(jsondata,callback){
    communicationService.resultViaPost(webservices.updateBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.getProducts = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
  
  url.getBundles = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundles,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
return url;

}]);