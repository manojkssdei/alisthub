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
    
console.log('req.body before ' , req.body);

 var merchantFields = [
          'merchant_type' ,
          'organization' ,
          'description' ,
          'currency_code',
          'master_card' ,
          'discover' ,
          'american_express' ,
          'visa'
          ];


if (req.body.merchant_type == "CyberSource" || req.body.merchant_type == "BeanStream" || req.body.merchant_type == "Authorize.NET Card Present" || req.body.merchant_type == "Do Not Use" || req.body.merchant_type == "DirectPay" || req.body.merchant_type == "ICICI Bank" || req.body.merchant_type == "Alignet" ||  req.body.merchant_type == "PagoEfectivo" || req.body.merchant_type == "CC Avenue"  || req.body.merchant_type == "PayGate") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('keyfile_name');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('vendor');
                  merchantFields.push('key');
                }

if (req.body.merchant_type == "CardConnect") 
                {
                  merchantFields.push('memo');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('zero_auth');
                }

if (req.body.merchant_type == "First Data") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('keyfile_name');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('key');
                }
if (req.body.merchant_type == "Authorize.NET") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('key');
                }

if (req.body.merchant_type == "PayFlow") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('vendor');
                  merchantFields.push('key');
                  merchantFields.push('capture_mode');
                }
if (req.body.merchant_type == "PayPal Express") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('key');
                }

if (req.body.merchant_type == "Stripe") 
                {
                merchantFields.push('account_id'); 
                merchantFields.push('zero_auth'); 
                }

if (req.body.merchant_type == "GoEmerchant") 
                { 
                  merchantFields.push('store_number');
                  merchantFields.push('account_id');
                  merchantFields.push('key');
                  merchantFields.push('zero_auth');
                }

if (req.body.merchant_type == "Cielo") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('keyfile_name');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('vendor');
                }

if (req.body.merchant_type == "AirPay") 
                { 
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('key');
                }

if (req.body.merchant_type == "FirstDataGlobalGatewayE4") 
                { 
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('account_id');
                  merchantFields.push('vendor');
                  merchantFields.push('zero_auth');
                }

if (req.body.merchant_type == "T1 Authorize.Net Emulator" || req.body.merchant_type == "Transact Authorize.NET Emulator" || req.body.merchant_type == "NMI Authorize.NET Emulator") 
                { 
                  merchantFields.push('memo');
                  merchantFields.push('store_number');
                  merchantFields.push('account_password');
                  merchantFields.push('key');
                }

if (req.body.merchant_type == "GoCoin") 
                { 
                  merchantFields.push('account_id');
                  merchantFields.push('key');
                }


console.log('merchantFields ' , merchantFields);

var fieldsData = '';

// insert into ages set `name` = 'testing name' , `age` = 26
for (var index in merchantFields) {
    merchantFieldName = merchantFields[index];

        if (req.body[merchantFieldName] == undefined) {
            req.body[merchantFieldName] = '';
        }
        fieldsData+= " `"+merchantFieldName+"` = '" + req.body[merchantFieldName]+ "', ";

    }

 
console.log('fieldsData ' , fieldsData);


    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    req.body.modified = curtime;

    if (req.body.merchant_type && req.body.currency_code) {
        if (req.body.id && req.body.id != "" && req.body.id != undefined) {

        var query = "UPDATE `custom_financial_settings` SET "+ fieldsData +" `modified` = '" + req.body.modified + "' WHERE seller_id= '" + req.body.seller_id + "' && id=" + req.body.id;
        } else {
        var query = "INSERT INTO `custom_financial_settings` SET "+ fieldsData +" seller_id = "+req.body.seller_id +" , `created` = '" + req.body.created +"'";
             }


        if (query != "") {
            console.log('query', query)
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
