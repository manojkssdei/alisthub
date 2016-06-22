/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-04-19
Created By: Deepak khokkar  
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');

exports.saveEvent = function(req,res) {
  
    var data=req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    //console.log(data); return false;
    //var zip = parseInt(data.zipcode);
    if(data.id=='' || data.id==undefined) {
     
     var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"')";
     
      connection.query(query, function(err7, responce) {
          console.log('second loop');
          console.log(responce);
          var venue_id = responce.insertId;
          var eventId = null;
          data.created = new Date();
          
          //console.log("INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`,`venue_id`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+data.content+"','"+venue_id+"')");
          //return false;

          var query1 = "INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`,`venue_id`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+data.content+"','"+venue_id+"')";
         
          connection.query(query1,function(err,result) {
              eventId = result.insertId;
              
              var query2 = "INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`,`created`,`modified`) VALUES(NULL,'"+eventId+"','"+data.eventdate+"','"+data.startevent_time+"','"+data.endevent_time+"','"+curtime+"','"+curtime+"')";
              connection.query(query2,function(error,res1){
                if (error) {
                  res.json({error:error,code:101});
                } else {
                  /*var showClix2 = new showClix();
                  showClix2.add_event(req,res,function(data){
                    if (data.status == 1) {
                      //res.json({result:results,showclix:data.location,code:200});
                    } else {                     
                    }
                  });*/
                  res.json({result:eventId,code:200}); 
                }
              });
          });
      });
    } else {
      //Update the event 
      var venueid = '';
      if(data.venueid!=undefined && data.venueid!='') {
        venueid = data.venueid;
        connection.query("UPDATE venues SET `venue_type`='"+data.venuetype+"',`venue_name`='"+data.venuename+"',`address`='"+data.address+"',`city`='"+data.city+"',`zipcode`='"+parseInt(data.zipcode)+"',`state`='"+data.state+"',`country`='"+data.country+"',`latitude`='"+data.latitude+"',`longitude`='"+data.longitude+"'  where id=" + venueid, function(err2, results2) {
           if (err2) {
            res.json({error:err2,code:101});
           } 
        });
      } else {
        var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"')";
     
          connection.query(query, function(err8, vresponce) {
            if (err8) {
             res.json({error:err2,code:101});
            } 
            venueid = vresponce.insertId;
          })
      }
      //console.log('venueID:'+venueid);

      connection.query("UPDATE events SET `user_id`='"+data.userId+"',`title`='"+data.eventname+"',`description`='"+data.content+"',`venue_id`='"+venueid+"'  where id="+data.id, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         }
      });
      
      res.json({result:data.id,code:200}); 
         
      //console.log("UPDATE event_dates SET `date`='"+data.eventdate+"',`start_time`='"+data.startevent_time+"',`end_time`='"+data.endevent_time+"'  where event_id = "+data.id);
      
      /*connection.query("UPDATE event_dates SET `date`='"+data.eventdate+"',`start_time`='"+data.startevent_time+"',`end_time`='"+data.endevent_time+"'  where event_id = "+data.id, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         } else {
          res.json({result:results,code:200});
         }
      });*/
    }
}

