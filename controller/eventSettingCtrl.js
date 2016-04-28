//var Tutors    = require('../model/Tutor.js');

module.exports.addVenue = function(req,res,next){
	
        res.send({'message' : 'success'});	
	/*Students.update({_id: req.body.student}, {$addToSet: {fav_tutor: req.body.tutor}}, {upsert: true}).exec(function (err, data) {
        if (err) {
		res.send('error');	
	}
	else{
		res.send({'message' : 'success'});	
	}
	});*/
}