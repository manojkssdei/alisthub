/** 
Routes defnition for Financial settings Module
Created : 2016-05-19 
Created By: Manoj Kumar
Module : Financial Setting
*/

module.exports = function(app, express) {
	var router = express.Router();
	account_setting     = require('./../app/account/controllers/account.js');
        
   /* For saving the financial information */
    router.post('/addFinancialDetails', account_setting.addFinancialDetails);

    /* For getting the financial information */
    router.post('/getFinancialDetails', account_setting.getFinancialDetails);
   
    /* For saving the merchant financial information */
    router.post('/addCustomFinancialDetails', account_setting.addCustomFinancialDetails);
    
    /* For listing the merchant financial information */
    router.post('/viewCustomFinancialSetting', account_setting.viewCustomFinancialSetting);
  
   /* For getting the custom merchant financial information */
    router.post('/getCustomFinancialSetting', account_setting.getCustomFinancialSetting);
    
    /* For checking if custom merchant financial information already exist*/
    router.post('/checkAlreadyAddedMerchant', account_setting.checkAlreadyAddedMerchant);
   
    app.use('/account', router);
}