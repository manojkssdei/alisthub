'use strict';

angular.module('alisthub').factory('events', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    
    var url = {};
    //get event user
    url.getEventUser = function(jsondata,callback) {
      communicationService.resultViaPost(webservices.getEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
  			callback(res.data);
  		});
    };

    //get event user
    url.getUpcommingEvent = function(jsondata,callback) {
      communicationService.resultViaPost(webservices.getUpcommingEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
        callback(res.data);
      });
    };

    //get event user
    url.getPastEvent = function(jsondata,callback) {
      communicationService.resultViaPost(webservices.getPastEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
        callback(res.data);
      });
    };

    //get event series
    url.getEventSeries = function(jsondata,callback) {
      communicationService.resultViaPost(webservices.getEventSeries,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
        callback(res.data);
      });
    };

    //get event user
    url.getAllEvent = function(jsondata,callback) {
      communicationService.resultViaPost(webservices.getAllEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
        callback(res.data);
      });
    };

    //delete events
    url.deleteEvent = function(jsondata,callback){
      communicationService.resultViaPost(webservices.deleteEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
  			callback(res.data);
  		});
    };

 
return url;

}]);