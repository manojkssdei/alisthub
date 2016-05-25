/** 
Controller for the product managment  
Created : 2016-04-28
Created By: Manoj kumar  
Module : manage product 
*/

var fs         = require('fs');
var moment     = require('moment-timezone');
var path_product = process.cwd()+'/public/images/products/';

/** 
Method: getProducts
Description:Function to fetch related to seller 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.getProducts = function(req,res){
  connection.query('SELECT * from products where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: addProduct
Description:Function to add the product  
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.addProduct = function(req,res) {
     var photoname1 = photoname2 = photoname3 = photoname4 = photoname5 = "";
     /// validation start
     var validation = true;
          if (req.body.step == 1) {
            req.body.product_model  = req.body.product_model == 'undefined' || req.body.product_model == undefined?"":req.body.product_model;
            req.body.product_upc    = req.body.product_upc == 'undefined' || req.body.product_upc == undefined?"":req.body.product_upc;
            req.body.product_weight = req.body.product_weight == 'undefined' || req.body.product_weight == undefined?"":req.body.product_weight;
            req.body.description    = req.body.description == 'undefined' || req.body.description == undefined?"":req.body.description;
            req.body.status         = req.body.status == 'undefined' || req.body.status == undefined?"":req.body.status;
            req.body.shippable      = req.body.shippable == 'undefined' || req.body.shippable == undefined?"":req.body.shippable;
            if (req.body.product_name == 'undefined' || req.body.product_name == '' || req.body.product_name == null) {
                 var validation = false;
            }
          }
          
          if (req.body.step == 2) {
                          
            req.body.ship_cost   = req.body.ship_cost == 'undefined' || req.body.ship_cost == undefined?"":req.body.ship_cost;
            req.body.service_fee = req.body.service_fee == 'undefined' || req.body.service_fee == undefined?"":req.body.service_fee;
            req.body.taxable     = req.body.taxable == 'undefined' || req.body.taxable == undefined?"":req.body.taxable;
            req.body.buyer_pays  = req.body.buyer_pays == 'undefined' || req.body.buyer_pays == undefined?"":req.body.buyer_pays;
            req.body.seller_pays = req.body.seller_pays == 'undefined' || req.body.seller_pays == undefined?"":req.body.seller_pays;
            
            if (req.body.retail_price == 'undefined' || req.body.retail_price == '' || req.body.retail_price == null)
            {
                 var validation = false;
            } 
          }
          
          if (req.body.step == 3 || req.body.step == 4) {
            if(req.body.configuration == 0) {
               if (req.body.pre_sale_limit == 'undefined' || req.body.pre_sale_limit == '' || req.body.pre_sale_limit == null) {
                 var validation = false;
               }
               if (req.body.print_voucher == 'undefined' || req.body.print_voucher == '' || req.body.print_voucher == null)    {
                 var validation = false;
               }
               if (req.body.inventory == 'undefined' || req.body.inventory == '' || req.body.inventory == null)             {
                 var validation = false;
               }
            }
            
            if(req.body.configuration == 1) {
                req.body.display_name        = req.body.display_name == 'undefined' || req.body.display_name == undefined?"":req.body.display_name;
                req.body.purchsable_ticket   = req.body.purchsable_ticket == 'undefined' || req.body.purchsable_ticket == undefined?"":req.body.purchsable_ticket;
            }
          }
             
          /// validation end 
     
     
     
          if (req.body.step == 1) {
                 
            if (req.body.imgdata_1 && req.body.imgdata_1 != "" && req.body.imgdata_1 != undefined)
            {
                 var photoname1 = req.body.seller_id+'_product1_'+Date.now() + '.jpg';
                 var imagename = path_product+'/'+photoname1;
                 var base64Data = req.body.imgdata_1.replace(/^data:image\/jpeg;base64,/, "");
                 
                 fs.writeFile(imagename, base64Data, 'base64', function(err) {
                 if (err) {
                  console.log("Image Failure Upload");
                 }
                  console.log("Chart Upload");
                 });
                 
                 req.body.image_1 = photoname1;
            }
            
            if (req.body.imgdata_2 && req.body.imgdata_2 != "" && req.body.imgdata_2 != undefined)
            {
                 var photoname2 = req.body.seller_id+'_product2_'+Date.now() + '.jpg';
                 var imagename = path_product+'/'+photoname2;
                 var base64Data = req.body.imgdata_2.replace(/^data:image\/jpeg;base64,/, "");
                 
                 fs.writeFile(imagename, base64Data, 'base64', function(err) {
                 if (err) {
                  console.log("Image Failure Upload");
                 }
                  console.log("Chart Upload");
                 });
                 
                 req.body.image_2 = photoname2;
            }
            
             if (req.body.imgdata_3 && req.body.imgdata_3 != "" && req.body.imgdata_3 != undefined)
            {
                 var photoname3 = req.body.seller_id+'_product3_'+Date.now() + '.jpg';
                 var imagename = path_product+'/'+photoname3;
                 var base64Data = req.body.imgdata_3.replace(/^data:image\/jpeg;base64,/, "");
                 
                 fs.writeFile(imagename, base64Data, 'base64', function(err) {
                 if (err) {
                  console.log("Image Failure Upload");
                 }
                  console.log("Chart Upload");
                 });
                 
                 req.body.image_3 = photoname3;
            }
            
            if (req.body.imgdata_4 && req.body.imgdata_4 != "" && req.body.imgdata_4 != undefined)
            {
                 var photoname4 = req.body.seller_id+'_product4_'+Date.now() + '.jpg';
                 var imagename = path_product+'/'+photoname4;
                 var base64Data = req.body.imgdata_4.replace(/^data:image\/jpeg;base64,/, "");
                 
                 fs.writeFile(imagename, base64Data, 'base64', function(err) {
                 if (err) {
                  console.log("Image Failure Upload");
                 }
                  console.log("Chart Upload");
                 });
                 
                 req.body.image_4 = photoname4;
            }
       
            if (req.body.imgdata_5 && req.body.imgdata_5 != "" && req.body.imgdata_5 != undefined)
            {
                 var photoname5 = req.body.seller_id+'_product5_'+Date.now() + '.jpg';
                 var imagename = path_product+'/'+photoname5;
                 var base64Data = req.body.imgdata_5.replace(/^data:image\/jpeg;base64,/, "");
                 
                 fs.writeFile(imagename, base64Data, 'base64', function(err) {
                 if (err) {
                  console.log("Image Failure Upload");
                 }
                  console.log("Chart Upload");
                 });
                 
                 req.body.image_5 = photoname5;
            }
          }
          
          if (req.body.id && req.body.id !="" && req.body.id != undefined && req.body.step == 1) {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.modified = curtime;
            
            var query = "UPDATE `products` SET seller_id="+req.body.seller_id+", product_name='"+req.body.product_name+"', product_model='"+req.body.product_model+"', product_upc='"+req.body.product_upc+"', product_weight='"+req.body.product_weight+"', description='"+req.body.description+"', status='"+req.body.status+"', shippable='"+req.body.shippable+"', image_1='"+req.body.image_1+"', image_2='"+req.body.image_2+"', image_3='"+req.body.image_3+"', image_4='"+req.body.image_4+"', image_5='"+req.body.image_5+"', modified='"+req.body.modified+"' where id="+req.body.id;
                   
          } else {
          // Step 1:
          if (req.body.step == 1) {            
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.created = curtime;
            
            var query = "INSERT INTO `products` (`id`, `seller_id`, `product_name`, `product_model`, `product_upc`, `product_weight`, `description`, `status`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `shippable`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.product_name+"', '"+req.body.product_model+"', '"+req.body.product_upc+"', '"+req.body.product_weight+"', '"+req.body.description+"', '"+req.body.status+"', '"+req.body.image_1+"', '"+req.body.image_2+"', '"+req.body.image_3+"', '"+req.body.image_4+"', '"+req.body.image_5+"', '"+req.body.shippable+"', '"+req.body.created+"')";   
          }
         
          // Step 2:
          if (req.body.step == 2) {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.modified = curtime;     
            var query = "UPDATE `products` SET retail_price="+req.body.retail_price+", ship_cost='"+req.body.ship_cost+"', service_fee='"+req.body.service_fee+"', taxable='"+req.body.taxable+"', buyer_pays='"+req.body.buyer_pays+"', seller_pays='"+req.body.seller_pays+"', modified='"+req.body.modified+"' where id="+req.body.id;
          }
          
          // Step 3:
          if (req.body.step == 3 || req.body.step == 4) {
               
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.modified = curtime;
            
            if(req.body.configuration == 0) {
              var query = "UPDATE `products` SET configuration="+req.body.configuration+", inventory='"+req.body.inventory+"', pre_sale_limit='"+req.body.pre_sale_limit+"', print_voucher='"+req.body.print_voucher+"', modified='"+req.body.modified+"' where id="+req.body.id;
            } else  {
                // start configuration 
              var query = "UPDATE `products` SET configuration="+req.body.configuration+", display_name='"+req.body.display_name+"', purchsable_ticket='"+req.body.purchsable_ticket+"', modified='"+req.body.modified+"' where id="+req.body.id;
              /// save product step 3 info
              var options = req.body.component;
              
              if (req.body.id && req.body.id !="" && req.body.id != undefined) {
                var product_id = req.body.id;
                var query_delete = "DELETE FROM `product_components` where product_id="+product_id;
                connection.query(query_delete, function(err9, res) {
                });
              }
             
              var query_value = "";
              for(var key in options) {
                if (options[key] != null && options[key] != "" && options[key] != "undefined") {
                     options[key].active = options[key].active == true ? 1:0;
                     options[key].print_voucher = options[key].print_voucher == true ? 1:0;
                     query_value += "(NULL, '"+req.body.id+"', '"+options[key].active+"', '"+options[key].sku+"', '"+options[key].internal_name+"', '"+options[key].display_name+"', '"+options[key].description+"', '"+options[key].print_voucher+"', '"+options[key].pre_sale_limit+"', '"+options[key].inventory+"', '"+curtime+"'),";
                }
              }
              
              if (query_value != "") {
                   query_value = query_value.substr(0, query_value.length-1);
                   var query_option = "INSERT INTO `product_components` (`id`, `product_id`, `active`, `sku`, `internal_name`, `display_name`, `description`, `print_voucher`, `pre_sale_limit`, `inventory`, `created`) VALUES "+query_value;
                   connection.query(query_option, function(err88, res88) {
                   });
              }
            }
            // end configuartion end
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
}

/** 
Method: productOverview
Description:Function make product overview
Created : 2016-04-27
Created By: Manoj kumar  
*/
exports.productOverview = function(req,res) {
    connection.query('SELECT * from products where id='+req.body.id, function(err, results) {
      if (err) {
        res.json({error:err,code:101});
      }
      connection.query('SELECT * from  product_components where product_id='+req.body.id, function(err4, cresults) {
       res.json({result:results,component:cresults,code:200});
       })
    });
}

