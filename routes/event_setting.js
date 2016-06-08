/** 
Routes defnition for Event Setting Module
Created : 2016-04-19 
Created By: Deepak khokkar
Module : Setting Management
*/

module.exports = function(app, express) {

    var router = express.Router();

    var csv = require('express-csv');
  
    Event_setting     = require('./../app/event_setting/controllers/venue.js');
        
    question_setting  = require('./../app/event_setting/controllers/question.js');
    
    product_setting  = require('./../app/event_setting/controllers/product.js');
    
    discount_setting  = require('./../app/event_setting/controllers/discount.js');
    
    bundle_setting  = require('./../app/event_setting/controllers/bundle.js');
    
    router.post('/getSettingCount', Event_setting.getSettingCount);
   
    // router.get('/', Event_setting.defaulturl);
    /* Module : Venue Management
    * Service : Add Venue to Seller
    * */
    router.post('/addVenue', Event_setting.addVenue);
   
    /* Service : Venue Overview to Seller
    * */
    router.post('/venueOverview', Event_setting.venueOverview);
    
    /* Service : Seller Venues Listing
    * */
    router.post('/venueListing', Event_setting.getVenue);
    
    /* Service : Change Venue Status
    * */
    router.post('/changeVenueStatus', Event_setting.changeVenueStatus);
    
    /* Service : Delete Venue 
    * */
    router.post('/deleteVenue', Event_setting.deleteVenue);
    
    /* Service : Duplicate Venue 
    * */
    router.post('/duplicateVenue', Event_setting.duplicateVenue);
     
    


    /*** Module : Manage Question
     *   Get Seller Questions 
     *
    */
    router.post('/getQuestions', question_setting.getQuestions);
    
    /* Add Seller Question  */
    
    router.post('/addQuestion', question_setting.addQuestion);
    
    /* Change Status Seller Question  */
    
    router.post('/changeQuestionStatus', question_setting.changeQuestionStatus);
    
    
    /* Service : Question Overview to Seller
    * */
    router.post('/questionOverview', question_setting.questionOverview);
    
    /* Delete Seller Question  */
    
    router.post('/deleteQuestion', question_setting.deleteQuestion);
    
    /* Assign Event question Seller   */
    
    router.post('/viewEvents', question_setting.viewEvents);
    
    /* Make Asssignment Event question Seller   */
    
    router.post('/makeAssignment', question_setting.makeAssignment);
    
    /* View Question Asssignment Event Seller   */
    
    router.post('/delAssignment', question_setting.delAssignment);
    
    /* exportQuestionCSV Question Asssignment Event Seller   */
    
    router.get('/exportQuestionCSV', question_setting.exportQuestionCSV);
    


    /*** Module : Manage Product
     *   Get Seller Products 
     *
    */
    router.post('/getProducts', bundle_setting.getProducts);
    
    router.post('/getSettingProducts', product_setting.getSettingProducts);

    router.post('/getAllProducts', bundle_setting.getAllProducts);
    
    /* Add Seller Question  */
    
    router.post('/addProduct', product_setting.addProduct);
    
    router.post('/uploadProductImage', product_setting.productUpload);
    
    /* Change Status Seller Question  */
    
    router.post('/changeProductStatus', product_setting.changeProductStatus);
    
    
    /* Service : Question Overview to Seller
    * */
    router.post('/productOverview', product_setting.productOverview);
    
    /* Delete Seller Question  */
    
    router.post('/deleteProduct', product_setting.deleteProduct);
    
    router.post('/saveProductSetting', product_setting.saveProductSettingFunc);
    
    router.post('/getProductSetting', product_setting.getProductSetting);
    
    /* Export CSV product sales  */
    /////////////////////// Export CSV  ////////////////////////////////
    router.get('/exportProductSales', product_setting.exportProductSales); 
    

    /*** Module : Manage Discount
     *   Add list of discount Coupons by seller 
    */
    router.post('/getDiscounts', discount_setting.getDiscounts);
    
    /* check unique Discount Coupon by seller */
    router.post('/checkUniqueDiscount', discount_setting.checkUniqueDiscount);
    
    /* Add Discount Coupon by seller */
    router.post('/addDiscount', discount_setting.addDiscount);
    
    /* check unique Discount Coupon by seller */
    router.post('/checkUniqueDiscount', discount_setting.checkUniqueDiscount);
    
    /* Assign Discount to event  */
    router.post('/assignDiscount', discount_setting.assignDiscount);
    
    /* Change Status of Discount Coupon*/
    router.post('/changeDiscountStatus', discount_setting.changeDiscountStatus);
    
    /* Assign Discount to event  */
    router.post('/makeDiscountAssignment', discount_setting.makeDiscountAssignment);

    /* Service : Discount Overview to Seller*/
    router.post('/discountOverview', discount_setting.discountOverview);
    
    /* Delete Seller Discount  */
    router.post('/deleteDiscount', discount_setting.deleteDiscount);
    
    /* Export CSV discount  */
    /////////////////////// Export CSV  ////////////////////////////////
    router.get('/exportDiscountCSV', discount_setting.exportDiscountCSV);
    
    /* Get selected discount  */
    /////////////////////// Export CSV  ////////////////////////////////
    router.post('/getSelectedDiscount', discount_setting.getSelectedDiscount); 
   
   /* View Event Price levels   */
    
    router.post('/getEventPriceLevels', discount_setting.getEventPriceLevels);

    /* Assign discount coupons to events and price levels   */
    
    router.post('/saveFinalAssignmet', discount_setting.saveFinalAssignmet);
    
    /*overview of assign discounts */
    
    router.post('/discountAssignmentOverview', discount_setting.discountAssignmentOverview);

    /*delete assign discounts */
    
    router.post('/delDiscountAssignment', discount_setting.delDiscountAssignment);




    /*** Module : Manage Bundle
     *   Get Seller Bundle 
     *
    */
    /* Add bundle for event  */
    router.post('/addBundle', bundle_setting.addBundle);
    /* update bundle for event  */
    router.post('/updateBundle', bundle_setting.updateBundle);
    /* get bundle lists */
    router.post('/getBundles', bundle_setting.getBundles);
    /* change the bundle status */
    router.post('/changeBundleStatus', bundle_setting.changeBundleStatus);
    /* remove the bundle  */
    router.post('/removeBundle', bundle_setting.removeBundle);
    /* Get bundle details  */
    router.post('/getBundleDetail', bundle_setting.getBundleDetail);

    /* Add event product */
    router.post('/addEventProduct', product_setting.addEventProduct);

    /* Get event product */
    router.post('/getEventProducts', product_setting.getEventProducts);

    /* Get event product detail */
    router.post('/getEventProductDetail', product_setting.getEventProductDetail);

    /* Get event product detail */
    router.post('/removeEventProduct', product_setting.removeEventProduct);
    
    router.post('/getEventPriceLevel', bundle_setting.getEventPriceLevel);
    
    router.get('/testrequest', function(req, res, next) {
    
    var request = require('request');
      
    /*request('http://api.showclix.com/Venue', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
            res.json({"body":body,"response":response});
          }
          else{
            res.json({"body":"error","response":"error"});
          }
    })*/
      
    ///////////////////////////////////////////////////////////////////////////////
    /*request.post({
        headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
        url:     'http://api.showclix.com/Venue',
        form:    { "venue_name": "AveElante mall",
  "seating_chart_name": "",
  "capacity": "120",
  "description": "test description",
  "booking_info": null,
  "image": null,
  "seating_chart": null,
  "seating_chart_type": "2",
  "url": "",
  "contact_name": "Test Elante",
  "contact_title": null,
  "address": "test Elante address",
  "city": "Neyyork",
  "state": "AA",
  "zip": "10005",
  "country": "US",
  "phone": "8786767",
  "fax": "6767676",
  "email": "manojks@smartdatainc.net",
  "timezone": "-5",
  "status": "2",
  "lat": "40.2466910",
  "lng": "-85.2932100",
  "timezone_name": "America/New_York"
} }, function(error, response, body){
       res.json({"body":body,"response":response.headers.location});
    });*/
    request.post({
        headers: {'X-API-Token':'c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1'},
        url:     'http://api.showclix.com/VenueSellers',
        form:    { "venue_id":"34684",
                   "seller_id": "27113"
  } }, function(error, response, body){
       res.json({"body":body,"response":response});
    });
    
    
    
      //////////////////////////////////////////////////////////////////////////////
    });

    
    app.use('/event_setting', router);
}
