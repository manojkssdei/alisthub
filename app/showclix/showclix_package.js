

var showClix   = require('./../../constant.js');
var request    = require('request');
module.exports = function()
{
  this.add_package = function(data,res,next)
  {

// var fields = ['package_name', '', 'online_sales_open_time','online_sales_open_date_time', 'immidiately', 'online_sales_close_time', 'online_sales_close_date_time', 'event_type', '', 'ages', 'custom_age', 'website', 'image', 'display_image_in_listing' ];

/*
data.user_id - (int) 
data.seller_id - (int) 
data.event - (string) 
data.behavior_set - (int) 
data.description - (string) 
data.private_event - (int) 1- don't show up in searches and public listings
                           0- show up in searches and public listings
data.ages - (int) 0,18,19,21
data.genre -  (string) Genre of the event. Open Field. e.g. Pop, Classical, Rock, Raffle, etc.
data.event_type - (int) 3 for General Admission Event, 2 for an Assigned Seating Event

*/
   var input = {
  "user_id": data.showclix_user ,
  "seller_id": data.showclix_seller ,
  "event": data.package_name ,
  "behavior_set": "5",
  "description": data.package_description ,
  "private_event": "0",
  "ages": data.ages ,
  "image": data.image,
  "event_category_id": data.category,
  "date_added": data.created ,
  "date_edited": data.modified ,
  "event_start": "2016-07-15 03:30:30",
  "sales_open": "2016-07-10 03:30:30",
  "event_end": "2016-07-21 21:00:00",
  "short_name": data.short_name ,
  "image_url": data.image,
  "thumbnail_url": data.image,
  "status":data.status,
  "event_type":"3",
  "venue_id":"34657" ,
  "product_map": {
            "892707": {
                "event_product_map_id": "892707",
                "event_id": "4206298",
                "product_id": "1878",
                "price": "22.00",
                "upsell_price": null,
                "position": "3",
                "sort_position": null,
                "box_office_hide": "0"
            }
        },
};


console.log('--------------------showclix_package---------------------');
console.log('--------------------input---------------------');
console.log(input );

    var input_1 = {
  "user_id": "28676",
  "seller_id": "22876",
  "event": "Technical Challenge",
  "behavior_set": "5",
  "description": "This is Technical Challenge package",
  "private_event": "0",
  "ages": "0",
  "image": null,
  "event_category_id": "9",
  "date_added": "2016-06-21 05:18:02",
  "date_edited": null,
  "event_start": "2016-07-15 03:30:30",
  "sales_open": "2016-07-10 03:30:30",
  "event_end": "2016-07-21 21:00:00",
  "short_name": "technical_challege",
  "image_url": null,
  "thumbnail_url": null,
  "status":"1",
  "event_type":"3",
  "venue_id":"34657" ,
  "product_map": {
            "892707": {
                "event_product_map_id": "892707",
                "event_id": "4206298",
                "product_id": "1878",
                "price": "22.00",
                "upsell_price": null,
                "position": "3",
                "sort_position": null,
                "box_office_hide": "0"
            }
        },
}

/*
if(event_id) {
 input.event_id = "4206298";
} */

var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

                request.post( postData, function(error, response, body){
                  var str = response.body;
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }                   
               });
    
  }
   

 
   this.add_events_of_package = function(data,res,next)
  {
     var input = {
                    "package_id": data.package_id,
                    "event_id": data.event_id
                  };
console.log('input : ' ,  input );
var postData = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input };

    request.post( postData, function(error, response, body){
                  return next({status:1});
                  /*var str = response.body;
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }
                  */
               });
    
  } 

}
