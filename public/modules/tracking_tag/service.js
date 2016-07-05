'use strict';
angular.module('alisthub').factory('tracking', ['$q', '$timeout', 'communicationService', function Customers($q, $timeout, communicationService) {


    var url = {};
    url.saveTag = function(jsondata, callback) {
        communicationService.resultViaPost(webservices.saveTag, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
            callback(res.data);
        });

    };

    url.getTag = function(jsondata, callback) {
        communicationService.resultViaPost(webservices.getTag, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
            callback(res.data);
        });

    };

    url.getTagDetail = function(jsondata, callback) {
        communicationService.resultViaPost(webservices.getTagDetail, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
            callback(res.data);
        });

    };

    url.deleteTag = function(jsondata, callback) {
        communicationService.resultViaPost(webservices.deleteTag, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
            callback(res.data);
        });

    };

    url.getUser = function(jsondata, callback) {
        communicationService.resultViaPost(webservices.getUser, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
            callback(res.data);
        });

    };
    return url;

}]);
