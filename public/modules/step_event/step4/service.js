'use strict';

angular.module('alisthub').factory('event_setting', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    //get Event Categories
	
	url.saveSetting = function(jsondata,callback){
	    communicationService.resultViaPost(webservices.saveSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
	      callback(res.data);
	    });
	};

	return url;

}]);
