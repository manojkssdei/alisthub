'use strict';

angular.module('alisthub').factory('common', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
  var url = {};
 
  url.getCountries = function(jsondata,callback){
       communicationService.resultViaGet(webservices.getCountries,appConstants.authorizationKey,headerConstants.json, function(res,req){
      callback(res.data);
    });
  };

  url.getUSAStates = function(jsondata,callback){
       communicationService.resultViaGet(webservices.getUSAStates,appConstants.authorizationKey,headerConstants.json, function(res,req){
      callback(res.data);
    });
  };

   url.getEventCategoriesList = function(jsondata,callback){
       communicationService.resultViaGet(webservices.getEventCategoriesList,appConstants.authorizationKey,headerConstants.json, function(res,req){
      callback(res.data);
    });
  };


return url;
}])