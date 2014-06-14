//think about passing html id as param so it can be put wherever
module.exports = function paintDailyHighLowGraph(parsedJSON){
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
    .transitionDuration(350)
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1);   //Distance between each group of bars.
      

      chart.xAxis
      .tickFormat(d3.format(',f'));

      chart.yAxis
      .tickFormat(d3.format(',.1f'));

      var tempData = parsedJSON;
      d3.select('#chart')
        .attr("height", 48)
        .attr("width", 100)
          .datum(tempData)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
};