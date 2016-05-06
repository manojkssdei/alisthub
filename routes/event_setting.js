module.exports = function(app, express) {

	var router = express.Router();
       

	Event_setting     = require('./../app/event_setting/controllers/venue.js');
        
        question_setting  = require('./../app/event_setting/controllers/question.js');
        
        product_setting  = require('./../app/event_setting/controllers/product.js');
               
        /* Web services for Event Setting Module
        * Created : 2016-04-19 6 PM
        /* GET users listing. */
        /* Module : Setting Management
        * */
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
        
        
        
         
	app.use('/event_setting', router);
    }
