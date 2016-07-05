'use strict';


angular.module('alisthub').factory('Lookservice', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {

    var url = {};
//get look and feel templates
    url.getlookAndFeel = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getlookAndFeeltemplate,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
//get look and feel Preview template
    url.getpreviewImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getpreviewImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
//get look and feel select template description
    url.getTemplate = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getTemplate,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
//add look and feel event image
    url.addlookAndFeelImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addlookAndFeelImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});   
  };



      url.getlookAndFeelSeries = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getlookAndFeelSeries,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });   
  };


      url.assignEmailTemplateSeries = function(jsondata,callback){
       communicationService.resultViaPost(webservices.assignEmailTemplateSeries,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });   
  };

     url.getEmailTemplateOfEventSeries = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getEmailTemplateOfEventSeries,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });   
  };



  return url;
}]);