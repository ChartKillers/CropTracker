var $ = require('jquery');

module.exports = function getDailyHighLow (stationID, startDate, endDate,  callback) {

	$.get('http://localhost:3000/api/v0_0_1/daily-high-low/' + stationID + '/' + startDate + '/' + endDate, callback);

};