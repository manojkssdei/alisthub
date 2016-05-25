'use strict';

angular.module('alisthub')
/* services for venues module */
.factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };

  url.addVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.venueOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.venueOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.changeVenueStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeVenueStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.deleteVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.duplicateVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.duplicateVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.getSettingCount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSettingCount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  /* services for bundles module */
 // Created : 2016-05-24
 // Created Buy : Manoj Singh
 /****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
   
   url.addShowclixVenue = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.addVenue,"undefined",showclix_tokenConstants,jsondata, function(res,req){
			callback(res);
		});
  };
  
  

return url;
}])

/* services for bundles module */
// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_venue', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    url.getVenues = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.signUp,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
    };

   url.addShowclixVenue = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.addVenue,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
  };
   
}])


;