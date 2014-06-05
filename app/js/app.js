var $ = require('jquery');
var getStationDataById = require('./getCimisStationDataById.js');
var getStationData = require('./getCimisStationData.js');

$(function () {

	getStationDataById(127, function (data) {
		console.log(data);
	});
	console.log('working');

	getStationData(function (data) {
		console.log(data);
	});


});