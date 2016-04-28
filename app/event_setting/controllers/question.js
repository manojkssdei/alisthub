/*** Get Seller Venues ***/
exports.getQuestions = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from questions where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Add Seller Venue ***/
exports.addQuestion = function(req,res){
     
     ///////////////////////////////////////////////////////////
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `questions` SET seller_id="+req.body.seller_id+", question_type='"+req.body.question_type+"', question_name='"+req.body.question_name+"', created='"+req.body.created+"' where id="+req.body.id;
          }
          else
          {
          var query = "INSERT INTO `questions` (`id`, `seller_id`, `question_type`, `question_name`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.question_type+"', '"+req.body.question_name+"', '"+req.body.created+"')";
          }
          
          if (query != "") {
              console.log(query);
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
          
     /////////////////////////////////////////////////////////// 
     //res.json({result:"00000",code:200});
   
}

/*** Venue Overview***/
exports.questionOverview = function(req,res){
    //console.log(req.body.userId);
   connection.query('SELECT * from questions where id='+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Change Venue Status***/
exports.changeQuestionStatus = function(req,res){
    //console.log(req.body.userId);
   connection.query("UPDATE questions SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Delete Venue   ***/
exports.deleteQuestion = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from questions where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}
