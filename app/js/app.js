var $ = require ('jquery');
var getDailyHighLow = require('./getDailyHighLow');
var makeDailyHighLowGraph = require('./makeDailyHighLowGraph');

$(function () {
	console.log("where the graph at?");
	makeDailyHighLowGraph(235, 1-0-2014, 5-0-2014);
});



