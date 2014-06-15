var express = require('express');
var http = require('http');
var TempHourSta = require('./api/models/tempHourSta');

var mongoose = require('mongoose');

var tempHourStaRoutes = require('./api/routes/tempHourStaRoutes');

mongoose.connect('mongodb://localhost/users');


var app = express();

app.set('port', 5000);

var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(app.get('port'), function () {
	console.log('Server start on:' + app.get('port'));
});

io.on('connection', function (socket) {

    console.log('a user connected to temp server');

    socket.on('getDailyHighLow', function(data, fn){

        TempHourSta.find({
            $and: [
                 {date: { $gte: data.startDate, $lte: data.endDate }},
                 {stationId: data.stationId}
            ]
        }, null, {sort: {date: 1}}
        , function(err, temps) {
            if(err) {
                fn({'error': err});
                return false;
            };
            fn(temps);
        });  

    });

});