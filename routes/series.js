module.exports = function(app, express) {
	var router = express.Router();

       

	Series    = require('./../app/event/controllers/series.js');
      function supportCrossOriginScript(req, res, next) {
    	    res.header('Access-Control-Allow-Origin', '*');
    	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    	    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    	    res.header("Access-Control-Allow-Credentials", true);
    	    next();
    	}
         /* For saving the event data */
       router.post('/saveEvent', Series.saveEvent);
       /* Save reoccuring event data */
       router.post('/saverecurringEvent', Series.saverecurringEvent);

       router.post('/savepricelevel', Series.savepricelevel);
       router.post('/getPricelevel', Series.getPricelevel);
        /* To get data of the all events */
        router.post('/getEvents',supportCrossOriginScript,Series.getEvents);
       /* To get the event data */
       router.post('/getEvent',supportCrossOriginScript, Series.getEvent);