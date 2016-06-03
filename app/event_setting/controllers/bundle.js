/** 
Controller for the vanue managment page 
Created : 2016-04-25
Created By: Manoj kumar  
Module : manage bundle 
*/

/** 
Method: addBundle
Description:Function for adding the bundle for user 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.addBundle = function(req,res){
    console.log(req.body);
    //For Step 1
    var inventory=0;
    var event_id = req.body.event_id;

    if (req.body.step == 1) {
      if (req.body.assign_inventory == true) {
        inventory=req.body.bundle_inventory;
      }

      var multiple_ticket_holder = 'false';
      if(req.body.multiple_ticket_holder == true) {
        multiple_ticket_holder = 'true';
      }
      
      var assign_inventory = 'false';
      if (req.body.assign_inventory == true) {
        assign_inventory = 'true';
      } 

      var hide_in_box_office = 'false';
      if ((req.body.hide_in_box_office == true)) {
        hide_in_box_office='true';
      }

      var status = 'false';
      if ((req.body.status==true)) {
        status='true';
      } 

      var hide_online = 'false';
      if ((req.body.hide_online==true)) {
        hide_online = 'true';
      } 
      
      if(req.body.id!=undefined && req.body.id!=''){
          var query = "UPDATE bundles SET bundle_name='"+req.body.bundle_name+"',bundle_description='"+req.body.bundle_description+"',bundle_limit='"+req.body.bundle_limit+"',bundle_minimum_purchase='"+req.body.bundle_minimum_purchase+"',bundle_inventory='"+inventory+"',multiple_ticket_holder='"+multiple_ticket_holder+"',hide_online='"+hide_online+"',assign_inventory='"+assign_inventory+"',hide_in_box_office='"+hide_in_box_office+"',status='"+status+"' where id="+req.body.id;
      } else {
          var query = "INSERT INTO `bundles` (`id`,`event_id`, `seller_id`, `bundle_name`, `bundle_description`, `bundle_limit`, `bundle_minimum_purchase`, `bundle_inventory`, `multiple_ticket_holder`, `hide_online`,  `assign_inventory`, `hide_in_box_office`, `created`,`status`) VALUES (NULL, '"+req.body.event_id+"' , '"+req.body.seller_id+"', '"+req.body.bundle_name+"', '"+req.body.bundle_description+"', '"+req.body.bundle_limit+"', '"+req.body.bundle_minimum_purchase+"', '"+inventory+"', "+multiple_ticket_holder+", "+hide_online+" , "+assign_inventory+" , "+hide_in_box_office+", NOW(),"+status+" )";
      }

      //console.log(query);
    }
   
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
Method: updateBundle
Description:Function for update the bundle for event 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.updateBundle = function(req,res){
    //console.log(req.body.price_level);
    var query_value = "";
    var query_value_price = "";

    connection.query("UPDATE bundles SET total_qty='"+req.body.totalQty+"',total_online='"+req.body.totalOnline+"',total_boxoffice='"+req.body.totalBoxoffice+"' where id="+req.body.id, function(err, results) {
       if (err) {
        res.json({error:err,code:101});
       }

        var bundleDeleteId=req.body.bundleDeleteId;
        var sql="Delete FROM bundle_qty where bundle_id="+req.body.id;
        connection.query(sql,function(err,result){ });

        //Product list entry
        var productList1 = req.body.productList;
        if(productList1.length > 0){
          for(i=0; i < productList1.length; i++ ) {
            if (productList1[i].qty != null && productList1[i].qty != "" && productList1[i].qty != "undefined") {
              query_value += "(NULL, '"+req.body.id+"',NULL, '"+productList1[i].id+"', '"+productList1[i].qty+"'),";
            }
          }
          if (query_value != "") {
            query_value = query_value.substr(0, query_value.length-1);
            var query_option = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value;
            console.log(query_option);
            connection.query(query_option, function(err8, res) { });
          }  
        }

        //price level tickets entry
        var price_level1 = req.body.price_level;
        if(price_level1.length > 0){
          for(i=0; i < price_level1.length; i++ ) {
            if (price_level1[i].qty != null && price_level1[i].qty != "" && price_level1[i].qty != "undefined") {
              query_value_price += "(NULL, '"+req.body.id+"', '"+price_level1[i].id+"',NULL, '"+price_level1[i].qty+"'),";
            }
          }
          if (query_value_price != "") {
            query_value_price = query_value_price.substr(0, query_value_price.length-1);
            var query_option_price = "INSERT INTO `bundle_qty` (`id`, `bundle_id`, `pricelevel_id`, `product_id`,`qty`) VALUES " + query_value_price;
            console.log(query_option_price);
            connection.query(query_option_price, function(err8, res) { });
          }  
        }
        

        res.json({result:results,code:200});
    });
}


/** 
Method: getBundle
Description:Function for fetching bundle data 
Created : 2016-04-26
Created By: Manoj kumar  
*/
exports.getBundles = function(req,res){
  if(req.body.eventId!=undefined){
    connection.query('SELECT * from bundles where seller_id='+req.body.userId+ ' and event_id='+ req.body.eventId +' ORDER BY created DESC', function(err, results) {
      if (err) {
        res.json({error:err,code:101});
      }
      res.json({result:results,code:200});
    });  
  } else {
    res.json({result:{},code:200});
  }
  
  
}

