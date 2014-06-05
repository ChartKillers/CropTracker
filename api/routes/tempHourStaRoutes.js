var TempHourSta = require('../models/tempHourSta');

exports.collection = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	TempHourSta.find({}, function(err, temps) {
		if(err) {
			res.send(500, {'error': err});
			return false;
		};
		res.send(temps);
	});
};
