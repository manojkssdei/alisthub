/** 
Routes defnition for Event Setting Module
Created : 2016-05-05
Created By: Manoj kumar 
Module : Seller user managment
*/
module.exports = function(app, express) {

  	var router = express.Router();
    user  = require('./../app/manage/controllers/user.js');

    function supportCrossOriginScript(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	    res.header("Access-Control-Allow-Credentials", true);
	    next();
	}
    
    /* For adding the seller user */ 
	router.post('/addUser', user.addUser);
	/* For getting the seller user data */  
	router.post('/getUser', user.getUser);
	/* For getting the user overview page data */  
	router.post('/userOverview', user.userOverview);
	/*for getting edit section of existing user*/
	 // router.post('/editUser', user.editUser);
	/* for getting delete user*/ 
	router.post('/deleteUser',user.deleteUser);
	/* For getting the user overview page data */  
	router.post('/checksellerUser',user.checksellerUser);

    /* Service : Change user Status
    * */
    router.post('/changeUserStatus', user.changeUserStatus);

    /* Service : get permission modules */
    router.post('/getPerModules',supportCrossOriginScript, user.getPerModules);

    /* Service : save permission for users */
    router.post('/savePerModules',supportCrossOriginScript, user.savePerModules);

    /* Service : save permission for users */
    router.post('/checkSellerSubUser',supportCrossOriginScript, user.checkSellerSubUser);

	/* default route */
	app.use('/user', router);
}