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
  
  
   
  var sql = "SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id=" + user_id;

  if(req.body.allevent!=undefined) {
  	if(req.body.allevent.eventType != undefined && req.body.allevent.eventType != '') {
  		if(req.body.allevent.eventType == 'single') {
			sql += " and events.recurring_or_not = 0 ";  			
  		}

  		if(req.body.allevent.eventType == 'series') {
  			sql += " and events.recurring_or_not = 1 ";
  		}
  	}
  	console.log(req.body.allevent.eventFilter);	
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