/** 
Method: saverecurringEvent
Description:Function to save event recurring data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.saverecurringEvent=function(req,res){
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var data=req.body.data;
    
    // Rollback local events
    function rollback_events(ids,type)
    {
        if (ids == null || ids == "" || ids === undefined) {
            res.json({result:"Rollback error",code:110});
        }
        else{
            if (type == 1) {
            var delquery = "Delete from events where parent_id="+ids;
            var delquery2 = "Delete from event_dates where parent_id="+ids;
            connection.query(delquery,function(cerr,cresult){
                connection.query(delquery2,function(cerr,cresult){
                    //res.json({result:"success",code:200});
                });
            });
            }
            if (type == 2) {
            var delquery = "Delete from events where id="+ids+" OR parent_id="+ids;
            var delquery2 = "Delete from event_dates where parent_id="+ids;
            connection.query(delquery,function(cerr,cresult){
                connection.query(delquery2,function(cerr,cresult){
                   // res.json({result:"success",code:200});
                });
            });
            }
           
        }
    }
    
    function save_event(data)
    {
       if(data.period == "daily"){ data.period = 1; }
       if(data.period == "weekly"){ data.period = 2; }
       if(data.period == "monthly"){ data.period = 3; }
       if(data.period == "yearly"){ data.period = 4; }
       data.start_date = data.date_time_series[0].date;
       var length = data.date_time_series.length;
       data.end_date   = data.date_time_series[length-1].date;
       
       // For update parent event
       if(data.event_id && data.event_id != null && data.event_id !== undefined)
       {      
        var save_query = "UPDATE `events` SET user_id='"+data.userId+"',title='"+data.eventname+"',start_date='"+data.start_date+"',recurring_or_not='1',recurring_type='"+data.period+"',description='"+data.content+"',event_steps='1',end_date='"+data.end_date+"',venue_id='"+data.venue_id+"',created='"+curtime+"' where id="+data.event_id;
        rollback_events(data.event_id,1);
       }
       else // For Insert parent event
       {
        var save_query = "INSERT INTO `events` (`id`, `user_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+data.content+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+curtime+"')";
       }
        // Save Parent Event
        connection.query(save_query,function(perr,presult){
            console.log(presult);
            if(data.event_id && data.event_id != null && data.event_id !== undefined)
            {
                var parent_id = data.event_id;
            }
            else{
                var parent_id = presult.insertId;
            }
            
            if (parent_id != null && parent_id !== undefined) {
                var date_array = data.date_time_series;
                
                /// Save Child events
                date_array.forEach(function(date_arr){
                
                var child_save_query = "INSERT INTO `events` (`id`, `user_id`, `parent_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `created`) VALUES (NULL, '"+data.userId+"', '"+parent_id+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+data.content+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+curtime+"')";
                
                connection.query(child_save_query,function(cerr,cresult){
                var child_id = cresult.insertId;
                
                if (child_id != null && child_id !== undefined) {
                var child_times = "INSERT INTO `event_dates`(`id`,`event_id`,`parent_id`,`date`,`start_time`,`end_time`,`start_date_time`,`end_date_time`,`created`) VALUES(NULL,'"+child_id+"','"+parent_id+"','"+date_arr.date+"','"+date_arr.start_time+"','"+date_arr.end_time+"','"+date_arr.from+"','"+date_arr.to+"','"+curtime+"')";
                //console.log(child_times);
                connection.query(child_times,function(cerr,cresult){
                    
                });
                }
                }); 
        
                });
                
                res.json({result:"success",code:200,parent_id:parent_id});
                
            }
            else{
                res.json({result:"Parent Not Save",code:200});
            }
        });
    }
    
      
    
   //console.log(data);
   //Case 1: Step -1 Saving
   // server side validation
   if(data.eventname !== undefined && data.eventtype !== undefined && data.date_time_series !== undefined && data.userId !== undefined){
    var query = "";
    
    // Venue if add new venue  
    // server side validation
    if (data.venue_event_div == true && data.venue_id !== undefined) {
       
       // Save Parent Event data
       save_event(data);
       
    }
    else
    {
        if(data.venuetype !== undefined && data.venuename !== undefined && data.address !== undefined && data.city !== undefined && data.zipcode !== undefined && data.state !== undefined && data.country !== undefined)
        {
            var venuequery = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"', '', '', '', '', '', '', '', '', '')";
            connection.query(venuequery,function(verr,vresult){
            
            data.venue_id = vresult.insertId;
            
            save_event(data);    
            
            
            });
        }
        else
        {
            res.json({result:"venuevalidation",code:103});
        }
   }
 
   }
   else{
    res.json({result:"validation",code:101}); 
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
  var sql="SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id="+user_id;


  connection.query(sql,function(err,result){
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}


/** 
Method: getUpcommingEvent
Description:Function to get latest upcomming event data  
Created : 2016-06-20
Created By: Deepak khokkar  
*/
exports.getUpcommingEvent=function(req,res) {
  var user_id = req.body.user_id;
  var curtime = moment().format('YYYY-MM-DD');
  var eventType = req.body.type;
 
  var sql = "SELECT events.id, events.title, events.sub_title, events.recurring_or_not, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id=" + user_id + " and Date(events.start_date) >= '" +curtime + "' and events.recurring_or_not = "+ eventType +" ORDER BY start_date ASC LIMIT 5";
  
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}

