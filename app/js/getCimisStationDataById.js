var $ = require('jquery');	

module.exports = function getStationDataById (stationID, callback) {
	$.get('http://jsonp.jit.su/?url=http://et.water.ca.gov/api/station/' + stationID, callback);
}; 