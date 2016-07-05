module.exports = function(app, express) {

  	var router = express.Router();
    widget  = require('./../app/widget/controller/widget.js');
    
    /* For adding the seller user */ 
	router.post('/savewidget', widget.savewidget);

	router.post('/getWidget', widget.getWidget);
	


router.post('/getWidgetDetail', widget.getWidgetDetail);
	/* default route */
	app.use('/widget', router);
}