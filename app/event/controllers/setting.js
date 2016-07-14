/** 
Method: 
Description:Function to save event setting data 
Created : 2016-06-14
Created By: Deepak khokkar  
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');



exports.saveSetting = function(req,res) {
  
    var data = req.body;
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var settingFields =  ['user_id','online_service_fee', 'box_office_service_fee', 'ticket_note', 'ticket_transaction_limit', 'checkout_time_limit', 'ticket_layout', 'collect_name', 'custom_fee', 'custom_fee_name', 'custom_fee_type', 'custom_fee_amount', 'custom_when', 'question_type', 'question', 'question_required', 'event_id', 'print_home', 'print_enable_date', 'print_disable_date', 'print_description', 'will_call', 'will_call_description', 'online_sales_open', 'online_sales_close', 'sales_immediatly', 'donation', 'donation_name', 'public_contact_name', 'public_contact_email', 'public_contact_phone'];

    var fieldsData = '';
    // insert into ages set `name` = 'testing name' , `age` = 26
    for (var index in settingFields) {
    settingFieldName = settingFields[index];
      if (req.body[settingFieldName] == undefined) {
        req.body[settingFieldName] = '';
      }
      fieldsData+= " `"+settingFieldName+"` = '" + req.body[settingFieldName]+ "', ";
    }

    var squery = "Select COUNT(*) AS exist from `event_settings` where event_id = "+ data.event_id;
     
    connection.query(squery, function(err8, selectResponse) {
      if(err8) {
        res.json({error:err8,code:101});
      }
      
      console.log(selectResponse[0].exist);

      if(selectResponse[0].exist > 0) {
        var uquery = "UPDATE `event_settings` SET "+ fieldsData +" `modified` = '" + curtime + "' WHERE event_id= " + data.event_id;
        connection.query(uquery, function(err, results) {
          if (err) {
            res.json({error:err,code:101});
          }
          
          // showclix start 
                var showClix2 = new showClix();
                    showClix2.single_4th_step(req.body,res,function(sdata){
                        if (sdata.status == 1) {
                         res.json({result:results,code:200}); 
                        } else {
                            res.json({result:"",error:"Server error",code:101});  
                        }
                    });
          //showclix end 
          
          
        });
      } else {
        var query = "INSERT INTO `event_settings` SET "+ fieldsData + "  `created` = '" + curtime +"' , `modified` = '" + curtime +"'";
        connection.query(query, function(err7, responce) {
          if (err7) {
            res.json({error:err7,code:101});
          }
          
          // showclix start 
                var showClix2 = new showClix();
                    showClix2.single_4th_step(req.body,res,function(sdata){
                        if (sdata.status == 1) {
                         res.json({result:responce,code:200});  
                        } else {
                            res.json({result:"",error:"Server error",code:101});  
                        }
                    });
          //showclix end  
          
          
        });
      }
    });
    
}


/** 
Method: getSettings
Description:Function for fetching settings 
Created : 2016-06-17
Created By: Deepak khokkar  
*/
exports.getSettings = function(req,res) {
  if(req.body.eventId!=undefined) {
    connection.query('SELECT * from event_settings where user_id='+req.body.userId+ ' and event_id='+ req.body.eventId +' ORDER BY created DESC', function(err, results) {
      if (err) {
        res.json({error:err,code:101});
      }
      res.json({result:results,code:200});
    });  
  } else {
    res.json({result:{},code:200});
  }
}


