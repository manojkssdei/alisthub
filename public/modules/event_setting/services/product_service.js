'use strict';

angular.module('alisthub')
/* services for products module */
.factory('products', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getProducts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };

  url.addProduct = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.productOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.productOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.changeProductStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeProductStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.uploadProductImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.uploadProductImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.deleteProduct = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.productSettingsData = function(jsondata,callback){
    console.log(jsondata)
      communicationService.resultViaPost(webservices.saveProductSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  }
  
  url.getProductSetting = function(jsondata,callback){
    console.log(jsondata)
      communicationService.resultViaPost(webservices.getProductSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  }
return url;
}])

// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_product', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
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