/** 
Controller for the discount managment 
Created : 2016-05-07
Created By: Manoj kumar  
Module : Discount Module  
*/
var moment       = require('moment-timezone');


/** 
Method: getDiscounts
Description:Function for getting the discount for the user 
Created : 2016-05-07
Created By: Manoj kumar  
*/
exports.getDiscounts = function(req,res){
  connection.query('SELECT * from discounts where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

/** 
Method: checkUniqueDiscount
Description:Function for checking the unique discount coupon for the user 
Created : 2016-05-12
Created By: Manoj kumar  
*/
exports.checkUniqueDiscount = function(req,res) {
    var count =0;
    var mysql_query = '';
    if(req.body.id != undefined) {
mysql_query = 'SELECT count(*) as count from discounts where id!= "'+req.body.id+ '" && seller_id = "'+req.body.seller_id+'" and coupon_code= "'+ req.body.coupon_code +'"';
    }
    else {
mysql_query = 'SELECT count(*) as count from discounts where seller_id = "'+req.body.seller_id+'" and coupon_code= "'+ req.body.coupon_code +'"';
    }
    console.log('mysql_query ' , mysql_query);
      connection.query(mysql_query, function(err, results) {  
      if(err) {
        res.json({error:err,code:101});
      } 
    if(results) {
      count = results[0].count;
      if(count > 0 ) 
        res.json({error:'Coupons codes must be unique.',code:101});
        else 
       res.json({success: 'Coupon Available' ,  code:200});
    }
    });
}

/** 
Method: addDiscount
Description:Function for adding the discount for the user 
Created : 2016-05-07
Created By: Manoj kumar  
*/
exports.addDiscount = function(req,res) { 

    for(var index in req.body) { 
      if(req.body[index] == undefined) {
        req.body[index] = '';
      }
    }

    if(req.body.coupon_code == undefined) {
      req.body.coupon_code = '';
    }

    if(req.body.amount_type == undefined) {
      req.body.amount_type = '';
    }

        if(req.body.amount<0 ) {
          req.body.amount = Math.abs(req.body.amount);
        }

        if(req.body.amount_target<0 ) {
          req.body.amount_target = Math.abs(req.body.amount_target);
        }

         var errorMsg = [];
                 if((req.body.coupon_type == "Automatic" || req.body.coupon_type == "Discount" ) && req.body.amount_type == "Percentage" && req.body.amount>100 ) {
                      console.log('Percentage error');
                      errorMsg.push('Percentage must fall between 0 and 100');
                      console.log('errorMsg' , errorMsg );
                }
                      if(errorMsg.length > 0) {
                        console.log('errorMsg' , errorMsg );
                        res.json({error: errorMsg ,code:101}); 
                      }
                      else {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.created = curtime;

                        if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var query = "UPDATE `discounts` SET seller_id="+req.body.seller_id+", coupon_type='"+req.body.coupon_type+"', coupon_name='"+req.body.coupon_name+"', coupon_code='"+req.body.coupon_code+"' , amount_type='"+req.body.amount_type+"' , amount='"+req.body.amount+"' , amount_target='"+req.body.amount_target+"' , assigned_to='"+req.body.assigned_to+"' , created='"+req.body.created+"' where id="+req.body.id;
          }
          else if(req.body.coupon_type == "Discount")
          {
                var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , '"+req.body.amount_type+"' , '"+req.body.amount+"' , NULL , '"+req.body.created+"')";
          }      
          else if(req.body.coupon_type == "Automatic")
          {
                  var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `amount_type`, `amount`, `amount_target`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.amount_type+"' , '"+req.body.amount+"' , '"+req.body.amount_target+"' , NULL , '"+req.body.created+"' )";
          }
          else {
                  var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , NULL , '"+req.body.created+"' )";
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
                      }
                  
                  

            
                  
  
}

/** 
Method: discountOverview
Description:Function for fetching discount data 
Created : 2016-05-08
Created By: Manoj kumar  
*/
exports.discountOverview = function(req,res) {
  connection.query('SELECT * from discounts where id='+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

   

/** 
Method: changeDiscountStatus
Description:Function to change the discount status 
Created : 2016-05-08
Created By: Manoj kumar  
*/
exports.changeDiscountStatus = function(req,res) {
  connection.query("UPDATE discounts SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });

}

/** 
Method: deleteDiscount
Description:Function to delete the discount entry 
Created : 2016-05-08
Created By: Manoj kumar  
*/
exports.deleteDiscount = function(req,res) {
  connection.query("Delete from discounts where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
  });
}

/** 
Method: assignDiscount
Description:Function to assign the discount to event 
Created : 2016-05-08
Created By: Manoj kumar  
*/
exports.assignDiscount = function(req,res) {
  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;

  if (req.body.id && req.body.id !="" && req.body.id != undefined) {
    var query = "UPDATE `discounts` SET seller_id="+req.body.seller_id+", coupon_type='"+req.body.coupon_type+"', coupon_name='"+req.body.coupon_name+"', coupon_code='"+req.body.coupon_code+"' , amount_type='"+req.body.amount_type+"' , amount='"+req.body.amount+"' , assigned_to='"+req.body.assigned_to+"' , created='"+req.body.created+"' where id="+req.body.id;
  } else {
    var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.coupon_type+"', '"+req.body.coupon_name+"', '"+req.body.coupon_code+"' , '"+req.body.amount_type+"' , '"+req.body.amount+"' , NULL , '"+req.body.created+"' )";
  }
  
  if (query != "") {
      console.log(query);
      connection.query(query, function(err7, results) {
           if (err7) {
            res.json({error:err7,code:101});
           }
           res.json({result:results,code:200});
      });
  } else {
      res.json({error:"error",code:101}); 
  }
}

/** 
Method: makeDiscountAssignment
Description:Function to assign discount to seller for an event  
Created : 2016-05-10
Created By: Manoj kumar  
*/
exports.makeDiscountAssignment = function(req,res) {
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

/** 
Method: delAssignment
Description:Function to delete assignment for event  
Created : 2016-05-10
Created By: Manoj kumar  
*/
exports.delAssignment = function(req,res){
  connection.query("Delete from discount_assignments where discount_id="+req.body.discount_id+ " and event_id="+req.body.event_id , function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}
