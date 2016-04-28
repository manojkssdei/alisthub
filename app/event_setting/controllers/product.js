/*** Get Seller Venues ***/
exports.getProducts = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from products where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Add Seller Venue ***/
exports.addProduct = function(req,res){
     console.log(req.body);
     ///////////////////////////////////////////////////////////
          if (req.body.id && req.body.id !="" && req.body.id != undefined && req.body.step == 1) {
               
          var query = "UPDATE `products` SET seller_id="+req.body.seller_id+", product_name='"+req.body.product_name+"', product_model='"+req.body.product_model+"', product_upc='"+req.body.product_upc+"', product_weight='"+req.body.product_weight+"', description='"+req.body.description+"', status='"+req.body.status+"', shippable='"+req.body.shippable+"', created='"+req.body.created+"' where id="+req.body.id;
                 
          }
          else
          {
          // Step 1:
          if (req.body.step == 1) {
            var query = "INSERT INTO `products` (`id`, `seller_id`, `product_name`, `product_model`, `product_upc`, `product_weight`, `description`, `status`, `shippable`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.product_name+"', '"+req.body.product_model+"', '"+req.body.product_upc+"', '"+req.body.product_weight+"', '"+req.body.description+"', '"+req.body.status+"', '"+req.body.shippable+"', '"+req.body.created+"')";   
          }
         
          
          // Step 2:
          if (req.body.step == 2) {
          var query = "UPDATE `products` SET retail_price="+req.body.retail_price+", ship_cost='"+req.body.ship_cost+"', service_fee='"+req.body.service_fee+"', taxable='"+req.body.taxable+"', buyer_pays='"+req.body.buyer_pays+"', seller_pays='"+req.body.seller_pays+"', created='"+req.body.created+"' where id="+req.body.id;
          }
          
          // Step 3:
          if (req.body.step == 3) {
               
          var query = "UPDATE `products` SET configuration="+req.body.configuration+", display_name='"+req.body.display_name+"', purchsable_ticket='"+req.body.purchsable_ticket+"', created='"+req.body.created+"' where id="+req.body.id;
          
          /// save product step 3 info
          var component = req.body.component;
          
          var query_com = "INSERT INTO `product_components` (`id`, `product_id`, `active`, `sku`, `internal_name`, `display_name`, `description`, `print_voucher`, `pre_sale_limit`, `inventory`, `created`) VALUES (NULL, '"+req.body.id+"', '"+req.body.active+"', '"+req.body.sku+"', '"+req.body.internal_name+"', '"+req.body.display_name+"', '"+req.body.description+"', '"+req.body.print_voucher+"', '"+req.body.pre_sale_limit+"', '"+req.body.inventory+"', '"+req.body.created+"')";
          connection.query(query_com, function(err8, resdata) {
          });
          
          }
          
                    
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
     //res.json({result:334,code:200,id:1});
}

exports.productOverview = function(req,res){
    //console.log(req.body.userId);
   connection.query('SELECT * from products where id='+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Venue Overview***/
exports.productUpload = function(req,res){
   console.log(req.body);
    //console.log(req.files);
   res.json({result:req.body.id,code:200});
  
}

/*** Change Venue Status***/
exports.changeProductStatus = function(req,res){
    //console.log(req.body.userId);
   connection.query("UPDATE products SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/*** Delete Venue   ***/
exports.deleteProduct = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from products where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}