/** 
Method: getPastEvent
Description:Function to get past upcomming event data  
Created : 2016-06-20
Created By: Deepak khokkar  
*/
exports.getPastEvent=function(req,res) {
  var user_id = req.body.user_id;
  var curtime = moment().format('YYYY-MM-DD');
  var eventType = req.body.type;
  
  var sql = "SELECT events.id, events.parent_id, events.title, events.recurring_or_not, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id = " + user_id + " and Date(events.start_date) <= '" + curtime + "' and events.recurring_or_not = "+ eventType +" ORDER BY start_date DESC LIMIT 5";
  
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}


/** 
Method: getEventSeries
Description:Function to get event series data  
Created : 2016-06-20
Created By: Deepak khokkar  
*/
exports.getEventSeries=function(req,res) {
  var user_id = req.body.user_id;

  var curtime = moment().format('YYYY-MM-DD');

  var sql = "SELECT  event_package.id,  event_package.package_name, event_package.online_sales_open_date FROM event_package where event_package.user_id = " + user_id + " ORDER BY event_package.online_sales_open_date ASC LIMIT 5";
  
  connection.query(sql,function(err,result) {
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
    if(event_id!=undefined){
      var sql="SELECT *,events.venue_id as eventvenueId,event_dates.date as eventdate FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id  LEFT JOIN venues ON events.venue_id = venues.id where events.id="+event_id;
     
      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        res.send({"results":result,code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}

/** 
Method: getEvent for series event
Description:Function to get event data for series event 
Created : 2016-06-20
Created By: Deepak khokkar  
*/


exports.getSeriesEvent=function(req,res) {
   
    var event_id=req.body.event_id;
    if(event_id!=undefined){
      var sql="SELECT E.*,V.id as venue_id,V.venue_name,V.address,V.city,V.zipcode,V.state,V.country,V.latitude,V.longitude FROM events as E LEFT JOIN venues as V on E.venue_id=V.id where E.id="+event_id;
     
      var sqltime="SELECT * FROM event_dates where parent_id="+event_id+" ORDER BY start_date_time ASC";
      
      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        connection.query(sqltime,function(err5,result5){
            
        res.send({"results":result,timing:result5,code:200});
        
        });
        
      });
    } else {
      res.send({"results":{},code:200});
    }
}



exports.savepricelevel=function(req,res){
    
    var data=req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    // Case : For single event
    if (data.id!=undefined) {
        var query = "UPDATE `price_levels` SET `event_id`='"+data.eventId+"',`user_id`='"+data.userId+"',`price_level_name`='"+data.price_level+"',`price_level_name`='"+data.price_level+"',`price_level_type`='"+data.price_type+"',`min_price`='"+parseFloat(data.minimum_price)+"',`suggested_price`='"+parseFloat(data.suggested_price)+"',`online_price`='"+parseFloat(data.online_price)+"',`box_office_price`='"+parseFloat(data.box_office_price)+"',`quantity_available`='"+parseFloat(data.quantity_available)+"',`hide_online`='"+data.hide_online+"',`hide_in_box_office`='"+data.hide_in_box_office+"',`min_per_order`='"+data.minimum_per_order+"', `max_per_order`='"+data.maximum_per_order+"',`created_at`='"+curtime+"',`description`='"+data.description+"' where `id`='"+data.id+"'";
    }else{
        if (data.price_level!=undefined) {
        var query = "INSERT INTO `price_levels` (`id`, `event_id`, `user_id`, `price_level_name`, `price_level_type`, `min_price`, `suggested_price`, `online_price`, `box_office_price`, `quantity_available`, `hide_online`, `hide_in_box_office`, `min_per_order`, `max_per_order`, `created_at`,`description`) VALUES (NULL, '"+data.eventId+"', '"+data.userId+"', '"+data.price_level+"', '"+data.price_type+"', '"+parseFloat(data.minimum_price)+"', '"+parseFloat(data.suggested_price)+"', '"+parseFloat(data.online_price)+"', '"+parseFloat(data.box_office_price)+"', '"+parseFloat(data.quantity_available)+"', '"+data.hide_online+"', '"+data.hide_in_box_office+"', '"+data.minimum_per_order+"', '"+data.maximum_per_order+"', '"+curtime+"','"+data.description+"')";
        }
    }
    if (query != "") {
        connection.query(query,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
        });
    }
    else{
        res.send({err:"error",code:101}); 
    }
}

exports.getPricelevel=function(req,res){
    var eventId=req.body.eventId;
    if(eventId!=undefined){
      var sql="SELECT * FROM price_levels where event_id="+eventId;
      connection.query(sql,function(err,result){
         
          if (err) {
             res.send({err:"error",code:101}); 
          }
             res.send({"results":result,code:200});  
      });  
    } else {
      res.send({"results":{},code:200});
    }
}

exports.removepricelevel=function(req,res){
    var price_leveldelete_id=req.body.price_leveldelete_id;
    var sql="Delete FROM price_levels where id="+price_leveldelete_id;
    
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"message":"success",code:200});  
        
    });
}
/** 
Method: changePricelevelStatus
Description:Function to change Price level data status 
Created : 2016-05-18
Created By: Deepak khokhar  
*/
exports.changePricelevelStatus = function(req,res) { 
  connection.query("UPDATE price_levels SET is_active='"+req.body.status+"' where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}


/** 
Method: updatePricelevel
Description:Function to change Price level data status 
Created : 2016-05-18
Created By: Deepak khokhar  
*/
exports.getSinglePricelevel = function(req,res) {
    
   var sql="select * FROM price_levels where id="+req.body.id;
    
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }else{
           res.send({"results":result,code:200}); 
        }
             
        
        
    });
}

