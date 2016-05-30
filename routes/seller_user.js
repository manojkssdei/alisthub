/** 
Routes defnition for Event Setting Module
Created : 2016-05-05
Created By: Manoj kumar 
Module : Seller user managment
*/
module.exports = function(app, express) {

  	var router = express.Router();
    user  = require('./../app/manage/controllers/user.js');
    
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

	/* default route */
	app.use('/user', router);
}