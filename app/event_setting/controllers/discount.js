/** 
Controller for the discount managment 
Created : 2016-05-07
Created By: Manoj kumar  Singh
Module : Discount Module  
*/
var moment = require('moment-timezone');

/** 
Method: getDiscounts
Description:Function for getting the discount for the user 
Created : 2016-05-07
Created By:Manoj kumar  Singh
*/
exports.getDiscounts = function(req, res) {
    connection.query('SELECT * from discounts where seller_id=' + req.body.userId + ' ORDER BY created DESC', function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }

        var event_count = "SELECT count(*) AS count, discount_id FROM discount_assignments WHERE seller_id =" + req.body.userId + " GROUP BY discount_id";
        console.log('event_count' , event_count); 
        connection.query(event_count, function(err2, cresults) {
            res.json({ result: results, counts: cresults, code: 200 });
        });

    });
}

/** 
Method: checkUniqueDiscount
Description:Function for checking the unique discount coupon for the user 
Created : 2016-05-12
Created By: Manoj kumar  Singh
*/
exports.checkUniqueDiscount = function(req, res) {
    var count = 0;
    var mysql_query = '';
    if (req.body.id != undefined) {
        mysql_query = 'SELECT count(*) as count from discounts where id!= "' + req.body.id + '" && seller_id = "' + req.body.seller_id + '" and coupon_code= "' + req.body.coupon_code + '"';
    } else {
        mysql_query = 'SELECT count(*) as count from discounts where seller_id = "' + req.body.seller_id + '" and coupon_code= "' + req.body.coupon_code + '"';
    }
    console.log('mysql_query ', mysql_query);
    connection.query(mysql_query, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        if (results) {
            count = results[0].count;
            if (count > 0)
                res.json({ error: 'Coupons codes must be unique.', code: 101 });
            else
                res.json({ success: 'Coupon Available', code: 200 });
        }
    });
}

/** 
Method: addDiscount
Description:Function for adding the discount for the user 
Created : 2016-05-07
Created By: Manoj kumar  Singh
*/
exports.addDiscount = function(req, res) {

    for (var index in req.body) {
        if (req.body[index] == undefined) {
            req.body[index] = '';
        }
    }

    if (req.body.coupon_code == undefined) {
        req.body.coupon_code = '';
    }

    if (req.body.amount_type == undefined) {
        req.body.amount_type = '';
    }

    if (req.body.amount < 0) {
        req.body.amount = Math.abs(req.body.amount);
    }

    if (req.body.amount_target < 0) {
        req.body.amount_target = Math.abs(req.body.amount_target);
    }

    var errorMsg = [];
    if ((req.body.coupon_type == "Automatic" || req.body.coupon_type == "Discount") && req.body.amount_type == "Percentage" && req.body.amount > 100) {
        console.log('Percentage error');
        errorMsg.push('Percentage must fall between 0 and 100');
        console.log('errorMsg', errorMsg);
    }
    if (errorMsg.length > 0) {
        console.log('errorMsg', errorMsg);
        res.json({ error: errorMsg, code: 101 });
    } else {
        var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.created = curtime;

        if (req.body.id && req.body.id != "" && req.body.id != undefined) {
            var query = "UPDATE `discounts` SET seller_id=" + req.body.seller_id + ", coupon_type='" + req.body.coupon_type + "', coupon_name='" + req.body.coupon_name + "', coupon_code='" + req.body.coupon_code + "' , amount_type='" + req.body.amount_type + "' , amount='" + req.body.amount + "' , amount_target='" + req.body.amount_target + "' , assigned_to='" + req.body.assigned_to + "' , created='" + req.body.created + "' where id=" + req.body.id;
        } else if (req.body.coupon_type == "Discount") {
            var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.coupon_type + "', '" + req.body.coupon_name + "', '" + req.body.coupon_code + "' , '" + req.body.amount_type + "' , '" + req.body.amount + "' , NULL , '" + req.body.created + "')";
        } else if (req.body.coupon_type == "Automatic") {
            var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `amount_type`, `amount`, `amount_target`, `assigned_to`, `created`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.coupon_type + "', '" + req.body.coupon_name + "', '" + req.body.amount_type + "' , '" + req.body.amount + "' , '" + req.body.amount_target + "' , NULL , '" + req.body.created + "' )";
        } else {
            var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `assigned_to`, `created`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.coupon_type + "', '" + req.body.coupon_name + "', '" + req.body.coupon_code + "' , NULL , '" + req.body.created + "' )";
        }

        if (query != "") {
            console.log(query);
            connection.query(query, function(err7, results) {
                if (err7) {
                    res.json({ error: err7, code: 101 });
                }
                res.json({ result: results, code: 200 });
            });
        }
    }

}

