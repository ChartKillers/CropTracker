    
module.exports = function getActiveCimisStations($http, callback) {
  $http({
    method: 'GET',
    url: '/api/v0_0_1/activeStations'
  }).success(function (data) {
    if (data){
      callback(data);
    } else {
      console.log('no data from active stations request');
    }
  }).error(function (data) {
    console.log('error on active station req', data.msg);
  });
};