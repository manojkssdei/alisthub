/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-04-19
Created By: Deepak khokkar  
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');

/** 
Method: getAllEvent
Description:Function to get latest upcomming event data  
Created : 2016-06-20
Created By: Deepak khokkar  
*/
exports.getAllEvent=function(req,res) {
  // Object { eventType="series", eventFilter="upcoming"}
  var user_id = req.body.user_id;
  var curtime = moment().format('YYYY-MM-DD');
  
  
   
  var sql = "SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.parent_id IS NULL and events.user_id=" + user_id;

  if(req.body.allevent!=undefined) {
  	if(req.body.allevent.eventType != undefined && req.body.allevent.eventType != '') {
  		if(req.body.allevent.eventType == 'single') {
			sql += " and events.recurring_or_not = 0 ";  			
  		}

  		if(req.body.allevent.eventType == 'series') {
  			sql += " and events.recurring_or_not = 1 ";
  		}
  	}

    if(req.body.allevent.eventFilter != undefined && req.body.allevent.eventFilter != '') {
      if(req.body.allevent.eventFilter == 'upcoming') {
        sql += " and Date(events.start_date) >= '" + curtime + "' ";       
      }

      if(req.body.allevent.eventFilter == 'past') {
        sql += " and Date(events.start_date) <= '" + curtime + "' ";
      }
    }
  }

  sql += " ORDER BY start_date ASC";
  console.log(sql);
  
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}


/** 
Method: getEventDates
Description:Function to get Event Dates  
Created : 2016-06-23
Created By: Deepak khokkar  
*/
exports.getEventDates=function(req,res) {
  // Object { eventType="series", eventFilter="upcoming"}
  var user_id = req.body.user_id;
  var curtime = moment().format('YYYY-MM-DD');
  var eventId = req.body.eventId;
   
  var sql = "SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, event_dates.date, event_dates.start_time, event_dates.end_time, event_dates.start_date_time, event_dates.end_date_time FROM event_dates LEFT JOIN events ON event_dates.event_id = events.id where event_dates.parent_id=" + eventId;

  if(req.body.allevent!=undefined) {

    if(req.body.allevent.eventFilter != undefined && req.body.allevent.eventFilter != '') {
      if(req.body.allevent.eventFilter == 'upcoming') {
        sql += " and Date(events.start_date) >= '" + curtime + "' ";       
      }

      if(req.body.allevent.eventFilter == 'past') {
        sql += " and Date(events.start_date) <= '" + curtime + "' ";
      }
    }
  }

  sql += " ORDER BY event_dates.date ASC";
  console.log(sql);
  
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}

