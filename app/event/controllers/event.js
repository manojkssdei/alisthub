/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-06-30
Created By: Manoj Kumar Singh
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');
var showClixPackage   = require('./../../showclix/showclix_package.js');


exports.saveEvent = function(req,res) {
   
    function rollback_event(id) {
        var query = "Delete from events where id="+id;
        connection.query(query, function(err7, responce) {
        })
    }
    function update_showclix_data(event_url,eventId,data)
    {
        var showclix_event_id = event_url.split("/");
        var query = "UPDATE events SET showclix_id="+showclix_event_id[4]+", showclix_url='"+event_url+"', showclix_seller='"+data.showclix_seller_id+"' where id="+eventId;
        connection.query(query, function(err7, responce) {
        })
    }
    
    function create_folder(data,eventId) {
        
        var __dir = './public/preview_template/'+data.userId;
            if (!fs.existsSync(__dir)){
                fs.mkdirSync(__dir);
            }
              var __dir1 = './public/preview_template/'+data.userId+'/'+eventId;
            if (!fs.existsSync(__dir1)){
                fs.mkdirSync(__dir1);
            }
            fs.openSync(__dir1 + "/index.html", 'w');
             fs.createReadStream("./public/preview_template/look-n-feel-design-preview.html").pipe(fs.createWriteStream(__dir1 + "/index.html"));
             
    }
  
    var data=req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    //console.log(data); return false;
    //var zip = parseInt(data.zipcode);
        
    if(data.id=='' || data.id==undefined) {
     
     var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"')";
     
        connection.query(query, function(err7, responce) {
         
          var venue_id = responce.insertId;
          var eventId = null;
          data.created = new Date();
          var content_html=data.content.replace(/'/g, "\\'"); 
          var query1 = "INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`,`venue_id`,`event_domain`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+content_html+"','"+venue_id+"','"+data.eventurl+"')";
         
            connection.query(query1,function(err,result) {
            
            eventId = result.insertId;
              
            create_folder(data,eventId)           
             
            var query2 = "INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`,`created`,`modified`) VALUES(NULL,'"+eventId+"','"+data.eventdate+"','"+data.startevent_time+"','"+data.endevent_time+"','"+curtime+"','"+curtime+"')";
              
              connection.query(query2,function(error,res1){
                if (error) {
                  res.json({error:error,code:101});
                } else {
                   
                   // showclix start 
                    var showClix2 = new showClix();
                        showClix2.add_event(data,res,function(sdata){
                        if (sdata.status == 1) {
                            var event_url = sdata.location;
                            var showclix_event_id = event_url.split("/");
                            update_showclix_data(event_url,eventId,data);
                            res.json({result:eventId,showclix:sdata.location,code:200});
                        } else {
                            rollback_event(eventId);
                            res.json({result:"",error:sdata.error,code:101});  
                        }
                    });
                    //showclix end
                   
                   //res.json({result:eventId,code:200});
                 
                }
              });
              
            });
        });
    }
    else
    {
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
     var content_html=data.content.replace(/'/g, "\\'");
      connection.query("UPDATE events SET `user_id`='"+data.userId+"',`title`='"+data.eventname+"',`description`='"+content_html+"',`venue_id`='"+venueid+"'  where id="+data.id, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         }
         else{
                // showclix start 
                    var showClix2 = new showClix();
                        showClix2.add_event(data,res,function(sdata){
                        if (sdata.status == 1) {
                            res.json({result:data.id,code:200});
                        } else {
                            res.json({result:"",error:"error",code:101});  
                        }
                    });
                //showclix end
         }
         
      });
      
       
    }   
    
    //console.log("UPDATE event_dates SET `date`='"+data.eventdate+"',`start_time`='"+data.startevent_time+"',`end_time`='"+data.endevent_time+"'  where event_id = "+data.id);
      
    /*connection.query("UPDATE event_dates SET `date`='"+data.eventdate+"',`start_time`='"+data.startevent_time+"',`end_time`='"+data.endevent_time+"'  where event_id = "+data.id, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         } else {
          res.json({result:results,code:200});
         }
      });
    }*/
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
       var html1=data.content.replace(/'/g, "\\'");
       // For update parent event
       if(data.event_id && data.event_id != null && data.event_id !== undefined)
       {      
        var save_query = "UPDATE `events` SET user_id='"+data.userId+"',title='"+data.eventname+"',start_date='"+data.start_date+"',recurring_or_not='1',recurring_type='"+data.period+"',description='"+html1+"',event_steps='1',end_date='"+data.end_date+"',venue_id='"+data.venue_id+"',created='"+curtime+"' where id="+data.event_id;
        rollback_events(data.event_id,1);
       }
       else // For Insert parent event
       {
        var save_query = "INSERT INTO `events` (`id`, `user_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+html1+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+curtime+"')";
       }
        // Save Parent Event
        connection.query(save_query,function(perr,presult){
          //  console.log(presult);
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
                var html1=data.content.replace(/'/g, "\\'");
                var child_save_query = "INSERT INTO `events` (`id`, `user_id`, `parent_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `created`) VALUES (NULL, '"+data.userId+"', '"+parent_id+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+html1+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+curtime+"')";
                
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

  //console.log(req.body);
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
 
  var sql = "SELECT events.id, events.title, events.sub_title, events.recurring_or_not, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.parent_id IS NULL and events.user_id=" + user_id + " and Date(events.start_date) >= '" +curtime + "' and events.recurring_or_not = "+ eventType +" ORDER BY start_date ASC LIMIT 5";
  
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
  
  var sql = "SELECT events.id, events.parent_id, events.title, events.recurring_or_not, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.parent_id IS NULL and events.user_id = " + user_id + " and Date(events.start_date) <= '" + curtime + "' and events.recurring_or_not = "+ eventType +" ORDER BY start_date DESC LIMIT 5";
  
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

 // var curtime = moment().format('YYYY-MM-DD');


  var sql = "SELECT  event_package.id,  event_package.package_name, event_package.online_sales_open_date_time FROM event_package where event_package.user_id = " + user_id + " ORDER BY event_package.id ASC LIMIT 5";

  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    else
    {
    res.send({"results":result,code:200});
    }
  });
}



/** 
Method: getEvent
Description:Function to get event data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/

exports.getEvent=function(req,res) {
  // console.log(req.body);
    var event_id=req.body.event_id;
    if(event_id!=undefined){

   //   var sql="SELECT *,events.venue_id as eventvenueId,event_dates.date as eventdate,es.online_sales_close FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id  LEFT JOIN venues ON events.venue_id = venues.id  LEFT JOIN event_settings es ON events.id = es.event_id where events.id="+event_id;
    // console.log('sql ' , sql );

     var sql="SELECT *,events.venue_id as eventvenueId,event_dates.date as eventdate,es.online_sales_close  , lft.template_name , lft.image , lft.preview_image,events.description as description  FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id  LEFT JOIN venues ON events.venue_id = venues.id  LEFT JOIN event_settings es ON events.id = es.event_id LEFT JOIN  look_and_feel_template lft ON lft.id = events.template_id where events.id="+event_id;


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
      var sql="SELECT E.*,V.id as venue_id,V.venue_name,V.address,V.city,V.zipcode,V.state,V.country,V.latitude,V.longitude, lft.template_name , lft.image , lft.preview_image   FROM events as E LEFT JOIN venues as V on E.venue_id=V.id  LEFT JOIN  look_and_feel_template lft ON lft.id = E.template_id where E.id="+event_id;

      console.log('-------------********---------------************------------');
      console.log('sql -- ', sql);

     
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

/** 
Method: getEvent for series event
Description:Function to get event data for series event 
Created : 2016-07-14
Created By: Manoj Singh  
*/


exports.getSeriesDates=function(req,res) {
   
    var event_id=req.body.event_id;
    if(event_id!==undefined){
         
      var sqltime="SELECT * FROM event_dates where parent_id="+event_id+" ORDER BY start_date_time ASC";
          
        connection.query(sqltime,function(err5,result5){
            
        res.send({"results":result,timing:result5,code:200});
        
        });
        
      
    } else {
      res.send({"results":{},code:200});
    }
}


exports.getComment = function(req,res){
  //console.log(req.body);
  var data=req.body;
  connection.query('SELECT E.*,S.first_name,S.last_name FROM seller_users as S LEFT JOIN event_comments  as E on S.seller_id=E.seller_id where E.seller_id='+data.seller_id+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}


exports.addComment=function(req,res)
{
     var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    //console.log(req.body);
    //console.log("rootscope",$rootScope.userId);
    //var data=req.body;
    var comment=(JSON.stringify(req.body.comment) + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
     var query = "INSERT INTO `event_comments` (`id`,`seller_users_id`,`event_id`,`seller_id`,`comment`,`created`) VALUES ('NULL','"+req.body.seller_users_id+"','" + req.body.event_id + "','" + req.body.seller_id + "','" + comment + "','"+ curtime + "')";
     
     //console.log(query); 
     if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       return  res.json({error:err7,code:101});
      }
     return  res.json({result:results,code:200});
    });

  } else {
      return res.json({error:"error",code:101}); 
  }
}

