var getDailyHighLow = require('./getDailyHighLow.js');

module.exports = function dailyTemps(){
	
	var highTemps = [];
	var lowTemps = [];
	getDailyHighLow(235, 't', 'j', function (data){
		var tempData = data;
		for(var i = 0; i < tempData.length; i++){
			highTemps.push({x: i, y: tempData[i].maxTempF});
			lowTemps.push({x: i, y: tempData[i].minTempF});
		}

		
	});
	return[
	{values: highTemps, key: 'Daily High', color: '#ff7f0e'},
	{values: lowTemps, key: 'Daily Low', color: 'steelblue'}
	];
};