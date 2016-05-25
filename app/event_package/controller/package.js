/**/
var moment       = require('moment-timezone');
// exports.savePackage = function(req,res) {
  
//     var data=req.body;
//     var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
//     var eventId=null;
//      data.created = new Date();
//      var query1="INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+data.content+"')";
//      connection.query(query1,function(err,result){
//         eventId=result.insertId;
//         var query2="INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`) VALUES(NULL,'"+result.insertId+"','"+data.eventdate+"','"+data.startevent_time+"','"+data.endevent_time+"')";
//      connection.query(query2);
     
//       var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+curtime+"', '', '', '', '', '', '', '', '', '')";
    
//      /// To save Venue details
//      if (eventId != undefined)
//      {
//           connection.query(query, function(err7, results) {
//                if (err7) {
//                 res.json({error:err7,code:101});
//                }
//                res.json({result:eventId,code:200});
//           });
//      }
//      else{
//           res.json({error:"error",code:101}); 
//      }
//         });

     
// }





/** 
Method: getEvents
Description:Function to get event data  
Created : 2016-04-19
Created By: Deepak khokkar  
*/

// exports.getPricelevel=function(req,res){
//     var eventId=req.body.eventId;
//     var sql="SELECT * FROM price_levels  where event_id="+eventId;
//     connection.query(sql,function(err,result){
       
//         if (err) {
//            res.send({err:"error",code:101}); 
//         }
//            res.send({"results":result,code:200});  
        
//     });
// }
