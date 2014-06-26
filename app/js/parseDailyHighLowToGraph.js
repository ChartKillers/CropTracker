
//Returning an array, where each entry is an object
//to be painted as a line
function days(num) {
  return num*60*60*1000*24
}

module.exports = function parseDailyHighLowToGraph(dailyHighLowJSON, callback){
	/*{"_id":"53921d22d6f9ac4ef9f27aa9",
	"date":"2014-02-01T08:00:00.000Z","stationId":235,
	"maxTempF":61.8,"minTempF":29.8},*/
	var highTemps = [];
	var lowTemps = [];
	var tempData = dailyHighLowJSON;
	var start_date = new Date() - days(4);
		for(var i = tempData.length-1; i > tempData.length-6; i--){
			highTemps.push({x: new Date(start_date + days(i)), y: tempData[i].maxTempF});
			lowTemps.push({x: new Date(start_date + days(i)), y: tempData[i].minTempF});
		}

	//pass results to callback graph painter
	callback([
	{values: lowTemps, key: 'Daily Low', color: '#46bab4'},
	{values: highTemps, key: 'Daily High', color: '#de3701'}
	]);
};




