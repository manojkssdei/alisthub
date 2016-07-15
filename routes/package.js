module.exports = function(app, express) {
	var router = express.Router();

        Package   = require('./../app/event_package/controllers/package.js');
        AllPackage   = require('./../app/event_package/controllers/all_package.js');
         
         function supportCrossOriginScript(req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
          res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
          res.header("Access-Control-Allow-Credentials", true);
          next();
      }
         /* For saving the event data */
       //router.post('/savePackage', Package.savePackage);
       /* Save reoccuring event data */
       //router.post('/saverecurringPackage', Package.saverecurringPackage);

  // post event package data step 1
  router.post('/stepOneEventPackage' , supportCrossOriginScript , Package.stepOneEventPackage);
  
      /* To get the package data */
      router.post('/getPackage',supportCrossOriginScript, Package.getPackage);

      /* To get the Events In the Package*/
      router.post('/getEventsInPackage',supportCrossOriginScript, Package.getEventsInPackage);

     /* To get the bundles In the Package*/
      router.post('/getBundlesInPackage',supportCrossOriginScript, Package.getBundlesInPackage);

     /* To get the products In the Package*/
      router.post('/getProductsInPackage',supportCrossOriginScript, Package.getProductsInPackage);

      /* To add the bundles In the Package*/
      router.post('/addBundleInPackage',supportCrossOriginScript, Package.addBundleInPackage);

   /* To get the bundles In the Package*/
      router.post('/getBundleProductsInPackage',supportCrossOriginScript, Package.getBundleProductsInPackage);

      /* To get the price level In the event of Package*/
      router.post('/getEventPriceLevelInPackage',supportCrossOriginScript, Package.getEventPriceLevelInPackage);

  /* To get price level In all of the events of Package*/
      router.post('/getAllEventsPriceLevelInPackage',supportCrossOriginScript, Package.getAllEventsPriceLevelInPackage);


  /* To update bundles of Package*/
      router.post('/updateBundleInPackage',supportCrossOriginScript, Package.updateBundleInPackage);

  /* To get all products of User*/
      router.post('/getAllProductsInPackage',supportCrossOriginScript, Package.getAllProductsInPackage);

  /* To add event of product in package*/
      router.post('/addEventProductInPackage',supportCrossOriginScript, Package.addEventProductInPackage);

  /* To products in package*/
      router.post('/getEventProductsInPackage',supportCrossOriginScript, Package.getEventProductsInPackage);

  /* To post second step package Data*/
      router.post('/postSecondStepPackageData',supportCrossOriginScript, Package.postSecondStepPackageData);

 /* To post second step package Data*/
      router.post('/postThirdStepPackageData',supportCrossOriginScript, Package.postThirdStepPackageData);

 /* To post second step package Data*/
      router.post('/getEventCategoriesList',supportCrossOriginScript, Package.getEventCategoriesList);

      
      router.post('/viewSelectedEvents',supportCrossOriginScript, Package.viewSelectedEvents);

   
      router.post('/getPackageProductDetail',supportCrossOriginScript, Package.getPackageProductDetail);


      router.post('/getPackageProducts',supportCrossOriginScript, Package.getPackageProducts);


      router.post('/removePackageProduct',supportCrossOriginScript, Package.removePackageProduct);

      
      router.post('/changePackageBundleStatus',supportCrossOriginScript, Package.changePackageBundleStatus);

         
      router.post('/removePackageBundle',supportCrossOriginScript, Package.removePackageBundle);

      router.post('/getBundleDetailOfPackage',supportCrossOriginScript, Package.getBundleDetailOfPackage);

      router.post('/saveAdvanceSettingsOfPackage',supportCrossOriginScript, Package.saveAdvanceSettingsOfPackage);
      
      router.post('/getAdvanceSettingOfPackage',supportCrossOriginScript, Package.getAdvanceSettingOfPackage);

      router.post('/getAllPackageEvent',supportCrossOriginScript, AllPackage.getAllPackageEvent);

      /* Export CSV events  */
      router.get('/exportPackageCSV', AllPackage.exportPackageCSV);
    
     router.post('/getQuestionsOfEventOfPackage',supportCrossOriginScript, Package.getQuestionsOfEventOfPackage);

     router.post('/delPackage',supportCrossOriginScript, Package.delPackage);

     router.post('/addFavouritePackage',supportCrossOriginScript, Package.addFavouritePackage);

      app.use('/package', router);
}  