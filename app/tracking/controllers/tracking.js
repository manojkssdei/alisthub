var moment = require('moment-timezone');



exports.saveTag = function(req, res) {

    console.log(req.body);
    if (req.body.id != undefined && req.body.id != '') {
        var query = "UPDATE tracking_tag SET " + "seller_id='" + req.body.seller_id + 
        "'," + "description='" + req.body.description +
         "'," + "tag='" + req.body.tag + "'," + "user='" + req.body.user+
         "' where id=" + req.body.id;

        connection.query(query, function(err7, results) {});
        connection.query('SELECT * from tracking_tag where seller_id=' + req.body.seller_id + ' ORDER BY id DESC', function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
            }
            res.json({ result: results, code: 200 });
        })

    } else {
        var query = "INSERT INTO `tracking_tag` (`id`,`tag`,`description`,`seller_id`, user) VALUES (NULL, '" + req.body.tag + "','" + req.body.description + "','" + req.body.seller_id + "','" + req.body.user + "')";
        connection.query(query, function(err7, results) {
            if (err7) {
                return res.json({ error: err7, code: 101 });
            }
            return res.json({ result: results, code: 200 });
        });
    }
}


exports.getTag = function(req, res) {
    connection.query('SELECT T.*, CONCAT(S.first_name," ", S.last_name) as username from tracking_tag T LEFT JOIN seller_users S ON T.user = S.id  where T.seller_id=' + req.body.seller_id + ' ORDER BY   T.id DESC', function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

exports.getTagDetail = function(req, res) {

    connection.query("SELECT * from tracking_tag where id='" + req.body.id + "' AND seller_id = '" + req.body.seller_id + "' ORDER BY id DESC", function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

exports.deleteTag = function(req, res) {
    console.log(req.body);
    console.log("Delete from tracking_tag where seller_id ='" + req.body.seller_id + "' AND id=" + req.body.id);
    connection.query("Delete from tracking_tag where seller_id ='" + req.body.seller_id + "' AND id=" + req.body.id, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}

exports.getUser = function(req, res) {
    connection.query('SELECT * from seller_users where seller_id=' + req.body.seller_id + ' ORDER BY created DESC', function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        }
        res.json({ result: results, code: 200 });
    });
}
