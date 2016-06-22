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
  AllEvent    = require('./../app/event/controllers/allevent.js');

  function supportCrossOriginScript(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
	}
  /* For saving the event data */
  router.post('/saveEvent', Event.saveEvent);

    router.post('/addComment', Event.addComment);

      router.post('/getComment', Event.getComment);
  //eventOverview
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

  /* To get data of the all upcomming events */
  router.post('/getUpcommingEvent',supportCrossOriginScript,Event.getUpcommingEvent);
  /* To get data of the all past events */
  router.post('/getPastEvent',supportCrossOriginScript,Event.getPastEvent);

  /* To get data of the all event series */
  router.post('/getEventSeries',supportCrossOriginScript,Event.getEventSeries);

  /* To get data of the all event data */
  router.post('/getAllEvent',supportCrossOriginScript,AllEvent.getAllEvent);
  
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
  /* To get look and feel Template*/
  router.post('/getlookandFeelTemplatehtml',supportCrossOriginScript, Event.getlookandFeelTemplatehtml);
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
  router.post('/look_and_feel_save_html' , supportCrossOriginScript , Event.look_and_feel_save_html);
 
  
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
	
       /* Save price level*/
        router.post('/saveseriespricelevel', EventSeries.saveseriespricelevel);
        

        router.post('/preview_template',function(req,res){
            console.log("preview template");
            var __dir = './public/preview_template';
            if (!fs.existsSync(__dir)){
                fs.mkdirSync(__dir);
            }
           /* fs.openSync(__dir + "/index.html", 'w');
            
            var a1='<html><head></head><body>I am here for fun.s</body></html>';
            fs.appendFile(__dir + "/index.html",a1 , function (err) {
            
            });*/
           fs.createReadStream(__dir + "/index.html").pipe(fs.createWriteStream(__dir + "/index1.html"));


            res.send("Preview template");
        }); 

	app.use('/event', router);

}
