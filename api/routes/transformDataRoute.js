var http = require('http');
var Farmer = require('../models/Farmer');
var gddCalc = require('../../app/js/runGddCalc');
var getRubyParams = require('../../app/js/getRubyServerParams');

module.exports = function(app, jwtauth) {

  app.get('/api/v0_0_1/daily-cum-gdd/:planting_id',
    jwtauth, function(req, res){
    res.setHeader('Content-Type', 'application/json');

    // Identify current farmer object based on auth and
    // generate ruby server URL for current planting
    var params = getRubyParams(req.farmer, req.params.planting_id);
    var URL = params[0];
    var currentPlanting = params[1];

    // Run GET request on the Ruby clean CIMIS server
    http.get(URL, function (result) {
        console.log(3);
        result.setEncoding('utf8');
        var body = '';
        var tempData = [];

        result.on("data", function(chunk){
            body += chunk;
            console.log(4);
        });

        // Run GDD transform logic after data from get request is loaded
        result.on("end", function() {
            console.log(5);
            tempData = JSON.parse(body);
            var dateAndGddOutput = gddCalc(tempData, currentPlanting, req.farmer);
            res.send(dateAndGddOutput);
            console.log(6);
            //res.send( {date: dateOutput, gdd: gddOutput} );
        });
    });
  });
};