/** 
Method: getBundleDetail
Description: get bundle detail 
Created : 2016-04-26
Created By: Manoj kumar  
*/
exports.getBundleDetail = function(req,res){
  connection.query('SELECT * from bundles where seller_id='+req.body.userId+ ' and id='+ req.body.editBundleId +' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
  
}

/** 
Method: changeBundleStatus
Description:Function to change status of the bundle 
Created : 2016-05-18
Created By: Deepak khokkar
*/
exports.changeBundleStatus = function(req,res) { 
  if(req.body.status=='true') {
    var status = 'false';
  } else {
    var status = 'true';
  }
  console.log(status);
  connection.query("UPDATE bundles SET status='"+status+"' where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: removeBundle
Description:Function to change status of the bundle 
Created : 2016-05-18
Created By: Deepak khokkar
*/
exports.removeBundle=function(req,res){
    var bundleDeleteId=req.body.bundleDeleteId;
    var sql="Delete FROM bundles where id="+bundleDeleteId;
    
    connection.query(sql,function(err,result){
       
        if (err) {
           res.send({err:"error",code:101}); 
        }
           res.send({"message":"success",code:200});  
        
    });
}


/** 
Method: getAllProducts
Description:Function to fetch related to seller 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.getAllProducts = function(req,res){
  //console.log('ashish'+req.body.bundleId);
  //'SELECT * from products as p LEFT JOIN bundle_qty as bq on bq.product_id=p.id and bq.bundle_id=56 where p.seller_id=127 ORDER BY created DESC'

  connection.query('SELECT * from products where seller_id = '+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}


/** 
Method: getProducts
Description:Function to fetch related to seller 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.getProducts = function(req,res){
  //console.log('ashish'+req.body.bundleId);
  //'SELECT * from products as p LEFT JOIN bundle_qty as bq on bq.product_id=p.id and bq.bundle_id=56 where p.seller_id=127 ORDER BY created DESC'

  connection.query('SELECT p.*, bq.product_id,bq.bundle_id,bq.pricelevel_id,bq.qty from products as p LEFT JOIN bundle_qty as bq on bq.product_id=p.id and bq.bundle_id = '+req.body.bundleId+' where p.seller_id = '+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}


exports.getEventPriceLevel=function(req,res){
    console.log(req.body);
    //SELECT * FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = 56 where event_id = 1977 
    var eventId = req.body.eventId;
    if(eventId!=undefined) {
      connection.query('SELECT p.*, bq.product_id,bq.bundle_id,bq.pricelevel_id,bq.qty FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = '+ req.body.bundleId +' where event_id = '+ eventId, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         }
         res.json({result:results,code:200});
      });

    } else {
      res.json({result:results,code:200});
    }
}