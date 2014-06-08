var $ = require('jquery');
//var d3 = require('d3');
//var nv = require('../nv.d3.js');

var getStationDataById = require('./getCimisStationDataById.js');
var getStationData = require('./getCimisStationData.js');
var getDailyHighLow = require('./getDailyHighLow.js');


function dailyTemps(){
	
	var highTemps = [];
	var lowTemps = [];
	var bs = [];
	getDailyHighLow(235, 't', 'j', function (data){
		var tempData = data;
		for(var i = 0; i < tempData.length; i++){
			highTemps.push({x: i, y: tempData[i].maxTempF});
			lowTemps.push({x: i, y: tempData[i].minTempF});
			bs.push({x: i, y: tempData[i].minTempF});
		}

		
	});
	return[
	{values: highTemps, key: 'Daily High', color: '#ff7f0e'},
	{values: lowTemps, key: 'Daily Low', color: 'steelblue'},
	{values: bs, key: 'Daily Bs', color: 'red'}
	];
}



//how to to function callback? may wanna do that here. 
/*function svgSize(){

		var maxY = 0;
		
		for(var i = 0; i < tempData.length; i++){
			var tempY;

			tempY = tempData[i].maxTempF + 10;

			if(tempY >= maxY){maxY = tempY;}  
		}


}*/

nv.addGraph(function() {
		var chart = nv.models.lineChart()
                .margin({left: 100, right: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                ;

  chart.xAxis     //Chart x-axis settings
  .axisLabel('Days (month, day)');
  //.tickFormat(d3.format(',r'));

  chart.yAxis     //Chart y-axis settings
  .axisLabel('Temperature(F)');
  //.tickFormat(d3.format('.20f'));
  /* Done setting the chart up? Time to render it!*/
  
  var myData = dailyTemps();   //You need data...
  console.log("myData");
  console.dir(myData);

  d3.select('#chart')    //Select the <svg> element you want to render the chart in.   
     	.attr("height", 48)
      .attr("width", 100)
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update(); });
  return chart;
});


	
