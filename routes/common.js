/** 
Routes defnition for Financial settings Module
Created : 2016-05-19 
Created By: Harpreet Kaur
Module : Financial Setting
*/

module.exports = function(app, express) {
	var router = express.Router();
	common_setting     = require('./../app/common/controllers/common.js');
        
    /* For getting list of countries*/
    router.get('/getCountries', common_setting.getCountries);
    
    /* For getting list of usa states*/
    router.get('/getUSAStates', common_setting.getUSAStates);



    app.use('/common', router);
}