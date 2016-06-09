var moment = require('moment-timezone');


//show all the details of customer
exports.customerOverview = function(req, res) {
        connection.query('SELECT * from customers where id=' + req.body.id + ' ORDER BY created DESC', function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
            }
            res.json({ result: results, code: 200 });
        });
    }
    //get all the customer listing

exports.getCustomer = function(req, res) {
    connection.query('SELECT * from customers where seller_id=' + req.body.seller_id + ' ORDER BY created DESC', function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}
//upload import csv
exports.uploadfilecsv = function(req, res) {

    var fs = require('fs');
    var csv = require("fast-csv");
    var stream = fs.createReadStream("./public/images/customers/csv/" + req.file.filename);

    csv
        .fromStream(stream, { headers: true })
        .on("data", function(data) {
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
            var query2 = "INSERT INTO `customers` (`id`,`first_name`, `last_name`, `phone`, `email`, `address`,`address_2`,`zipcode`,`country`,`city`,`state`,`seller_id`,`created`) VALUES ('NULL','" + data.first_name + "', '" + data.last_name + "','" + data.phone + "','" + data.email + "','" + data.address + "' ,'" + data.address_2 + "','" + data.zipcode + "','" + data.country + "','" + data.city + "','" + data.state + "','" + data.seller_id + "','" + curtime + "')";
            if (query2 != "") {
                connection.query(query2, function(err7, results) {
                    if (err7) {
                        return res.json({ error: err7, code: 101 });
                    } else {}
                });
            } else {
                return res.json({ error: "empty query", code: 101 });
            }
        })
        .on("end", function() {
            return res.json({ result: "Queries Inserted", code: 200 });
        });

}

//upload blacklist customer
exports.uploadBlacklist = function(req, res) {

console.log("dkldfjkghfh",req.body);
    var fs = require('fs');
    var csv = require("fast-csv");
    var stream = fs.createReadStream("./public/images/customers/csv/" + req.file.filename);

console.log("dkldfjkghfh");
    csv
        .fromStream(stream, { headers: true })
        .on("data", function(data) {
            console.log(data);
            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
            var query3 = "INSERT INTO `blacklist_customers` (`id`,`email`,`created`) VALUES ('NULL','" + data.email + "','" + curtime + "')";
            console.log("data insertd", query3);
            if (query3 != "") {
                connection.query(query3, function(err7, results) {
                    if (err7) {
                        return res.json({ error: err7, code: 101 });
                    } else {}
                });
            } else {
                return res.json({ error: "empty query", code: 101 });
            }
        })
        .on("end", function() {
            return res.json({ result: "Queries Inserted", code: 200 });
        });

}



/*add a customer*/
exports.addCustomer = function(req, res) {
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    if (req.body.id != undefined && req.body.id != '') {
        var query = "UPDATE customers SET seller_id='" + req.body.seller_id + "', first_name='" + req.body.first_name + "',last_name='" + req.body.last_name + "', phone='" + req.body.phone + "', address='" + req.body.address + "', address_2='" + req.body.address_2 + "', email='" + req.body.email +
            "', modified='" + req.body.curtime + "', country='" + req.body.country + "', city='" + req.body.city + "', zipcode='" + req.body.zipcode + "', state='" + req.body.state + "' where id=" + req.body.id;
        console.log("update***", query);
    } else {
        var query = "INSERT INTO `customers` (`id`,`seller_id`, `first_name`, `last_name`, `phone`, `email`,  `customer_status`,`address`,`address_2`,`zipcode`,`country`,`city`,`state`,`created`) VALUES ('NULL','" + req.body.seller_id + "','" + req.body.first_name + "', '" + req.body.last_name + "','" + req.body.phone + "','" + req.body.email + "', '" + req.body.customer_status + "','" + req.body.address + "' ,'" + req.body.address_2 + "','" + req.body.zipcode + "','" + req.body.country + "','" + req.body.city + "','" + req.body.state + "','" + req.body.curtime + "')";
        console.log("Inserted", query);

    }
    if (query != "") {
        connection.query(query, function(err7, results) {
            if (err7) {
                return res.json({ error: err7, code: 101 });
            }
            return res.json({ result: results, code: 200 });
        });

    } else {
        return res.json({ error: "error", code: 101 });
    }
}


exports.exportQuestionCSV = function(req,res){
     var condition = "";
     console.log('req' , req );
     if (req.query.seller != "" && req.query.seller  != "[]" && req.query.seller  != "undefined") {
          condition = " seller_id ="+req.query.seller;
     }
     if (req.query.ids != "" && req.query.ids  != "[]" && req.query.ids  != "undefined") {
          var strold = req.query.ids;
          var strnew = strold.substr(1, strold.length-2);
          condition += " AND id IN ("+strnew+")";
     }
     console.log('select * from customers where '+condition);
     
     query = connection.query('select * from customers where '+condition, function(err, rows, fields) {
                if (err) {
                    res.send(err);
                }
                var headers = {};
                for (key in rows[0]) {
                    headers[key] = key;
                }
                rows.unshift(headers);
                res.csv(rows);
     });
}

//change the status of customer
exports.changeCustomerStatus = function(req, res) {
    connection.query("UPDATE customers SET customer_status='" + req.body.customer_status + "' where id=" + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

//////////delete customer////////////////

exports.deleteCustomer = function(req, res) {
    connection.query("Delete from customers where id=" + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}