/** 
Method: get Event Details
Description:Function to get Event Details 
Created : 2016-05-18
Created By: Deepak khokhar  
*/

exports.getEventsdetail=function(req,res)
{
    

    if(req.body.var=='ages')
    {
     $sql='SELECT name,age from ages';
    }else if(req.body.var=='steps'){
      $sql='SELECT title,icon,step_id,formname from steps';
    }else if(req.body.var=='event_types'){
      $sql='SELECT name,event_id from event_types';
    }else if(req.body.var=='event_venue'){
      $sql='SELECT name,vanue_id from event_venue';
    }else if(req.body.var=='event_category'){
      $sql='SELECT category_id,name from event_category';
    }
     connection.query($sql, function(err, results) 
     {
      if (err) {
        res.json({error:err,code:101});
       }
       else
     {
      res.json({results:results,code:200});
    }
   
   
});
 }  

/** 
Method: updatePriceChange
Description:Function to change Price level data status 
Created : 2016-05-18
Created By: Deepak khokhar  
*/
exports.postPriceChange = function(req,res) {
    
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var Date1=new Date(req.body.startdate_pricechange);
    var mon=Date1.getMonth()+1;
    var month;
  var date=Date1.getFullYear()+"-"+mon+"-"+Date1.getDate();
    if (req.body.interval=='pm')
    {
      month=parseInt(req.body.month)+12;
      month.toString();
    }else{
        month=req.body.month;
    }
    var change_price_date=date+" "+month+":"+req.body.time+":00";
 
 connection.query("UPDATE price_levels SET `new_price`='"+req.body.new_price+"',`apply_to`='"+req.body.apply+"',`price_change_datetime`='"+change_price_date+"' where id="+req.body.price_change_id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{
     res.json({result:results,code:200});
     }
  });

}

/** 
Method: savesecondstepdata
Description:Function to save step2 
Created : 2016-05-20
Created By: Deepak khokhar  
*/
exports.savesecondstepdata=function(req,res)
{
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
 if (req.body.category1!=undefined) {
    var $sql1="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category1+"','"+curtime+"')";
  connection.query($sql1,function(err,res){
    });
 }
 if (req.body.category2!=undefined) {
    var $sql2="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category2+"','"+curtime+"')";
  connection.query($sql2,function(err,res){
    });
 }
 if (req.body.category3!=undefined) {
    var $sql3="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category3+"','"+curtime+"')";
  connection.query($sql3,function(err,res){
    });
 }
  
  
   connection.query("UPDATE events SET `website_url`='"+req.body.eventwebsite+"',`keyword`='"+req.body.keyword+"',`inventory`='"+req.body.eventinventory+"',`facebook_url`='"+req.body.facebook+"',`twitter_url`='"+req.body.twitter+"',`video`='"+req.body.video+"',`type_of_event`='"+req.body.type_of_event+"',`custom_ages`='"+req.body.custom_ages+"',`price_type`='"+req.body.price+"' where id="+req.body.eventId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{
     res.json({result:results,code:200});
     }
  });
}

