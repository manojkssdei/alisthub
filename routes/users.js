var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from events', function(err, results) {
   if (err) {
    res.send(err);
   }
   res.send(results);
});
  connection.end();
});
router.get('/address', function(req, res, next) {
  connection.query('SELECT * from addresses', function(err, results) {
   if (err) {
    res.send(err);
   }
   res.send(results);
});
  connection.end();
});

module.exports = router;
