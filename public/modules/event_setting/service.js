'use strict';

angular.module('alisthub').factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getVenues = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getVenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.addVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.venueOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.venueOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.changeVenueStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeVenueStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.deleteVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.duplicateVenue = function(jsondata,callback){
       communicationService.resultViaPost(webservices.duplicateVenue,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.getSettingCount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSettingCount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  
return url;
}])

.factory('questions', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getQuestions = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getQuestions,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.addQuestion = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addQuestion,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.questionOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.questionOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.changeQuestionStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeQuestionStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.deleteQuestion = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteQuestion,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
    
  
return url;
}])

.factory('products', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getProducts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.addProduct = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.productOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.productOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.changeProductStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeProductStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.uploadProductImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.uploadProductImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
  
  url.deleteProduct = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteProduct,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };
    
  
return url;
}])
;