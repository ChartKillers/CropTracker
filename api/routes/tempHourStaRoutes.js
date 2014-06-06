var TempHourSta = require('../models/tempHourSta');

exports.dailyHighLow = function(req, res) {

	console.log(req.params.station_id)

	res.setHeader('Content-Type', 'application/json');

	TempHourSta.find({

		stationId: req.params.station_id,


	}, null, {sort: {date: 1}}
	, function(err, temps) {
		if(err) {
			res.send(500, {'error': err});
			return false;
		};
		res.send(temps);
	});
};
