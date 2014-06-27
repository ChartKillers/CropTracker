

module.exports = function getPlantingDailyGDD ($http, planting, callback){
  $http({
    method: 'GET',
    url: '/api/v0_0_1/daily-cum-gdd/' + planting._id
  }).success(function (data) {
    console.log(data);
    callback(data);
  }).error(function(data){
      console.log('err getting graph data', data);
  });
};