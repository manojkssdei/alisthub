exports.getVenue = function(req,res){
    //console.log(req.body.userId);
    
     connection.query('SELECT * from venues where seller_id='+req.body.userId, function(err, results) {
   if (err) {
    res.json(err);
   }
   res.json(results);
});
   
}