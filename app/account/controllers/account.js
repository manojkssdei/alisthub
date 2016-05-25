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
    connection.query('SELECT * from financial_settings where seller_id=' + req.body.seller_id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: addCustomFinancialDetails
Description:Function for saving and updating the merchants custom financial setting for the user 
Created : 2016-05-19
Created By: Harpreet Kaur
*/
exports.addCustomFinancialDetails = function(req, res) {
    for (var index in req.body) {
        if (req.body[index] == undefined) {
            req.body[index] = '';
        }
    }

    if (req.body.organization == undefined) {
        req.body.organization = '';
    }

    if (req.body.description == undefined) {
        req.body.description = '';
    }

    if (req.body.memo == undefined) {
        req.body.memo = '';
    }

    if (req.body.store_number == undefined) {
        req.body.store_number = '';
    }

    if (req.body.vendor == undefined) {
        req.body.vendor = '';
    }

    if (req.body.capture_mode == undefined) {
        req.body.capture_mode = '';
    }

    if (req.body.visa == undefined) {
        req.body.visa = '';
    }

    if (req.body.master_card == undefined) {
        req.body.master_card = '';
    }

    if (req.body.discover == undefined) {
        req.body.discover = '';
    }

    if (req.body.american_express == undefined) {
        req.body.american_express = '';
    }

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    req.body.modified = curtime;

    if (req.body.merchant_type && req.body.currency_code && req.body.account_id && req.body.account_password ) {
        if (req.body.id && req.body.id != "" && req.body.id != undefined) {
           
        var query = "UPDATE `custom_financial_settings` SET `merchant_type` = '" + req.body.merchant_type + "', `organization` = '" + req.body.organization + "', `description` = '" + req.body.description + "', `memo` = '" + req.body.memo + "', `currency_code` = '" + req.body.currency_code + "', `store_number` = '" + req.body.store_number + "', `account_id` = '" + req.body.account_id + "', `account_password` = '" + req.body.account_password + "', `vendor` = '" + req.body.vendor + "', `capture_mode` = '" + req.body.capture_mode + "', `visa` = '" + req.body.visa + "', `master_card` = '" + req.body.master_card + "', `discover` = '" + req.body.discover + "', `american_express` = '" + req.body.american_express + "', `modified` = '" + req.body.modified + "' WHERE seller_id= '" + req.body.seller_id + "' && id=" + req.body.id;
        } else {
            var query = "INSERT INTO `custom_financial_settings` (`id`, `seller_id`, `merchant_type`, `organization`, `description`, `memo`, `currency_code`, `store_number`, `account_id`, `account_password`, `vendor`, `capture_mode`, `visa`, `master_card`, `discover`, `american_express`, `created`, `modified`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.merchant_type + "', '" + req.body.organization + "', '" + req.body.description + "', '" + req.body.memo + "', '" + req.body.currency_code + "', '" + req.body.store_number + "', '" + req.body.account_id + "', '" + req.body.account_password + "', '" + req.body.vendor + "', '" + req.body.capture_mode + "', '" + req.body.visa + "', '" + req.body.master_card + "', '" + req.body.discover + "', '" + req.body.american_express + "', '" + req.body.created + "', '" + req.body.modified + "')";
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




/** 
Method: viewCustomFinancialSetting
Description:Function for getting the existing merchant financial details of the seller 
Created : 2016-05-19
Created By:Harpreet Kaur
*/
exports.viewCustomFinancialSetting = function(req, res) {
    var query = 'SELECT * from custom_financial_settings where seller_id=' + req.body.seller_id ;
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}


/** 
Method: checkAlreadyAddedMerchant
Description:Function for checking the existing merchant financial details of the seller 
Created : 2016-05-19
Created By:Harpreet Kaur
*/
exports.checkAlreadyAddedMerchant = function(req, res) {
    var query = 'SELECT * from custom_financial_settings where seller_id=' + req.body.seller_id +' && merchant_type = "'+ req.body.merchant_type+'"';
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}


/** 
Method: getCustomFinancialSetting
Description:Function for getting the existing custom merchant financial detail of the seller 
Created : 2016-05-19
Created By:Harpreet Kaur
*/
exports.getCustomFinancialSetting = function(req, res) {
var query = 'SELECT * from custom_financial_settings where id='+ req.body.id+' && seller_id=' + req.body.seller_id;
    connection.query(query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}
