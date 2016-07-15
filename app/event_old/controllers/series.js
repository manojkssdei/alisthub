/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-04-19
Created By: Manoj Kumar Singh 
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');

/** 
Method: saverecurringEvent
Description:Function to save event recurring data  
Created : 2016-06-16
Created By: Manoj Kumar Singh
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
       data.start_date = data.date_time_series[0].from;
       var length = data.date_time_series.length;
       data.end_date   = data.date_time_series[length-1].from;
       console.log(length+":::::::"+data.end_date);
       
       if (!data.repeat_every) {  data.repeat_every  = ""; }
       if (!data.monthly_option) {  data.monthly_option  = ""; }
       if (!data.monthly_week_value) {  data.monthly_week_value  = ""; }
       if (!data.monthly_day_value) {  data.monthly_day_value  = ""; }
       
       // For update parent event
       if(data.event_id && data.event_id != null && data.event_id !== undefined)
       {      
        var save_query = "UPDATE `events` SET user_id='"+data.userId+"',title='"+data.eventname+"',start_date='"+data.start_date+"',recurring_or_not='1',recurring_type='"+data.period+"',description='"+data.content+"',event_steps='1',end_date='"+data.end_date+"',venue_id='"+data.venue_id+"',repeat_every='"+data.repeat_every+"',monthly_option='"+data.monthly_option+"',monthly_week_value='"+data.monthly_week_value+"',monthly_day_value='"+data.monthly_day_value+"',event_domain='"+data.eventurl+"',created='"+curtime+"' where id="+data.event_id;
        rollback_events(data.event_id,1);
       }
       else // For Insert parent event
       {
        var save_query = "INSERT INTO `events` (`id`, `user_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `repeat_every`, `monthly_option`, `monthly_week_value`, `monthly_day_value`, `event_domain`, `created`) VALUES (NULL, '"+data.userId+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+data.content+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+data.repeat_every+"', '"+data.monthly_option+"', '"+data.monthly_week_value+"', '"+data.monthly_day_value+"', '"+data.eventurl+"', '"+curtime+"')";
        /*var showClix2 = new showClix();
                  showClix2.add_series_event(data,res,function(data){
                    if (data.status == 1) {
                      //res.json({result:results,showclix:data.location,code:200});
                    } else {                     
                    }
        });*/
       }
        // Save Parent Event
        connection.query(save_query,function(perr,presult){
            
            if(data.event_id && data.event_id != null && data.event_id !== undefined)
            {
                var parent_id = data.event_id;
            }
            else{
                var parent_id = presult.insertId;
                               
                var __dir = './public/preview_template/'+data.userId;
                if (!fs.existsSync(__dir)){
                    fs.mkdirSync(__dir);
                }
                  var __dir1 = './public/preview_template/'+data.userId+'/'+parent_id;
                if (!fs.existsSync(__dir1)){
                    fs.mkdirSync(__dir1);
                }
                fs.openSync(__dir1 + "/index.html", 'w');
                 fs.createReadStream("./public/preview_template/look-n-feel-design-preview.html").pipe(fs.createWriteStream(__dir1 + "/index.html"));
                 
            }
            
            if (parent_id != null && parent_id !== undefined) {
                var date_array = data.date_time_series;
                
                /// Save Child events
                date_array.forEach(function(date_arr){
                
                var child_save_query = "INSERT INTO `events` (`id`, `user_id`, `parent_id`, `title`, `start_date`, `recurring_or_not`, `recurring_type`, `description`, `event_steps`, `end_date`, `venue_id`, `repeat_every`, `monthly_option`, `monthly_week_value`, `monthly_day_value`, `event_domain`, `created`) VALUES (NULL, '"+data.userId+"', '"+parent_id+"', '"+data.eventname+"', '"+data.start_date+"', '1', '"+ data.period+"', '"+data.content+"', '1', '"+data.end_date+"', '"+data.venue_id+"', '"+data.repeat_every+"', '"+data.monthly_option+"', '"+data.monthly_week_value+"', '"+data.monthly_day_value+"', '"+data.eventurl+"', '"+curtime+"')";
                console.log(child_save_query);
                
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
   if(data.eventname !== undefined && data.eventurl !== undefined && data.eventtype !== undefined && data.date_time_series !== undefined && data.userId !== undefined){
    var query = "";
    console.log("000000");
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


exports.saveseriespricelevel=function(req,res){
    function remove_level(id)
    {
        var qu = "Delete from price_levels where parent_id="+id;
        connection.query(qu,function(err,result){
        });
        
    }
    
    var data=req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    // Case : For series event
     if (data.id!=undefined) {
            var query = "UPDATE `price_levels` SET `event_id`='"+data.eventId+"',`user_id`='"+data.userId+"',`price_level_name`='"+data.price_level+"',`price_level_name`='"+data.price_level+"',`price_level_type`='"+data.price_type+"',`min_price`='"+parseFloat(data.minimum_price)+"',`suggested_price`='"+parseFloat(data.suggested_price)+"',`online_price`='"+parseFloat(data.online_price)+"',`box_office_price`='"+parseFloat(data.box_office_price)+"',`quantity_available`='"+parseFloat(data.quantity_available)+"',`hide_online`='"+data.hide_online+"',`hide_in_box_office`='"+data.hide_in_box_office+"',`min_per_order`='"+data.minimum_per_order+"', `max_per_order`='"+data.maximum_per_order+"',`created_at`='"+curtime+"',`description`='"+data.description+"' where `id`='"+data.id+"'";
        remove_level(data.id);
        var parent_id = data.id;
        }else{
            if (data.price_level!=undefined) {
            var query = "INSERT INTO `price_levels` (`id`, `event_id`, `user_id`, `price_level_name`, `price_level_type`, `min_price`, `suggested_price`, `online_price`, `box_office_price`, `quantity_available`, `hide_online`, `hide_in_box_office`, `min_per_order`, `max_per_order`, `created_at`,`description`) VALUES (NULL, '"+data.eventId+"', '"+data.userId+"', '"+data.price_level+"', '"+data.price_type+"', '"+parseFloat(data.minimum_price)+"', '"+parseFloat(data.suggested_price)+"', '"+parseFloat(data.online_price)+"', '"+parseFloat(data.box_office_price)+"', '"+parseFloat(data.quantity_available)+"', '"+data.hide_online+"', '"+data.hide_in_box_office+"', '"+data.minimum_per_order+"', '"+data.maximum_per_order+"', '"+curtime+"','"+data.description+"')";
            }
        }
    
    if (query != "") {
        connection.query(query,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }else{
           /////////////////////////////////////////////////////////////////
            if (data.id != undefined) {
                var parent_id = data.id;
            }
            else{
                var parent_id = result.insertId;
            }
            var eventsquery = "select id from events where parent_id="+data.eventId;
            connection.query(eventsquery,function(verr,vresult){
            var ids = vresult;
                if (ids != null && ids !== undefined)
                {
                    ids.forEach(function(childs){
                    ////////////////////////////////////////////////
                    console.log(childs.id);
                    var child_event_id = childs.id;
                    var query_1 = "INSERT INTO `price_levels` (`id`, `event_id`, `parent_id`, `user_id`, `price_level_name`, `price_level_type`, `min_price`, `suggested_price`, `online_price`, `box_office_price`, `quantity_available`, `hide_online`, `hide_in_box_office`, `min_per_order`, `max_per_order`, `created_at`,`description`) VALUES (NULL, '"+child_event_id+"', '"+parent_id+"', '"+data.userId+"', '"+data.price_level+"', '"+data.price_type+"', '"+parseFloat(data.minimum_price)+"', '"+parseFloat(data.suggested_price)+"', '"+parseFloat(data.online_price)+"', '"+parseFloat(data.box_office_price)+"', '"+parseFloat(data.quantity_available)+"', '"+data.hide_online+"', '"+data.hide_in_box_office+"', '"+data.minimum_per_order+"', '"+data.maximum_per_order+"', '"+curtime+"','"+data.description+"')";
                    console.log(query_1);
                    connection.query(query_1,function(cerr,cresult){
                        console.log(cresult);
                    });
                    ///////////////////////////////////////////////
                    });
                    res.send({"results":"success",code:200}); 
                    
                    ///////////////////////////////////////////////////////////////////////////////////////
                }
            });
        }
           ////////////////////////////////////////////////////////////////
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

exports.removeseriespricelevel=function(req,res){
    var price_leveldelete_id=req.body.price_leveldelete_id;
    var sql="Delete FROM price_levels where id="+price_leveldelete_id+" OR parent_id="+price_leveldelete_id;
    
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
exports.changeseriesPricelevelStatus = function(req,res) { 
  connection.query("UPDATE price_levels SET is_active='"+req.body.status+"' where id="+req.body.id+" OR parent_id="+req.body.id, function(err, results) {
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
Created By: Manoj Kumar Singh
*/
exports.postseriesPriceChange = function(req,res) {
    
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
    var change_price_date = date+" "+month+":"+req.body.time+":00";
    
    var query = "UPDATE price_levels SET `new_price`='"+req.body.new_price+"',`apply_to`='"+req.body.apply+"',`price_change_datetime`='"+change_price_date+"' where id="+req.body.price_change_id+" OR parent_id="+req.body.price_change_id;
    
    
 connection.query(query, function(err, results) {
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
 
 console.log('stepOneEventPackage' , req);
 res.send({"results":'result',code:200}); 

}

/** 
Method: addBundle
Description:Function for adding the bundle for user 
Created : 2016-06-17
Created By: Manoj kumar  Singh
*/

exports.addseriesBundle = function(req,res){
    //For Step 1
    function remove_level(id)
    {
        var qu = "Delete from bundles where parent_id="+id;
        connection.query(qu,function(err,result){
        });
        
    }
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');    
    var inventory=0;
    var event_id = req.body.event_id;

    if (req.body.step == 1) {
      if (req.body.assign_inventory == true) {
        inventory=req.body.bundle_inventory;
      }

      var multiple_ticket_holder = 'false';
      if(req.body.multiple_ticket_holder == true) {
        multiple_ticket_holder = 'true';
      }
      
      var assign_inventory = 'false';
      if (req.body.assign_inventory == true) {
        assign_inventory = 'true';
      } 

      var hide_in_box_office = 'false';
      if ((req.body.hide_in_box_office == true)) {
        hide_in_box_office='true';
      }

      var status = 'false';
      if ((req.body.status==true)) {
        status='true';
      } 

      var hide_online = 'false';
      if ((req.body.hide_online==true)) {
        hide_online = 'true';
      } 
      
    if(req.body.id !== undefined && req.body.id != ''){
          var query = "UPDATE bundles SET bundle_name='"+req.body.bundle_name+"',bundle_description='"+req.body.bundle_description+"',bundle_limit='"+req.body.bundle_limit+"',bundle_minimum_purchase='"+req.body.bundle_minimum_purchase+"',bundle_inventory='"+inventory+"',multiple_ticket_holder='"+multiple_ticket_holder+"',hide_online='"+hide_online+"',assign_inventory='"+assign_inventory+"',hide_in_box_office='"+hide_in_box_office+"',status='"+status+"' where id="+req.body.id;
        remove_level(req.body.id);
        var parent_id = req.body.id;
    } else {
        
          var query = "INSERT INTO `bundles` (`id`,`event_id`, `seller_id`, `bundle_name`, `bundle_description`, `bundle_limit`, `bundle_minimum_purchase`, `bundle_inventory`, `multiple_ticket_holder`, `hide_online`,  `assign_inventory`, `hide_in_box_office`, `created`,`status`) VALUES (NULL, '"+req.body.event_id+"' , '"+req.body.seller_id+"', '"+req.body.bundle_name+"', '"+req.body.bundle_description+"', '"+req.body.bundle_limit+"', '"+req.body.bundle_minimum_purchase+"', '"+inventory+"', "+multiple_ticket_holder+", "+hide_online+" , "+assign_inventory+" , "+hide_in_box_office+", '"+curtime+"',"+status+" )";
    }
      
    }
   
    if (query != "") {
        console.log(query);
      connection.query(query, function(err7, results) {
        if (err7) {
          res.json({error:err7,code:101});
        }
        
        if (req.body.id !== undefined && req.body.id != '') {
            var parent_id = req.body.id;
        }
        else{
            var parent_id = results.insertId;
        }
        
        var eventsquery = "select id from events where parent_id="+req.body.event_id;
        connection.query(eventsquery,function(verr,vresult){
            var ids = vresult;
            if (ids != null && ids !== undefined)
            {
                    ids.forEach(function(childs){
                    ////////////////////////////////////////////////
                    console.log(childs.id);
                    var child_event_id = childs.id;
                                       
                    var query_1 = "INSERT INTO `bundles` (`id`, `event_id`, `parent_id`, `seller_id`, `bundle_name`, `bundle_description`, `bundle_limit`, `bundle_minimum_purchase`, `bundle_inventory`, `multiple_ticket_holder`,`hide_online`,`assign_inventory`,`hide_in_box_office`,`created`,`status`) VALUES (NULL, '"+child_event_id+"', '"+parent_id+"', '"+req.body.seller_id+"', '"+req.body.bundle_name+"', '"+req.body.bundle_description+"', '"+req.body.bundle_limit+"', '"+req.body.bundle_minimum_purchase+"', '"+inventory+"', "+multiple_ticket_holder+", "+hide_online+" , "+assign_inventory+" , "+hide_in_box_office+", '"+curtime+"',"+status+")";
                                       
                    console.log(query_1);
                    connection.query(query_1,function(cerr,cresult){
                        console.log(cresult);
                    });
                    ///////////////////////////////////////////////
                    });
                    res.send({"result":"success",code:200,parent_id:parent_id}); 
                    
                    ///////////////////////////////////////////////////////////////////////////////////////
            }
        });
        
        
        
      });
    }
}

/** 
Method: updateBundle
Description:Function for update the bundle for event 
Created : 2016-04-25
Created By: Manoj kumar Singh
*/
exports.updateSeriesBundle = function(req,res){
    
    function remove_level(id)
    {
        var qu = "Delete from bundle_qty where parent_id="+id;
        connection.query(qu,function(err,result){
        });
        
    }
    
    function remove_qty_level(ids)
    {
        ids.forEach(function(childs){
        var qu = "Delete from bundle_qty where id="+childs.id;
        connection.query(qu,function(err,result){
        });
        })
    }
    
    function saveChildBundelQty(req,parent)
    {
       var query_value = query_option = "";
       var query_value_price = query_option_price = ""; 
      //Product list entry
        var productList1 = req.body.productList;
        if(productList1.length > 0)
        {
            for(i=0; i < productList1.length; i++ ) {
              if (productList1[i].qty != null && productList1[i].qty != "" && productList1[i].qty != "undefined") {
                query_value += "(NULL, '"+parent+"',NULL, '"+productList1[i].id+"', '"+productList1[i].qty+"'),";              
              }
            }
          if (query_value != "") {
              query_value = query_value.substr(0, query_value.length-1);
              var query_option = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value;
              connection.query(query_option, function(err8, res) { });
          }
        }
       //price level tickets entry
        var price_level1 = req.body.price_level;
        if(price_level1.length > 0){
          for(i=0; i < price_level1.length; i++ ) {
            if (price_level1[i].qty != null && price_level1[i].qty != "" && price_level1[i].qty != "undefined") {
              query_value_price += "(NULL, '"+parent+"', '"+price_level1[i].id+"',NULL, '"+price_level1[i].qty+"'),";
            }
          }
          if (query_value_price != "") {
            query_value_price = query_value_price.substr(0, query_value_price.length-1);
            var query_option_price = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value_price;
            connection.query(query_option_price, function(err8, res) { });
          }  
        }
    }
    
    function saveChildBundel(req,parent)
    {
        var eventsquery = "select id from bundles where parent_id="+parent;
        connection.query(eventsquery,function(verr,vresult){
        var ids = vresult;
        remove_qty_level(ids);
        if (ids != null && ids !== undefined)
        {
          ids.forEach(function(childs){
                    ////////////////////////////////////////////////
            var child_bundle_id = childs.id;
            
            connection.query("UPDATE bundles SET total_qty='"+req.body.totalQty+"',total_online='"+req.body.totalOnline+"',total_boxoffice='"+req.body.totalBoxoffice+"' where id="+child_bundle_id, function(err, results) {
             
            saveChildBundelQty(req,child_bundle_id); 
             
            });
        });
        
        }
        });
    }
    
        
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    //console.log(req.body.price_level);
    var query_value = "";
    var query_value_price = "";
    var child_query_value = "";
    var child_query_value_price = "";
     
    connection.query("UPDATE bundles SET total_qty='"+req.body.totalQty+"',total_online='"+req.body.totalOnline+"',total_boxoffice='"+req.body.totalBoxoffice+"' where id="+req.body.id, function(err, results) {
       if (err) {
        res.json({error:err,code:101});
       }

        var bundleDeleteId=req.body.bundleDeleteId;
        var sql="Delete FROM bundle_qty where bundle_id="+req.body.id;
        
        connection.query(sql,function(err,result){ });
        
        saveChildBundel(req,req.body.id);
        
        //Product list entry
        var productList1 = req.body.productList;
        if(productList1.length > 0)
        {
            for(i=0; i < productList1.length; i++ ) {
              if (productList1[i].qty != null && productList1[i].qty != "" && productList1[i].qty != "undefined") {
                query_value += "(NULL, '"+req.body.id+"',NULL, '"+productList1[i].id+"', '"+productList1[i].qty+"'),";              
              }
            }
          if (query_value != "") {
              query_value = query_value.substr(0, query_value.length-1);
              var query_option = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value;
              //console.log(query_option);
              connection.query(query_option, function(err8, res) { });
          }
        }

        //price level tickets entry
        var price_level1 = req.body.price_level;
        if(price_level1.length > 0){
          for(i=0; i < price_level1.length; i++ ) {
            if (price_level1[i].qty != null && price_level1[i].qty != "" && price_level1[i].qty != "undefined") {
              query_value_price += "(NULL, '"+req.body.id+"', '"+price_level1[i].id+"',NULL, '"+price_level1[i].qty+"'),";
            }
          }
          if (query_value_price != "") {
            query_value_price = query_value_price.substr(0, query_value_price.length-1);
            var query_option_price = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value_price;
            //console.log(query_option_price);
            connection.query(query_option_price, function(err8, res) { });
          }  
        }
        
        res.json({result:results,code:200});
    });
}

// Series Product
/** 
Method: addSeriesEventProduct
Description:Function for adding the product for events 
Created : 2016-06-24
Created By: Manoj Kumar Singh
*/
exports.addSeriesEventProduct = function(req,res){
    
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    function remove_level(id)
    {
        var qu = "Delete from event_products where parent_id="+id;
        connection.query(qu,function(err,result){
        });
        
    }
    
    function saveChildProduct(req,parent,product_parent)
    {
        var eventsquery = "select id from events where parent_id="+parent;
        connection.query(eventsquery,function(verr,vresult){
        var ids = vresult;
        remove_level(product_parent);
        if (ids != null && ids !== undefined)
        {
          ids.forEach(function(childs){
                    ////////////////////////////////////////////////
            var child_bundle_id = childs.id;
            
            var query = "INSERT INTO `event_products` (`id`, `event_id`, `parent_id`, `seller_id`, `product_id`, `price`, `hide_in_box_office`, `placement_listing`, `placement_confirmation`, `status`, `created`) VALUES (NULL, '"+child_bundle_id+"', '"+product_parent+"', '"+req.body.seller_id+"', '"+req.body.product_id+"', '"+req.body.price+"', '"+req.body.hide_in_box_office+"', '"+req.body.placement_listing+"', '"+req.body.placement_confirmation+"', '"+curtime+"', 1)";
            
          //  var query = "INSERT INTO `event_products` ('id', 'event_id', 'parent_id', 'seller_id', 'product_id', 'price', 'hide_in_box_office', 'placement_listing', 'placement_confirmation','created','status') VALUES (NULL, '"+child_bundle_id+"', '"+product_parent+"' , '"+req.body.seller_id+"', '"+req.body.product_id+"', '"+req.body.price+"', '"+hide_in_box_office+"', '"+placement_listing+"', '"+placement_confirmation+"', '"+curtime+"',1)";
            
            console.log(query);
            console.log("==============================");
            connection.query(query, function(err, results) {
            
            console.log(results);
             
            });
        });
        
        }
        });
    }
    
    var inventory=0;
    var event_id = req.body.event_id;

    var hide_in_box_office = 0;
    if ((req.body.hide_in_box_office == true)) {
      hide_in_box_office = 1;
    }

    var placement_listing = 0;
    if ((req.body.placement_listing == true)) {
      placement_listing = 1;
    }

    var placement_confirmation = 0;
    if ((req.body.placement_confirmation == true)) {
      placement_confirmation = 1;
    }

      
    if(req.body.id!=undefined && req.body.id!=''){
        var query = "UPDATE event_products SET product_id='"+req.body.product_id+"',price='"+req.body.price+"',hide_in_box_office='"+hide_in_box_office+"',placement_listing='"+placement_listing+"',placement_confirmation='"+placement_confirmation+"' where id="+req.body.id;
      
    } else {
        var query = "INSERT INTO `event_products` (`id`,`event_id`, `seller_id`, `product_id`, `price`, `hide_in_box_office`, `placement_listing`, `placement_confirmation`,`created`,`status`) VALUES (NULL, '"+req.body.event_id+"' , '"+req.body.seller_id+"', '"+req.body.product_id+"', '"+req.body.price+"', '"+hide_in_box_office+"', '"+placement_listing+"', '"+placement_confirmation+"', '"+curtime+"',1 )";
        
    }

    if (query != "") {
      connection.query(query, function(err7, results) {
        if (err7) {
          res.json({error:err7,code:101});
        }
         var parent_id = req.body.event_id;
         
        if (req.body.id !== undefined && req.body.id != '') {
            
            saveChildProduct(req,parent_id,req.body.id);
        }
        else{
            var product_parent = results.insertId;
            saveChildProduct(req,parent_id,product_parent);
        }
                
        res.json({result:results,code:200 });
      });
    }
}

/** 
Method: saveSeriessecondstepdata
Description:Function to save step2 
Created : 2016-05-20
Created By: Manoj Kumar Singh  
*/
exports.savesecondSeriesstepdata=function(req,res)
{
 var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
 
 function saveChildProduct(req,parent)
 {
        var eventsquery = "select id from events where parent_id="+parent;
        connection.query(eventsquery,function(verr,vresult){
        var ids = vresult;
        if (ids != null && ids !== undefined)
        {
          ids.forEach(function(childs){
                    ////////////////////////////////////////////////
            var child_id = childs.id;
            
            if (req.body.category1!==undefined) {
                var $sql1="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+child_id+"', '"+req.body.category1+"','"+curtime+"')";
              connection.query($sql1,function(err,res){
                });
             }
             if (req.body.category2!==undefined) {
                var $sql2="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+child_id+"', '"+req.body.category2+"','"+curtime+"')";
              connection.query($sql2,function(err,res){
                });
             }
             if (req.body.category3!==undefined) {
                var $sql3="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+child_id+"', '"+req.body.category3+"','"+curtime+"')";
              connection.query($sql3,function(err,res){
                });
             }
            
            
            var query = "UPDATE events SET `website_url`='"+req.body.eventwebsite+"',`keyword`='"+req.body.keyword+"',`inventory`='"+req.body.eventinventory+"',`facebook_url`='"+req.body.facebook+"',`twitter_url`='"+req.body.twitter+"',`video`='"+req.body.video+"',`type_of_event`='"+req.body.type_of_event+"',`custom_ages`='"+req.body.custom_ages+"',`price_type`='"+req.body.price+"' where id="+child_id;
            connection.query(query, function(err, results) { });
        });
        
        }
        });
  }
 
    
 if (req.body.category1!==undefined) {
    var $sql1="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category1+"','"+curtime+"')";
  connection.query($sql1,function(err,res){
    });
 }
 if (req.body.category2!==undefined) {
    var $sql2="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category2+"','"+curtime+"')";
  connection.query($sql2,function(err,res){
    });
 }
 if (req.body.category3!==undefined) {
    var $sql3="INSERT INTO `event_categories` (`id`, `event_id`, `category_id`, `created`) VALUES (NULL, '"+req.body.eventId+"', '"+req.body.category3+"','"+curtime+"')";
  connection.query($sql3,function(err,res){
    });
 }
  
  
   connection.query("UPDATE events SET `website_url`='"+req.body.eventwebsite+"',`keyword`='"+req.body.keyword+"',`inventory`='"+req.body.eventinventory+"',`facebook_url`='"+req.body.facebook+"',`twitter_url`='"+req.body.twitter+"',`video`='"+req.body.video+"',`type_of_event`='"+req.body.type_of_event+"',`custom_ages`='"+req.body.custom_ages+"',`price_type`='"+req.body.price+"' where id="+req.body.eventId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{
     saveChildProduct(req,req.body.eventId)    
     res.json({result:results,code:200});
     }
  });
}

/** Save Series event step -4 Data
Created : 2016-06-24
By : Manoj Kumar Singh
**/
exports.saveSeriesSetting = function(req,res) {
    
    var data = req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    var settingFields =  ['user_id','online_service_fee', 'box_office_service_fee', 'ticket_note', 'ticket_transaction_limit', 'checkout_time_limit', 'ticket_layout', 'collect_name', 'custom_fee', 'custom_fee_name', 'custom_fee_type', 'custom_fee_amount', 'custom_when', 'question_type', 'question', 'question_required', 'print_home', 'print_enable_date', 'print_disable_date', 'print_description', 'will_call', 'will_call_description', 'online_sales_open', 'online_sales_close', 'sales_immediatly', 'donation', 'donation_name', 'public_contact_name', 'public_contact_email', 'public_contact_phone'];
    
    var fieldsData = '';
    // insert into ages set `name` = 'testing name' , `age` = 26
    for (var index in settingFields) {
    settingFieldName = settingFields[index];
      if (req.body[settingFieldName] == undefined) {
        req.body[settingFieldName] = '';
      }
      fieldsData+= " `"+settingFieldName+"` = '" + req.body[settingFieldName]+ "', ";
    }
    
    
    
    function saveChildProduct(req,parent)
    {
        var eventsquery = "select id from events where parent_id="+parent;
        connection.query(eventsquery,function(verr,vresult){
           
        var ids = vresult;
        if (ids != null && ids !== undefined)
        {
            ids.forEach(function(childs){
                    ////////////////////////////////////////////////
            var child_id = childs.id;
            
            var squery = "Select COUNT(*) AS exist from `event_settings` where event_id = "+ child_id;
            
            connection.query(squery, function(err8, selectResponse) {
              
              console.log(selectResponse[0].exist);
        
              if(selectResponse[0].exist > 0) {
                var uquery = "UPDATE `event_settings` SET "+ fieldsData +"  `event_id` = '" + child_id + "' ,`parent_id` = '" + parent + "',`modified` = '" + curtime + "' WHERE event_id= " + child_id;
                connection.query(uquery, function(err, results) {
                  
                });
              } else {
                var query = "INSERT INTO `event_settings` SET "+ fieldsData + "  `event_id` = '" + child_id + "' ,`parent_id` = '" + parent + "',`created` = '" + curtime +"' , `modified` = '" + curtime +"'";
               
                connection.query(query, function(err7, responce) {
                                 
                });
              }
            });
            
            
        })
    
    }
        })
    }
       
    
    var squery = "Select COUNT(*) AS exist from `event_settings` where event_id = "+ data.event_id;
     
    connection.query(squery, function(err8, selectResponse) {
      if(err8) {
        res.json({error:err8,code:101});
      }
      
      console.log(selectResponse[0].exist);
      
      saveChildProduct(req,data.event_id);
      
      if(selectResponse[0].exist > 0) {
        var uquery = "UPDATE `event_settings` SET "+ fieldsData +"  `modified` = '" + curtime + "' WHERE event_id= " + data.event_id;
        connection.query(uquery, function(err, results) {
          if (err) {
            res.json({error:err,code:101});
          }
          res.json({result:results,code:200});
        });
      } else {
        var query = "INSERT INTO `event_settings` SET "+ fieldsData + " `event_id` = '" + data.event_id + "', `created` = '" + curtime +"' , `modified` = '" + curtime +"'";
        connection.query(query, function(err7, responce) {
          if (err7) {
            res.json({error:err7,code:101});
          }
          res.json({result:responce,code:200});
        });
      }
      
    });
    
}

/** 
Method: removeSeriesEventProduct
Description:Function to remove the event product entry 
Created : 2016-06-27
Created By: Manoj Kumar Singh
*/
exports.removeSeriesEventProduct=function(req,res){
    
    function remove_level(id)
    {
        var qu = "Delete from event_products where parent_id="+id;
        console.log(qu);
        connection.query(qu,function(err,result){
        });
        
    }
    
    var eventProductDeleteId=req.body.eventProductDeleteId;
    var sql="Delete FROM event_products where id="+eventProductDeleteId;
    
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
        remove_level(eventProductDeleteId);
        res.send({"message":"success",code:200});  
        
    });
}


exports.pauseSalesSeries= function(req, res) {
var sales_query = "UPDATE events SET pause_sales = 1 where id = " + req.body.event_id ;
var sales_query_child = "UPDATE events SET pause_sales = 1 where parent_id = " + req.body.event_id ;

console.log('sales_query -----------' , sales_query) ;
console.log('sales_query_child ----------' , sales_query_child) ;

 connection.query(sales_query, function(err1, result1) {
   if (err1) {
            res.json({ error: err1, code: 101 });
        }
   connection.query( sales_query_child , function(err, result) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result, code: 200 });
    });
 });
}


exports.addFavouriteEventSeries= function(req, res) {

var sales_query = "UPDATE events SET favorite_event = 1 where id = " + req.body.event_id ;
var sales_query_child = "UPDATE events SET favorite_event = 1 where parent_id = " + req.body.event_id ;

console.log('sales_query -----------' , sales_query) ;
console.log('sales_query_child ----------' , sales_query_child) ;

 connection.query(sales_query, function(err1, result1) {
   if (err1) {
            res.json({ error: err1, code: 101 });
        }
   connection.query( sales_query_child , function(err, result) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result, code: 200 });
    });
 });

}



exports.delEventSeries= function(req, res) {


var sales_query1 = "Delete from events where id=" + req.body.event_id;
var sales_query2 = "Delete from event_dates where event_id=" + req.body.event_id;
var sales_query3 = "Delete from event_categories where event_id=" + req.body.event_id;


//var sales_query_child = "UPDATE events SET favorite_event = 1 where parent_id = " + req.body.event_id ;

console.log('sales_query1 -----------' , sales_query1) ;
console.log('sales_query2 -----------' , sales_query1) ;
console.log('sales_query3 -----------' , sales_query1) ;

console.log('*********************** IMPORTANT : TAKE CARE TO REMOVE THE CHILD OF PARENT TOO **********************')
//console.log('sales_query_child ----------' , sales_query_child) ;

 connection.query( sales_query1 , function(err, result1) {
 connection.query( sales_query2 , function(err, result2) {
 connection.query( sales_query3 , function(err, result3) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: result3, code: 200 });
    });
  });
  });
}



exports.addEmailReportSeries = function(req,res){
    
    console.log(req.body);

    if(req.body.id != '' && req.body.id != undefined) {
      console.log('------------EDIT  addEmailReportSeries ------------');
      var sql = "UPDATE email_reports SET email_address = '"+req.body.email_address+"' , timezone_name = '"+req.body.timezone_name+"' , send_time = '"+req.body.send_time+"' , export_format = '"+req.body.export_format+"' WHERE id = "+req.body.id+" and  user_id = "+req.body.user_id+" and event_id=" +req.body.eventId ;
    }
    else {
      console.log('----------add addEmailReportSeries ----------------');
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

exports.getEmailReportSeries = function(req,res) {
    
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

exports.getEmailReportByIdSeries = function(req,res) {
    
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


exports.editEmailReportSeries = function(req,res){
    
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


exports.deleteEmailReportByIdSeries = function(req,res) {
    
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

exports.assignEmailTemplateSeries=function(req,res) {
  var eventId = req.body.eventId;
  var template_id = req.body.template_id;

  var sql = "UPDATE events SET template_id = "+template_id+ " where id = "+eventId ;
  var sql_child = "UPDATE events SET template_id = "+template_id+ " where parent_id = "+eventId ;
  
    console.log('sql ' , sql );
    
  connection.query(sql,function(err1,result1) {
      if (err1) {
        res.send({err:err1,code:101}); 
      }
    connection.query(sql_child,function(err2,result2) {
        if (err2) {
          res.send({err:err2,code:101}); 
        }
        res.send({"results":result2,code:200});  
      });
  });
}


exports.getEmailTemplateOfEventSeries=function(req,res) {
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


