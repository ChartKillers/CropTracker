var TempHourSta = require('../models/tempHourSta');
var dateStringToDate = require('../../app/js/dateStringToDate');
var http = require('http');

module.exports = function(app) {

	app.get('/api/v0_0_1/daily-high-low/:station_id/:start_date/:end_date', function(req, res){

		res.setHeader('Content-Type', 'application/json');

		var startDate = req.params.start_date;
		var endDate = req.params.end_date;

		if (!(startDate && endDate)){
			res.end(500, {'error':'invalid date format'});
		}

		var URL = 'http://shrouded-falls-4448.herokuapp.com/api/v1/stations?station_nbr=' +
								req.params.station_id + '&start_date=%22' +
								startDate + '%22&end_date=%22' + endDate + '%22';


		http.get(URL, function (result) {
				result.setEncoding('utf8');
				var body = '';
				var tempData = [];

				result.on("data", function(chunk){
						body += chunk;
				});

				result.on("end", function() {
						tempData = JSON.parse(body);
						res.send(tempData);
				});
		});
	});
};
