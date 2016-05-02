exports.saveEvent = function(req,res){
    var data=req.body;
   
     data.created = new Date();
     var query1="INSERT INTO `events`(`id`,`user_id`,`title`,`start_date`,`description`) VALUES(NULL,'"+data.userId+"','"+data.eventname+"','"+data.eventdate+"','"+data.content+"')";
     connection.query(query1,function(err,result){

        var query2="INSERT INTO `event_dates`(`id`,`event_id`,`date`,`start_time`,`end_time`) VALUES(NULL,'"+result.insertId+"','"+data.eventdate+"','"+data.startevent_time+"','"+data.endevent_time+"')";
     connection.query(query2);
        });
     
     
    var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+data.created+"', '', '', '', '', '', '', '', '', '')";
    
     /// To save Venue details
     if (query != "")
     {
          connection.query(query, function(err7, results) {
               if (err7) {
                res.json({error:err7,code:101});
               }
               res.json({result:results,code:200});
          });
     }
     else{
          res.json({error:"error",code:101}); 
     }
}