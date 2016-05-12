module.exports = function(app, express) {

	var router = express.Router();
       

	Event    = require('./../app/event/controllers/event.js');
      function supportCrossOriginScript(req, res, next) {
	    console.log(req.method);
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	    res.header("Access-Control-Allow-Credentials", true);
	    next();
	}
        
       router.post('/saveEvent', Event.saveEvent);
       router.post('/saverecurringEvent', Event.saverecurringEvent);

       router.post('/savepricelevel', Event.savepricelevel);
       router.post('/getPricelevel', Event.getPricelevel);
       router.post('/getEvents',supportCrossOriginScript,Event.getEvents);
       router.post('/getEvent',supportCrossOriginScript, Event.getEvent);

       
      
        
        
         
	app.use('/event', router);
    }
