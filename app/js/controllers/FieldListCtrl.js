var makeDailyHighLowGraph = require('../makeDailyHighLowGraph');
var makeCumGddGraph = require('../makeCumGddGraph');

module.exports = function (mainApp){

  mainApp.controller('FieldListCtrl', [ '$scope', '$http', '$cookies', '$location',
    function ($scope, $http, $cookies, $location) {
    
    $http.defaults.headers.common['jwt_token'] = $cookies.jwt_token;

    $http({
      method: 'GET',
      url: '/api/v0_0_1/farmers/data'
    }).success(function(farmerDoc) {
      $scope.farmer = farmerDoc;
    });

    $scope.pageTitle = 'Dashboard';
    $scope.plantingGddGraphData;
    $scope.rightSideUrl = 'views/dashboard';
    $scope.planting= {};
    $scope.activeStationList;

    if (!$cookies.jwt_token){
        $location.path('/login');
    };

    $scope.logout = function () {
      delete $cookies['jwt_token'];
      $location.path('/login');
    };

    $scope.getStationList = function () {
      $http({
        method: 'GET',
        url: '/api/v0_0_1/activeStations'
      }).success(function (data) {
        if (data){
          $scope.activeStationList = data;
        } else {
          console.log('no data from active stations request');
        }
      }).error(function (data) {
        console.log('error on active station req', data.msg);
      });
    };

    $scope.postNewPlanting = function() {

      var rec = $scope.planting;
      
      //convert from raw date into JavaScript date object
      //raw date is in form YYYY-MM-DD
      //but need YYYY, MM -1 , DD for JavaScript date constructor
      var rawDate = rec.plantingDateRaw.split('-');

      rec.plantingDate = new Date(rawDate[0], rawDate[1]-1, rawDate[2]);

      delete rec['plantingDateRaw'];

      //build post object from default crop record
      rec.crop = JSON.parse(rec.crop);

      rec.cropType = rec.crop.cropType;
      rec.gddParameters = {
        maxTempF: rec.crop.gddParameters.maxTempF,
        minTempF: rec.crop.gddParameters.minTempF
      };

      delete rec['crop'];

      $http({
        method: 'POST',
        url: '/api/v0_0_1/farmers/plantings',
        data: rec,
      }).success(function (newFarmerDoc) {
        $scope.farmer = newFarmerDoc;
        $scope.planting = {};
      }).error(function(data){
        console.log(data);
      });

    };

    $scope.getDefaultCrops = function () {
      $http({
        method: 'GET',
        url: '/api/v0_0_1/gddParams'
      }).success(function (data) {
        $scope.cropTypes = data;
      });
    };

    $scope.addPlantings = function() {
      $scope.rightSideUrl = 'views/add-plantings';
      $scope.getDefaultCrops();
      $scope.getStationList();
      $scope.pageTitle = "Add Plantings"
    };

    $scope.showPlanting = function(planting){
      $scope.rightSideUrl = 'views/plantingGraph';
      console.log(planting.cropType);
      $http({
        method: 'GET',
        url: '/api/v0_0_1/daily-cum-gdd/' + planting._id
      }).success(function (data) {
          makeCumGddGraph(data);
          $scope.plantingGddGraphData = data;
          console.log('got graph data', data);
      }).error(function(data){
          console.log('err getting graph data', data);
      });


    };

    $scope.showDashboard = function(){
      date = new Date();
      var newDate = date.getMonth()+ "-" + date.getDate()+ "-" + date.getFullYear();
      console.log(newDate);
      $scope.rightSideUrl = 'views/dashboard';
      $scope.pageTitle = 'Dashboard';
      makeDailyHighLowGraph(235, '1-0-2014', newDate);
    };
    //calls the above function on page load
    $scope.showDashboard();
  }]);
};