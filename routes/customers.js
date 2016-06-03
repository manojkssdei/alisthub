module.exports = function(app, express) {
	var router = express.Router();
	customers     = require('./../app/customers/controllers/customer.js');

   router.post('/getCustomer',customers.getCustomer);
	
    router.post('/addCustomer', customers.addCustomer);

  router.post('/deleteCustomer', customers.deleteCustomer);


 router.post('/changeCustomerStatus', customers.changeCustomerStatus);


  router.post('/userOverview', customers.userOverview);

    app.use('/customers', router);
}
