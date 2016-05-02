module.exports = function(app, express) {

	var router = express.Router();
       

	Event    = require('./../app/event/controllers/event.js');
        
       router.post('/saveEvent', Event.saveEvent);
       router.post('/saverecurringEvent', Event.saverecurringEvent);
       
      
        
        
         
	app.use('/event', router);
    }
