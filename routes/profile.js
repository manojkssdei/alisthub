/** 
Routes defnition for Event Setting Module
Created : 2016-05-09
Created By: Ashish Dev Swami 
Module : My Account 
*/

module.exports = function(app, express) {
	var router = express.Router();

	profileCon     = require('./../app/user/controllers/profile.js');
        
    /* Update my account user data */
    router.post('/updateUser', profileCon.updateUser);
    
    /* Update my account social data */
    router.post('/updateSocial', profileCon.updateSocial);
    
    /* My account data fetch */
    router.post('/getData', profileCon.getData);
    
    /* Default */   
    app.use('/profile', router);
}
