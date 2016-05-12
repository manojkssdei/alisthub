/** 
Controller for the vanue managment  
Created : 2016-04-23
Created By: Mnoj kumar  
Module : manage venues
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_venue = process.cwd()+'/public/images/venues/';

/** 
Method: getSettingCount
Description:Function to get the setting count for the seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.getSettingCount = function(req,res){
  connection.query('SELECT count(*) as count from venues where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, vresults) {
   if (err) {
    res.json({error:err,code:101});
   }
   connection.query('SELECT count(*) as count from questions where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, qresults) {
     connection.query('SELECT count(*) as count from products where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, presults) {
          connection.query('SELECT count(*) as count from discounts where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, dresults) {
     res.json({venueresult:vresults[0],quesresult:qresults[0],productresult:presults[0],discountresult:dresults[0],code:200});
          });
     });
   });
  });
}

/** 
Method: getVenue
Description:Function to get the venue of seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.getVenue = function(req,res){
    //console.log(req.body.userId);
     connection.query('SELECT * from venues where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/** 
Method: addVenue
Description:Function to add the venue of seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.addVenue = function(req,res) {
     var photoname =  chartname = "";  
     if (req.body.imagedata && req.body.imagedata != "" && req.body.imagedata != undefined) {
        var photoname = req.body.seller_id+'_image_'+Date.now() + '.jpg';
        var imagename = path_venue+'/'+photoname;
        var base64Data = req.body.imagedata.replace(/^data:image\/jpeg;base64,/, "");
        
        fs.writeFile(imagename, base64Data, 'base64', function(err) {
        if (err) {
         console.log("Image Failure Upload");
        }
         console.log("Chart Upload");
        });
        req.body.image = photoname;
     }
     
     if (req.body.venue_chart && req.body.venue_chart != "" && req.body.venue_chart != undefined)
     {
          var chartname   = req.body.seller_id+'_chart_'+Date.now() + '.jpg';
          var chartimage  = path_venue+'/'+chartname;
          var base64Data5 = req.body.venue_chart.replace(/^data:image\/jpeg;base64,/, "");
          
          fs.writeFile(chartimage, base64Data5, 'base64', function(err5) {
           if (err5) {
           console.log("Chart Failure Upload");
          }
           console.log("Image Upload");
          });
          req.body.seating_chart = chartname;
     }
     
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.modified = curtime;      
            var query = "UPDATE `venues` SET seller_id="+req.body.seller_id+", venue_type='"+req.body.venue_type+"', venue_name='"+req.body.venue_name+"', address='"+req.body.address+"', city='"+req.body.city+"', zipcode='"+req.body.zipcode+"', state='"+req.body.state+"', country='"+req.body.country+"', status='"+req.body.status+"', latitude='"+req.body.latitude+"', longitude='"+req.body.longitude+"', modified='"+req.body.modified+"', fax='"+req.body.fax+"', timezone='"+req.body.timezone+"', capacity='"+req.body.capacity+"', contact_name='"+req.body.contact_name+"', phone='"+req.body.phone+"', email='"+req.body.email+"', url='"+req.body.url+"', image='"+req.body.image+"', seating_chart='"+req.body.seating_chart+"' where id="+req.body.id;
          } else {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
            req.body.created = curtime;      
            var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.venue_type+"', '"+req.body.venue_name+"', '"+req.body.address+"', '"+req.body.city+"', '"+req.body.zipcode+"', '"+req.body.state+"', '"+req.body.country+"', '1', '"+req.body.latitude+"', '"+req.body.longitude+"', '"+req.body.created+"', '"+req.body.fax+"', '"+req.body.timezone+"', '"+req.body.capacity+"', '"+req.body.contact_name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.url+"', '"+req.body.image+"', '"+req.body.seating_chart+"')";
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
              res.json({error:"error",code:101}); 
          }
}

/** 
Method: venueOverview
Description:Function to venue Overview page 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.venueOverview = function(req,res){
  connection.query('SELECT * from venues where id='+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: changeVenueStatus
Description:Function to change venue status 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.changeVenueStatus = function(req,res) {
  connection.query("UPDATE venues SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

/** 
Method: deleteVenue
Description:Function to delete venue  
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.deleteVenue = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from venues where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/** 
Method: duplicateVenue
Description:Function to duplicate venue  
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.duplicateVenue = function(req,res){
    //console.log(req.body.userId);
  connection.query("select * from venues where id="+req.body.id, function(err, vdata) {
     if (err) {
      res.json({error:err,code:101});
     }
    
     var data = vdata[0];
    
     var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
     data.created = curtime; 
     var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.seller_id+"', '"+data.venue_type+"', '"+data.venue_name+"', '"+data.address+"', '"+data.city+"', '"+data.zipcode+"', '"+data.state+"', '"+data.country+"', '"+data.status+"', '"+data.latitude+"', '"+data.longitude+"', '"+data.created+"', '"+data.fax+"', '"+data.timezone+"', '"+data.capacity+"', '"+data.contact_name+"', '"+data.phone+"', '"+data.email+"', '"+data.url+"', '"+data.image+"', '"+data.seating_chart+"')";
      
       /// To save Venue details
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
  });
}
