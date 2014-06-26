module.exports = function paintDailyGddGraph(dailyGddData){
	nv.addGraph(function() {
  	var chart = nv.models.lineChart()
  	              .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
  	              .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
  	              .transitionDuration(350)  //how fast do you want the lines to transition?
  	              .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
  	              .showYAxis(true)        
  	              .showXAxis(true);        
  	
	
  	chart.xAxis     //Chart x-axis settings
  	    .axisLabel('Date')
  	    .tickFormat(function(d){return d3.time.format('%d-%b')(new Date(d));});
	
  	chart.yAxis     //Chart y-axis settings
  	    .axisLabel('Numbers')
  	    .tickFormat(d3.format('.02f'));
	
  	
  	var myData = dailyGddData;  
	
  	d3.select('.plantingGraph')
        .attr('height', 200)
        .attr('width', 400)  			    
  	    .datum(myData)         
  	    .call(chart);          
	
  	//Update the chart when window resizes.
  	nv.utils.windowResize(function() { chart.update() });
  	return chart;
	});
};