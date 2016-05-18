'use strict';

angular.module('alisthub').factory('account', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
  var url = {};
 
  url.addFinancialDetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addFinancialDetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.getFinancialDetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getFinancialDetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

return url;
}])