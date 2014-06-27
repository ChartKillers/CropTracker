var standardDateToJsDate = require('../standardDateToJsDate');

module.exports = function parseCumGddGraph(gddData, callback) {
	var cumValue = [];

	for(var i = 0; i <= gddData.date.length-1; i++){
		cumValue.push({x: standardDateToJsDate(gddData.date[i]), y: gddData.cum[i]});
	}
	callback([
    {
      values: cumValue,  
      key: 'Cumulative GDD',
      color: '#527b2d',
      area: true 
    }
  ]);
};