/** 
Method: saveEvent
Description:Function to save event data for package
Created : 2016-04-19
Created By: Manoj 
*/
var moment       = require('moment-timezone');
//var showClix   = require('./../../showclix/service.js');


/** 
Method: getPackage
Description:Function to get event Package  
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.getPackage=function(req,res) {
   
    var package_id=req.body.package_id;
    var user_id=req.body.user_id;
    if(package_id!=undefined){
      //var sql="SELECT *,events.venue_id as eventvenueId,event_dates.date as eventdate FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id  LEFT JOIN venues ON events.venue_id = venues.id where events.id="+event_id;
      var sql="SELECT * from event_package where id="+package_id+" and user_id ="+user_id;
     
      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        res.send({"results":result,code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}


exports.getEventsInPackage=function(req,res) {
   
    var package_id=req.body.package_id;
    if(package_id!=undefined){
      //var sql="SELECT *,events.venue_id as eventvenueId,event_dates.date as eventdate FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id  LEFT JOIN venues ON events.venue_id = venues.id where events.id="+event_id;
      var sql="SELECT event_id from package_event_map where package_id = "+package_id;
     
      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        res.send({"results":result,code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}

exports.getBundlesInPackage=function(req,res) {
    if(req.body.package_id!=undefined){
      var sql='SELECT * from bundles where seller_id='+req.body.user_id+ ' and package_id='+ req.body.package_id +' ORDER BY created DESC';
     
      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        res.send({"results":result,code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}

exports.getProductsInPackage=function(req,res) {

	var condition = "";
    if (req.body.user_id != "" && req.body.user_id != "[]" && req.body.user_id != "undefined") {
        condition = " ep.seller_id =" + req.body.user_id;
    }

    if (req.body.package_id != "" && req.body.package_id != "[]" && req.body.package_id != "undefined") {
        condition+= " AND ep.package_id =" + req.body.package_id;
    }

 	if(req.body.eventsInPackage!= '' && req.body.eventsInPackage != undefined && req.body.eventsInPackage != "[]") {
		var strold = req.body.eventsInPackage;
        var strnew = strold.substr(1, strold.length - 2);
        condition += " OR ep.event_id IN (" + strnew + ")";
	}

    if(req.body.package_id!=undefined){

   // var sql = 'select * from event_products where ' + condition +' ORDER BY created DESC';
	  var sql = 'select ep.*, p.product_name from event_products ep LEFT JOIN products p ON ep.product_id = p.id where ' + condition +' ORDER BY created DESC';

      console.log('sql ' + sql);

      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        res.send({"results":result,code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}

exports.addBundleInPackage = function(req,res){
  console.log('in express  addBundleInPackage' );
    console.log(req.body);
    //For Step 1
    var inventory=0;
    //var event_id = req.body.event_id;
    var package_id = req.body.package_id;

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
          var query = "INSERT INTO `bundles` (`id`,`package_id`, `seller_id`, `bundle_name`, `bundle_description`, `bundle_limit`, `bundle_minimum_purchase`, `bundle_inventory`, `multiple_ticket_holder`, `hide_online`,  `assign_inventory`, `hide_in_box_office`, `created`,`status`) VALUES (NULL, '"+req.body.package_id+"' , '"+req.body.seller_id+"', '"+req.body.bundle_name+"', '"+req.body.bundle_description+"', '"+req.body.bundle_limit+"', '"+req.body.bundle_minimum_purchase+"', '"+inventory+"', "+multiple_ticket_holder+", "+hide_online+" , "+assign_inventory+" , "+hide_in_box_office+", NOW(),"+status+" )";
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
Method: getBundleProducts
Description:Function to fetch related to seller 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.getBundleProductsInPackage = function(req,res){
  //console.log('ashish'+req.body.bundleId);
  //'SELECT * from products as p LEFT JOIN bundle_qty as bq on bq.product_id=p.id and bq.bundle_id=56 where p.seller_id=127 ORDER BY created DESC'

  connection.query('SELECT p.*, bq.product_id,bq.bundle_id,bq.pricelevel_id,bq.qty from products as p LEFT JOIN bundle_qty as bq on bq.product_id=p.id and bq.bundle_id = '+req.body.bundleId+' where p.seller_id = '+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}




exports.getEventPriceLevelInPackage=function(req,res){
    console.log(req.body);
    //SELECT * FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = 56 where event_id = 1977 
    var eventId = req.body.eventId;
    if(eventId!==undefined) {
      var query = 'SELECT p.*, bq.product_id,bq.bundle_id,bq.pricelevel_id,bq.qty FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = '+req.body.bundleId+' where event_id = '+ eventId;
      console.log('getEventPriceLevelInPackage query-------------->' );
      console.log(query);

      connection.query(query, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         }
         res.json({result:results,code:200});
      });

    } else {
      res.json({result:"missing event id",code:200});
    }
}


exports.getAllEventsPriceLevelInPackage=function(req,res){
    console.log('req.body ' , req.body);
    //SELECT * FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = 56 where event_id = 1977 
    var allEventIdStr = req.body.allEventIdStr;
    var allEventIdStrNew = allEventIdStr.substr(0, allEventIdStr.length - 1);
    condition = "  event_id IN (" + allEventIdStrNew + ")";
     
    if(condition!== 'undefined' &&  condition != '' ) {
      var query = 'SELECT p.*, bq.product_id,bq.bundle_id,bq.pricelevel_id,bq.qty FROM price_levels as p LEFT JOIN bundle_qty as bq on bq.pricelevel_id = p.id and bq.bundle_id = '+req.body.bundleId+' where   '+ condition;
      console.log(query);

      connection.query(query, function(err, results) {
         if (err) {
          res.json({error:err,code:101});
         }
         res.json({result:results,code:200});
      });

    } else {
      res.json({result:"missing event id",code:200});
    }
}

/** 
Method: updateBundle
Description:Function for update the bundle for event 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.updateBundleInPackage = function(req,res){
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
Method: getAllProducts
Description:Function to fetch related to seller 
Created : 2016-04-25
Created By: Manoj kumar  
*/
exports.getAllProductsInPackage = function(req,res){
  console.log('req '+req.body.req);

  connection.query('SELECT * from products where seller_id = '+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}



/** 
Method: addEventProductInPackage
Description:Function for adding the product for package 
Created : 2016-05-25
Created By: Manoj
*/
exports.addEventProductInPackage = function(req,res){
    var inventory=0;
   // var event_id = req.body.event_id;
    var package_id = req.body.package_id;

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
        var query = "UPDATE event_products SET product_id='"+req.body.product_id+"',price='"+req.body.price+"',hide_in_box_office='"+hide_in_box_office+"',placement_listing='"+placement_listing+"',placement_confirmation='"+placement_confirmation+"' where id="+req.body.id;
    } else {
        var query = "INSERT INTO `event_products` (`id`,`package_id`, `seller_id`, `product_id`, `price`, `hide_in_box_office`, `placement_listing`, `placement_confirmation`,`created`,`status`) VALUES (NULL, '"+req.body.package_id+"' , '"+req.body.seller_id+"', '"+req.body.product_id+"', '"+req.body.price+"', '"+hide_in_box_office+"', '"+placement_listing+"', '"+placement_confirmation+"', NOW(),1 )";
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
Method: getEventProducts
Description:Function to fetch related products of event
Created : 2016-05-25
Created By: Deepak khokkar  
*/
exports.getEventProductsInPackage = function(req,res) {

  if(req.body.userId!=undefined && req.body.packageId!=undefined){
    //LEFT JOIN events AS E on E.id=QA.event_id where
    connection.query('SELECT EP.*, p.product_name from event_products as EP LEFT JOIN products AS p on p.id = EP.product_id where EP.seller_id='+req.body.userId+ ' and EP.package_id='+ req.body.packageId +' ORDER BY EP.created DESC', function(err, results) {
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
Method: postSecondStepPackageData
Description:Function to save step2 
Created : 2016-05-20
Created By: Manoj
*/
exports.postSecondStepPackageData=function(req,res)
{
   var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
   connection.query("UPDATE event_package SET `price_type`='"+req.body.price_type+"' where id="+req.body.packageId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{
     res.json({result:results,code:200});
     }
  });
}

exports.postThirdStepPackageData = function(req,res) {


console.log('req.body before ' , req.body);

 var fields = ['print_home' , 'print_enable_date' , 'print_disable_date' , 'print_description' , 'donation' , 'donation_name' , 'custom_fee' , 'custom_fee_name' , 'custom_fee_type' , 'custom_fee_amount' , 'custom_when' , 'online_service_fee' , 'box_office_service_fee' , 'ticket_note' , 'ticket_transaction_limit' , 'checkout_time_limit' , 'collect_name' , 'private_event' , 'show_seating_chart' , 'url_short_name' ]; 


console.log('fields ' , fields);

var fieldsData = '';

for (var index in fields) {
    fieldName = fields[index];

        if (req.body[fieldName] == undefined) {
            req.body[fieldName] = '';
        }
        fieldsData+= " `"+fieldName+"` = '" + req.body[fieldName]+ "', ";

    }

    console.log('fieldsData ' , fieldsData);

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    req.body.modified = curtime;

  var query = "UPDATE `event_package` SET "+ fieldsData +" `modified` = '" + req.body.modified + "' WHERE id=" + req.body.id ; 
  console.log('query', query)


   connection.query( query , function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{
     res.json({result:results,code:200});
     }
  });
   
}