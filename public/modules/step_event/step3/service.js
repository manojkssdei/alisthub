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
    }
    //update  social link
    url.updatesociallink = function(jsondata,callback){
       communicationService.resultViaPost(webservices.updatesociallink,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
  //look and feel Template html
    url.getlookandFeelTemplatehtml = function(jsondata,callback){
	
       communicationService.resultViaPost(webservices.getlookandFeelTemplatehtml,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
       
      
  };
  
  return url;
}]);