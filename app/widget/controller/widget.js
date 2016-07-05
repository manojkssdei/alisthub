var moment     = require('moment-timezone');


exports.getWidget = function(req,res){
  connection.query('SELECT * from checkout_widgets where seller_id='+req.body.seller_id+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}




exports.getWidgetDetail = function(req,res) {
  connection.query('SELECT * from checkout_widgets where id='+req.body.id+ ' ORDER BY created DESC', function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}




exports.savewidget = function(req,res) {
 
  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
  req.body.created = curtime;
 
  if(req.body.id!=undefined && req.body.id!='')
  {
     var query="UPDATE checkout_widgets SET "
                  +"seller_id='"+req.body.seller_id+"',"
                  +"widget_description='"+req.body.widget_description+"',"
                  +"template_id='"+req.body.template_id+"',"
                  +"min_height='"+req.body.min_height+"',"
                  +"max_height='"+req.body.max_height+"',"
                  +"show_template_header='"+req.body.show_template_header+"',"
                  +"show_vanue_name='"+req.body.show_vanue_name+"',"
                  +"override_event_temlates='"+req.body.override_event_temlates+"',"
                  +"begin_calendar_view='"+req.body.begin_calendar_view+"',"
                  +"show_event_list='"+req.body.show_event_list+"',"
                  +"use_category_colors='"+req.body.use_category_colors+"',"
                  +"tracking_tag='"+req.body.tracking_tag+"',"
                  +"width='"+req.body.width+

                  "'where id="+req.body.id;
     
  }
  else
  {

  var query = "INSERT INTO `checkout_widgets` (`id`,`seller_id`,`template_id`, `width`, `min_height`, `max_height`,`show_template_header`,`show_vanue_name`, `override_event_temlates`, `begin_calendar_view`,`show_event_list`,`use_category_colors`,`tracking_tag`,`widget_description`,`created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.template_id+"', '"+req.body.width+"', '"+req.body.min_height+"', '"+req.body.max_height+"', '"+req.body.show_template_header+"','"+req.body.show_vanue_name+"', '"+req.body.override_event_temlates+"','"+req.body.begin_calendar_view+"','"+req.body.show_event_list+"','"+req.body.use_category_colors+"','"+req.body.tracking_tag+"','"+req.body.widget_description+"','"+curtime+"')";   

}
  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       return  res.json({error:err7,code:101});
      }
     return  res.json({result:results,code:200});
    });

  } else {
      return res.json({error:"error",code:101}); 
  }
}