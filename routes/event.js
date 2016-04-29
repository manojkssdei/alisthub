module.exports = function(app, express) {

	var router = express.Router();
       

	Event    = require('./../app/event/controllers/event.js');
        
       router.post('/saveEvent', Event.saveEvent);
       
      
        
        
         
	app.use('/event', router);
    }
