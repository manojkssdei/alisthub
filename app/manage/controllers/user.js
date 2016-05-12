/** 
Controller for the vanue managment page 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : manage users 
*/
var moment     = require('moment-timezone');

/** 
Method: getUser
Description:Function for fetching the data for user 
Created : 2016-04-19
Created By: Deepak khokkar  
*/
exports.getUser = function(req,res){
  connection.query('SELECT * from seller_users where seller_id='+req.body.seller_id+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: userOverview
Description: Function for fetching the seller data  
Created : 2016-04-21
Created By: Deepak khokkar  
*/
exports.userOverview = function(req,res) {
  connection.query('SELECT * from seller_users where id='+req.body.id+ ' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

/** 
Method: addUser
Description: Function for adding the seller user  
Created : 2016-04-23
Created By: Deepak khokkar  
*/
exports.addUser = function(req,res) {
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
  } else {
    res.json({error:"error",code:101}); 
  }
}