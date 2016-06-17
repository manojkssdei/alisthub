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
        condition = " seller_id =" + req.body.user_id;
    }

    if (req.body.package_id != "" && req.body.package_id != "[]" && req.body.package_id != "undefined") {
        condition+= " AND package_id =" + req.body.package_id;
    }

 	if(req.body.eventsInPackage!= '' && req.body.eventsInPackage != undefined && req.body.eventsInPackage != "[]") {
		var strold = req.body.eventsInPackage;
        var strnew = strold.substr(1, strold.length - 2);
        condition += " OR event_id IN (" + strnew + ")";
	}

    if(req.body.package_id!=undefined){

	  var sql = 'select * from event_products where ' + condition +' ORDER BY created DESC';
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

