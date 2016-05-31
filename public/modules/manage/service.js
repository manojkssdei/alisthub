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

  url.changeUserStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeUserStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.userOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.userOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
   url.editUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.editUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
    url.deleteUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
  
     url.checkuniqueUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.checksellerUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };
return url;
}])
;