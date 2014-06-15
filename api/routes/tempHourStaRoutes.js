var TempHourSta = require('../models/tempHourSta');
var dateStringToDate = require('../../app/js/dateStringToDate');

module.exports = function(app, socket) {

	app.get('/api/v0_0_1/daily-high-low/:station_id/:start_date/:end_date', function(req, res){

		res.setHeader('Content-Type', 'application/json');

		var startDate = dateStringToDate(req.params.start_date);
		var endDate = dateStringToDate(req.params.end_date);

		if (!(startDate && endDate)){
			res.end(500, {'error':'invalid date format'});
		};

		var reqObj = {stationId: req.params.station_id, startDate: startDate, endDate: endDate};

		socket.emit('getDailyHighLow', reqObj, function (data) {
		    res.send(data);
		});
	});
};

