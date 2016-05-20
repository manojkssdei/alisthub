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
  var sql="SELECT events.id, events.title, events.sub_title, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.user_id="+user_id;

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
    if (data.id!=undefined) {
       var query = "UPDATE `price_levels` SET `event_id`='"+data.eventId+"',`user_id`='"+data.userId+"',`price_level_name`='"+data.price_level+"',`price_level_name`='"+data.price_level+"',`price_level_type`='"+data.price_type+"',`min_price`='"+parseFloat(data.minimum_price)+"',`suggested_price`='"+parseFloat(data.suggested_price)+"',`online_price`='"+parseFloat(data.online_price)+"',`box_office_price`='"+parseFloat(data.box_office_price)+"',`quantity_available`='"+parseFloat(data.quantity_available)+"',`hide_online`='"+data.hide_online+"',`hide_in_box_office`='"+data.hide_in_box_office+"',`min_per_order`='"+data.minimum_per_order+"', `max_per_order`='"+data.maximum_per_order+"',`created_at`='"+curtime+"',`description`='"+data.description+"' where `id`='"+data.id+"'";
    connection.query(query,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
    }); 
    }else{
    if (data.price_level!=undefined) {
    var query = "INSERT INTO `price_levels` (`id`, `event_id`, `user_id`, `price_level_name`, `price_level_type`, `min_price`, `suggested_price`, `online_price`, `box_office_price`, `quantity_available`, `hide_online`, `hide_in_box_office`, `min_per_order`, `max_per_order`, `created_at`,`description`) VALUES (NULL, '"+data.eventId+"', '"+data.userId+"', '"+data.price_level+"', '"+data.price_type+"', '"+parseFloat(data.minimum_price)+"', '"+parseFloat(data.suggested_price)+"', '"+parseFloat(data.online_price)+"', '"+parseFloat(data.box_office_price)+"', '"+parseFloat(data.quantity_available)+"', '"+data.hide_online+"', '"+data.hide_in_box_office+"', '"+data.minimum_per_order+"', '"+data.maximum_per_order+"', '"+curtime+"','"+data.description+"')";
    connection.query(query,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
    });
   }
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