var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var passport = require('passport');
var consolidate = require('consolidate');

//SERVER SETUP
var app = express();
app.use(bodyparser.json());
app.use(express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Server start on:' + app.get('port'));
});
//END SERVER SETUP

//JWT AUTH
var jwtauth = require('./api/lib/jwtAuth')(app);
app.set('jwtTokenSecret', process.env.JWT_SECRET || 'changeme-changeme-changemeNOW');


//PASSPORT
app.use(passport.initialize());
require('./api/lib/passport')(passport);


//SOCKET.IO FOR CONNECTING TO TEMPERATURE SERVER
var socket = require('socket.io-client')('http://localhost:5000');

socket.on('connect', function(){
    console.log('Connected to rails service');
});
//END SOCKET.IO


//MONGO 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');



//ROUTES

    //DAILY MAX/MIN REQUESTS FROM CLIENT
require('./api/routes/tempHourStaRoutes')(app, socket);

    //NEW ACCOUNTS AND SIGN INS
require('./api/routes/farmerRoutes')(app, passport);


//END ROUTES

