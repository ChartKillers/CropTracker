function days(num) {
  return num*60*60*1000*24
}

module.exports = function parseDailyGddGraph(gddData, callback) {
	var dates = gddData.date;
	var dailyValue = [];
	var numberOfDays = dates.length-1;
	var startDate = new Date() - days(numberOfDays);

	for(var i = 0; i <= dates.length-1; i++){
		dailyValue.push({x: new Date(startDate + days(i)), y: gddData.gdd[i]})
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