exports.savepricelevel=function(req,res){
    
    function rollback_level(id) {
        var query = "Delete from price_levels where id="+id;
        connection.query(query, function(err7, responce) {
        })
    }
    function update_showclix_pricedata(event_url,eventId,data)
    {
        var showclix_event_id = event_url.split("/");
        var query = "UPDATE price_levels SET showclix_price_id="+showclix_event_id[4]+"  where id="+eventId;
        connection.query(query, function(err7, responce) {
        })
    }
    
    var data=req.body;
    console.log(data);
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
           if (data.id!=undefined) {
            var parne_id = data.id;
           }
           else{
            var parne_id = result.insertId; 
           }
           
            // showclix start 
                var showClix2 = new showClix();
                    showClix2.add_price_level(data,res,function(sdata){
                        if (sdata.status == 1) {
                            var event_url = sdata.location;
                            update_showclix_pricedata(event_url,parne_id,data);
                            res.json({result:result,showclix:sdata.location,code:200});
                        }
                        else if(sdata.status == 2) {
                            res.json({result:result,showclix:sdata.location,code:200});
                        }
                        else{
                            rollback_level(data.eventId);
                            res.json({result:"",error:sdata.error,code:101});  
                        }
                    });
            //showclix end
        
        
          // res.send({"results":result,code:200});
           
           
        
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

/*get showclix price level*///

exports.getShowclixPricelevel=function(req,res){
    console.log(req.body);
    var eventId=req.body.showclix_id;
    if(eventId!=undefined){
     // showclix start 
                var showClix2 = new showClix();
                    showClix2.get_price_level(eventId,res,function(sdata){
                        if (sdata.status == 1) {
                            res.json({result:"success",showclix:sdata.data,code:200});
                        } else {
                            res.json({result:"",error:sdata.error,code:101});  
                        }
                    });
            //showclix end 
    } else {
      res.send({"results":{},code:200});
    }
}

exports.removepricelevel=function(req,res){
    var price_leveldelete_id=req.body.price_leveldelete_id;
    var sql="Delete FROM price_levels where id="+price_leveldelete_id;
    
    // showclix start 
                var showClix2 = new showClix();
                    showClix2.delete_price_level(req.body,res,function(sdata){
                        if (sdata.status == 1) {
                            connection.query(sql,function(err,result){
                                if (err) {
                                   res.send({err:"error",code:101}); 
                                }
                                else
                                {
                                   res.send({"message":"success",code:200});
                                }
                                
                            });
                                                
                        } else {
                            res.json({result:"",error:"Server down",code:101});  
                        }
                    });
    //showclix end
}
/** 
Method: changePricelevelStatus
Description:Function to change Price level data status 
Created : 2016-05-18
Created By: Deepak khokhar  
*/
exports.changePricelevelStatus = function(req,res) { 
   // showclix start 
    var showClix2 = new showClix();
        showClix2.change_price_level_status(req.body,res,function(sdata){
            if (sdata.status == 1) {
                connection.query("UPDATE price_levels SET is_active='"+req.body.status+"' where id="+req.body.id, function(err, results) {
                    
                    if (err) {
                        res.json({error:err,code:101});
                    }
                    else {
                       res.json({result:results,code:200});
                    }
                    
                    });
                } else {
                            res.json({result:"",error:"Server down",code:101});  
                        }
        });
    //showclix end
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

 var eventwebsite = ''
 if(req.body.eventwebsite!='' && req.body.eventwebsite!=null) {
  eventwebsite = req.body.eventwebsite;
 }
 var keyword = ''
 if(req.body.keyword!='' && req.body.keyword!=null) {
  keyword = req.body.keyword;
 }
 var eventinventory = ''
 if(req.body.eventinventory!='' && req.body.eventinventory!=null) {
  eventinventory = req.body.eventinventory;
 }
 var facebook = ''
 if(req.body.facebook!='' && req.body.facebook!=null) {
  facebook = req.body.facebook;
 }
 var twitter = ''
 if(req.body.twitter!='' && req.body.twitter!=null) {
  twitter = req.body.twitter;
 }
 var video = ''
 if(req.body.video!='' && req.body.video!=null) {
  video = req.body.video;
 }

  console.log("custom_ages: " + req.body.custom_ages);
  console.log("dynamic_age: " + req.body.dynamic_age);

  var customAge = '';
  var customAgeLimit = 0;
  if(req.body.custom_ages!=undefined) {
    customAge = req.body.custom_ages;
  }
  
  if(req.body.dynamic_age!=undefined && req.body.dynamic_age!=null) {
    customAgeLimit = 1;
    customAge = req.body.dynamic_age;
  }

  connection.query("UPDATE events SET `website_url`='"+eventwebsite+"',`keyword`='"+keyword+"',`inventory`='"+eventinventory+"',`facebook_url`='"+facebook+"',`twitter_url`='"+twitter+"',`video`='"+video+"',`type_of_event`='"+req.body.type_of_event+"',`custom_ages`='"+customAge+"',`define_custom_age`='"+customAgeLimit+"',`price_type`='"+req.body.price+"' where id="+req.body.eventId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     } else {
       
        
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
Created By: Manoj Kumar 
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_event = process.cwd()+'/public/images/events';

exports.getAdvanceSetting = function(req,res){
  console.log('SELECT * from event_advance_settings where seller_id='+req.body.seller_id+ ' && event_id = '+req.body.event_id);
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
Created By: Manoj Kumar 
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

//console.log('req.body' , req.body);
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

//console.log("id: "+req.body.id);

if(req.body.id!=undefined) {
  var query1 = "UPDATE `"+table_name+"` SET "+ query_fields + modified +" where event_id = "+req.body.event_id+" && seller_id = "+req.body.seller_id;
} else {
  var query1 = "INSERT INTO  `"+table_name+"` SET event_id = "+req.body.event_id+" , seller_id = "+req.body.seller_id +", "+ query_fields + created;
}

//console.log('query_value ' , query1);

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

// showclix start

        var showClix2 = new showClix();
        req.body.showclix_id = 4211747;
        showClix2.delete_event(req.body,res,function(sdata){
            if (sdata.status == 1) {
                                
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
                    
                    
                } else {
                    res.json({result:"",error:sdata.error,code:101});  
                }
        });
//showclix end
}

exports.postCreateEventStepFour = function(req, res) {
  console.log("============================================")
  console.log("I AM IN THE BACK OF ENDS \n",req.body);
  console.log("============================================")
  res.send("sending back!");
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
 
   sql = 'SELECT count(*) as count from eventstep3 where eventId = "' + req.body.eventId + '"';
    var html1=req.body.html.replace(/'/g, "\\'");

   var background_outer=req.body.background_outer;
   var inner_background=req.body.inner_background;
   var text_color=req.body.text_color;
   var outer_border=req.body.outer_border;
   var inner_border=req.body.inner_border;

   var eventId=req.body.eventId;
    connection.query(sql, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        if (results) {
            count = results[0].count;
            if (count > 0){
                var query = "UPDATE eventstep3 SET html='"+html1+"',outer_background='"+background_outer+"',inner_background='"+inner_background+"',text_color='"+text_color+"',outer_border='"+outer_border+"',inner_border='"+inner_border+"' where eventId="+eventId;
           
            connection.query(query, function(err, results)
              {  
               if (err) {
                res.json({error:err,code:101});
               }
               res.json({result:results,code:200});
            });
        }
            else{
               var query = "INSERT INTO  `eventstep3` (`html`, `eventId`, `outer_background`, `inner_background`, `text_color`, `outer_border`, `inner_border`) VALUES ('"+html1+"','"+eventId+"', '"+background_outer+"', '"+inner_background+"', '"+text_color+"', '"+outer_border+"', '"+inner_border+"')";
            
   
            connection.query(query, function(err, results)
              {  
               if (err) {
                res.json({error:err,code:101});
               }
               res.json({result:results,code:200});
            });
            }
        }
    }); 
   

    
    
}
/** 
Method: event domain valid
Description:Function to check unique domain
Created : 2016-06-23
Created By: Deepak khokhar  
*/

exports.checkeventurl=function(req,res){
    
    
        sql = 'SELECT count(*) as count from events where event_domain = "' + req.body.eventurl + '"';
    
    connection.query(sql, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        if (results) {
            count = results[0].count;
            if (count > 0)
                res.json({ result: count, code: 101 });
            else
                res.json({ result: count, code: 200 });
        }
    });
    
}


/** 
Method: event step3
Description:Function to get event step3
Created : 2016-07-06
Created By: Deepak khokhar  
*/

exports.getEventStep3=function(req,res){
    
    
        query = 'SELECT * from eventstep3 where eventId = "' + req.body.event_id + '"';
    
    connection.query(query, function(err, results)
              {  
               if (err) {
                res.json({error:err,code:101});
               }
               res.json({result:results,code:200});
            });
    
}



exports.addEmailReport = function(req,res){
    
    console.log(req.body);

    if(req.body.id != '' && req.body.id != undefined) {
      console.log('------------EDIT ------------');
      var sql = "UPDATE email_reports SET email_address = '"+req.body.email_address+"' , timezone_name = '"+req.body.timezone_name+"' , send_time = '"+req.body.send_time+"' , export_format = '"+req.body.export_format+"' WHERE id = "+req.body.id+" and  user_id = "+req.body.user_id+" and event_id=" +req.body.eventId ;
    }
    else {
      console.log('----------add ----------------');
        var sql = "INSERT INTO email_reports ( event_id, user_id, email_address, timezone_name, send_time, export_format) VALUES ( "+req.body.eventId+", "+req.body.user_id+" , '"+req.body.email_address+"', '"+req.body.timezone_name+"', '"+req.body.send_time+"', '"+req.body.export_format+"')";
    }

    console.log('sql ' , sql );
    
    connection.query(sql, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        if (results) {
            res.json({ result: results, code: 200 });
        }
    });    
}

exports.getEmailReport = function(req,res) {
    
    var sql = 'SELECT * from email_reports where event_id = ' + req.body.eventId + ' and user_id = '+ req.body.user_id  ;

     console.log('sql ' , sql );

    connection.query(sql, function(err, results) {
        if (err) {
          res.json({ error: err, code: 101 });
        }
        if (results) {
          res.json({ result: results, code: 200 });
        }
    });
    
}

exports.getEmailReportById = function(req,res) {
    
    var sql = 'SELECT * from email_reports where event_id = ' + req.body.eventId + ' and user_id = '+ req.body.user_id + ' and id = '+ req.body.id  ;

     console.log('sql ' , sql );

    connection.query(sql, function(err, results) {
        if (err) {
          res.json({ error: err, code: 101 });
        }
        if (results) {
          res.json({ result: results, code: 200 });
        }
    });
    
}


exports.editEmailReport = function(req,res){
    
    console.log(req.body);

    var sql = "UPDATE email_reports SET email_address = '"+req.body.email_address+"' , timezone_name = '"+req.body.timezone_name+"' , send_time = '"+req.body.send_time+"' , export_format = '"+req.body.export_format+"' WHERE id = "+req.body.id+" and  user_id = "+req.body.user_id;

    console.log('sql ' , sql );
    
    connection.query(sql, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        if (results) {
            res.json({ result: results, code: 200 });
        }
    });    
}


