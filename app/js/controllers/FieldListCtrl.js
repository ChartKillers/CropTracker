var makeDailyHighLowGraph = require('../makeDailyHighLowGraph');

module.exports = function (mainApp){

  mainApp.controller('FieldListCtrl', [ '$scope', '$http', '$cookies',
    function ($scope, $http, $cookies) {

    $scope.plantingGddGraphData;

    $scope.activeStations = [
      {county: 'Contra Costa', id: 240, name: 'Brentwood'},
      {county: 'Contra Costa', id: 240, name: 'Lafayette'},
      {county: 'Sacramento', id: 240, name: 'Verona'},
      {county: 'Davis', id: 240, name: 'Davis'}
    ];

    $http.defaults.headers.common['jwt_token'] = $cookies.jwt_token;
    $scope.rightSideUrl = 'views/dashboard';

    // $scope.getStations = function () {

    //   $http({
    //     method: 'GET',
    //     url: ''
    //   }).success(function (data) {
    //     $scope.stations = data;
    //   });

    // };

    $scope.planting= {};

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
    };

    $scope.showPlanting = function(planting){
      $scope.rightSideUrl = 'views/plantingGraph';
      console.log(planting.cropType);
      $http({
        method: 'GET',
        url: '/api/v0_0_1/daily-cum-gdd/' + planting._id
      }).success(function (data) {
          $scope.plantingGddGraphData = data;
          console.log('got graph data', data);
      }).error(function(data){
          console.log('err getting graph data', data);
      });


    };
    $scope.showDashboard = function(){
      $scope.rightSideUrl = 'views/dashboard';
      makeDailyHighLowGraph(235, '1-0-2014', '1-1-2014');
    };

    $http({
      method: 'GET',
      url: '/api/v0_0_1/farmers/data'
    }).success(function(farmerDoc) {
      $scope.farmer = farmerDoc;
    });

  }]);
};