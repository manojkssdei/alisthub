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

////add user ////
exports.addUser = function(req,res) {
  //console
  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
  req.body.created = curtime;
  if(req.body.id!=undefined && req.body.id!='')
  {
     var query="UPDATE seller_users SET seller_id='"+req.body.seller_id+"', first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"' where id="+req.body.id;
     console.log("update***",query);
  }
  else
  {
  var query = "INSERT INTO `seller_users` (`id`, `seller_id`, `first_name`, `last_name`, `phone`, `fax`,`timezone`,`email`, `password`, `status`,`created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.first_name+"', '"+req.body.last_name+"', '"+req.body.phone+"', '"+req.body.fax+"', '"+req.body.timezone+"','"+req.body.email+"', '"+req.body.password+"','"+req.body.status+"', '"+req.body.created+"')";   

}
  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       return  res.json({error:err7,code:101});
      }
     return  res.json({result:results,code:200});
    });

  } else {
      return res.json({error:"error",code:101}); 
  }
}
////change status////////
exports.changeUserStatus = function(req,res) {
  connection.query("UPDATE seller_users SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

/////////edit user/////////////
// exports.editUser = function(req,res) {
//   connection.query("UPDATE seller_users SET seller_id="+req.body.seller_id+"' first_name='"+req.body.first_name+"'last_name='"+req.body.last_name+"' where id="+req.body.id
//                    ,function(err, results) {
//      if (err) {

//     return  res.json({error:err,code:101});
//      }
//    return  res.json({result:results,code:200});
//   });
// }


//////////delete user////////////////

exports.deleteUser = function(req,res) {
  connection.query("Delete from seller_users where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

////////////////checkunique//////////////
exports.checksellerUser =function(req,res)
{
console.log("body**********",req.body);
  connection.query("SELECT count(*) as cnt from seller_users where email='"+req.body.email+"'", function(err, results) {
     if (err) {
     
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}