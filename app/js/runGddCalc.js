module.exports = function runGddCalc (tempData, currentPlanting, currentFarmer) {

  var tMax = 0;
  var tMin = 0;
  var currentMax = 0;
  var currentMin = 0;
  var currentCum = 0;
  var gddOutput = [];
  var gddCum = [];
  var dateOutput = [];
  var currentDate = new Date(); // sets to current date
  var farmer = currentFarmer;

  tempData = tempData.reverse();

console.log(tempData[10]);
  for (var k=0; k<tempData.length; k++) {
    if (tempData[k].daily_max){
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

      if (currentMax < currentPlanting.gddParameters.minTempF) {
        tMax = currentPlanting.gddParameters.minTempF;
      }


      gddValue = (tMax + tMin)/2 - currentPlanting.gddParameters.minTempF;

      //console.log('gdd val', gddValue);
      //DEBUG FOR NEGATIVE GDD VALUES:
      // if(gddValue > 0) {
      //   console.log("DATE: " + tempData[k].calendar_date);
      //   console.log("TMIN: " + tMin);
      //   console.log("TMAX: " + tMax);
      //   console.log("tempData[k].daily_max: " + tempData[k].daily_max);
      //   console.log("currentMax: " + currentMax);
      //   console.log("ParamMAX: " + currentPlanting.gddParameters.maxTempF);
      //   console.log("TBASE: " + currentPlanting.gddParameters.minTempF);
      //   console.log("GDD: " + gddValue);
      // }

      if (gddValue){
        currentCum += gddValue;
      }
      gddOutput.push(gddValue);
      gddCum.push(currentCum);
    }
  }

  var update  = { lastUpdated : currentDate };


  //farmer.findByIdAndUpdate(farmer._id, );


  var output = {date: dateOutput, gdd: gddOutput, cum: gddCum};
  return output;

};
