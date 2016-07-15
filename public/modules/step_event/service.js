'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
//get venues
    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  //save event
  url.saveEvent = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  //save Inventory
  url.saveInventory = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveInventory,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };

  

  //save recurring events
  url.saverecurringEvent = function(jsondata,callback){
   
       communicationService.resultViaPost(webservices.saverecurringEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  //save price levels
  url.savepriceleveldata = function(jsondata,callback){
    communicationService.resultViaPost(webservices.savepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  //get price levels
  url.getPricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getPricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  //remove price levels
  url.removepricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.removepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };

  
  //change price levels
  url.changePricelevelStatus = function(jsondata,callback){
    communicationService.resultViaPost(webservices.changePricelevelStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  
  //update price levels
  url.getSinglePricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getSinglePricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  
  //change price levels
  url.postPriceChange = function(jsondata,callback){
    communicationService.resultViaPost(webservices.postPriceChange,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  
 //getPriceLevelChange
  url.getPriceLevelChange = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getPriceLevelChange,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
			callback(res.data);
		});
  };
  
//add Bundle

  url.addBundle = function(jsondata,callback){

    communicationService.resultViaPost(webservices.addBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

//update bundles
  url.updateBundle = function(jsondata,callback){
    communicationService.resultViaPost(webservices.updateBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  //get Products
  url.getProducts = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  url.getBundleProducts = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundleProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
  
  //get getBundleDetail
  url.getBundleDetail = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundleDetail,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  //get Bundles 
  url.getBundles = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getBundles,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
//get post events

  url.postEventdata = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getEventsdetail,appConstants.authorizationKey,headerConstants.json,jsondata,function(res,req){
      callback(res.data);
    });
     };

  //change bundle status
  url.changeBundleStatus = function(jsondata,callback){
    communicationService.resultViaPost(webservices.changeBundleStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  //remove Bundle
  url.removeBundle = function(jsondata,callback){
    communicationService.resultViaPost(webservices.removeBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
//post second Step data
url.postSecondStepdata=function(jsondata,callback){
    communicationService.resultViaPost(webservices.secondStepdata,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
};

// save advance settings of events

url.saveAdvanceSettings = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveAdvanceSettings,appConstants.authorizationKey,headerConstants.json,jsondata,function(res,req){
      callback(res.data);
    });
};

//Get Advanced Setting
url.getAdvanceSetting = function(jsondata,callback){
  console.log('getAdvanceSetting service');
       communicationService.resultViaPost(webservices.getAdvanceSetting,appConstants.authorizationKey,headerConstants.json,jsondata,function(res,req){
      callback(res.data);
    });
};


//add Product
url.addEventProduct = function(jsondata,callback){
  communicationService.resultViaPost(webservices.addEventProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};
//get Event Product
url.getEventProducts = function(jsondata,callback){
  communicationService.resultViaPost(webservices.getEventProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

//Get Event Product Detail
url.getEventProductDetail = function(jsondata,callback){
  communicationService.resultViaPost(webservices.getEventProductDetail,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

  //remove event product 
  url.removeEventProduct = function(jsondata,callback){
    communicationService.resultViaPost(webservices.removeEventProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  //get price level
  url.getEventPriceLevel = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.getEventPriceLevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  //get Products
  url.getAllProducts = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getAllProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
  

  //get Event Data
  url.getEvent = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
  
  //get Event Categories
  url.getEventCat = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getEventCategory,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };
//check event Domain
url.checkeventurl = function(jsondata,callback){
       communicationService.resultViaPost(webservices.checkeventurl,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
return url;

}])
;
