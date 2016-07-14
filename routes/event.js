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
   // Package   = require('./../app/event_package/controllers/package.js');

  function checkPermission(req, res, next) {
    var userType = req.body.userModuleInfo.userType;
    var sellerUserId = req.body.userModuleInfo.sellerUserId;
    var moduleName = req.body.userModuleInfo.moduleName;
    var moduleId = req.body.userModuleInfo.moduleId;
    var action = req.body.userModuleInfo.action;

    var sql = "SELECT COUNT(*) AS exist FROM user_permissions where user_permissions.user_id = " + sellerUserId;
    
    sql += " and user_permissions.permission_module_id = " + moduleId;  

    if(action=='add') {
      sql += " and user_permissions.add = 1 ";  
    }

    if(action=='edit') {
      sql += " and user_permissions.edit = 1 ";  
    }

    if(action=='delete') {
      sql += " and user_permissions.delete = 1 ";  
    }

    if(action=='view') {
      sql += " and user_permissions.view = 1 ";  
    }

    //console.log(sql); return false;
    connection.query(sql, function(err, queryResult) {
      if (err) {
        res.json({error:err,code:101});
      }
      if(queryResult[0].exist > 0) {
        console.log('success');
      } else {
        console.log('Fail');
      }
    });

    next();    
  }

	function supportCrossOriginScript(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	  res.header("Access-Control-Allow-Credentials", true);
	  next();
	}

  router.get('/test',supportCrossOriginScript, AllEvent.test);
  /* For saving the event data */
  router.post('/saveEvent', Event.saveEvent);

  router.post('/addComment', Event.addComment);

  router.post('/getComment', Event.getComment);
  //eventOverview
  /*save price level*///
  router.post('/savepricelevel', Event.savepricelevel);
  /*get price level*///
  router.post('/getPricelevel', Event.getPricelevel);
  /*get price level*///
  router.post('/getShowclixPricelevel', Event.getShowclixPricelevel);
  //router.get('/getShowclixPricelevel/:id', Event.getShowclixPricelevel);
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

  /* Export CSV events  */
  router.get('/exportAllEventCSV', AllEvent.exportAllEventCSV);

  /* To get data of the all event series */
  router.post('/getEventSeries',supportCrossOriginScript,Event.getEventSeries);

  /* To get data of the all event data */
  router.post('/getAllEvent',supportCrossOriginScript,checkPermission,AllEvent.getAllEvent);

  /* To get data of the all event dates for series */
  router.post('/getEventDates',supportCrossOriginScript,AllEvent.getEventDates);

  /* To get the event data */
  router.post('/getEvent',supportCrossOriginScript, Event.getEvent);
  
  /* To get the event series data */
  router.post('/getSeriesEvent',supportCrossOriginScript, Event.getSeriesEvent);
  
  /* To get the event series data */
  router.post('/getSeriesDates',supportCrossOriginScript, Event.getSeriesDates);

  /* To save the event Inventory */
  router.post('/saveInventory',supportCrossOriginScript, Event.saveInventory);
  /* check event domain*/
  router.post('/checkeventurl' , supportCrossOriginScript , Event.checkeventurl);
  //Get Event Step3 data.
  router.post('/getEventStep3' , supportCrossOriginScript , Event.getEventStep3);

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
	
	/* For series add product */
	router.post('/addSeriesEventProduct', EventSeries.addSeriesEventProduct);
	
	/* Delete series products */
	router.post('/removeSeriesEventProduct', EventSeries.removeSeriesEventProduct);
	
	/* Save price level*/
	router.post('/saveseriespricelevel', EventSeries.saveseriespricelevel);
	
	/* Series bundles */
	router.post('/updateSeriesBundle', EventSeries.updateSeriesBundle);
	
	/*save Series second step data*///
	router.post('/savesecondSeriesstepdata',supportCrossOriginScript, EventSeries.savesecondSeriesstepdata);
	
	
	/** Save Series event step -4 **/
  router.post('/saveSeriesSetting' , supportCrossOriginScript , EventSeries.saveSeriesSetting);
	
  router.post('/addEmailReport' , supportCrossOriginScript , Event.addEmailReport);

  router.post('/getEmailReport' , supportCrossOriginScript , Event.getEmailReport);

  router.post('/editEmailReport' , supportCrossOriginScript , Event.editEmailReport);
  
  router.post('/getEmailReportById' , supportCrossOriginScript , Event.getEmailReportById);
  
  router.post('/getEmailTemplateOfEvent' , supportCrossOriginScript , Event.getEmailTemplateOfEvent);
  
  router.post('/assignEmailTemplate' , supportCrossOriginScript , Event.assignEmailTemplate);

  router.post('/deleteEmailReportById' , supportCrossOriginScript , Event.deleteEmailReportById);

  router.post('/pauseSales' , supportCrossOriginScript , Event.pauseSales);
  
  router.post('/addFavouriteEvent' , supportCrossOriginScript , Event.addFavouriteEvent);

  router.post('/pauseSalesSeries',  supportCrossOriginScript , EventSeries.pauseSalesSeries);

  router.post('/addFavouriteEventSeries',  supportCrossOriginScript , EventSeries.addFavouriteEventSeries);

  router.post('/delEventSeries', supportCrossOriginScript , EventSeries.delEventSeries);

  router.post('/getEmailReportSeries', supportCrossOriginScript , EventSeries.getEmailReportSeries);

  router.post('/addEmailReportSeries', supportCrossOriginScript , EventSeries.addEmailReportSeries);

  router.post('/deleteEmailReportByIdSeries', supportCrossOriginScript , EventSeries.deleteEmailReportByIdSeries);

  router.post('/editEmailReportSeries', supportCrossOriginScript , EventSeries.editEmailReportSeries);

  router.post('/getEmailReportByIdSeries', supportCrossOriginScript , EventSeries.getEmailReportByIdSeries);

  //router.post('/getlookAndFeelSeries', supportCrossOriginScript , EventSeries.getlookAndFeelSeries);

  router.post('/assignEmailTemplateSeries', supportCrossOriginScript , EventSeries.assignEmailTemplateSeries);

  router.post('/getEmailTemplateOfEventSeries', supportCrossOriginScript , EventSeries.getEmailTemplateOfEventSeries);



	app.use('/event', router);

}
