module.exports = function(app, express) {

	var router = express.Router();
       

	Event    = require('./../app/event/controllers/event.js');
        
       router.post('/saveEvent', Event.saveEvent);
       router.post('/saverecurringEvent', Event.saverecurringEvent);
       router.post('/getEvents', Event.getEvents);
       router.post('/getEvent', Event.getEvent);
       router.post('/savepricelevel', Event.savepricelevel);
       router.post('/getPricelevel', Event.getPricelevel);
       
      
        
        
         
	app.use('/event', router);
    }
