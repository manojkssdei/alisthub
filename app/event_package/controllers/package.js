/** 
Method: saveEvent
Description:Function to save event data for package
Created : 2016-04-19
Created By: Manoj 
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/service.js');
var showClixPackage   = require('./../../showclix/showclix_package.js');

var fs         = require('fs');
var moment     = require('moment-timezone');
var path_event = process.cwd()+'/public/images/events';

exports.stepOneEventPackage = function(req,res) {

   if (req.body.imageData && req.body.imageData != "" && req.body.imageData != undefined) {

        var path_event = process.cwd()+'/public/images/events';
        var user_id = req.body.user_id;
        var photoname = user_id+'_image_'+Date.now() + '.jpg';
        var imagename = path_event+'/'+photoname;
        var base64Data = req.body.imageData.replace(/^data:image\/jpeg;base64,/, "");
        
        fs.writeFile(imagename, base64Data, 'base64', function(err) {
        if (err) {
         console.log("Image Failure Upload");
        }
        });
    req.body.image = photoname ;
}

// var fields = ['package_name', 'package_description', 'online_sales_open_date', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_date', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', 'category', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];
 var fields = ['package_name', 'package_description', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', 'category', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];

    var fieldsData = '';
    for (var index in fields) {
        fieldName = fields[index];
        if (req.body[fieldName] == undefined) {
            req.body[fieldName] = '';
        }
        fieldsData+= " `"+fieldName+"` = '" + req.body[fieldName]+ "', ";
    }

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log('online_sales_open_date_time' , req.body.online_sales_open_date);
    console.log('online_sales_close_date_time' , req.body.online_sales_close_date);



req.body.online_sales_open_date_time_moment = moment(req.body.online_sales_open_date_time).format('YYYY-MM-DD HH:mm:ss');
req.body.online_sales_close_date_time_moment = moment(req.body.online_sales_close_date_time).format('YYYY-MM-DD HH:mm:ss');

console.log(' online_sales_open_date_time_moment : ', req.body.online_sales_open_date_time_moment);
console.log(' online_sales_close_date_time_moment : ', req.body.online_sales_close_date_time_moment);


    req.body.online_sales_open_date = moment(req.body.online_sales_open_date).format('YYYY-MM-DD');
    req.body.online_sales_close_date = moment(req.body.online_sales_close_date).format('YYYY-MM-DD');

    req.body.created = curtime;
    req.body.modified = curtime;
    req.body.status = 1;
    req.body.showclix_user = '28676';
    req.body.showclix_seller = '22876';

    data = req.body;

data.sales_open = req.body.online_sales_open_date_time_moment;
data.sales_close = req.body.online_sales_close_date_time_moment;

    var showClixPackage2 = new showClixPackage();

          showClixPackage2.add_package(data,res,function(sdata){
          if (sdata.status == 1) {


if(sdata.operation == 'add_package' ) {

            var showclix_url = sdata.location;
            var showclix_url_array = showclix_url.split("/");
            showclix_package_id = showclix_url_array.slice(-1).pop(); 
            console.log('-----------------------');
            console.log('Response from showclix api , ' , sdata );
            console.log(' ---------------------------- ');
            console.log('showclix_package_id ' , showclix_package_id );

}
    
if(sdata.operation == 'edit_package' ) {
    showclix_package_id = sdata.location ;
}       

              //var event_url = sdata.location;
              //var showclix_event_id = event_url.split("/");
             // update_showclix_data(event_url,eventId,data);
             // res.json({result:eventId,showclix:sdata.location,code:200});

    if (req.body.id && req.body.id != "" && req.body.id != undefined) {
    var query = "UPDATE `event_package` SET "+ fieldsData +" `modified` = '" + req.body.modified+"'  WHERE user_id = '" + req.body.user_id + "' && id=" + req.body.id;
    } else {
    var query = "INSERT INTO `event_package` SET "+ fieldsData +" user_id = "+req.body.user_id +" ,  `showclix_package_id` = " + showclix_package_id + "  ,  `showclix_user` = " + req.body.showclix_user + " ,  `showclix_seller` = " + req.body.showclix_seller + "  ,  `showclix_url` = '" + showclix_url + "' ,  `created` = '" + req.body.created +"' , `url_short_name` = '" + req.body.short_name + "'";
         }

console.log('-------------------------');
console.log('query');
console.log(query);

    if (query != "") {
        connection.query(query, function(err7, results) {
            if (err7) {
                res.json({ error: err7,code: 101});
            }
          if(results) {
           var package_id = '';
            if(results.insertId != 0 && results.insertId !='' ) {
              package_id = results.insertId;
            }
            if (req.body.id && req.body.id != "" && req.body.id != undefined) {
              package_id = req.body.id;
            }

console.log('-------------------------');
console.log('last added package_id for our local database : ' , package_id);

console.log('-------------------------');
console.log('req.body.event_ids' , req.body.event_ids);

            for (var index in  req.body.event_ids) {
                if (req.body.event_ids[index] != undefined) {
                    var event = req.body.event_ids[index];
                    var showclix_event_id = req.body.showclix_event_ids[event];

console.log(" -------------------------");
console.log('chhosen showclix id of event :', showclix_event_id );

          var events_of_packages = {};
          events_of_packages.package_id = showclix_package_id;
          events_of_packages.event_id = showclix_event_id;

showClixPackage2.add_events_of_package(events_of_packages,res,function(sdata1){
  console.log(' ------------******* sdata1******------------------');
  console.log(sdata1);

          if (sdata1.status == 1) {
           // var package_event_map_id_showclix = 1 ;

    var query_event = "INSERT INTO package_event_map ( event_id , package_id ) VALUES ( "+ event +" , "+ package_id +")";
                  console.log('--------------------');
                  console.log(query_event); 
                    connection.query(query_event, function(subErr, subResults) {
                      if (subErr) {
                          res.json({ error: subErr,code: 101});
                      }
                    });
                  }
                });
            }
          }
          res.json({ result: package_id , code: 200 });
        }

        
        });
    }



          } else {
            console.log('---------------------------');
            console.log(' showclix error exist' );
             //res.json({result:"",error:sdata.error,code:101});  
             res.json({result:"",error:sdata.error , code:101});  

             // rollback_event(eventId);
             // res.json({result:"",error:sdata.error,code:101});  
          }
      });





    
}
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
      var query_event = "SELECT event_id from package_event_map where package_id = "+package_id;

      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:"error",code:101}); 
        }
        //res.send({"results":result,code:200});  

        connection.query(query_event,function(err1,package_events){
        if (err1) {
          res.send({err1:"error",code:101}); 
        }
        res.send({"results":result, "package_events":package_events,code:200});  
      });

      });
    } else {
      res.send({"results":{},code:200});
    }
}


exports.getEventsInPackage=function(req,res) {
   
    var package_id=req.body.package_id;
    if(package_id!=undefined){

       var sql="SELECT pem.event_id,e.title from package_event_map pem join events e ON pem.event_id = e.id  where package_id = "+package_id;
     
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

console.log('req.body' ,  req.body ); 
console.log('req.body.eventsInPackage , ' , req.body.eventsInPackage );

	var condition = "";
    if (req.body.user_id != "" && req.body.user_id != "[]" && req.body.user_id != "undefined") {
        condition = " ep.seller_id =" + req.body.user_id;
    }

    if (req.body.package_id != "" && req.body.package_id != "[]" && req.body.package_id != "undefined") {
        condition+= " AND ep.package_id =" + req.body.package_id;
    }

 	if(req.body.eventsInPackage != '' && req.body.eventsInPackage != undefined && req.body.eventsInPackage != "[]") {
		var strold = req.body.eventsInPackage;
        var strnew = '';
        if(strold != '') {
          strnew = strold.substr(1, strold.length - 2);
           condition += " OR ep.event_id IN (" + strnew + ")";
  }
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
console.log('-----------------');

  console.log('req.body' , req.body);
  var excluded_product_id_query = 'SELECT GROUP_CONCAT( product_id ) AS excluded_product_id FROM event_products WHERE package_id = '+req.body.packageId ;
  connection.query(excluded_product_id_query , function(err1, results1) {
    if (err1) {
      res.json({error:err1,code:101});
     }
var condition = '';


     if(results1[0].excluded_product_id  !== '' && results1[0].excluded_product_id != null && results1[0].excluded_product_id != 'null' ) {
condition = ' AND id NOT IN (' + results1[0].excluded_product_id+')';
     }


//$scope.data.productId
    if( req.body.productId != '' && req.body.productId != undefined) {
condition = ' AND id = ' +req.body.productId ;
     }


var products = 'SELECT * from products where seller_id = '+req.body.userId + condition + ' ORDER BY created DESC';
    console.log('products' , products) ;
    connection.query(products, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
     });

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

 var fields = ['print_home' , 'print_enable_date' , 'print_disable_date' , 'print_description' , 'will_call' , 'will_call_enable_date' , 'will_call_disable_date' , 'will_call_description' , 'donation' , 'donation_name' , 'custom_fee' , 'custom_fee_name' , 'custom_fee_type' , 'custom_fee_amount' , 'custom_when' , 'online_service_fee' , 'box_office_service_fee' , 'ticket_note' , 'ticket_transaction_limit' , 'checkout_time_limit' , 'collect_name' , 'private_event' , 'show_seating_chart' , 'url_short_name' ]; 


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
    req.body.modified = curtime;

    data = req.body;
    
    var showClixPackage2 = new showClixPackage();
          showClixPackage2.postThirdStepPackageData(data,res,function(sdata){
          if (sdata.status == 1 && sdata.operation == 'edit_package' ) {

    var showclix_package_id = sdata.location ;
    console.log('-----------------------');
    console.log('showclix_package_id ' , showclix_package_id );

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

          else{
      res.json({error:sdata.error,code:101});
     }

        });

   
}

exports.getEventCategoriesList = function(req, res) {
    var query = "SELECT * FROM `event_category` order by id asc";
    console.log('query ' , query);
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

exports.viewSelectedEvents = function(req, res) {
  if(req.body.choosenEventsIds != undefined && choosenEventsIds != "") {
    var choosenEventsIds = req.body.choosenEventsIds;
    choosenEventsIdsStr = choosenEventsIds.substr(0, choosenEventsIds.length-1);

    var query = "SELECT id, title, event_address , city FROM `events` where id in ("+choosenEventsIdsStr+")";
    console.log('query ' , query);
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}
}

   

   /** 
Method: getPackageProductDetail
Description:Function to fetch package product detail 
Created : 2016-05-25
Created By: Manoj 
*/
exports.getPackageProductDetail = function(req,res) {
  if(req.body.id!=undefined){
    //LEFT JOIN events AS E on E.id=QA.event_id where
    var query = 'SELECT EP.*, p.product_name, p.retail_price from event_products as EP LEFT JOIN products AS p on p.id = EP.product_id where EP.id='+req.body.id+ ' ORDER BY EP.created DESC';
    console.log(query);
    connection.query(query, function(err, results) {
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
Method: getPackageProducts
Description:Function to fetch related products of package
Created : 2016-05-25
Created By: Manoj Singh 
*/
exports.getPackageProducts = function(req,res) {
console.log('eq.body' , req.body);

  if(req.body.userId!=undefined && req.body.packageId!=undefined){
    //LEFT JOIN events AS E on E.id=QA.event_id where
    var query = 'SELECT EP.*, p.product_name from event_products as EP LEFT JOIN products AS p on p.id = EP.product_id where EP.seller_id='+req.body.userId+ ' and EP.package_id='+ req.body.packageId +' ORDER BY EP.created DESC';
   console.log('query' , query);
    connection.query(query, function(err, results) {
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
Method: getEventProducts
Description:Function to fetch related products of event
Created : 2016-05-25
Created By: Deepak khokkar  
*/
exports.removePackageProduct = function(req,res) {
console.log(req.body);
//console.log(req.body.packageProductDeleteId);

  if(req.body.userId!=undefined && req.body.packageProductDeleteId!=undefined){
    //LEFT JOIN events AS E on E.id=QA.event_id where
   // var query = 'SELECT EP.*, p.product_name from event_products as EP LEFT JOIN products AS p on p.id = EP.product_id where EP.seller_id='+req.body.userId+ ' and EP.package_id='+ req.body.packageProductDeleteId +' ORDER BY EP.created DESC';
    var query = 'DELETE from  event_products where seller_id='+req.body.userId+ ' and id='+ req.body.packageProductDeleteId ;
    console.log(query);
    connection.query( query , function(err, results) {
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
Method: changeBundleStatus
Description:Function to change status of the bundle 
Created : 2016-05-18
Created By: Deepak khokkar
*/
exports.changePackageBundleStatus = function(req,res) { 
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
Method: removePackageBundle
Description:Function to delete the package of bundle
Created : 2016-05-18
Created By: Deepak khokkar
*/
exports.removePackageBundle=function(req,res){
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
Method: getBundleDetailOfPackage
Description: get bundle detail 
Created : 2016-04-26
Created By: Manoj kumar  
*/
exports.getBundleDetailOfPackage = function(req,res){
  connection.query('SELECT * from bundles where seller_id='+req.body.userId+ ' and id='+ req.body.editBundleId +' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
  
}



/** 
Method: getAdvanceSetting
Description:Function to get advance settings details of events
Created : 2016-05-20
Created By: Manoj Kumar 
*/

exports.getAdvanceSettingOfPackage = function(req,res){
  connection.query('SELECT * from event_advance_settings where seller_id='+req.body.seller_id+ ' && package_id = '+req.body.package_id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    else{
          res.json({result:results,code:200});
         }
  });
}


/** 
Method: saveAdvanceSettings
Description:Function to save advance settings of events
Created : 2016-05-20
Created By: Manoj Kumar 
*/

exports.saveAdvanceSettingsOfPackage = function(req,res) {
    
 var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
 var query_fields = '';

 var advance_settings_fields = [
'hide_event_time',
'hide_event_date_time',
'hide_venue_info',
'hide_x_days_away',
'hide_calender_link',
'hide_calender_icon',
'hide_age_limit',
'hide_price_range',
'hide_best_available',
'hide_presale_date',
'presale_instuction_text',
'presale_placeholder_text',
'hide_presale_event_in_series',
'hide_from_search_engine',
'hide_social_media',
'hide_invite_friends',
'checkout_text',
'confirmation_page_text',
'receipt_reminder_text',
'confirmation_email_text',
'hide_ticket_holder_name',
'donot_send_reminder_email',
'hide_event_date_time_in_event_reminder',
'hide_venue_in_event_reminder',
'hide_ticket_info_in_event_reminder',
'custom_event_reminder_message',
'hide_event_date_on_ticket',
'use_lat_long_coords',
'hide_premiere_price_level_discount',
'additional_receipt_text',
'show_sale_barcode_in_text',
'disable_autocomplete_in_the_box_office',
'dropdown_for_reccuring_events',
'suggested_donation_amount',
'sales_closed_message',
'custom_sold_out_message',
'embed_show_navbar_seller_name',
'embed_show_header_banner',
'embed_hide_venue_names_on_events_list',
'footer_message_on_event_pages',
'force_show_on_seller_homepage',
'hide_stage_front',
'stage_front_name',
'lock_question_answer',
'lock_ticket_names',
'lock_order_names',
'hide_back_to_event_button',
'custom_shipping_text_instruction',
'upsell_matching_items',
'ignore_cart_limit_when_upselling',
'hide_look_for_different_seats_option',
'analytics_facebook_conversion_pixel_id',
'analytics_facebook_audiance_new_pixel',
'analytics_facebook_custom_audiance_pixel_id',
'allow_extended_event_names',
'twitter_share_text',
'name_change_cutoff',
'name_change_fee',
'email_reply_to',
'email_reply_to_name',
'enable_sidekick_for_thermal_printing',
'acceptable_locales',
'custom_title_prefix',
'show_support_link_in_email',
'collect_addresses_on_free_orders',
'ask_questions_on_checkout',
'cancel_ticket_button_on_receipt',
'custom_ticket_cancelation_message',
'additional_email_for_receipts',
'access_code_request_text',
'access_code_instructions_text',
'show_bundle_details_by_default' ];

//console.log('req.body' , req.body);
for(var key in advance_settings_fields) {
  var field_name = advance_settings_fields[key];
  var checkboxkey = field_name+'_cbox';
  if(req.body[checkboxkey] != null && req.body[checkboxkey] != "undefined") {
    if (req.body[field_name] != null && req.body[field_name] != "undefined") {
        query_fields += " `"+field_name+"` = '"+req.body[field_name]+"' ,";
        query_fields += " `"+checkboxkey+"` = '"+req.body[checkboxkey]+"' ,";
    }
  }
}

var table_name = 'event_advance_settings';
var created = " created = '"+curtime+"'"; 
var modified = " modified = '"+curtime+"'";

if(req.body.id) {
var query1 = "UPDATE `"+table_name+"` SET "+ query_fields + modified +" where id = "+req.body.id+" && package_id = "+req.body.package_id+" && seller_id = "+req.body.seller_id;
}
else
{
var query1 = "INSERT INTO  `"+table_name+"` SET package_id = "+req.body.package_id+" , seller_id = "+req.body.seller_id +", "+ query_fields + created;
}

console.log('query_value ' , query1);

  connection.query(query1, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }else{

     connection.query(" select * from  `"+table_name+"` where package_id = "+req.body.package_id+" && seller_id = "+req.body.seller_id, function(error, result) {
         if (error) {
          res.json({error:error,code:101});
         }else{
          res.json({result:result,code:200});
         }
      });
     }
  });

}

 


exports.getQuestionsOfEventOfPackage = function(req,res){

var packageEventIds = '' ; 
if(req.body.choosenEventsIds != undefined && req.body.choosenEventsIds != "") {
 var choosenEventsIds = req.body.choosenEventsIds ;
    packageEventIds = choosenEventsIds.substr(0, choosenEventsIds.length-1);

    }
      var query = "SELECT * FROM question_assignments qa JOIN questions q ON qa.seller_id = q.seller_id AND qa.question_id = q.id WHERE qa.seller_id = "+req.body.userId+ " AND qa.event_id IN  ("+ packageEventIds + ") group by qa.question_id";
    console.log('-------------------------');
  console.log(query);
  
  connection.query(query, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
    
      res.json({result:results,code:200});
  });
}

exports.delPackage = function(req,res) {
   
    var package_id=req.body.package_id;
    var user_id=req.body.user_id;

    if(package_id!=undefined){
      var sql="delete from event_package where id="+package_id+" and user_id ="+user_id;

      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:err , code:101}); 
        }
        res.send({"results":result, code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}

exports.addFavouritePackage = function(req,res) {
   
    var package_id=req.body.package_id;
    var user_id=req.body.user_id;

    if(package_id!=undefined){
      var sql="UPDATE event_package set favorite_package = 1 where id="+package_id+" and user_id ="+user_id;

      connection.query(sql,function(err,result){
        if (err) {
          res.send({err:err , code:101}); 
        }
        res.send({"results":result, code:200});  
      });
    } else {
      res.send({"results":{},code:200});
    }
}
