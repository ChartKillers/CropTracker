function days(num) {
  return num*60*60*1000*24
}

module.exports = function parseCumGddGraph(gddData, callback) {
	var dates = gddData.date;
	var cumValue = [];
	var dailyValue = [];
	var numberOfDays = dates.length-1;
	var startDate = new Date() - days(numberOfDays);

	for(var i = 0; i <= dates.length-1; i++){
		cumValue.push({x: i, y: gddData.cum[i]});
		dailyValue.push({x: i, y: gddData.gdd[i]})
	}
	console.log("CUMVALUE");
	console.log(cumValue);
	callback([
    {
      values: cumValue,  
      key: 'Cumulative GDD',
      color: '#ff7f0e' 
    },
    {
      values: dailyValue,
      key: 'Daily GDD',
      color: '#2ca02c'
    }
  ]);
};