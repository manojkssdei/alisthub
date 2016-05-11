'use strict';

angular.module('alisthub')


.factory('users', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.addUsers = function(jsondata,callback){
      
       communicationService.resultViaPost(webservices.addUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

    url.userOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.userOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
  // url.productOverview = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.productOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
  
  // url.changeProductStatus = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.changeProductStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
  
  // url.uploadProductImage = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.uploadProductImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
  
  // url.deleteProduct = function(jsondata,callback){
  //      communicationService.resultViaPost(webservices.deleteProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
		// 	callback(res.data);
		// });
      
  // };
    
  
return url;
}])
;