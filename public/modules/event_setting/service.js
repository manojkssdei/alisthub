'use strict';

angular.module('alisthub')
/* services for venues module */
.factory('venues', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
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
  
return url;
}])

/* services for products module */
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
  
  url.productSettingsData = function(jsondata,callback){
    console.log(jsondata)
      communicationService.resultViaPost(webservices.saveProductSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  }
  
  url.getProductSetting = function(jsondata,callback){
    console.log(jsondata)
      communicationService.resultViaPost(webservices.getProductSetting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  }
return url;
}])

/* services for discount module */
.factory('discounts', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getDiscounts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getDiscounts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.checkUniqueDiscount = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.checkUniqueDiscount , appConstants.authorizationKey , headerConstants.json , jsondata, function(res,req) {
      callback(res.data);
    });
    
  };

  url.checkUniqueDiscount = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.checkUniqueDiscount , appConstants.authorizationKey , headerConstants.json , jsondata, function(res,req) {
      callback(res.data);
    });
    
  };

  url.addDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.assignDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.assignDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.discountOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.discountOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.changeDiscountStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeDiscountStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.deleteDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

    
  url.viewEvents = function(jsondata,callback){
       communicationService.resultViaPost(webservices.viewEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.makeDiscountAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.makeDiscountAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.delAssignment = function(jsondata,callback){
       communicationService.resultViaPost(webservices.delAssignment,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.exportDiscountCSV = function(jsondata,callback){
       communicationService.resultViaPost(webservices.exportDiscountCSV,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.getSelectedDiscount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSelectedDiscount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
return url;
}])

/* services for bundles module */
.factory('bundles', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.getBundles = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBundles,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

   url.getBundleProducts = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBundleProducts,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  url.addBundle = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.bundleOverview = function(jsondata,callback){
       communicationService.resultViaPost(webservices.bundleOverview,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.changeBundleStatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.changeBundleStatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.uploadBundleImage = function(jsondata,callback){
       communicationService.resultViaPost(webservices.uploadBundleImage,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  url.deleteBundle = function(jsondata,callback){
       communicationService.resultViaPost(webservices.deleteBundle,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
return url;
}])

/* services for bundles module */
// Created : 2016-05-24
// Created Buy : Manoj Singh
/****************************************** SERVICE FOR SHOWCLICX  ***********************************************/
.factory('showclix_venue', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    url.getVenues = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.signUp,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
    };

   url.addVenue = function(jsondata,callback){
        communicationService.showclixResultViaPost(showclix_webservices.addVenue,"undefined",showclix_headerConstants,jsondata, function(res,req){
			callback(res);
		});
  };
   
}])


;