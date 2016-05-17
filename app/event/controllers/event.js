/** 
Controller for the vanue managment page 
Created : 2016-04-20
Created By: Deepak khokkar  
Module : manage events 
*/


/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-04-19
Created By: Deepak khokkar  
*/
var moment       = require('moment-timezone');
exports.saveEvent = function(req,res) {
  
    var data=req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var eventId=null;
     data.created = new Date();
     var query1="INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+data.content+"')";
     connection.query(query1,function(err,result){
        eventId=result.insertId;
        var query2="INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`) VALUES(NULL,'"+result.insertId+"','"+data.eventdate+"','"+data.startevent_time+"','"+data.endevent_time+"')";
     connection.query(query2);
     
      var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"', '', '', '', '', '', '', '', '', '')";
    
     /// To save Venue details
     if (eventId != undefined)
     {
          connection.query(query, function(err7, results) {
               if (err7) {
                res.json({error:err7,code:101});
               }
               res.json({result:eventId,code:200});
          });
     }
     else{
          res.json({error:"error",code:101}); 
     }
        });

     
}

/** 
Method: saverecurringEvent
Description:Function to save event recurring data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.saverecurringEvent=function(req,res){
   var dates=req.body.date;
   
     var data=req.body.data;
  
   var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
 
    data.created = new Date();
     var i=0;
    dates.forEach(function(date_arr){
    
  var Date1=new Date(dates[i]);
  var mon=Date1.getMonth()+1;
  var date=Date1.getFullYear()+"-"+mon+"-"+Date1.getDate();
          data.created = new Date();
       var j=0;
     var query1="INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+date+"','"+data.content+"')";
     
     connection.query(query1,function(err,result){
 
        var query2="INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`) VALUES(NULL,'"+result.insertId+"','"+date+"','"+req.body.data.starttimeloop1[j]+"','"+req.body.data.endtimeloop1[j]+"')";
        
     connection.query(query2);
     j++;
        })  ;
    i++;
        })
    
    var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"', '', '', '', '', '', '', '', '', '')";
    
    if (dates != "")
     {
          res.json({result:"results",code:200}); 
     }
     else{
          res.json({error:"error",code:101}); 
     }

}



/** 
Method: getEvents
Description:Function to get event data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.getEvents=function(req,res) {
  var user_id=req.body.user_id;
  var sql="SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM EVENTS LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id="+user_id;
  connection.query(sql,function(err,result){
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}

/** 
Method: getEvent
Description:Function to get event data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.getEvent=function(req,res) {
    var event_id=req.body.event_id;
    var sql="SELECT * FROM events LEFT JOIN event_dates ON events.id=event_dates.event_id where events.id="+event_id;
    connection.query(sql,function(err,result){
      if (err) {
        res.send({err:"error",code:101}); 
      }
      res.send({"results":result,code:200});  
    });
}

exports.savepricelevel=function(req,res){
    var data=req.body;
    
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
   
    if (data.price_level!=undefined) {
    var query = "INSERT INTO `price_levels` (`id`, `event_id`, `user_id`, `price_level_name`, `price_level_type`, `min_price`, `suggested_price`, `online_price`, `box_office_price`, `quantity_available`, `hide_online`, `hide_in_box_office`, `min_per_order`, `max_per_order`, `created_at`) VALUES (NULL, '"+data.eventId+"', '"+data.userId+"', '"+data.price_level+"', '"+data.price_type+"', '"+parseFloat(data.minimum_price)+"', '"+parseFloat(data.suggested_price)+"', '"+parseFloat(data.online_price)+"', '"+parseFloat(data.box_office_price)+"', '"+parseFloat(data.quantity_available)+"', '"+data.hide_online+"', '"+data.hide_in_box_office+"', '"+data.minimum_per_order+"', '"+data.maximum_per_order+"', '"+curtime+"')";
    connection.query(query,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
    });
   }
}

exports.getPricelevel=function(req,res){
    var eventId=req.body.eventId;
    var sql="SELECT * FROM price_levels  where event_id="+eventId;
    
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
    });
}
