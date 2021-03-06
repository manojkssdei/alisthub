'use strict';

angular.module('alisthub').factory('event_setting', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
   var url = {};
    //get Event Categories
	
	url.saveSeriesSetting = function(jsondata,callback){
	    communicationService.resultViaPost(webservices.saveSeriesSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
	      callback(res.data);
	    });
	};

	url.getSettings = function(jsondata,callback){
	    communicationService.resultViaPost(webservices.getSettings,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
	      callback(res.data);
	    });
	};

	return url;

}]);
