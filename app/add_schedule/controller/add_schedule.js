var moment       = require('moment-timezone');
exports.add_schedule = function(req,res) {
  
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




exports.saverecurringschedule=function(req,res){
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

