var Farmer = require('../models/Farmer');
var dateStringToDate = require('../../app/js/dateStringToDate');

// exports.dailyCumGddByFarmerPlanting = function(app, socket, jwtauth) {

module.exports = function(app, socket, jwtauth) {


  app.get('api/v_0_0_1/daily-cum-gdd/:planting_id',
		jwtauth, function(req, res){

    res.setHeader('Content-Type', 'application/json');

    // Identify current farmer object based on auth token
    var currentFarmer = req.farmer;

    // Identify current planting based on request params:
    // (1) if it exists and
    var plantingIndexVal = _.indexOf(currentFarmer.plantings, req.params.planting_id);
    if (plantingIndexVal < 0) {
      res.end(500, {'error':'planting id not valid'});
    }

    // (2) where is it in the Farmer plantings array
    var currentPlanting = currentFarmer.plantings[plantingIndexVal];

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

    socket.emit('getDailyHighLow', reqObj, function (tempData) {

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
      };
      res.send( {date: dateOutput, gdd: gddOutput} );
    });

  });

};
