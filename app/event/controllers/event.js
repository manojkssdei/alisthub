exports.saveEvent = function(req,res){
    var data=req.body;
     data.created = new Date();
    var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.userId+"', '"+data.venuetype+"', '"+data.venuename+"', '"+data.address+"', '"+data.city+"', '"+data.zipcode+"', '"+data.state+"', '"+data.country+"', '1', '"+data.latitude+"', '"+data.longitude+"', '"+data.created+"', '', '', '', '', '', '', '', '', '')";
    
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