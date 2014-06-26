var parseDailyGddGraph = require('./parseDailyGddGraph');
var paintDailyGddGraph = require('./paintDailyGddGraph');




module.exports = function makeDailyGddGraph(gddData){
	
	parseDailyGddGraph(gddData, function (DailyGddObject) {

		paintDailyGddGraph(DailyGddObject);

	});

};