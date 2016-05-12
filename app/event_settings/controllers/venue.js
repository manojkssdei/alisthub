/** 
Controller for the vanue managment page 
Created : 2016-04-19
Created By: Manoj kumar  
Module : Venue
*/


/** 
Method: getVenue
Description:Function for fetching the data for venue landing page 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.getVenue = function(req,res) {
    connection.query('SELECT * from venues where seller_id='+req.body.userId, function(err, results) {
	   if (err) {
	    res.json(err);
	   }
	   res.json(results);
	});
}