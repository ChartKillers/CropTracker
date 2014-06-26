var parseCumGddGraph = require('./parseCumGddGraph');
var paintCumGddGraph = require('./paintCumGddGraph');




module.exports = function makeCumGddGraph(gddData){
	
	parseCumGddGraph(gddData, function (cumGddObject) {

		paintCumGddGraph(cumGddObject);

	});

};

