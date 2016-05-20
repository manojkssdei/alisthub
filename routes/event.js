/** 
Routes defnition for Event Module
Created : 2016-05-01
Created By: Manoj kumar 
Module : Event 
*/
module.exports = function(app, express) {
	var router = express.Router();

       

	Event    = require('./../app/event/controllers/event.js');
      function supportCrossOriginScript(req, res, next) {
    	    res.header('Access-Control-Allow-Origin', '*');
    	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    	    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    	    res.header("Access-Control-Allow-Credentials", true);
    	    next();
    	}
      /* For saving the event data */
      router.post('/saveEvent', Event.saveEvent);
      
      /* Save reoccuring event data */
      router.post('/saverecurringEvent', Event.saverecurringEvent);

      router.post('/savepricelevel', Event.savepricelevel);
      router.post('/getPricelevel', Event.getPricelevel);
      router.post('/removepricelevel', Event.removepricelevel);
      router.post('/changePricelevelStatus', Event.changePricelevelStatus);
      router.post('/getSinglePricelevel', Event.getSinglePricelevel);
      router.post('/postPriceChange', Event.postPriceChange);
      
      /* To get data of the all events */
      router.post('/getEvents',supportCrossOriginScript,Event.getEvents);
      
      /* To get the event data */
      router.post('/getEvent',supportCrossOriginScript, Event.getEvent);


       
      
        
        
         
	app.use('/event', router);
}
