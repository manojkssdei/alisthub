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

  url.addCustomFinancialDetails = function(jsondata,callback){
      console.log('addCustomFinancialDetails');
       communicationService.resultViaPost(webservices.addCustomFinancialDetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.viewCustomFinancialSetting = function(jsondata,callback){
      console.log('view_custom_financial_setting');
       communicationService.resultViaPost(webservices.viewCustomFinancialSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.getCustomFinancialSetting = function(jsondata,callback){
      console.log('getCustomFinancialSetting');
       communicationService.resultViaPost(webservices.getCustomFinancialSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.checkAlreadyAddedMerchant = function(jsondata,callback){
      console.log('checkAlreadyAddedMerchant');
       communicationService.resultViaPost(webservices.checkAlreadyAddedMerchant,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

return url;
}])