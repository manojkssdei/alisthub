
/***********CREATE BY DK******************/
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

   url.customerOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.customerOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };

 url.removepricelevel = function(jsondata,callback){
    communicationService.resultViaPost(webservices.removepricelevel,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };


  url.exportQuestionCSV = function(jsondata,callback){
       communicationService.resultViaPost(webservices.exportQuestionCSV,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  return url;
}])
;
/***  DK  **/