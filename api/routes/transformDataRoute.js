var _ = require('underscore');
var Farmer = require('../models/Farmer');
var dateStringToDate = require('../../app/js/dateStringToDate');

// exports.dailyCumGddByFarmerPlanting = function(app, socket, jwtauth) {

module.exports = function(app, socket, jwtauth) {

  // app.get('/api/v0_0_1/dailygdd', function(req,res) {
  //   res.end('asdfd');
  // });

  app.get('/api/v0_0_1/daily-cum-gdd/:planting_id',
    jwtauth, function(req, res){


    res.setHeader('Content-Type', 'application/json');

    // Identify current farmer object based on auth token
    var currentFarmer = req.farmer;

    // console.log("Farmer inside transform" + currentFarmer);

    // Identify current planting based on request params:
    // (1) if it exists and

    console.log("currentFarmer.plantings: ");
    console.log(currentFarmer.plantings);

    console.log(" ");
    console.log(" ");

    console.log("req.params.planting_id: ");
    console.log(req.params.planting_id);

    // var plantingIndexVal = _.indexBy(currentFarmer.plantings, req.params.planting_id);
    //
    // console.log(plantingIndexVal);
    //
    // if (plantingIndexVal < 0) {
    //   res.end(500, {'error':'planting id not valid'});
    // }

    var currentPlanting = _.find(currentFarmer.plantings,
      function(e){ return e._id == req.params.planting_id; });

    if (!currentPlanting) {
      res.end(500, {'error' : 'planting id not valid'});
    }

    console.log(" ");
    console.log(" ");

    console.log("currentPlanting: ");
    console.log(currentPlanting);

    console.log(" ");
    console.log(" ");

    // Identify date parameters
    var startDate = currentPlanting.plantingDate;
    var endDate = new Date(); // sets to current date
    if (!(startDate && endDate)){
      res.end(500, {'error':'invalid date format'});
    }

    var reqObj = {
      stationId: currentPlanting.stationId,
      startDate: startDate,
      endDate: endDate };

    console.log("reqObj: ");
    console.log(reqObj);

    socket.emit('getDailyHighLow', reqObj, function (tempData) {

      console.log(" ");
      console.log(" ");
      console.log("tempData: ");
      console.log(tempData);

      var gddOutput = [];
      var dateOutput = [];
      for (var k=0; k<tempData.length; k++) {
        dateOutput.push(tempData[k].date);

        if (tempData[k].maxTempF > currentPlanting.gddParameters.maxTempF) {
          tMax = currentPlanting.gddParameters.maxTempF;
        }
        else tMax = tempData[k].maxTempF;

        if (tempData[k].minTempF < currentPlanting.gddParameters.minTempF) {
          tMin = currentPlanting.gddParameters.maxTempF;
        }
        else tMin = tempData[k].minTempF;

        gddValue = (tMax + tMin)/2 - currentPlanting.gddParameters.minTempF;
        gddOutput.push(gddValue);
      }
      res.send( {date: dateOutput, gdd: gddOutput} );
    });

  });

};
