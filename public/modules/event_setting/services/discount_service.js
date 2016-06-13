'use strict';

angular.module('alisthub')

/* services for discount module */
.factory('discounts', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getDiscounts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getDiscounts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.checkUniqueDiscount = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.checkUniqueDiscount , appConstants.authorizationKey , headerConstants.json , jsondata, function(res,req) {
      callback(res.data);
    });
    
  };

  url.checkUniqueDiscount = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.checkUniqueDiscount , appConstants.authorizationKey , headerConstants.json , jsondata, function(res,req) {
      callback(res.data);
    });
    
  };

  url.addDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.assignDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.assignDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.discountOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.discountOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.changeDiscountStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeDiscountStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.deleteDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

    
  url.viewEvents = function(jsondata,callback){
       communicationService.resultViaPost(webservices.viewEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.makeDiscountAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.makeDiscountAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.delAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.delAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.exportDiscountCSV = function(jsondata,callback){
       communicationService.resultViaPost(webservices.exportDiscountCSV,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.getSelectedDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSelectedDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.getEventPriceLevels = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getEventPriceLevels,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.saveFinalAssignmet = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveFinalAssignmet,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

   url.discountAssignmentOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.discountAssignmentOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.delDiscountAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.delDiscountAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.getAssignDiscountDetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getAssignDiscountDetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.updateFinalAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.updateFinalAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

    url.delPriceLevelDiscAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.delPriceLevelDiscAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };



  

  
  

return url;
}])

// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_discount', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
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