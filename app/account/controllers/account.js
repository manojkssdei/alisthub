/** 
Controller for the finacial setting of user 
Created : 2016-05-17
Created By: Harpreet Kaur
Module : Financial Setting Module  
*/
var moment = require('moment-timezone');


/** 
Method: getFinancialDetails
Description:Function for getting the existing financial details of the user 
Created : 2016-05-17
Created By:Harpreet Kaur
*/
exports.getFinancialDetails = function(req, res) {
    connection.query('SELECT * from financial_settings where seller_id=' + req.body.userId, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: addFinancialDetails
Description:Function for saving and updating the financial setting for the user 
Created : 2016-05-17
Created By: Harpreet Kaur
*/
exports.addFinancialDetails = function(req, res) {
    for (var index in req.body) {
        if (req.body[index] == undefined) {
            req.body[index] = '';
        }
    }

    if (req.body.phone == undefined) {
        req.body.phone = '';
    }

    if (req.body.city == undefined) {
        req.body.city = '';
    }

    if (req.body.zipcode == undefined) {
        req.body.zipcode = '';
    }

    if (req.body.state == undefined) {
        req.body.state = '';
    }

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;

    if (req.body.seller_id && req.body.first_name && req.body.last_name && req.body.email && req.body.cheque_name && req.body.address && req.body.country) {
        if (req.body.id && req.body.id != "" && req.body.id != undefined) {
            var query = "UPDATE `financial_settings` SET first_name ='" + req.body.first_name + "'  ,last_name ='" + req.body.last_name + "',phone ='" + req.body.phone + "',email ='" + req.body.email + "',cheque_name ='" + req.body.cheque_name + "',address ='" + req.body.address + "',city ='" + req.body.city + "',zipcode ='" + req.body.zipcode + "',state ='" + req.body.state + "' ,country ='" + req.body.country + "' where seller_id= '" + req.body.seller_id + "' && id=" + req.body.id;
        } else {
            var query = "INSERT INTO `financial_settings` ( `id` ,`seller_id` ,`first_name` ,`last_name` ,`phone` ,`email` ,`cheque_name` ,`address` ,`city` ,`zipcode` ,`state` ,`country` ,`created`) VALUES ( NULL, '" + req.body.seller_id + "', '" + req.body.first_name + "', '" + req.body.last_name + "', '" + req.body.phone + "', '" + req.body.email + "', '" + req.body.cheque_name + "', '" + req.body.address + "', '" + req.body.city + "', '" + req.body.zipcode + "', '" + req.body.state + "', '" + req.body.country + "', '" + req.body.created + "')";
        }

        if (query != "") {
            connection.query(query, function(err7, results) {
                if (err7) {
                    res.json({ error: err7,code: 101});
                }
                res.json({ result: results, code: 200 });
            });
        }
    } else {
        res.json({ error: 'Enter all required fields',  code: 101});
    }

}