/** 
Method: saveInventory
Description:Function to save step2 
Created : 2016-06-17
Created By: Deepak khokhar  
*/
exports.saveInventory=function(req,res) {
  connection.query("UPDATE events SET `inventory`='"+req.body.eventinventory+"' where id="+req.body.event_id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   } else {
    res.json({result:results,code:200});
   }
  });
}

/** 
Method: get Event Category
Description:Function to get step2 event Category 
Created : 2016-06-11
Created By: Deepak khokhar  
*/
exports.getEventCategory=function(req,res) {
  if(req.body.event_id!=undefined) {
    connection.query('SELECT * from event_categories where event_id='+req.body.event_id, function(err, results) {
      if (err) {
        res.json({error:err,code:101});
      } else{
        res.json({result:results,code:200});
      }
    });
  }else {
      res.send({"results":{},code:200});
  }
}


/** 
Method: getAdvanceSetting
Description:Function to get advance settings details of events
Created : 2016-05-20
Created By: Harpreet Kaur 
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_event = process.cwd()+'/public/images/events';

exports.getAdvanceSetting = function(req,res){
  connection.query('SELECT * from event_advance_settings where seller_id='+req.body.seller_id+ ' && event_id = '+req.body.event_id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    else{
          res.json({result:results,code:200});
         }
  });
}


/** 
Method: saveAdvanceSettings
Description:Function to save advance settings of events
Created : 2016-05-20
Created By: Harpreet Kaur 
*/

exports.saveAdvanceSettings = function(req,res) {
    
 var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
 var query_fields = '';

 var advance_settings_fields = [
'hide_event_time',
'hide_event_date_time',
'hide_venue_info',
'hide_x_days_away',
'hide_calender_link',
'hide_calender_icon',
'hide_age_limit',
'hide_price_range',
'hide_best_available',
'hide_presale_date',
'presale_instuction_text',
'presale_placeholder_text',
'hide_presale_event_in_series',
'hide_from_search_engine',
'hide_social_media',
'hide_invite_friends',
'checkout_text',
'confirmation_page_text',
'receipt_reminder_text',
'confirmation_email_text',
'hide_ticket_holder_name',
'donot_send_reminder_email',
'hide_event_date_time_in_event_reminder',
'hide_venue_in_event_reminder',
'hide_ticket_info_in_event_reminder',
'custom_event_reminder_message',
'hide_event_date_on_ticket',
'use_lat_long_coords',
'hide_premiere_price_level_discount',
'additional_receipt_text',
'show_sale_barcode_in_text',
'disable_autocomplete_in_the_box_office',
'dropdown_for_reccuring_events',
'suggested_donation_amount',
'sales_closed_message',
'custom_sold_out_message',
'embed_show_navbar_seller_name',
'embed_show_header_banner',
'embed_hide_venue_names_on_events_list',
'footer_message_on_event_pages',
'force_show_on_seller_homepage',
'hide_stage_front',
'stage_front_name',
'lock_question_answer',
'lock_ticket_names',
'lock_order_names',
'hide_back_to_event_button',
'custom_shipping_text_instruction',
'upsell_matching_items',
'ignore_cart_limit_when_upselling',
'hide_look_for_different_seats_option',
'analytics_facebook_conversion_pixel_id',
'analytics_facebook_audiance_new_pixel',
'analytics_facebook_custom_audiance_pixel_id',
'allow_extended_event_names',
'twitter_share_text',
'name_change_cutoff',
'email_reply_to',
'email_reply_to_name',
'enable_sidekick_for_thermal_printing',
'acceptable_locales',
'custom_title_prefix',
'show_support_link_in_email',
'collect_addresses_on_free_orders',
'ask_questions_on_checkout',
'cancel_ticket_button_on_receipt',
'custom_ticket_cancelation_message',
'additional_email_for_receipts',
'access_code_request_text',
'access_code_instructions_text',
'show_bundle_details_by_default' ];

console.log('req.body' , req.body);
for(var key in advance_settings_fields) {
  var field_name = advance_settings_fields[key];
  var checkboxkey = field_name+'_cbox';
  if(req.body[checkboxkey] != null && req.body[checkboxkey] != "undefined") {
    if (req.body[field_name] != null && req.body[field_name] != "undefined") {
        query_fields += " `"+field_name+"` = '"+req.body[field_name]+"' ,";
    }
  }
}

var table_name = 'event_advance_settings';
var created = " created = '"+curtime+"'"; 
var modified = " modified = '"+curtime+"'";

if(req.body.event_id) {
var query1 = "UPDATE `"+table_name+"` SET "+ query_fields + modified +" where id = "+req.body.id+" && event_id = "+req.body.event_id+" && seller_id = "+req.body.seller_id;
}
else
{
var query1 = "INSERT INTO  `"+table_name+"` SET event_id = "+req.body.event_id+" , seller_id = "+req.body.seller_id +", "+ query_fields + created;
}

console.log('query_value ' , query1);

  connection.query(query1, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{

     connection.query(" select * from  `"+table_name+"` where event_id = "+req.body.event_id+" && seller_id = "+req.body.seller_id, function(error, result) {
         if (error) {
          res.json({error:error,code:101});
         }else{
          res.json({result:result,code:200});
         }
      });
     }
  });

}

