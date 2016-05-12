/** 
Routes defnition for Event Module
Created : 2016-05-01
Created By: Manoj kumar 
Module : Event 
*/
module.exports = function(app, express) {
	var router = express.Router();
  
    Event = require('./../app/event/controllers/event.js');
    
    /* For saving the event data */
    router.post('/saveEvent', Event.saveEvent);
    /* Save reoccuring event data */
    router.post('/saverecurringEvent', Event.saverecurringEvent);
    /* To get data of the all events */
    router.post('/getEvents', Event.getEvents);
    /* To get the event data */
    router.post('/getEvent', Event.getEvent);
    
    app.use('/event', router);
}
