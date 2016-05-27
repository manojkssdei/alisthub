'use strict';

angular.module('alisthub')

/* services for bundles module */
.factory('bundles', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getBundles = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBundles,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

   url.getBundleProducts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBundleProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.addBundle = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.bundleOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.bundleOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.changeBundleStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeBundleStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.uploadBundleImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.uploadBundleImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.deleteBundle = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
return url;
}])

/* services for bundles module */
// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_bundle', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    url.getVenues = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.signUp,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
    };

   url.addVenue = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.addVenue,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
  };
   
}])


;