/** 
Method: productUpload
Description:Function to upload product
Created : 2016-04-27
Created By: Manoj kumar  
*/
exports.productUpload = function(req,res) {
   console.log(req.body);
   res.json({result:req.body.id,code:200});
}

/** 
Method: changeProductStatus
Description:Function to change product status
Created : 2016-04-27
Created By: Manoj kumar  
*/
exports.changeProductStatus = function(req,res){
    //console.log(req.body.userId);
   connection.query("UPDATE products SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/** 
Method: deleteProduct
Description:Function to delete product 
Created : 2016-04-27
Created By: Manoj kumar  
*/
exports.deleteProduct = function(req,res) {
  connection.query("Delete from products where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: saveProductSettingFunc
Description:Function to save the product settings 
Created : 2016-04-29
Created By: Manoj kumar  
*/
exports.saveProductSettingFunc = function(req,res) {
  if (req.body.id) {
      var saveProductSettin = "UPDATE `product_settings` SET tax_rate="+req.body.tax_rate+", flat_fee='"+req.body.flat_fee+"', service_fee='"+req.body.service_fee+"', description='"+req.body.description+"' where id="+req.body.id;
  } else {
    var saveProductSettin="INSERT INTO `product_settings` (`id`, `seller_id`, `tax_rate`, `flat_fee`, `service_fee`, `description`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.taxRate+"', '"+req.body.erviceFlatFree+"', '"+req.body.serviceFeeCovered+"', '"+req.body.description+"')";
  }
  
  connection.query(saveProductSettin, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}


/** 
Method: getProductSetting
Description:Function to get the product settings 
Created : 2016-04-29
Created By: Manoj kumar  
*/ 
exports.getProductSetting = function(req,res){
  var saveProductSettin="Select * from product_settings where seller_id="+req.body.seller_id;   
  connection.query(saveProductSettin, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: exportProductSales
Description:Function to export the product sales 
Created : 2016-05-16
Created By: Manoj kumar  Singh
*/ 
exports.exportProductSales = function(req,res){
  res.csv([
        ["order_id", "product_name", "product_model", "UPC", "UPC_name", "UPC_display", "SKU", "SKU_name", "SKU_display", "sale_send_date", "cost", "tax", "shipping_fee", "fulfiller_fee", "buyer_fee", "seller_fee", "shipping_name", "shipping_address", "shipping_address_2", "shipping_city", "shipping_state", "shipping_zip", "shipping_country", "purchase_for", "email", "billing_address", "billing_address_2", "billing_city", "billing_state", "billing_zip", "billing_country", "event", "event_start", "legacy_sale_id"]
     ]);
}

exports.exportProductSalesQuery = function(req,res){
query = connection.query('select * from products', function(err, rows, fields) {
                if (err) {
                    res.send(err);
                }
                var headers = {};
                for (key in rows[0]) {
                    headers[key] = key;
                }
                rows.unshift(headers);
                res.csv(rows);
        });
}



/** 
Method: addEventProduct
Description:Function for adding the product for events 
Created : 2016-05-25
Created By: Deepak khokkar
*/
exports.addEventProduct = function(req,res){
    console.log(req.body);
    //For Step 1
    var inventory=0;
    var event_id = req.body.event_id;

    var hide_in_box_office = 0;
    if ((req.body.hide_in_box_office == true)) {
      hide_in_box_office = 1;
    }

    var placement_listing = 0;
    if ((req.body.placement_listing == true)) {
      placement_listing = 1;
    }

    var placement_confirmation = 0;
    if ((req.body.placement_confirmation == true)) {
      placement_confirmation = 1;
    }

      
    if(req.body.id!=undefined && req.body.id!=''){
        var query = "UPDATE event_products SET price='"+req.body.price+"',hide_in_box_office='"+hide_in_box_office+"',placement_listing='"+req.body.placement_listing+"',placement_confirmation='"+req.body.placement_confirmation+"' where id="+req.body.id;
    } else {
        var query = "INSERT INTO `event_products` (`id`,`event_id`, `seller_id`, `product_id`, `price`, `hide_in_box_office`, `placement_listing`, `placement_confirmation`,`created`,`status`) VALUES (NULL, '"+req.body.event_id+"' , '"+req.body.seller_id+"', '"+req.body.product_id+"', '"+req.body.price+"', '"+hide_in_box_office+"', '"+placement_listing+"', '"+placement_confirmation+"', NOW(),1 )";
    }

    console.log(query);
   
    if (query != "") {
      connection.query(query, function(err7, results) {
        if (err7) {
          res.json({error:err7,code:101});
        }
        res.json({result:results,code:200 });
      });
    }
}

/** 
Method: getEventProducts
Description:Function to fetch related products of event
Created : 2016-05-25
Created By: Deepak khokkar  
*/
exports.getEventProducts = function(req,res){
  console.log(req.body);
  
  if(req.body.userId!=undefined && req.body.eventId!=undefined){
    //LEFT JOIN events AS E on E.id=QA.event_id where
    connection.query('SELECT * from event_products where seller_id='+req.body.userId+ ' and event_id='+ req.body.eventId +' ORDER BY created DESC', function(err, results) {
       if (err) {
        res.json({error:err,code:101});
       }
       res.json({result:results,code:200});
    });  
  } else {
    res.json({result:{},code:200});
  }
  
}