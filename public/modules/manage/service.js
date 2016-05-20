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
  
return url;
}])
;