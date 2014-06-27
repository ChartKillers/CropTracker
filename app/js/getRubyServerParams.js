var _ = require('underscore');
var dateToAPI = require('./dateToAPIString');

module.exports = function getRubyServerParams (currentFarmer, pid, res) {

  //console.log("HITTING INSIDE GET RUBY URL FILE");

  var currentPlanting = _.find(currentFarmer.plantings,
    function(e){ return e._id == pid ; });

  if (!currentPlanting) {
    res.send(500, {'error' : 'planting id not valid'});
  }

  // Identify date parameters
  var startDate = dateToAPI(currentPlanting.plantingDate);
  var newDate = new Date(); // sets to current date
  var endDate = dateToAPI(newDate);
  if (!(startDate && endDate)){
    res.send(500, {'error' : 'invalid date format'});
  }

  var getURL = 'http://shrouded-falls-4448.herokuapp.com/api/v1/stations?station_nbr=' +
              currentPlanting.stationId + '&start_date=%22' +
              startDate + '%22&end_date=%22' + endDate + '%22';

  //working url sample:
  //var url = 'http://shrouded-falls-4448.herokuapp.com/api/v1/stations?station_nbr=240&start_date=%222014-05-15%22&end_date=%222014-06-24%22';

  return [getURL, currentPlanting];
};
