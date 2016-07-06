'use strict';

angular.module('alisthub')
/* services for questions module */
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
  
  url.viewEvents = function(jsondata,callback){
       communicationService.resultViaPost(webservices.viewEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.makeAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.makeAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };
  
  url.delAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.delAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
  };

  url.exportQuestionCSV = function(jsondata,callback){
       communicationService.resultViaPost(webservices.exportQuestionCSV,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  
  url.getQuestionsOfEvent = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getQuestionsOfEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

    url.saveQuestionLocationPosition = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveQuestionLocationPosition,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  
  
return url;
}])



// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_question', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    url.getQuestion = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.getQuestion,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
    };

   url.addQuestion = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.addQuestion,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
  };
   
}])


;