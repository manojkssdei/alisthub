/** 
Controller for the My account managment page 
Created : 2016-05-09
Created By: Ashish dev swami  
Module : My account
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_venue = process.cwd()+'/public/images/venues/';


// showclix login
exports.showclix_login = function(req,res){
  var request = require('request');
 request.post({
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                   "Accept": "application/json",},
        url:     'https://admin.showclix.com/api/registration',
        form:    {"email":"manojks@smartdatainc.net","password":"manojks@2015"} }, function(error, response, body){
       res.json({"body":body,"response":response});
    });
 
}

/** 
Method: getData
Description:Function for fetching the data for My account page 
Created : 2016-05-09
Created By: Ashish dev swami  
*/
exports.getData = function(req,res){
 
   if (req.body.userId != "" && req.body.userId != "undefined") {
    connection.query('SELECT * from users where id='+req.body.userId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     else{
     res.json({result:results,code:200});
     }
  });
  }
  else{
    res.json({error:"error",code:101});
  }
  
 
}

/** 
Method: updateUser
Description:Function for updating the user tab information My account page 
Created : 2016-05-09
Created By: Ashish dev swami  
*/
exports.updateUser = function(req,res) {
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', timezone='"+req.body.timezone+"', phone_no='"+req.body.phone_no+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
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

/** 
Method: updateSocial
Description:Function for updating the social links tab information for My account page 
Created : 2016-05-10
Created By: Ashish dev swami  
*/
exports.updateSocial = function(req,res) {
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET facebook_link='"+req.body.facebook_link+"', twitter_link='"+req.body.twitter_link+"', google_plus='"+req.body.google_plus+"' where id="+req.body.user_id;
  }
  
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

/*
//Commented till web services dependent function created for my account
exports.updateEmail = function(req,res) {
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
}

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
*/
