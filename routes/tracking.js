module.exports = function(app, express) {

  	var router = express.Router();
    tracking  = require('./../app/tracking/controllers/tracking.js');
    
   	router.post('/saveTag', tracking.saveTag);


   	router.post('/getTag', tracking.getTag);

   	router.post('/getTagDetail', tracking.getTagDetail);

   		router.post('/deleteTag', tracking.deleteTag);
         
	/* default route */
	app.use('/tracking', router);
}