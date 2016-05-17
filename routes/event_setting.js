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
    


    /*** Module : Manage Product
     *   Get Seller Products 
     *
    */
    router.post('/getProducts', product_setting.getProducts);
    
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
    router.get('/exportDiscountCSV', product_setting.exportDiscountCSV); 

    /*** Module : Manage Bundle
     *   Get Seller Bundle 
     *
    */
    router.post('/addBundle', bundle_setting.addBundle);
    router.post('/getBundles', bundle_setting.getBundles);
    
    app.use('/event_setting', router);
}
