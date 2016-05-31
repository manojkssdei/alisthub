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

    /* Export CSV Question  */
    /////////////////////// Export CSV  ////////////////////////////////
    router.get('/exportQuestionCSV', question_setting.exportQuestionCSV);
    
    /* Get selected Question  */
    /////////////////////// Export CSV  ////////////////////////////////
    router.post('/getSelectedQuestion', question_setting.getSelectedQuestion);
    
    /* Assign Event question Seller   */
    
    router.post('/viewEvents', question_setting.viewEvents);
    
    /* Make Asssignment Event question Seller   */
    
    router.post('/makeAssignment', question_setting.makeAssignment);
    
    /* View Question Asssignment Event Seller   */
    
    router.post('/delAssignment', question_setting.delAssignment);   


    /*** Module : Manage Product
     *   Get Seller Products 
     *
    */
    router.post('/getProducts', bundle_setting.getProducts);
    
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
    
    app.use('/event_setting', router);
}
