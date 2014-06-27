
var standardDateToJsDate = require('../standardDateToJsDate');

//Returning an array, where each entry is an object
//to be painted as a line


module.exports = function parseDailyHighLowToGraph(dailyHighLowJSON, callback){
	/*{"_id":"53921d22d6f9ac4ef9f27aa9",
	"date":"2014-02-01T08:00:00.000Z","stationId":235,
	"maxTempF":61.8,"minTempF":29.8},*/
	var highTemps = [];
	var lowTemps = [];
	var tempData = dailyHighLowJSON;

		for(var i = 0; i < tempData.length; i++){
			var data = tempData[i];
			highTemps.unshift({x: standardDateToJsDate(data.calendar_date),
					y: data.daily_max});
			lowTemps.unshift({x: standardDateToJsDate(data.calendar_date), 
					y: data.daily_min});
		}
	//pass results to callback graph painter
	callback([
	{values: lowTemps, key: 'Daily Low', color: '#2e59af'},
	{values: highTemps, key: 'Daily High', color: 'b92000'}
	]);
};




