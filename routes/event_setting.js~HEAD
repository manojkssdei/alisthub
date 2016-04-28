function supportCrossOriginScript(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
}

module.exports = function(app, express) {

	var router = express.Router();
       
	Event_setting  = require('./../app/event_setting/controllers/venue.js');
               
        /* Web services for Event Setting Module
        * Created : 2016-04-19 6 PM
        /* GET users listing. */
       
        // router.get('/', Event_setting.defaulturl);
        /* Module : Venue Management
        * Service : Add Venue to Seller
        * */
        router.post('/addVenue', Event_setting.addVenue);
       
        /* Service : Venue Overview to Seller
        * */
        router.get('/venueOverview', Event_setting.venueOverview);
         
         
	 app.use('/event_setting', router);
         
         
}