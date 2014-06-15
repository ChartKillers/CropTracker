var express = require('express');
var http = require('http');

var mongoose = require('mongoose');

var tempHourStaRoutes = require('./api/routes/tempHourStaRoutes');

mongoose.connect('mongodb://localhost/users');


var app = express();

app.set('port', 5000);

app.get('/api/v0_0_1/daily-high-low/:station_id/:start_date/:end_date',
		tempHourStaRoutes.dailyHighLow);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
	console.log('Server start on:' + app.get('port'));
});