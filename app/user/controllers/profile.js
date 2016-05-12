var fs         = require('fs');
var moment     = require('moment-timezone');
var path_venue = process.cwd()+'/public/images/venues/';
/*** Get Seller Setting Count ***/


exports.getData = function(req,res){
  connection.query('SELECT * from users where id='+req.body.userId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/*** Add Seller Venue ***/
exports.updateUser = function(req,res) {
  //console.log(req.body); return false;
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', timezone='"+req.body.timezone+"', phone_no='"+req.body.phone_no+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    //console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    //console.log(query);
    res.json({error:"error",code:101}); 
  }
}

/*** Add Seller Venue ***/
/*exports.updateEmail = function(req,res) {
  console.log(req.body);
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.fname+"', last_name='"+req.body.lname+"', timezone='"+req.body.userzone+"', phone_no='"+req.body.phone+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    console.log(query);
    res.json({error:"error",code:101}); 
  }
}*/

/*** Add Seller Venue ***/
exports.updatePassword = function(req,res) {
  //console.log(req.body);
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.fname+"', last_name='"+req.body.lname+"', timezone='"+req.body.userzone+"', phone_no='"+req.body.phone+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    //console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    //console.log(query);
    res.json({error:"error",code:101}); 
  }
}

/*** Add Seller Venue ***/
exports.updateSocial = function(req,res) {
  //console.log(req.body);
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET facebook_link='"+req.body.facebook_link+"', twitter_link='"+req.body.twitter_link+"', google_plus='"+req.body.google_plus+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    //console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    //console.log(query);
    res.json({error:"error",code:101}); 
  }
}