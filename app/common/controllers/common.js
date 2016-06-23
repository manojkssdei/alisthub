/** 
Controller for all common functions 
Created : 2016-05-17
Created By: Manoj Kumar
Module : Common Module 
*/
var moment = require('moment-timezone');

/** 
Method: getCountries
Description:Function for getting the list of countries
Created : 2016-05-17
Created By:Manoj Kumar
*/
exports.getCountries = function(req, res) {
    var query = "SELECT countryName from countries order by countryName";
    console.log('query ' , query);
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: getUSAStates
Description:Function for getting the list of usa states
Created : 2016-05-17
Created By:Manoj Kumar
*/
exports.getUSAStates = function(req, res) {
    var query = "SELECT distinct state_name FROM `zips` order by state_name";
    console.log('query ' , query);
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

