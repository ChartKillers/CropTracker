module.exports = function postNewPlanting ($http, planting, callback) {

  //convert from raw date into JavaScript date object
  //raw date is in form YYYY-MM-DD
  //but need YYYY, MM -1 , DD for JavaScript date constructor
  var rawDate = planting.plantingDateRaw.split('-');
  planting.plantingDate = new Date(rawDate[0], rawDate[1]-1, rawDate[2]);

  //build post object from default crop record
  planting.crop = JSON.parse(planting.crop);

  planting.cropType = planting.crop.cropType;
  
  planting.gddParameters = {
    maxTempF: planting.crop.gddParameters.maxTempF,
    minTempF: planting.crop.gddParameters.minTempF
  };

  $http({
    method: 'POST',
    url: '/api/v0_0_1/farmers/plantings',
    data: planting,
  }).success(function (newFarmerDoc) {
    callback(newFarmerDoc);
  }).error(function(data){
    console.log('post error', data);
  });

};