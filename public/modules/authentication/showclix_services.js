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
  
return url;

}]);