var mysql      = require('mysql');
connection = mysql.createConnection({
  host     : '192.155.246.146',
  user     : 'eventhub',
  password : 'eventhub',
  database : 'db_eventhub',
  insecureAuth: true
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId)
});