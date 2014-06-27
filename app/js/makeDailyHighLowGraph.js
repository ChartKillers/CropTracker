var getDailyHighLow = require('./getDailyHighLow');
var parseDailyHighLowToGraph = require('./parseDailyHighLowToGraph');
var paintDailyHighLowGraph = require('./paintDailyHighLowGraph');




module.exports = function makeDailyHighLowGraph(stationId, startDate, endDate){

	getDailyHighLow(stationId, startDate, endDate, function (tempJSON) {

		parseDailyHighLowToGraph(tempJSON, function (parsedTempJSON) {

			paintDailyHighLowGraph(parsedTempJSON);

		});

	});

};