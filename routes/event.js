/** 
Routes defnition for Event Module
Created : 2016-05-01
Created By: Manoj kumar 
Module : Event 
*/
module.exports = function(app, express) {
	var router = express.Router();
  
  Event    = require('./../app/event/controllers/event.js');
  EventSetting    = require('./../app/event/controllers/setting.js');
  EventSeries    = require('./../app/event/controllers/series.js');

  function supportCrossOriginScript(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
	}
  /* For saving the event data */
  router.post('/saveEvent', Event.saveEvent);
  
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
  
  /* To get the event series data */
  router.post('/getSeriesEvent',supportCrossOriginScript, Event.getSeriesEvent);

  /* To save the event Inventory */
  router.post('/saveInventory',supportCrossOriginScript, Event.saveInventory);
  

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
  // To update social links from step 3
  router.post('/updatesociallink' , supportCrossOriginScript , Event.updatesociallink);


  // Save event setting data
  router.post('/saveSetting' , supportCrossOriginScript , EventSetting.saveSetting);
  router.post('/getSettings' , supportCrossOriginScript , EventSetting.getSettings);
  
  

	/*********************************** Service for Series events ******************************/
        /* Save reoccuring event data */
        router.post('/saverecurringEvent', EventSeries.saverecurringEvent);
	
	/*save price level for series event*///

        router.post('/saveseriespricelevel', EventSeries.saveseriespricelevel);
	
	/* Delete price level for series event */
	
        router.post('/removeseriespricelevel', EventSeries.removeseriespricelevel);
	
	/* Change status Series events */
	
        router.post('/changeseriesPricelevelStatus', EventSeries.changeseriesPricelevelStatus);
	
	/* For series post price change */
	router.post('/postseriesPriceChange', EventSeries.postseriesPriceChange);
	
	/* For series add Bundle */
	router.post('/addseriesBundle', EventSeries.addseriesBundle);
	

        router.post('/saveseriespricelevel', EventSeries.saveseriespricelevel); 

         

	app.use('/event', router);

}
