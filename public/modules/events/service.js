'use strict';

angular.module('alisthub').factory('events', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    
    var url = {};
//get venues
    url.getEventUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
 


 
return url;

}]);