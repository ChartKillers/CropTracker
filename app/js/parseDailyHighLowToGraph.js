
//Returning an array, where each entry is an object
//to be painted as a line

module.exports = function parseDailyHighLowToGraph(dailyHighLowJSON, callback){
	
	var highTemps = [];
	var lowTemps = [];
	var tempData = dailyHighLowJSON;
		for(var i = 0; i < tempData.length; i++){
			highTemps.push({x: i, y: tempData[i].maxTempF});
			lowTemps.push({x: i, y: tempData[i].minTempF});
		}

	//pass results to callback graph painter
	callback([
	{values: lowTemps, key: 'Daily Low', color: '#46bab4'},
	{values: highTemps, key: 'Daily High', color: '#de3701'}
	]);
};




