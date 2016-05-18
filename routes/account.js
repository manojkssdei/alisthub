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
   
    app.use('/account', router);
}
