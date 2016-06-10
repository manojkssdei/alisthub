module.exports = function(app, express) {
	var router = express.Router();
	 var multer = require('multer');
    var fs = require('fs');
	customers     = require('./../app/customers/controllers/customer.js');


var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
            
        cb(null, './public/images/customers/csv');

    },
    filename: function (req, file, cb) {
        
        //var filnameArr = file.originalname.split('.');
        
        var fileNameArr=file.originalname.substr(file.originalname.lastIndexOf('.')+1);
        
        cb(null, file.fieldname + '_' + Date.now() + '.' + fileNameArr);
        
    }
});

var upload = multer({
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }, storage: storage
});


function supportCrossOriginScript(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.header("Pragma", "no-cache"); // HTTP 1.0.
    res.header("Expires", "0"); // Proxies.
    next();
}

   router.post('/getCustomer',customers.getCustomer);

    router.get('/getBlacklist', customers.getBlacklist);
	
    router.post('/addCustomer', customers.addCustomer);

  router.post('/deleteCustomer', customers.deleteCustomer);


 router.post('/changeCustomerStatus', customers.changeCustomerStatus);


  router.post('/customerOverview', customers.customerOverview);
  
   router.post('/uploadfilecsv', upload.single('file'), supportCrossOriginScript, customers.uploadfilecsv);

    router.post('/uploadBlacklist',upload.single('file'), supportCrossOriginScript, customers.uploadBlacklist);
    
      router.get('/exportCSV', customers.exportCSV);
      //getBlacklist

    app.use('/customers', router);
}