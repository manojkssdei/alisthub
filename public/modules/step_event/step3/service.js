'use strict';

angular.module('alisthub').service('Lookservice', ['communicationService', function(communicationService) {
    
//get look and feel templates
    this.getlookAndFeel = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getlookAndFeeltemplate,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
//get look and feel Preview template
    this.getpreviewImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getpreviewImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
}]);