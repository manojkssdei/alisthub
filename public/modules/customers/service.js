
'use strict';
angular.module('alisthub')
.factory('customers', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

        url.getCustomer = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getCustomer,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
    url.addCustomer = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addCustomer,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

     url.deleteCustomer = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteCustomer,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };


     url.changeCustomerStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeCustomerStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

   url.userOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.userOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
  return url;
}])
;
