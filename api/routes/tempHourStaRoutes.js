var TempHourSta = require('../models/tempHourSta');
var dateStringToDate = require('../../app/js/dateStringToDate');

exports.dailyHighLow = function(req, res) {

	console.log(req.params.station_id);
	console.log(req.params.start_date);
	console.log(req.params.end_date);

	res.setHeader('Content-Type', 'application/json');

	var startDate = dateStringToDate(req.params.start_date);
	var endDate = dateStringToDate(req.params.end_date);

	if (!(startDate && endDate)){
		res.end(500, {'error':'invalid date format'});
	};

	TempHourSta.find({
		$and: [
			 {date: { $gte: startDate, $lte: endDate }},
			 {stationId: req.params.station_id}
		]
	}, null, {sort: {date: 1}}
	, function(err, temps) {
		if(err) {
			res.send(500, {'error': err});
			return false;
		};
		res.send(temps);
	});
};
