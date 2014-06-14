var getDailyHighLow = require('./getDailyHighLow.js');
var dailyTempFunc = require('./dailyHighLowData.js');

var dailyTemps = dailyTempFunc();


//think about passing html id as param so it can be put wherever
var dailyHighLowGraph = nv.addGraph(function() {
		var chart = nv.models.lineChart()
                .margin({left: 100, right: 100})  
                .useInteractiveGuideline(true)  //Guideline
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //allows users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true);        //Show the x-axis

  chart.xAxis     //Chart x-axis settings
  .axisLabel('Days (month, day)')
  .tickFormat(d3.format(',r'));

  chart.yAxis     //Chart y-axis settings
  .axisLabel('Temperature(F)');
  
  var myData = dailyTemps;

  d3.select('#chart')    //Select the <svg> element    
     	.attr("height", 48)
      .attr("width", 100)
      .datum(myData)         //Populate the <svg> element with chart data
      .call(chart);
  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update(); });
  return chart;
});

module.exports = dailyHighLowGraph;