/** 
Method: look and feel templates
Description:Function to get look and feel Templates 
Created : 2016-05-24
Created By: Deepak khokhar  
*/
exports.getlookAndFeeltemplate=function(req,res)
{
    $sql="select * from look_and_feel_template";
     connection.query($sql, function(err, results) 
     {
      if (err) {
        res.json({error:err,code:101});
       }
       else
     {
      res.json({result:results,code:200});
    }
   
   
});
}
 
 /** 
Method: look and feel Preview template
Description:Function to get look and feel Preview Template 
Created : 2016-05-24
Created By: Deepak khokhar  
*/
exports.getpreviewImage=function(req,res)
{
    var templateId=req.body.templateId;
    
    $sql="select preview_image from look_and_feel_template where id="+templateId;
     connection.query($sql, function(err, results) 
     {
      if (err) {
        res.json({error:err,code:101});
       }
       else
     {
      res.json({result:results,code:200});
    }
   
   
});

}
 
 /** 
Method: look and feel select template description
Description:Function to get look and feel Preview Template 
Created : 2016-05-24
Created By: Deepak khokhar  
*/
exports.getTemplate=function(req,res)
{
    var templateId=req.body.templateId;
    
    $sql="select description from look_and_feel_template where id="+templateId;
    
     connection.query($sql, function(err, results) 
     {
      if (err) {
        res.json({error:err,code:101});
       }
       else
     {
      res.json({result:results,code:200});
    }
   
   
});
} 

 /** 
Method: look and feel save image 
Description:Function to get look and feel save image 
Created : 2016-05-24
Created By: Deepak khokhar  
*/
exports.addlookAndFeelImage=function(req,res)
{
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var eventId=req.body.eventId;
    if (req.body.imagedata && req.body.imagedata != "" && req.body.imagedata != undefined) {
        //var photoname = req.body.seller_id+'_image_'+Date.now() + '.jpg';
        var photoname = eventId+'_image_'+Date.now() + '.jpg';
        var imagename = path_event+'/'+photoname;
        var base64Data = req.body.imagedata.replace(/^data:image\/jpeg;base64,/, "");
        
        fs.writeFile(imagename, base64Data, 'base64', function(err) {
        if (err) {
         console.log("Image Failure Upload");
        }
        });
        if (photoname!=undefined) {
           var $sql3="INSERT INTO `event_images` (`id`, `event_id`, `image_name`, `created`) VALUES (NULL, '"+eventId+"', 'http://192.155.246.146:5502/images/events/"+photoname+"','"+curtime+"')";
  connection.query($sql3,function(err,result){
    if (err) {
       res.json({error:err,code:101}); 
    }
    res.json({result:result,code:200});
    });
        }else{
            res.json({error:err,code:101}); 
        }
     }
 
}

exports.deleteEvent= function(req, res) {

connection.query("Delete from events where id=" + req.body.event_id, function(err, result1) {
 connection.query("Delete from event_dates where event_id=" + req.body.event_id, function(err, result2) {
 connection.query("Delete from event_categories where event_id=" + req.body.event_id, function(err, result3) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result3, code: 200 });
    });
	});
	});
}