/** 
Method: discountOverview
Description:Function for fetching discount data 
Created : 2016-05-08
Created By: Manoj kumar  Singh
*/
exports.discountOverview = function(req, res) {
    connection.query('SELECT * from discounts where id=' + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: changeDiscountStatus
Description:Function to change the discount status 
Created : 2016-05-08
Created By: Manoj kumar  
*/
exports.changeDiscountStatus = function(req, res) {
    connection.query("UPDATE discounts SET status='" + req.body.status + "' where id=" + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });

}

/** 
Method: deleteDiscount
Description:Function to delete the discount entry 
Created : 2016-05-08
Created By: Manoj kumar  Singh
*/
exports.deleteDiscount = function(req, res) {
    connection.query("Delete from discounts where id=" + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: assignDiscount
Description:Function to assign the discount to event 
Created : 2016-05-08
Created By: Manoj kumar  Singh 
*/
exports.assignDiscount = function(req, res) {
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;

    if (req.body.id && req.body.id != "" && req.body.id != undefined) {
        var query = "UPDATE `discounts` SET seller_id=" + req.body.seller_id + ", coupon_type='" + req.body.coupon_type + "', coupon_name='" + req.body.coupon_name + "', coupon_code='" + req.body.coupon_code + "' , amount_type='" + req.body.amount_type + "' , amount='" + req.body.amount + "' , assigned_to='" + req.body.assigned_to + "' , created='" + req.body.created + "' where id=" + req.body.id;
    } else {
        var query = "INSERT INTO `discounts` (`id`, `seller_id`, `coupon_type`, `coupon_name`, `coupon_code`, `amount_type`, `amount`, `assigned_to`, `created`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.coupon_type + "', '" + req.body.coupon_name + "', '" + req.body.coupon_code + "' , '" + req.body.amount_type + "' , '" + req.body.amount + "' , NULL , '" + req.body.created + "' )";
    }

    if (query != "") {
        console.log(query);
        connection.query(query, function(err7, results) {
            if (err7) {
                res.json({ error: err7, code: 101 });
            }
            res.json({ result: results, code: 200 });
        });
    } else {
        res.json({ error: "error", code: 101 });
    }
}

/** 
Method: makeDiscountAssignment
Description:Function to assign discount to seller for an event  
Created : 2016-05-10
Created By: Manoj kumar  Singh
*/
exports.makeDiscountAssignment = function(req, res) {
    console.log(req.body.userId)
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var query_value = "";
    req.body.created = curtime;
    console.log(req.body);

    for (var key in req.body.discount) {
        console.log(key);
        if (req.body.discount[key] != null && req.body.discount[key] != "" && req.body.discount[key] != "undefined") {
            for (var ekey in req.body.events) {
                console.log(ekey);
                if (req.body.events[ekey] != null && req.body.events[ekey] != "" && req.body.events[ekey] != "undefined") {
                    query_value += "(NULL, '" + req.body.seller_id + "', '" + req.body.events[ekey] + "', '" + req.body.discount[key] + "', '" + req.body.created + "'),";
                }
            }
        }
    }

    if (query_value != "") {
        query_value = query_value.substr(0, query_value.length - 1);
    }

    var query_option = "INSERT INTO `discount_assignments` (`id`, `seller_id`, `event_id`, `discount_id`, `created`) VALUES " + query_value;
    console.log(query_option);
    connection.query(query_option, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: delAssignment
Description:Function to delete assignment for event  
Created : 2016-05-10
Created By: Manoj kumar  Singh
*/
exports.delAssignment = function(req, res) {
    connection.query("Delete from discount_assignments where discount_id=" + req.body.discount_id + " and event_id=" + req.body.event_id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: Assignment Discount
Description:Function to Assignmentz Discount  
Created : 2016-05-17
Created By: Manoj kumar  Singh
*/

exports.exportDiscountCSV = function(req, res) {
    var condition = "";
    if (req.query.seller != "" && req.query.seller != "[]" && req.query.seller != "undefined") {
        condition = " seller_id =" + req.query.seller;
    }
    if (req.query.ids != "" && req.query.ids != "[]" && req.query.ids != "undefined") {
        var strold = req.query.ids;
        var strnew = strold.substr(1, strold.length - 2);
        condition += " AND id IN (" + strnew + ")";
    }
    console.log('select * from discounts where ' + condition);

    query = connection.query('select * from discounts where ' + condition, function(err, rows, fields) {
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

/** 
Method: Get Selected Discount
Description:Get Selected Discount  
Created : 2016-05-17
Created By: Manoj kumar  Singh
*/

exports.getSelectedDiscount = function(req, res) {

    var condition = "";
    var condition2 = "";
    if (req.body.seller_id != "" && req.body.seller_id != null && req.body.seller_id != "undefined") {
        condition = " seller_id =" + req.body.seller_id;
        condition2 = " seller_id =" + req.body.seller_id;
    }
    if (req.body.ids != "" && req.body.ids != "[]" && req.body.ids != "undefined") {
        var strold = String(req.body.ids);
        var strnew = strold.substr(0, strold.length);
        condition += " AND id IN (" + strnew + ")";
        //condition2 += " AND id NOT IN ("+strnew+")";
    }

    if (condition != "") {
        connection.query('select * from discounts where ' + condition, function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
            } else {
                ///////////////////////////////////////////
                connection.query('select * from discounts where ' + condition2, function(err2, results2) {
                    res.json({ result: results, allcode: results2, code: 200 });
                });
                //////////////////////////////////////////
            }
        });
    } else {
        res.json({ error: "error", code: 101 });
    }
}

/** 
Method: getEventPriceLevels
Description:Function to get the event details and its corresponding price levels  
Created : 2016-05-27
Created By: Manoj Kumar
*/
exports.getEventPriceLevels = function(req, res) {

    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log('req', req.body);

    var condition = "";
    var condition2 = "";

    if (req.body.user_id != "" && req.body.user_id != null && req.body.user_id != "undefined") {
        condition = " user_id =" + req.body.user_id;
        condition2 = " user_id =" + req.body.user_id;
    }
    if (req.body.eventcheckboxGlobalIds != "" && req.body.eventcheckboxGlobalIds != "[]" && req.body.eventcheckboxGlobalIds != "undefined") {
        var strold = String(req.body.eventcheckboxGlobalIds);
        var strnew = strold.substr(0, strold.length);
        condition += " AND id IN (" + strnew + ")";
        condition2 += " AND event_id IN (" + strnew + ")";
    }

    if (condition != "") {
        var query = 'select id,user_id,title,event_address,city from events where ' + condition;
        console.log('query -------', query);
        connection.query(query, function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
            } else {

                var query1 = 'select id,event_id,user_id,price_level_name from price_levels where ' + condition2;
                console.log('query1 -------', query1);
                connection.query(query1, function(err2, results2) {
                    if (err2) {
                        res.json({ error: err2, code: 101 });
                    } else {
                        res.json({ events: results, price_levels: results2, code: 200 });
                    }
                });
            }

        });
    } else {
        res.json({ error: "error", code: 101 });
    }

}

/** 
Method: saveFinalAssignmet
Description:Function to assign coupons to the event details and its corresponding price levels  
Created : 2016-05-30
Created By: Manoj Kumar
*/
exports.saveFinalAssignmet = function(req, res) {
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');

    for (var key in req.body.discount_id) {

        if (req.body.discount_id[key] != null && req.body.discount_id[key] != "" && req.body.discount_id[key] != "undefined") {

            var discount_id = req.body.discount_id[key];

            if (req.body.events == "all_events") {

                var event_type_flag = 1;
                var price_level_type_flag = 1;

                var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `common_id`, `event_type`,`event_id`, `price_level_type`,`price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + ", " + req.body.common_id + ", '"+ event_type_flag + "',  NULL ,  " + price_level_type_flag + " ,  NULL ,  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";

                connection.query(query_value, function(err, results) {
                    if (err) {
                        res.json({ error: err, code: 101 });
                    }
                });

            }

            if (req.body.events == "choose_events") {

                for (var event_id_key in req.body.event_id) {
                    var event_idd = event_id_key;
                    var price_level_type = req.body.event_id[event_id_key].price_levels;

                    if ('choosen_price_level' in req.body.event_id[event_id_key]) {

                        var choosen_price_level = req.body.event_id[event_id_key].choosen_price_level;
                        for (var choosen_price_level_key in choosen_price_level) {

                            var event_type_flag = 0;
                            if (price_level_type == "individual_price_levels") {
                                var price_level_type_flag = 0;
                            } else {
                                var price_level_type_flag = 1;
                            }

                            var choosen_price_level_id = choosen_price_level_key;

                            var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `common_id`,`event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + ", " + req.body.common_id + ", '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , " + choosen_price_level_key + ",  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";
                            console.log('query_value', query_value);

                            connection.query(query_value, function(err, results) {
                                if (err) {
                                    res.json({ error: err, code: 101 });
                                }
                            });

                        }

                    } else {
                        var event_type_flag = 1;
                        var price_level_type_flag = 1;
                        console.log('choosen_price_level doesnot exist for event ', event_id_key);

                        var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `common_id`, `event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + ", " + req.body.common_id + ", '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , NULL ,  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";

                        connection.query(query_value, function(err, results) {
                            if (err) {
                                res.json({ error: err, code: 101 });
                            }
                        });

                    }

                }

            }

        }

    }

    error = 0;

    res.json({ success: 'success', code: 200 });

}



/** 
Method: discountAssignmentOverview
Description:Function for discount Assignment Overview
Created : 2016-06-06
Created By: Manoj Kumar
*/
exports.discountAssignmentOverview = function(req, res) {
    var query_discount = 'SELECT coupon_name, coupon_code from discounts where id=' + req.body.id;
    
    console.log('query_discount' , query_discount );
    connection.query(query_discount, function(err, discount) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        var query_discount_assignments_individual = 'SELECT da . * , e.title, pl.price_level_name FROM discount_assignments da INNER JOIN events e ON e.id = da.event_id LEFT JOIN price_levels pl ON da.price_level = pl.id WHERE da.seller_id =' + req.body.seller_id + ' AND da.discount_id =' + req.body.id;

        console.log('query_discount_assignments_individual' , query_discount_assignments_individual );
        connection.query(query_discount_assignments_individual, function(error_individual, discountAssignments) {
            if (err) {
                res.json({ error: error_individual, code: 101 });
            }

        var query_discount_assignments_global = 'SELECT * from discount_assignments where seller_id=' + req.body.seller_id + ' and discount_id = ' + req.body.id +' and event_type = 1 and event_id IS NULL AND price_level_type = 1 and price_level IS NULL'; 
        console.log('query_discount_assignments_global' , query_discount_assignments_global );
        connection.query(query_discount_assignments_global, function(error_global, globalDiscountAssignments) {
            if (err) {
                res.json({ error: error_global, code: 101 });
            }

console.log('discount',discount , 'discountAssignments', discountAssignments, 'globalDiscountAssignments' , globalDiscountAssignments);
            res.json({ discount:discount , discountAssignments: discountAssignments, globalDiscountAssignments:globalDiscountAssignments, code: 200 });
        });
      });
  });
}

/** 
Method: delDiscountAssignment
Description:Function to delete discount assignment using id
Created : 2016-05-10
Created By: Manoj kumar  Singh
*/
exports.delDiscountAssignment = function(req, res) {
    
    var ids = '';
    for(index in req.body.id) {
      ids+= req.body.id[index]+"," ;
    }

    ids = ids.slice(0, -1);
    var delQuery = "Delete from discount_assignments where id in (" + ids + ") and seller_id =" + req.body.seller_id + " and discount_id = "+ req.body.discount_id;
    console.log('delQuery' , delQuery);
    connection.query(delQuery, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

/** 
Method: delPriceLevelDiscAssignment
Description:Function to delete discount assignment using common_id
Created : 2016-05-10
Created By: Manoj kumar  Singh
*/

exports.delPriceLevelDiscAssignment = function(req, res) {
    
    var delQuery = "Delete from discount_assignments where common_id = "+ req.body.common_id +" and seller_id =" + req.body.seller_id + " and discount_id = "+ req.body.discount_id;
    
    console.log('delQuery' , delQuery);
    connection.query(delQuery, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}


/** 
Method: getAssignDiscountDetails
Description:Function for discount Assignment Details
Created : 2016-06-08
Created By: Manoj Kumar
*/

exports.getAssignDiscountDetails = function(req, res) {
  
    var query = "SELECT da.* , d .id as discount_id, d.coupon_name,d.coupon_code FROM discount_assignments da INNER JOIN discounts d ON da.discount_id = d.id where da.seller_id = " + req.body.seller_id + "  and da.id = " + req.body.id ;

    console.log('query' , query);
    connection.query(query, function(error, results) {
        if (error) {
            res.json({ error: error, code: 101 });
        }
            res.json({ result: results, code: 200 });

  });

}


exports.updateFinalAssignment = function(req, res) {
    console.log('req.body' , req.body);



 if (req.body.discount_id != null && req.body.discount_id != "" && req.body.discount_id != "undefined") {

            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');

            var discount_id = req.body.discount_id;

            if (req.body.events == "all_events") {

                var event_type_flag = 1;
                var price_level_type_flag = 1;

                

                var query_value = " UPDATE `discount_assignments` SET `discount_id` =" + discount_id + ", `common_id` =" + req.body.common_id + " , `event_type` = '" + event_type_flag + "'  ,`event_id` = NULL , `price_level_type` = " + price_level_type_flag + " ,`price_level` = NULL , `usage_limit` = " + req.body.usage_limit + ", `timezone` =  '" + req.body.timezone + "', `taggable` = '" + req.body.taggable + "' , `start_date` = '" + req.body.start_date + "', `start_time` =  '" + req.body.start_time + "' , `end_date` = '" + req.body.end_date + "' , `end_time` = '" + req.body.end_time + "' WHERE `id` = " + req.body.id + " and `seller_id` = " + req.body.seller_id + " and `discount_id` = " + req.body.discount_id ;
                console.log('query_value' , query_value);

                
                connection.query(query_value, function(err, results) {
                    if (err) {
                        res.json({ error: err, code: 101 });
                    }
                     res.json({ result: results, code: 200 });

                }); 
            }


            if (req.body.events == "choose_events") {

          console.log('delete globally assigned coupon & event info & then insert the new record');

  var old_start_date = moment(req.body.old_start_date).format('YYYY-MM-DD HH:mm:ss');
  var old_end_date = moment(req.body.old_end_date).format('YYYY-MM-DD HH:mm:ss');

          var delete_global_discount_query = "DELETE FROM `discount_assignments` WHERE discount_id = "+req.body.discount_id +" and seller_id = "+req.body.seller_id +" and start_date = '"+old_start_date +"' and end_date = '"+ old_end_date+"'";

          console.log('delete_global_discount_query' , delete_global_discount_query);

          connection.query(delete_global_discount_query, function(err, delete_result) {
                if (err) {
                    res.json({ error: err, code: 101 });
                }


                for (var event_id_key in req.body.event_id) {
                    var event_idd = event_id_key;
                    var price_level_type = req.body.event_id[event_id_key].price_levels;

                    if ('choosen_price_level' in req.body.event_id[event_id_key]) {

                        var choosen_price_level = req.body.event_id[event_id_key].choosen_price_level;
                        for (var choosen_price_level_key in choosen_price_level) {

                            var event_type_flag = 0;
                            if (price_level_type == "individual_price_levels") {
                                var price_level_type_flag = 0;
                            } else {
                                var price_level_type_flag = 1;
                            }

                            var choosen_price_level_id = choosen_price_level_key;

var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `common_id`, `event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + "," + req.body.common_id + " , '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , " + choosen_price_level_key + ",  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";


                            console.log('query_value', query_value);

                            connection.query(query_value, function(err, results) {
                                if (err) {
                                    res.json({ error: err, code: 101 });
                                }
                            });

                        }

                    } else {
                        var event_type_flag = 1;
                        var price_level_type_flag = 1;
                        console.log('choosen_price_level doesnot exist for event ', event_id_key);

                          var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `common_id`, `event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + "," + req.body.common_id + " , '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , NULL ,  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";

                        connection.query(query_value, function(err, results) {
                            if (err) {
                                res.json({ error: err, code: 101 });
                            }
                        });

                    }

                } 


                     




             
            });

                 res.json({ result: "results", code: 200 });

                



                

            }
        }
}


exports.updateFinalAssignmentOLd = function(req, res) {
    console.log('req.body' , req.body);

 if (req.body.discount_id != null && req.body.discount_id != "" && req.body.discount_id != "undefined") {

            var curtime = moment().format('YYYY-MM-DD HH:mm:ss');

            var discount_id = req.body.discount_id;

            if (req.body.events == "all_events") {

                var event_type_flag = 1;
                var price_level_type_flag = 1;

                var query_value = " UPDATE `discount_assignments` SET `discount_id` =" + discount_id + ", `event_type` = '" + event_type_flag + "'  ,`event_id` = NULL , `price_level_type` = " + price_level_type_flag + " ,`price_level` = NULL , `usage_limit` = " + req.body.usage_limit + ", `timezone` =  '" + req.body.timezone + "', `taggable` = '" + req.body.taggable + "' , `start_date` = '" + req.body.start_date + "', `start_time` =  '" + req.body.start_time + "' , `end_date` = '" + req.body.end_date + "' , `end_time` = '" + req.body.end_time + "' WHERE `id` = " + req.body.id + " and `seller_id` = " + req.body.seller_id + " and `discount_id` = " + req.body.discount_id ;

                console.log('query_value' , query_value);

                
                connection.query(query_value, function(err, results) {
                    if (err) {
                        res.json({ error: err, code: 101 });
                    }
                     res.json({ result: results, code: 200 });

                }); 
            }


            if (req.body.events == "choose_events") {

                var delete_old = 0;
                var select_query = "select event_type , event_id , price_level_type , price_level from discount_assignments where id = "+req.body.id;

console.log('select_query' , select_query);
                connection.query(select_query, function(err, select_results) {
                if (err) {
                    res.json({ error: err, code: 101 });
                }
               
                var s_event_type = select_results[0]['event_type'];
                var s_event_id = select_results[0]['event_id'];
                var s_price_level_type = select_results[0]['price_level_type'];
                var s_price_level = select_results[0]['price_level'];

                console.log('s_event_type' , s_event_type);
                console.log('s_event_id' , s_event_id);
                console.log('s_price_level_type' , s_price_level_type);
                console.log('s_price_level' , s_price_level);

                if(s_event_type == 1 && s_price_level_type == 1 && s_event_id== null &&  s_price_level==null) {
                    delete_old = 1;



                    console.log('delete globally assigned coupon & event info & then insert the new record');

                     var delete_global_discount_query = "DELETE FROM `discount_assignments` WHERE id = "+req.body.id;

                connection.query(delete_global_discount_query, function(err, delete_result) {
                                if (err) {
                                    res.json({ error: err, code: 101 });
                                }


                for (var event_id_key in req.body.event_id) {
                    var event_idd = event_id_key;
                    var price_level_type = req.body.event_id[event_id_key].price_levels;

                    if ('choosen_price_level' in req.body.event_id[event_id_key]) {

                        var choosen_price_level = req.body.event_id[event_id_key].choosen_price_level;
                        for (var choosen_price_level_key in choosen_price_level) {

                            var event_type_flag = 0;
                            if (price_level_type == "individual_price_levels") {
                                var price_level_type_flag = 0;
                            } else {
                                var price_level_type_flag = 1;
                            }

                            var choosen_price_level_id = choosen_price_level_key;

var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + ", '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , " + choosen_price_level_key + ",  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";


                            console.log('query_value', query_value);

                            connection.query(query_value, function(err, results) {
                                if (err) {
                                    res.json({ error: err, code: 101 });
                                }
                            });

                        }

                    } else {
                        var event_type_flag = 1;
                        var price_level_type_flag = 1;
                        console.log('choosen_price_level doesnot exist for event ', event_id_key);

                          var query_value = " INSERT INTO `discount_assignments` (`id`, `seller_id`, `discount_id`, `event_type`,`event_id`, `price_level_type`, `price_level`, `usage_limit`, `timezone`, `taggable`, `start_date`, `start_time`, `end_date`, `end_time`, `created`) VALUES (NULL, " + req.body.seller_id + ", " + discount_id + ", '" + event_type_flag + "',  " + event_idd + " ,  '" + price_level_type_flag + "' , NULL ,  " + req.body.usage_limit + ", '" + req.body.timezone + "', '" + req.body.taggable + "', '" + req.body.start_date + "', '" + req.body.start_time + "', '" + req.body.end_date + "', '" + req.body.end_time + "', '" + curtime + "')";

                        connection.query(query_value, function(err, results) {
                            if (err) {
                                res.json({ error: err, code: 101 });
                            }
                        });

                    }

                } 


                        });




                }

                else {

                    for (var event_id_key in req.body.event_id) {
                    var event_idd = event_id_key;
                    var price_level_type = req.body.event_id[event_id_key].price_levels;

                    if ('choosen_price_level' in req.body.event_id[event_id_key]) {

                        var choosen_price_level = req.body.event_id[event_id_key].choosen_price_level;
                        for (var choosen_price_level_key in choosen_price_level) {

                            var event_type_flag = 0;
                            if (price_level_type == "individual_price_levels") {
                                var price_level_type_flag = 0;
                            } else {
                                var price_level_type_flag = 1;
                            }

                            var choosen_price_level_id = choosen_price_level_key;

var query_value = " UPDATE `discount_assignments` SET `discount_id` =" + discount_id + ", `event_type` = '" + event_type_flag + "'  ,`event_id` = " + event_idd + " , `price_level_type` = " + price_level_type_flag + " ,`price_level` = " + choosen_price_level_key + " , `usage_limit` = " + req.body.usage_limit + ", `timezone` =  '" + req.body.timezone + "', `taggable` = '" + req.body.taggable + "' , `start_date` = '" + req.body.start_date + "', `start_time` =  '" + req.body.start_time + "' , `end_date` = '" + req.body.end_date + "' , `end_time` = '" + req.body.end_time + "' WHERE `id` = " + req.body.id + " and `seller_id` = " + req.body.seller_id + " and `discount_id` = " + req.body.discount_id ;

                            console.log('query_value', query_value);

                            connection.query(query_value, function(err, results) {
                                if (err) {
                                    res.json({ error: err, code: 101 });
                                }
                            });

                        }

                    } else {
                        var event_type_flag = 1;
                        var price_level_type_flag = 1;
                        console.log('choosen_price_level doesnot exist for event ', event_id_key);

                        var query_value = " UPDATE `discount_assignments` SET `discount_id` =" + discount_id + ", `event_type` = '" + event_type_flag + "'  ,`event_id` = " + event_idd + " , `price_level_type` = " + price_level_type_flag + " ,`price_level` = NULL , `usage_limit` = " + req.body.usage_limit + ", `timezone` =  '" + req.body.timezone + "', `taggable` = '" + req.body.taggable + "' , `start_date` = '" + req.body.start_date + "', `start_time` =  '" + req.body.start_time + "' , `end_date` = '" + req.body.end_date + "' , `end_time` = '" + req.body.end_time + "' WHERE `id` = " + req.body.id + " and `seller_id` = " + req.body.seller_id + " and `discount_id` = " + req.body.discount_id ;

                        connection.query(query_value, function(err, results) {
                            if (err) {
                                res.json({ error: err, code: 101 });
                            }
                        });

                    }

                } 

                }


                
                
             
            });

                 res.json({ result: "results", code: 200 });

                



                

            }
        }
}


/*
exports.getDiscountsOfEvent = function(req,res){
console.log('getDiscountsOfEvent')
  var query = "SELECT * FROM discount_assignments da JOIN discounts d ON da.seller_id = d.seller_id AND da.discount_id = d.id WHERE da.seller_id ="+req.body.userId+ "  AND da.event_id =  "+req.body.eventId;

  console.log('-------------------------');
  console.log(query);
  
  connection.query(query, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
    console.log('results' , results);
      res.json({result:results,code:200});
  });
}
*/


exports.getCountDiscountsOfEvent = function(req,res){
console.log('getDiscountsOfEvent')
  var query = "SELECT count(*) as count FROM discount_assignments da JOIN discounts d ON da.seller_id = d.seller_id AND da.discount_id = d.id WHERE da.seller_id ="+req.body.userId+ "  AND da.event_id =  "+req.body.eventId;

  console.log('-------------------------');
  console.log(query);
  
  connection.query(query, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
    console.log('results' , results);
      res.json({result:results,code:200});
  });
}





exports.getDiscountsOfEvent = function(req, res) {
req.body.seller_id = req.body.userId;
 
var query_discount_assignments_individual = 'SELECT da . * , e.title, pl.price_level_name,dis.coupon_name , dis.coupon_code, dis.coupon_type FROM discount_assignments da INNER JOIN events e ON e.id = da.event_id LEFT JOIN discounts dis ON dis.id = da.discount_id LEFT JOIN price_levels pl ON da.price_level = pl.id WHERE da.seller_id =' + req.body.seller_id + ' AND da.event_id =' + req.body.eventId;

 var query_discount_assignments_global = 'SELECT * from discount_assignments where seller_id=' + req.body.seller_id + ' and event_id = ' + req.body.eventId +' and event_type = 1 and event_id IS NULL AND price_level_type = 1 and price_level IS NULL'; 

console.log('query_discount_assignments_individual' , query_discount_assignments_individual );
console.log('query_discount_assignments_global' , query_discount_assignments_global );

    connection.query(query_discount_assignments_individual, function(error_individual, discountAssignments) {
        if (error_individual) {
            res.json({ error: error_individual, code: 101 });
        }

        connection.query(query_discount_assignments_global, function(error_global, globalDiscountAssignments) {
            if (error_global) {
                res.json({ error: error_global, code: 101 });
            }

            res.json({ discount:discountAssignments , discountAssignments: discountAssignments, globalDiscountAssignments:globalDiscountAssignments, code: 200 });
        });
      });
  
}