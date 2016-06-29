/** 
Method: saveEvent
Description:Function to save event data for package
Created : 2016-04-19
Created By: Manoj 
*/
var moment       = require('moment-timezone');
//var showClix   = require('./../../showclix/service.js');

/** 
Method: getAllPackageEvent
Description:Function to get package event data  
Created : 2016-06-28
Created By: Deepak khokkar  
*/
exports.getAllPackageEvent=function(req,res) {
  var user_id = req.body.user_id;
  var curtime = moment().format('YYYY-MM-DD');
  var dateRange = req.body.dateRange;
  
  var sql = "SELECT  event_package.id,  event_package.package_name, event_package.online_sales_open_date FROM event_package where event_package.user_id = " + user_id;

  if(req.body.allevent!=undefined) {
    if(req.body.allevent.eventFilter != undefined && req.body.allevent.eventFilter != '') {
      if(req.body.allevent.eventFilter == 'upcoming') {
        //sql += " and Date(events.start_date) >= '" + curtime + "' ";       
      }

      if(req.body.allevent.eventFilter == 'past') {
        //sql += " and Date(events.start_date) <= '" + curtime + "' ";
      }
    }
  }

  if(req.body.dateRange!=undefined) {
    if(req.body.dateRange.searchFromDate != undefined && req.body.dateRange.searchFromDate != '' && req.body.dateRange.searchToDate != undefined && req.body.dateRange.searchToDate != '') {
        //sql += " and Date(events.start_date) >= '" + req.body.dateRange.searchFromDate + "' and Date(events.end_date) <= '" + req.body.dateRange.searchToDate + "'"; 
    }

    if(req.body.dateRange.searchFromDate != undefined && req.body.dateRange.searchFromDate != '' && req.body.dateRange.searchToDate == undefined && req.body.dateRange.searchToDate == '') {
        //sql += " and Date(events.start_date) <= '" + curtime + "' ";
    }
  }

  sql += " ORDER BY event_package.online_sales_open_date ASC LIMIT 5";
  console.log(sql);
  
  connection.query(sql,function(err,result) {
    if (err) {
      res.send({err:"error",code:101}); 
    }
    res.send({"results":result,code:200});  
  });
}

/** 
Method: exportPackageCSV 
Description:Function to export All Event CSV  
Created : 2016-06-24
Created By: Deepak khokkar
*/

exports.exportPackageCSV = function(req, res) {
    
    var user_id = req.query.seller;
    var curtime = moment().format('YYYY-MM-DD');
   
    var sql = "SELECT event_package.package_name as 'Package Name', event_package.online_sales_open_date as 'Start Date' FROM event_package where event_package.user_id = " + user_id;
    sql += " ORDER BY event_package.online_sales_open_date";
    
    console.log(sql);

    query = connection.query(sql, function(err, rows, fields) {
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