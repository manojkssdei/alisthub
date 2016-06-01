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
//get look and feel select template description
    this.getTemplate = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getTemplate,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
//add look and feel event image
    this.addlookAndFeelImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addlookAndFeelImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
}]);