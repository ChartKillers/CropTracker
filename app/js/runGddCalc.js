module.exports = function runGddCalc (tempData, currentPlanting) {

  console.log("HITTING INSIDE GDD CALC FILE");

  var tMax = 0;
  var tMin = 0;
  var currentMax = 0;
  var currentMin = 0;
  var currentCum = 0;
  var gddOutput = [];
  var gddCum = [];
  var dateOutput = [];

  for (var k=0; k<tempData.length; k++) {
    dateOutput.push(tempData[k].calendar_date);
    var gddValue = 0;

    currentMax = parseFloat(tempData[k].daily_max);
    currentMin = parseFloat(tempData[k].daily_min);

    if (currentMax > currentPlanting.gddParameters.maxTempF) {
      tMax = currentPlanting.gddParameters.maxTempF;
    }
    else tMax = currentMax;

    if (currentMin < currentPlanting.gddParameters.minTempF) {
      tMin = currentPlanting.gddParameters.minTempF;
    }
    else tMin = currentMin;
    gddValue = (tMax + tMin)/2 - currentPlanting.gddParameters.minTempF;
    currentCum += gddValue;
    gddOutput.push(gddValue);
    gddCum.push(currentCum);
  }

  var output = {date: dateOutput, gdd: gddOutput, cum: gddCum};
  return output;

};
