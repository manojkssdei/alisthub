module.exports = function(app, express) {
	var router = express.Router();

       

	Package    = require('./../app/event_package/controller/package.js');
      function supportCrossOriginScript(req, res, next) {
    	    res.header('Access-Control-Allow-Origin', '*');
    	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    	    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    	    res.header("Access-Control-Allow-Credentials", true);
    	    next();
    	}
         /* For saving the event data */
       router.post('/saveEvent', Package.saveEvent);
       /* Save reoccuring event data */
       router.post('/saverecurringEvent', Package.saverecurringEvent);

       router.post('/savepricelevel', Package.savepricelevel);
       router.post('/getPricelevel', Package.getPricelevel);
        /* To get data of the all events */
        router.post('/getEvents',supportCrossOriginScript,Package.getEvents);
       /* To get the event data */
       router.post('/getEvent',supportCrossOriginScript, Package.getEvent);
  
  
