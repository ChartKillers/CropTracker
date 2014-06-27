
module.exports = function getFarmerData($http, callback) {
  $http({
    method: 'GET',
    url: '/api/v0_0_1/farmers/data'
  }).success(function(farmerDoc) {
    callback(farmerDoc);
  });
};