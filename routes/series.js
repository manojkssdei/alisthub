module.exports = function(app, express) {
	var router = express.Router();
      
      Series    = require('./../app/series/controller/series.js');
      EventSetting    = require('./../app/event/controllers/setting.js');

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
      /*save price level*///
      router.post('/savepricelevel', Event.savepricelevel);
      /*get price level*///
      router.post('/getPricelevel', Event.getPricelevel);
      /*Remove Price level*///
      router.post('/removepricelevel', Event.removepricelevel);
      /*change price level status*///
      router.post('/changePricelevelStatus', Event.changePricelevelStatus);
      /*get single price level*///
      router.post('/getSinglePricelevel', Event.getSinglePricelevel);
      /*update price change*///
      router.post('/postPriceChange', Event.postPriceChange);
      
      /* To get data of the all events */
      router.post('/getEvents',supportCrossOriginScript,Event.getEvents);
      
      /* To get the event data */
      router.post('/getEvent',supportCrossOriginScript, Event.getEvent);

      /* To get the event Category */
      router.post('/getEventCategory',supportCrossOriginScript, Event.getEventCategory);

          /*get event detail*///
        router.post('/getEventsdetail',supportCrossOriginScript, Event.getEventsdetail);
        /*save second step data*///
        router.post('/savesecondstepdata',supportCrossOriginScript, Event.savesecondstepdata);
        /*get event look and feel*///
        router.post('/getlookAndFeeltemplate',supportCrossOriginScript, Event.getlookAndFeeltemplate);
        /*get preview Image*///
        router.post('/getpreviewImage',supportCrossOriginScript, Event.getpreviewImage);
        /*get Template*///
        router.post('/getTemplate',supportCrossOriginScript, Event.getTemplate);
        router.post('/addlookAndFeelImage',supportCrossOriginScript, Event.addlookAndFeelImage);


        /*save advance settings of events*/
        router.post('/saveAdvanceSettings',supportCrossOriginScript, Event.saveAdvanceSettings);
      
        /*get advance settings of events*/
        router.post('/getAdvanceSetting',supportCrossOriginScript, Event.getAdvanceSetting);
        // delete Event
        router.post('/deleteEvent' , supportCrossOriginScript , Event.deleteEvent);
        
        // post event data step 4
        router.post('/postCreateEventStepFour' , supportCrossOriginScript , Event.postCreateEventStepFour);
         
         // post event package data step 1
        router.post('/stepOneEventPackage' , supportCrossOriginScript , Event.stepOneEventPackage);

        // Save event setting data
        router.post('/saveSetting' , supportCrossOriginScript , EventSetting.saveSetting);

        EventSetting
         
         
	app.use('/event', router);
}