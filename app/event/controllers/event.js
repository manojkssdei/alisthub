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

exports.saverecurringEvent=function(req,res){
   var dates=req.body.date;
   
     var data=req.body.data;
  

 
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
    
    var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+parseInt(data.zipcode)+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+data.created+"', '', '', '', '', '', '', '', '', '')";
    
    if (dates != "")
     {
          res.json({result:"results",code:200}); 
     }
     else{
          res.json({error:"error",code:101}); 
     }
    
}

exports.getEvents=function(req,res){
    var user_id=req.body.user_id;
    var sql="SELECT events.id, events.title, events.sub_title FROM events where events.user_id="+user_id;
//alert(sql);
   //console.log(sql); 

    connection.query(sql,function(err,result){
      // console.log(result);
        if (err) {
           res.send({err:"error",code:sql}); 
        }
           res.send({"results":result,code:200});  
        
    });
}

exports.getEvent=function(req,res){
    var event_id=req.body.event_id;
    var sql="SELECT * FROM events LEFT JOIN event_dates ON events.id=event_dates.event_id where events.id="+event_id;
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"results":result,code:200});  
        
    });
}
