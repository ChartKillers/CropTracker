var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var tempHourStaRoutes = require('./api/routes/tempHourStaRoutes');

mongoose.connect('mongodb://localhost/users');


var app = express();
app.use(bodyparser.json());
app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 3000);

app.get('/api/v0_0_1/temp', tempHourStaRoutes.collection);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
	console.log('Server start on:' + app.get('port'));
});