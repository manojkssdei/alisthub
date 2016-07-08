'use strict';

angular.module('alisthub').factory('showclix', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.generateToken = function(jsondata,callback){
       communicationService.showclixResultViaPost(showclix_webservices.generateToken,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
      
  };
  
  url.signUp = function(jsondata,callback){
       communicationService.showclixResultViaPost(showclix_webservices.signUp,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
  };

  //Check seller user existance 
  url.checkSellerSubUser = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.checkSellerSubUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  //Check seller user existance 
  url.getPerModules = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.getPerModules,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  
return url;

}]);