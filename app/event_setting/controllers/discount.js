/*** Get Seller Venues ***/
exports.getDiscounts = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from discounts where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Add Seller Venue ***/
exports.addDiscount = function(req,res){
     
     ///////////////////////////////////////////////////////////
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `discounts` SET seller_id="+req.body.seller_id+", coupon_type='"+req.body.coupon_type+"', coupon_name='"+req.body.coupon_name+"', coupon_code='"+req.body.coupon_code+"' , amount_type='"+req.body.amount_type+"' , amount='"+req.body.amount+"' , assigned_to='"+req.body.assigned_to+"' , created='"+req.body.created+"' where id="+req.body.id;
          }
          else
          {
          var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , '"+req.body.amount_type+"' , '"+req.body.amount+"' , NULL , now())";
          }
          //console.log('query is :' , query);
          
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
exports.discountOverview = function(req,res){
    //console.log(req.body.userId);
   connection.query('SELECT * from discounts where id='+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Change Venue Status***/
exports.changeDiscountStatus = function(req,res){
    //console.log(req.body.userId);
   connection.query("UPDATE discounts SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Delete Venue   ***/
exports.deleteDiscount = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from discounts where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}


//assign discount to event

exports.assignDiscount = function(req,res){
     
     ///////////////////////////////////////////////////////////
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `discounts` SET seller_id="+req.body.seller_id+", coupon_type='"+req.body.coupon_type+"', coupon_name='"+req.body.coupon_name+"', coupon_code='"+req.body.coupon_code+"' , amount_type='"+req.body.amount_type+"' , amount='"+req.body.amount+"' , assigned_to='"+req.body.assigned_to+"' , created='"+req.body.created+"' where id="+req.body.id;
          }
          else
          {
          var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , '"+req.body.amount_type+"' , '"+req.body.amount+"' , NULL , now())";
          }
          //console.log('query is :' , query);
          
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