exports.deleteEmailReportById = function(req,res) {
    
    var sql = 'DELETE from email_reports where event_id = ' + req.body.eventId + ' and user_id = '+ req.body.user_id + ' and id = '+ req.body.id  ;

     console.log('sql ' , sql );

    connection.query(sql, function(err, results) {
        if (err) {
          res.json({ error: err, code: 101 });
        }
        if (results) {
          res.json({ result: results, code: 200 });
        }
    });
    
}


exports.assignEmailTemplate=function(req,res) {
  var eventId = req.body.eventId;
  var template_id = req.body.template_id;

  var sql = "UPDATE events SET template_id = "+template_id+ " where id = "+eventId ;
  
    console.log('sql ' , sql );
    
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}


exports.getEmailTemplateOfEvent=function(req,res) {
   var eventId = req.body.eventId;
  
 var sql = "select events.template_id , look_and_feel_template.template_name from events left join look_and_feel_template ON  events.template_id = look_and_feel_template.id where events.id = "+eventId ;
  
  console.log('sql ' , sql );

  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}


exports.pauseSales= function(req, res) {



var pause_sales = req.body.pause_sales;
var updated_pause_sales;
if(pause_sales == 0 ) { updated_pause_sales = 1; }
if(pause_sales == 1 ) { updated_pause_sales = 0; }

var sales_query = "UPDATE events SET pause_sales = "+updated_pause_sales+" where id = " + req.body.event_id ;
console.log('sales_query ' , sales_query) ;
 connection.query( sales_query , function(err, result) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result, code: 200 , updated_pause_sales : updated_pause_sales });
    });
}


exports.addFavouriteEvent= function(req, res) {
// add query to pause sales here ................

var favorite_event_status = req.body.favorite_event_status;
var updated_favorite_event;
if(favorite_event_status == 0 ) { updated_favorite_event = 1; }
if(favorite_event_status == 1 ) { updated_favorite_event = 0; }

var sales_query = "UPDATE events SET favorite_event = "+updated_favorite_event+" where id = " + req.body.event_id ;
console.log('sales_query ' , sales_query) ;
 connection.query( sales_query , function(err, result) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result, code: 200 , updated_favorite_event : updated_favorite_event });
    });
}


