module.exports = function(app, express) {

	var router = express.Router();
       

	Event    = require('./../app/event/controllers/event.js');
        
       router.post('/saveEvent', Event.saveEvent);
       router.post('/saverecurringEvent', Event.saverecurringEvent);
       router.post('/getEvents', Event.getEvents);
       router.post('/getEvent', Event.getEvent);
       
      
        
        
         
	app.use('/event', router);
    }
