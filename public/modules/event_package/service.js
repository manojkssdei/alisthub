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


  //get Products
  url.getAllProductsInPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getAllProductsInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

//add Product
url.addEventProductInPackage = function(jsondata,callback){
  communicationService.resultViaPost(webservices.addEventProductInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

//get Event Product
url.getEventProductsInPackage = function(jsondata,callback){
  communicationService.resultViaPost(webservices.getEventProductsInPackage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

//get Event Product
url.postSecondStepPackageData = function(jsondata,callback){
  communicationService.resultViaPost(webservices.postSecondStepPackageData,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

//get Event Product
url.postThirdStepPackageData = function(jsondata,callback){
  communicationService.resultViaPost(webservices.postThirdStepPackageData,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
    callback(res.data);
  });
};

//get Event Categories
url.getEventCategoriesList = function(jsondata,callback){
  communicationService.resultViaPost(webservices.getEventCategoriesList,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
    callback(res.data);
  });
};


//get Event Categories
url.viewSelectedEvents = function(jsondata,callback){
  communicationService.resultViaPost(webservices.viewSelectedEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
    callback(res.data);
  });
};



/*url.saveSetting = function(jsondata,callback){
      communicationService.resultViaPost(webservices.saveSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
        callback(res.data);
      });
};

url.getSettingsOfPackage = function(jsondata,callback){
    communicationService.resultViaPost(webservices.getSettings,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
};

*/




return url;

}]);