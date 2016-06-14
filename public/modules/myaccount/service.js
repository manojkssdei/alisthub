'use strict';

angular.module('alisthub')
.factory('profile', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.accountBasic = function(jsondata,callback){
       communicationService.resultViaPost(webservices.accountBasic,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
    };

    url.updateUser = function(jsondata,callback){
     	communicationService.resultViaPost(webservices.updateUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
	      callback(res.data);
	    });
	  };

    url.updatePassword = function(jsondata,callback){
      communicationService.resultViaPost(webservices.updatePassword,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

    url.updateUserAdvSetting = function(jsondata,callback){
      communicationService.resultViaPost(webservices.updateUserAdvSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

    url.updateSocial = function(jsondata,callback){
      communicationService.resultViaPost(webservices.updateSocial,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

    url.getData = function(jsondata,callback){
      communicationService.resultViaPost(webservices.getData,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };
    
    url.updateEmail = function(jsondata,callback){
      communicationService.resultViaService(webservices.updateEmail,jsondata, function(res,req){
        callback(res.data);
      });
    };

    return url;
}]);
