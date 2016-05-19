/** 
Routes defnition for Event Setting Module
Created : 2016-04-19 
Created By: Harpreet Kaur
Module : Financial Setting
*/

module.exports = function(app, express) {
	var router = express.Router();
	account_setting     = require('./../app/account/controllers/account.js');
        
   /* For saving the financial data */
    router.post('/addFinancialDetails', account_setting.addFinancialDetails);

    /* For getting the financial data */
    router.post('/getFinancialDetails', account_setting.getFinancialDetails);
   
    /* For saving the merchant financial data */
    router.post('/addCustomFinancialDetails', account_setting.addCustomFinancialDetails);
    
    /* For saving the merchant financial data */
    router.post('/viewCustomFinancialSetting', account_setting.viewCustomFinancialSetting);
  
   /* For getting the merchant financial data */
    router.post('/getCustomFinancialSetting', account_setting.getCustomFinancialSetting);
    
    /* For checking if merchant financial data already exist*/
    router.post('/checkAlreadyAddedMerchant', account_setting.checkAlreadyAddedMerchant);
   
    app.use('/account', router);
}
