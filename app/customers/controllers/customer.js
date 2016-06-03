

var moment  = require('moment-timezone');


//show all the details of customer
exports.userOverview = function(req,res) {
  connection.query('SELECT * from customers where id='+req.body.id+ ' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}
//get all the customer listing

exports.getCustomer = function(req,res){
  connection.query('SELECT * from customers where seller_id='+req.body.seller_id+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}



/*add a customer*/
exports.addCustomer = function(req,res){
	  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
  req.body.created = curtime;
 if(req.body.id!=undefined && req.body.id!='')
 {
    var query = "UPDATE customers SET seller_id='"+req.body.seller_id+"', first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"', phone='"+req.body.phone+"', address='"+req.body.address+"', address_2='"+req.body.address_2+"', email='"+req.body.email+
     "', modified='"+req.body.curtime+"', country='"+req.body.country+"', city='"+req.body.city+"', zipcode='"+req.body.zipcode+"', state='"+req.body.state+"' where id="+req.body.id;
     console.log("update***",query);
   }
   else
   {
    var query = "INSERT INTO `customers` (`id`,`seller_id`, `first_name`, `last_name`, `phone`, `email`,  `customer_status`,`address`,`address_2`,`zipcode`,`country`,`city`,`state`,`created`) VALUES ('NULL','"+req.body.seller_id+"','"+req.body.first_name+"', '"+req.body.last_name+"','"+req.body.phone+"','"+req.body.email+"', '"+req.body.customer_status+"','"+req.body.address+"' ,'"+req.body.address_2+"','"+req.body.zipcode+"','"+req.body.country+"','"+req.body.city+"','"+req.body.state+"','"+req.body.curtime+"')";   
      console.log("Inserted",query);
 
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

//change the status of customer
exports.changeCustomerStatus = function(req,res) {
  connection.query("UPDATE customers SET customer_status='"+req.body.customer_status+"' where id="+req.body.id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

//////////delete customer////////////////

exports.deleteCustomer = function(req,res) {
  connection.query("Delete from customers where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}
