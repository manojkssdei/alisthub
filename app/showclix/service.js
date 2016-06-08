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
    // required : event_name , address ,city , status
    
    request.post({
                headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
                url:     "http://api.showclix.com/Event",
                form:    {"user_id":"28676","seller_id":"22876",
                "venue_id":"34657",
                "event":req.body.eventname,
                "description":req.body.content,
                "inventory":"600",
                "private_event":"0",
                "price":"18.00",
                "price_label":"General Admission",
                "price_limit":"1",
                "ticket_purchase_timelimit":null,
                "ticket_purchase_limit":null,"will_call_ticketing":null,"ages":"0",
                "image":null,
                "url":req.body.content,
                "event_type":"3",
                "ticket_note":null,"genre":null,
                "status":"1",
                "scheme_id":null,"keywords":null,
                "sales_open":req.body.eventdate,
                "event_start":req.body.eventdate,
                "event_end":null,
                "short_name":req.body.eventname+"",
                "parent":null,"display_image":"1"} }, function(error, response, body){
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
  
}