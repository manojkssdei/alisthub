var moment       = require('moment-timezone');
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

/*** Add Discount Coupon ***/
exports.addDiscount = function(req,res){
          


          /*for(var index in req.body) { 
          if(req.body[index] == undefined){
            req.body[index] = '';
            }
          }

          if(req.body.coupon_code == undefined) {
            req.body.coupon_code = '';
          }

          if(req.body.amount_type == undefined) {
            req.body.amount_type = '';
          }

          */

        if(req.body.amount<0 ) {
          req.body.amount = Math.abs(req.body.amount);
        }

        if(req.body.amount_target<0 ) {
          req.body.amount_target = Math.abs(req.body.amount_target);
        }

        function checkUnique(postData) {
           if(postData.coupon_type != "Automatic") {
                  var mysql_query = 'SELECT count(*) as count from discounts where seller_id = "'+postData.seller_id+'" and coupon_code= "'+ postData.coupon_code +'"';
                    connection.query(mysql_query, function(err, results) {
                     if (err) {
                       console.log('err' , err);
                     }
                    var count = results[0].count;
                    console.log('count',count);
                    if(count > 0 ) {
                      return 1; // error exist
                    }
                  });
                }
                else{
                  return 0;
                }
        }

        function checkPercentage(postData) {
          if((postData.coupon_type == "Automatic" || postData.coupon_type == "Discount" ) && postData.amount_type == "Percentage" && postData.amount>100 ) {
              return 1; // error exist
          }
          else{
            return 0;
          }
        }

         var errorMsg = [];

                  var checkPercentage = checkPercentage(req.body);
                  var checkUnique = checkUnique(req.body);
                  if(checkUnique ||  checkPercentage ) {
                    if(checkPercentage) {
                      errorMsg.push('Percentage must fall between 0 and 100');
                      console.log('errorMsg' , errorMsg );
                    }

                    if(checkUnique) {
                      errorMsg.push('Coupons codes must be unique.');
                      console.log('errorMsg' , errorMsg );
                    }

                      if(errorMsg.length > 0) {
                        console.log('errorMsg' , errorMsg );
                        res.json({error: errorMsg ,code:101}); 
                      }
                      else {
                        console.log('add values to db');
                      }
                  }
                  


                

                

               

              /*  if(errorMsg.length > 0) {
                  console.log('------3--------' , errorMsg.length );
                  console.log('errorMsg' , errorMsg );
                     res.json({error: errorMsg ,code:101}); 
                }
                else {
                 console.log('add values to db');
         if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `discounts` SET seller_id="+req.body.seller_id+", coupon_type='"+req.body.coupon_type+"', coupon_name='"+req.body.coupon_name+"', coupon_code='"+req.body.coupon_code+"' , amount_type='"+req.body.amount_type+"' , amount='"+req.body.amount+"' , amount_target='"+req.body.amount_target+"' , assigned_to='"+req.body.assigned_to+"' , created='"+req.body.created+"' where id="+req.body.id;
          }
          else if(req.body.coupon_type == "Discount")
          {
                var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , '"+req.body.amount_type+"' , '"+req.body.amount+"' , NULL , now())";
          }      
          else if(req.body.coupon_type == "Automatic")
          {
                  var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `amount_type`, `amount`, `amount_target`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.amount_type+"' , '"+req.body.amount+"' , '"+req.body.amount_target+"' , NULL , now())";
          }
          else {
                  var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , NULL , now())";
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
          } */

            
                  
          
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

/*** makeDiscountAssignment Discount   ***/
exports.makeDiscountAssignment = function(req,res){
    console.log(req.body.userId)
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var query_value = "";
    req.body.created = curtime;
    console.log(req.body);
    
    for(var key in req.body.discount) {
     console.log(key);
                    if (req.body.discount[key] != null && req.body.discount[key] != "" && req.body.discount[key] != "undefined") {
                         for(var ekey in req.body.events) {
                               console.log(ekey);
                    if (req.body.events[ekey] != null && req.body.events[ekey] != "" && req.body.events[ekey] != "undefined") {
                         query_value += "(NULL, '"+req.body.seller_id+"', '"+req.body.events[ekey]+"', '"+req.body.discount[key]+"', '"+req.body.created+"'),";
                    }
                         }
                    
                    }
    }
     if (query_value != "") {
               query_value = query_value.substr(0, query_value.length-1);
     }
    var query_option = "INSERT INTO `discount_assignments` (`id`, `seller_id`, `event_id`, `discount_id`, `created`) VALUES "+query_value;
   console.log(query_option); 
   connection.query(query_option, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/// Delete discount assignment

exports.delAssignment = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from discount_assignments where discount_id="+req.body.discount_id+ " and event_id="+req.body.event_id , function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}
