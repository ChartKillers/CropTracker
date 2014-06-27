module.exports = function paintDailyGddGraph(dailyGddData){
	/*nv.addGraph(function() {
  	var chart = nv.models.lineChart()
  	              .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
  	              .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
  	              .transitionDuration(350)  //how fast do you want the lines to transition?
  	              .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
  	              .showYAxis(true)        
  	              .showXAxis(true);        
  	
	
  	chart.xAxis     //Chart x-axis settings
  	    .axisLabel('Date')
  	    .tickFormat(function(d){return d3.time.format('%d-%b')(new Date(d));});
	
  	chart.yAxis     //Chart y-axis settings
  	    .axisLabel('GDD')
  	    .tickFormat(d3.format('f'));
	
  	
  	var myData = dailyGddData;  
	
  	d3.select('.dailyGddGraph')
        .attr('height', 175) 			    
  	    .datum(myData)         
  	    .call(chart);          
	
  	//Update the chart when window resizes.
  	nv.utils.windowResize(function() { chart.update() });
  	return chart;
	});*/
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .transitionDuration(300)
        .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.5);   //Distance between each group of bars.
      

      chart.xAxis
        .axisLabel('Date(Day-Month)')
        .tickFormat(function(d){return d3.time.format('%d-%b')(new Date(d));});

      chart.yAxis
        .axisLabel('GDD')
        .axisLabelDistance(40)
        .tickFormat(d3.format('f'));

      var myData = dailyGddData;
      d3.select('.dailyGddGraph')
          .attr('height', 200)
          .attr('width', 400) 
          .datum(myData)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
};