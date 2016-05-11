var moment     = require('moment-timezone');

/*** Get Seller Venues ***/
exports.getUser = function(req,res){

     connection.query('SELECT * from seller_users where seller_id='+req.body.seller_id+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

exports.userOverview = function(req,res){
     connection.query('SELECT * from seller_users where id='+req.body.id+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }

   res.json({result:results,code:200});
});
   
}

/*** Add Seller User ***/
exports.addUser = function(req,res)
{


          //   if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          //   var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
          //   req.body.created = curtime;
          //      var query = "UPDATE `products` SET seller_id="+req.body.seller_id+", product_name='"+req.body.product_name+"', product_model='"+req.body.product_model+"', product_upc='"+req.body.product_upc+"', product_weight='"+req.body.product_weight+"', description='"+req.body.description+"', status='"+req.body.status+"', shippable='"+req.body.shippable+"', image_1='"+req.body.image_1+"', image_2='"+req.body.image_2+"', image_3='"+req.body.image_3+"', image_4='"+req.body.image_4+"', image_5='"+req.body.image_5+"', modified='"+req.body.modified+"' where id="+req.body.id;
                 
          // }
          
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.created = curtime;
            var query = "INSERT INTO `seller_users` (`id`, `seller_id`, `first_name`, `last_name`, `phone`, `fax`, `email`, `password`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.first_name+"', '"+req.body.last_name+"', '"+req.body.contact+"', '"+req.body.fax+"', '"+req.body.email+"', '"+req.body.password+"', '"+req.body.created+"')";   

          
          if (query != "") {
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

// exports.productOverview = function(req,res){
//     //console.log(req.body.userId);
//    connection.query('SELECT * from products where id='+req.body.id, function(err, results) {
//    if (err) {
//     res.json({error:err,code:101});
//    }
//    res.json({result:results,code:200});
// });
   
// }

// /*** Venue Overview***/
// exports.productUpload = function(req,res){
//    console.log(req.body);
//     //console.log(req.files);
//    res.json({result:req.body.id,code:200});
  
// }

// /*** Change Venue Status***/
// exports.changeProductStatus = function(req,res){
//     //console.log(req.body.userId);
//    connection.query("UPDATE products SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
//    if (err) {
//     res.json({error:err,code:101});
//    }
//    res.json({result:results,code:200});
// });
   
// }

// /*** Delete Venue   ***/
// exports.deleteProduct = function(req,res){
//     //console.log(req.body.userId);
//     console.log('where id '+req.body.id)
//    connection.query("Delete from products where id="+req.body.id, function(err, results) {
//    if (err) {
//     res.json({error:err,code:101});
//    }
//    res.json({result:results,code:200});
// });
   
// }


// exports.saveProductSettingFunc = function(req,res){
//  console.log(req.body);
//   var saveProductSettin="INSERT INTO `product_settings` (`id`, `seller_id`, `tax_rate`, `flat_fee`, `service_fee`, `description`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.taxRate+"', '"+req.body.erviceFlatFree+"', '"+req.body.serviceFeeCovered+"', '"+req.body.description+"')";   
//    connection.query(saveProductSettin, function(err, results) {
//    if (err) {
//     res.json({error:err,code:101});
//    }
//    res.json({result:results,code:200});
// });
//  }
