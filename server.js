var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');



var socket = require('socket.io-client')('http://localhost:5000');

socket.on('connect', function(){
    console.log('Connected to rails service');
});

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');


var app = express();
app.use(bodyparser.json());

app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 3000);

require('./api/routes/tempHourStaRoutes')(app, socket);

/*app.get('*', function(req, res){
	res.send(404 + "Error");
});*/

var server = http.createServer(app);

server.listen(app.get('port'), function () {
	console.log('Server start on:' + app.get('port'));
});


