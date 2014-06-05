var $ = require('jquery');	

module.exports = function getStationData (callback) {
	$.get('http://jsonp.jit.su/?url=http://et.water.ca.gov/api/station/', callback);
}; 