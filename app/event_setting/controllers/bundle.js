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
    var inventory=0,hide_in_box_office,status,hide_online;
    var event_id = req.body.event_id;

    if (req.body.step == 1) {
      if (req.body.assign_inventory==true) {
        inventory=req.body.bundle_inventory;
      }
      hide_in_box_office=req.body.hide_in_box_office;
      if ((req.body.hide_in_box_office==false)||(req.body.hide_in_box_office==undefined)) {
        hide_in_box_office=0;
      }
      if ((req.body.status==true)||(req.body.status==undefined)) {
        status=1;
      } else {
        status=0;
      }
      if ((req.body.hide_online==true)||(req.body.hide_online==undefined)) {
        hide_online=1;
      } else {
        hide_online=0;
      }
      
      if(req.body.id!=undefined){
          var query = "UPDATE bundles SET bundle_name='"+req.body.bundle_name+"',bundle_description='"+req.body.bundle_description+"' where id="+req.body.id;
      } else {
          var query = "INSERT INTO `bundles` (`id`,`event_id`, `seller_id`, `bundle_name`, `bundle_description`, `bundle_limit`, `bundle_minimum_purchase`, `bundle_inventory`, `multiple_ticket_holder`, `hide_online`,  `assign_inventory`, `hide_in_box_office`, `created`,`status`) VALUES (NULL, '"+req.body.event_id+"' , '"+req.body.seller_id+"', '"+req.body.bundle_name+"', '"+req.body.bundle_description+"', '"+req.body.bundle_limit+"', '"+req.body.bundle_minimum_purchase+"', '"+inventory+"', "+req.body.multiple_ticket_holder+", "+hide_online+" , "+req.body.assign_inventory+" , "+hide_in_box_office+", NOW(),"+status+" )";
      }

      
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
    
    var parsedJson = JSON.stringify(req.body.product_json);
    connection.query("UPDATE bundles SET product_json='"+parsedJson+"' where id="+req.body.bundle_id, function(err, results) {
       if (err) {
        res.json({error:err,code:101});
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
  connection.query('SELECT * from bundles where seller_id='+req.body.userId+ ' and event_id='+ req.body.eventId +' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
  
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
  connection.query("UPDATE bundles SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
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


