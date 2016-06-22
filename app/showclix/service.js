var showClix   = require('./../../constant.js');
var request    = require('request');
module.exports = function()
{
  this.add_venue = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.post({
                headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     showClix.addVenue,
                form:    { "venue_name": req.body.venue_name,
              "seating_chart_name": "",
              "capacity": req.body.capacity,
              "description": "test description",
              "booking_info": null,
              "image": null,
              "seating_chart": null,
              "seating_chart_type": "2",
              "url": req.body.url,
              "contact_name": req.body.contact_name,
              "contact_title": null,
              "address": "test Elante address",
              "city": req.body.city,
              "state": req.body.state,
              "zip": req.body.zipcode,
              "country": req.body.country,
              "phone": req.body.phone,
              "fax": req.body.fax,
              "email": req.body.email,
              "timezone": null,
              "status": "2",
              "lat": req.body.phone,
              "lng": req.body.phone,
              "timezone_name": req.body.timezone
            } }, function(error, response, body){
                   if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                                      
                   }
                   
               });
    
  }
  this.add_event = function(req,res,next)
  {
    // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     "http://api.showclix.com/Event",
                form:    {"user_id":"28676","seller_id":"22876","venue_id":"34657","event":req.body.eventname,"description":req.body.content,"inventory":"600","private_event":"0","price":"18.00","price_label":"General Admission","price_limit":"1","ticket_purchase_timelimit":null,"ticket_purchase_limit":null,"will_call_ticketing":null,"ages":"0","image":"20091252630916.jpg","url":null,"event_type":"3","ticket_note":null,"status":"1","keywords":null,"sales_open":req.body.eventdate,"event_start":req.body.eventdate,"short_name":"ninth_dance_event","display_image":"1"} }, function(error, response, body){
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                   return next({status:0,location:""});
                                      
                  }
                   
               });
    
  }
  
  this.add_series_event = function(req,res,next)
  {
    // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':'e4fe17d8b0e3648ca40807bdb511e5582de018d265c36dbd0ec1a6499e69f356'},
                url:     "http://api.showclix.com/Event",
                form:    {"user_id":"28676","seller_id":"22876","venue_id":"34657","event":req.eventname,"description":req.content,"inventory":"600","private_event":"0","price":"18.00","price_label":"General Admission","price_limit":"1","ticket_purchase_timelimit":null,"ticket_purchase_limit":null,"will_call_ticketing":null,"ages":"0","image":"20091252630916.jpg","url":null,"event_type":"3","ticket_note":null,"status":"1","keywords":null,"sales_open":req.eventdate,"event_start":req.eventdate,"short_name":req.short_name,"display_image":"1","behavior_set":"3","position":"3"} }, function(error, response, body){
                  console.log(response);
                  console.log(body);
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                   return next({status:0,location:""});
                                      
                  }
                   
               });
    
  }
  
  
  this.add_price_level = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.post({
                headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     showClix.addVenue,
                form:    { "venue_name": req.body.venue_name,
              "seating_chart_name": "",
              "capacity": req.body.capacity,
              "description": "test description",
              "booking_info": null,
              "image": null,
              "seating_chart": null,
              "seating_chart_type": "2",
              "url": req.body.url,
              "contact_name": req.body.contact_name,
              "contact_title": null,
              "address": "test Elante address",
              "city": req.body.city,
              "state": req.body.state,
              "zip": req.body.zipcode,
              "country": req.body.country,
              "phone": req.body.phone,
              "fax": req.body.fax,
              "email": req.body.email,
              "timezone": null,
              "status": "2",
              "lat": req.body.phone,
              "lng": req.body.phone,
              "timezone_name": req.body.timezone
            } }, function(error, response, body){
                   if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                                      
                   }
                   
               });
    
  }
  this.delete_event = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    
    request.delete({
              headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
              url:     showClix.deleteEvent,
              form:    { } }, function(error, response, body){
                 
                 console.log(response);
                 console.log(body);
                 /*  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                   }
                   else
                   {
                   return next({status:0,location:""});
                   }
                  */ 
               });
    
  }
  
  
}