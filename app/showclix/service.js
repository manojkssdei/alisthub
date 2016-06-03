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