exports.postCreateEventStepFour = function(req, res) {
  console.log("============================================")
  console.log("I AM IN THE BACK OF ENDS \n",req.body);
  console.log("============================================")
  res.send("sending back!");
}

exports.stepOneEventPackage = function(req,res) {



   if (req.body.imageData && req.body.imageData != "" && req.body.imageData != undefined) {

        var path_event = process.cwd()+'/public/images/events';
        var user_id = req.body.user_id;
        var photoname = user_id+'_image_'+Date.now() + '.jpg';
        var imagename = path_event+'/'+photoname;
        var base64Data = req.body.imageData.replace(/^data:image\/jpeg;base64,/, "");
        
        fs.writeFile(imagename, base64Data, 'base64', function(err) {
        if (err) {
         console.log("Image Failure Upload");
        }
        });
    req.body.image = photoname ;
}
 console.log('stepOneEventPackage req.body before ' );
 console.log( req.body );

 var fields = ['package_name', 'package_description', 'online_sales_open_date', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_date', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', 'category', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];

console.log('fields ' , fields);

    var fieldsData = '';

    for (var index in fields) {
        fieldName = fields[index];
        if (req.body[fieldName] == undefined) {
            req.body[fieldName] = '';
        }
        fieldsData+= " `"+fieldName+"` = '" + req.body[fieldName]+ "', ";
    }

    console.log('fieldsData ' , fieldsData);

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    req.body.modified = curtime;

    if (req.body.id && req.body.id != "" && req.body.id != undefined) {

    var query = "UPDATE `event_package` SET "+ fieldsData +" `modified` = '" + req.body.modified + "' WHERE user_id = '" + req.body.user_id + "' && id=" + req.body.id;
    } else {
    var query = "INSERT INTO `event_package` SET "+ fieldsData +" user_id = "+req.body.user_id +" , `created` = '" + req.body.created +"'";
         }


    if (query != "") {
        console.log('query', query)
        connection.query(query, function(err7, results) {
            if (err7) {
                res.json({ error: err7,code: 101});
            }




            // fetch last inserted id and then add event keys corresponding to this


if(results) {
  console.log('results' );
  console.log('results.insertId' , results.insertId);
var package_id = results.insertId;
            for (var index in  req.body.event_ids) {
                
                if (req.body.event_ids[index] != undefined) {
                    var event = req.body.event_ids[index];
                    var query_event = "INSERT INTO package_event_map ( event_id , package_id) VALUES ( "+ event +" , "+ package_id +")";


console.log('------------------');
console.log(query_event);

                    connection.query(query_event, function(subErr, subResults) {
                      if (subErr) {
                          res.json({ error: subErr,code: 101});
                      }
                      });
                
            }
          }
          res.json({ result: package_id , code: 200 });
        }


        });
    }
    
}

/** 
Method: updatesocialLink
Description:Function to changesocial link 
Created : 2016-06-15
Created By: Deepak khokhar  
*/
exports.updatesociallink = function(req,res) {
    
    var facebook_url=req.body.social_link.facebook_url;
    var twitter_url=req.body.social_link.twitter_url;
    connection.query("UPDATE events SET facebook_url='"+facebook_url+"',twitter_url='"+twitter_url+"' where id="+req.body.eventId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: getlookandFeelTemplatehtml
Description:Function to getlookandFeelTemplatehtml
Created : 2016-06-21
Created By: Deepak khokhar  
*/
exports.getlookandFeelTemplatehtml = function(req,res) {
   
      var templateName=req.body.template_name;
    
    $sql="select * from look_and_feel_template_html where template_name='"+templateName+"'";
    
     connection.query($sql, function(err, results) 
     {
      if (err)
      {
        res.json({error:err,code:101});
     }
       else
     {
      res.json({result:results,code:200});
    }
   
   
});
}

/** 
Method: look_and_feel_save_html
Description:Function to getlookandFeelTemplatehtml
Created : 2016-06-21
Created By: Deepak khokhar  
*/

exports.look_and_feel_save_html = function(req,res) {
   
     var html=(JSON.stringify(req.body.html) + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
      var eventId=req.body.eventId;
    console.log("UPDATE events SET step3_html='"+html+"' where id="+eventId);
    connection.query("UPDATE events SET step3_html='"+html+"' where id="+eventId, function(err, results)
    {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
    
    
}

