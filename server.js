var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var passport = require('passport');
var consolidate = require('consolidate');
var path = require('path');

var configDB = require('./config/database.js');

//SERVER SETUP
var app = express();
app.use(bodyparser.json());

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Server start on:' + app.get('port'));
});
//END SERVER SETUP

//JADE RENDERING ENGINE
app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine','jade');

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
mongoose.connect(configDB.url);


//ROUTES

    //DAILY MAX/MIN REQUESTS FROM CLIENT
require('./api/routes/tempHourStaRoutes')(app, socket);

    //NEW ACCOUNTS AND SIGN INS
require('./api/routes/farmerRoutes')(app, passport, jwtauth.auth);

require('./api/routes/transformDataRoute')(app, jwtauth.auth);

//require('./api/routes/transformDataRoute')(app, socket);
console.log("required transformDataRoute file");

    //GDD PARAMS
require('./api/routes/gddParamsRoutes')(app, socket);


    //JADE-ANGULAR PARTIAL ROUTES
app.get('/views/:name', function(req, res) {
    res.render(req.params.name, {});
});

app.get('/', function(req, res) {
    res.render('layout', {});
});

app.use(express.static(__dirname + '/dist'));

//END ROUTES
