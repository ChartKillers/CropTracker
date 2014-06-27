//think about passing html id as param so it can be put wherever
module.exports = function paintDailyHighLowGraph(parsedJSON){
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .transitionDuration(300)
        .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.2);   //Distance between each group of bars.
      

      chart.xAxis
        .tickFormat(function(d){return d3.time.format('%d-%b')(new Date(d));});

      chart.yAxis
        .axisLabel('Temperature(F)')
        .axisLabelDistance(40)
        .tickFormat(d3.format(',.1f'));

      var tempData = parsedJSON;
      console.log(tempData);
      d3.select('.fiveDayTempGraph')
          .attr('height', 350)
          .attr('width', 400)
          .datum(tempData)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
};