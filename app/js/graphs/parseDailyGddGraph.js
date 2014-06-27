var standardDateToJsDate = require('../standardDateToJsDate');

module.exports = function parseDailyGddGraph(gddData, callback) {
	var dailyValue = [];

	for(var i = 0; i <= gddData.date.length-1; i++){
		dailyValue.push({x: standardDateToJsDate(gddData.date[i]), y: gddData.gdd[i]})
	}
  callback([
    {
      values: dailyValue,
      key: 'Daily GDD',
      color: '#2e59af',
      area: true
    }
  ]);
};