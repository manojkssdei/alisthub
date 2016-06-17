module.exports = function(app, express) {
	var router = express.Router();

        Package   = require('./../app/event_package/controllers/package.js');
         
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

      /* To get the package data */
      router.post('/getPackage',supportCrossOriginScript, Package.getPackage);

      /* To get the Events In the Package*/
      router.post('/getEventsInPackage',supportCrossOriginScript, Package.getEventsInPackage);

     /* To get the bundles In the Package*/
      router.post('/getBundlesInPackage',supportCrossOriginScript, Package.getBundlesInPackage);

     /* To get the products In the Package*/
      router.post('/getProductsInPackage',supportCrossOriginScript, Package.getProductsInPackage);

      

       app.use('/package', router);
}  