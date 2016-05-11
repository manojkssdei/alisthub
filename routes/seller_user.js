module.exports = function(app, express) {

  var router = express.Router();

     user  = require('./../app/manage/controllers/user.js');
     /*************************add users*************************************************************/
router.post('/addUser', user.addUser); 
router.post('/getUser', user.getUser); 
router.post('/userOverview', user.userOverview); 


app.use('/user', router);
}