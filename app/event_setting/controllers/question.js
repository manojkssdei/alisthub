/** 
Controller for the question managment 
Created : 2016-05-02
Created By: Manoj kumar Singh
Module : manage question 
*/
var moment       = require('moment-timezone');

/** 
Method: getQuestions
Description:Function for fetching questions 
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.getQuestions = function(req,res){
  connection.query('SELECT * from questions where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     var event_count = "SELECT count(*) AS count, question_id FROM question_assignments WHERE seller_id ="+req.body.userId+" GROUP BY question_id";
     connection.query(event_count, function(err2, cresults) {
      res.json({result:results,counts:cresults,code:200});
     });
  });
}

/** 
Method: addQuestion
Description:Function for adding question 
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.addQuestion = function(req,res){
     
     if (req.body.question_type == "" || req.body.question_type == "undefined" || req.body.question_type == undefined || req.body.question_name == "" || req.body.question_name == "undefined" || req.body.question_name == undefined) {
          res.json({error:"error",type:"validation",code:101});     
     } else {     
          if (req.body.id && req.body.id !="" && req.body.id != undefined) {
          var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
          req.body.modified = curtime;
          if (req.body.question_type == "Text" || req.body.question_type == "Multiple Choice") {
          var query = "UPDATE `questions` SET seller_id="+req.body.seller_id+", question_type='"+req.body.question_type+"', question_name='"+req.body.question_name+"', required='"+req.body.required+"', modified='"+req.body.modified+"' where id="+req.body.id;
          }
          
          if (req.body.question_type == "Waiver") {
          var query = "UPDATE `questions` SET seller_id="+req.body.seller_id+", question_type='"+req.body.question_type+"', question_name='"+req.body.question_name+"', weaver_text='"+req.body.weaver_text+"', agree_phase='"+req.body.agree_phase+"', required='"+req.body.required+"', modified='"+req.body.modified+"' where id="+req.body.id;       
          }
          
          if (req.body.question_type == "Address") {
          var query = "UPDATE `questions` SET seller_id="+req.body.seller_id+", question_type='"+req.body.question_type+"', question_name='"+req.body.question_name+"', address_map_bill='"+req.body.address_map_bill+"', address_map_ship='"+req.body.address_map_ship+"', required='"+req.body.required+"', modified='"+req.body.modified+"' where id="+req.body.id;     
          }
          
          }
          else
          {
          var curtime = moment().format('YYYY-MM-DD HH:mm:ss');       
          req.body.created = curtime;
          if (req.body.question_type == "Text" || req.body.question_type == "Multiple Choice") {
               var query = "INSERT INTO `questions` (`id`, `seller_id`, `question_type`, `question_name`, `required`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.question_type+"', '"+req.body.question_name+"', '"+req.body.required+"', '"+req.body.created+"')";
          }
          if (req.body.question_type == "Waiver") {
               var query = "INSERT INTO `questions` (`id`, `seller_id`, `question_type`, `question_name`, `required`, `weaver_text`, `agree_phase`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.question_type+"', '"+req.body.question_name+"', '"+req.body.required+"', '"+req.body.weaver_text+"', '"+req.body.agree_phase+"', '"+req.body.created+"')";
          }
          
          if (req.body.question_type == "Address") {
               var query = "INSERT INTO `questions` (`id`, `seller_id`, `question_type`, `question_name`, `required`, `address_map_bill`, `address_map_ship`, `created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.question_type+"', '"+req.body.question_name+"', '"+req.body.required+"', '"+req.body.address_map_bill+"', '"+req.body.address_map_ship+"', '"+req.body.created+"')";
          }
          
          
          }
          
          if (query != "") {
              console.log(query);
              connection.query(query, function(err7, results) {
               if (err7) {
                res.json({error:err7,code:101});
               }
               if (req.body.question_type == "Multiple Choice") {
                    
               var query_value = "";
               
               var options = req.body.option;
               
               var question_id = results.insertId;
               
               if (req.body.id && req.body.id !="" && req.body.id != undefined)
               {
                    var question_id = req.body.id;
                    
                    var query_delete = "DELETE FROM `question_options` where question_id="+question_id;
                    connection.query(query_delete, function(err9, res) {
                    });
               
               }
               
               for(var key in options) {
                    if (options[key] != null && options[key] != "" && options[key] != "undefined") {
                         query_value += "(NULL, '"+question_id+"', '"+options[key]+"', '"+req.body.created+"'),";
                    }
               }
               
               if (query_value != "") {
               query_value = query_value.substr(0, query_value.length-1);
               var query_option = "INSERT INTO `question_options` (`id`, `question_id`, `option`, `created`) VALUES "+query_value;
               
               connection.query(query_option, function(err8, res) {
               });
               
               }
                          
               }
               
               res.json({result:results,code:200});
          });
          }
          else
          {
              res.json({error:"error",type:"validation",code:101}); 
          }
     }
}

/** 
Method: questionOverview
Description:Function for question overview data 
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.questionOverview = function(req,res) {
  connection.query('SELECT * from questions as Qu where Qu.id='+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     connection.query('SELECT * from question_options  where question_id='+req.body.id, function(err8, qresults) {
       var event_query = "SELECT QA.*,E.title,E.id FROM `question_assignments` AS QA LEFT JOIN events AS E on E.id=QA.event_id where QA.question_id="+req.body.id+" group by QA.question_id,QA.event_id";
       connection.query(event_query, function(err9, eresults) {
         res.json({result:results,options:qresults,quesassignment:eresults,code:200});
       })
     })
  });
}

/** 
Method: changeQuestionStatus
Description:Function to change question data 
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.changeQuestionStatus = function(req,res) { 
  connection.query("UPDATE questions SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: deleteQuestion
Description:Function to delete question  
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.deleteQuestion = function(req,res) {
  connection.query("Delete from questions where id="+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: viewEvents
Description:Function to get the view page data for event  
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.viewEvents = function(req,res) {
  var type = 2;

  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
   
  var query = "Select id,user_id,title,event_address,city from events where start_date > '"+curtime+"' limit 10";
   
  if(req.body.search_date){
     search_date = req.body.search_type
  }
  if(req.body.search_type){
     type = req.body.search_type;
  }
   
  if (type == 1 && req.body.search_date) {
     query = "Select id,user_id,title,event_address,city from events where start_date = '"+req.body.search_date+"' limit 10";
  }
  if (type == 2 && req.body.search_date) {
     query = "Select id,user_id,title,event_address,city from events where start_date < '"+req.body.search_date+"' limit 10";
  }
  if (type == 3 && req.body.search_date) {
     query = "Select id,user_id,title,event_address,city from events where start_date >= '"+req.body.search_date+"' limit 10";
  }
       
  console.log(query);
  connection.query(query, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: makeAssignment
Description:Function to get make the assignment  
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.makeAssignment = function(req,res){
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var query_value = "";
    req.body.created = curtime;
    
    for(var key in req.body.question) {
      console.log(key);
      if (req.body.question[key] != null && req.body.question[key] != "" && req.body.question[key] != "undefined") {
           for(var ekey in req.body.events) {
              console.log(ekey);
              if (req.body.events[ekey] != null && req.body.events[ekey] != "" && req.body.events[ekey] != "undefined") {
                query_value += "(NULL, '"+req.body.seller_id+"', '"+req.body.events[ekey]+"', '"+req.body.question[key]+"', '"+req.body.created+"'),";
              }
           }
      }
    }
    
    if (query_value != "") {
      query_value = query_value.substr(0, query_value.length-1);
    }
    var query_option = "INSERT INTO `question_assignments` (`id`, `seller_id`, `event_id`, `question_id`, `created`) VALUES "+query_value;
    console.log(query_option); 
    connection.query(query_option, function(err, results) {
        if (err) {
          res.json({error:err,code:101});
        }
        res.json({result:results,code:200});
    });
}

/** 
Method: delAssignment
Description:Function to delete the questions assignment  
Created : 2016-05-02
Created By: Manoj kumar  
*/
exports.delAssignment = function(req,res) {
    connection.query("Delete from question_assignments where question_id="+req.body.question_id+ " and event_id="+req.body.event_id , function(err, results) {
       if (err) {
        res.json({error:err,code:101});
       }
       res.json({result:results,code:200});
    });
}

