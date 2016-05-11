module.exports = function(app, express) {

	var router = express.Router();
       

	profileCon     = require('./../app/user/controllers/profile.js');
        
    /* Web services for Event Setting Module
    * Created : 2016-04-19 6 PM
    /* GET users listing. */
    /* Module : Setting Management
    * */
    router.post('/updateUser', profileCon.updateUser);
    //router.post('/updateEmail', profileCon.updateEmail);
    //router.post('/updatePassword', profileCon.updatePassword);
    router.post('/updateSocial', profileCon.updateSocial);
    router.post('/getData', profileCon.getData);
       
    app.use('/profile', router);
}
