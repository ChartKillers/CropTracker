var GddParams = require('../models/gddParams');
var http = require('http');

// Using this schema:
// var gddParamsSchema = new Schema({
//     cropType: String,
//     gddParameters: {
//       maxTempF: Number,
//       minTempF: Number
//     }
// });


module.exports = function(app, socket) {

  //POST route for entering in new default crop GDD Params
  app.post('/api/v0_0_1/gddParams/:crop_type/:t1/:t2', function(req, res){

    res.setHeader('Content-Type', 'application/json');

    var newCropParams = new GddParams({});

    //Setting some basic defaults in case the user messes up input
    var minT = 50;
    var maxT = 85;

    //Check which values to use as the min & max
    if (req.params.t1 < req.params.t2){
      minT = req.params.t1;
      maxT = req.params.t2;
    }

    if (req.params.t1 > req.params.t2){
      minT = req.params.t2;
      maxT = req.params.t1;
    }

    if (req.params.t1 == req.params.t2) {
        res.send(401, {'msg': 'Max & min temp values cannot be the same'});
        return false;
    }

    //Set params based on input values
    newCropParams.cropType = req.params.crop_type;
    newCropParams.gddParameters = {
      minTempF : minT,
      maxTempF : maxT
    };

    newCropParams.save(function(err) {
      if (err) { return res.send(500, err); }
      res.send({'msg' : 'gddParams saved'});
    });
  });



  //GET route for getting default crop GDD Params for a specific crop type
  app.get('/api/v0_0_1/gddParams/:crop_type', function(req, res){

    res.setHeader('Content-Type', 'application/json');
    var cropType = req.params.crop_type;

    GddParams.findOne({ 'cropType': req.params.crop_type}, function (err, cropParams) {

        if(err) { return res.send(500, err); }

        if(!cropParams) {
            res.send(401, {'msg': 'This crop does not exist'});
            return false;
        }

        res.send(cropParams);
    });
  });


  //GET route for getting all default crop GDD params documents
  app.get('/api/v0_0_1/gddParams', function(req, res){

    res.setHeader('Content-Type', 'application/json');

    GddParams.find({}, function (err, cropParams) {

        if(err) { return res.send(500, err); }

        if(!cropParams) {
            res.send(401, {'msg': 'This crop does not exist'});
            return false;
        }

        res.send(cropParams);
    });
  });

  //GET route for getting active stations
  app.get('/api/v0_0_1/activeStations', function(req, res){

    res.setHeader('Content-Type', 'application/json');

    var URL = 'http://shrouded-falls-4448.herokuapp.com/api/v1/stations';

    // Run GET request on the Ruby clean CIMIS server
    http.get(URL, function (result) {
        result.setEncoding('utf8');
        var body = '';
        var stationsData = [];

        result.on("data", function(chunk){
            body += chunk;
        });

        // Run GDD transform logic after data from get request is loaded
        result.on("end", function() {
            stationsData = JSON.parse(body);
            var activeList = [];
            for(var i = 0; i < stationsData.length; i++) {
              if (stationsData[i].is_active === true) {
                activeList.push(stationsData[i]);
              }
            }
            res.send(activeList);
        });
    });
  });

};
