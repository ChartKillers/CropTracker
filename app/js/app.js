var $ = require ('jquery');
var getDailyHighLow = require('./getDailyHighLow');
var makeDailyHighLowGraph = require('./makeDailyHighLowGraph');


require('angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');


var mainApp = angular.module('mainApp', ['ngRoute', 'base64', 'ngCookies']);

mainApp.controller('LandingPageCtrl', [ '$scope', '$http', '$cookies',
    function ($scope, $http, $cookies) {

}]);

mainApp.controller('FieldListCtrl', [ '$scope', '$http', '$cookies',
    function ($scope, $http, $cookies) {

  $scope.activeStations = [
    {county: 'Contra Costa', id: 10, name: 'Brentwood'},
    {county: 'Contra Costa', id: 12, name: 'Lafayette'},
    {county: 'Sacramento', id: 123, name: 'Verona'},
    {county: 'Davis', id: 210, name: 'Davis'}
  ];

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
      console.log($scope.cropTypes);
    });
  };

  $scope.addPlantings = function() {
    $scope.rightSideUrl = 'views/add-plantings';
    $scope.getDefaultCrops();
  };

  $http.defaults.headers.common['jwt_token'] = $cookies.jwt_token;
  $scope.rightSideUrl = 'views/dashboard';

  $http({
    method: 'GET',
    url: '/api/v0_0_1/farmers/data'
  }).success(function(farmerDoc) {
    $scope.farmer = farmerDoc;
    console.log($scope);
  });

}]);

mainApp.controller('LoginCtrl', [ '$scope', '$http', 
            '$base64', '$cookies', '$location', 
            function ($scope, $http, $base64, $cookies, $location) {

    $scope.user = {};
    $scope.user.email = 'admin@gmail.com',
    $scope.user.password = 'password'
    

    $scope.signin = function () {

        $http.defaults.headers.common['Authorization'] = 'Basic '
            + $base64.encode($scope.user.email + ':' + $scope.user.password);

        $http({
            method: 'GET',
            url: '/api/v0_0_1/farmers'
        }).success(function (data) {
            if (data.jwt_token){
              $cookies.jwt_token = data.jwt_token;
              $location.path('/field-list');
            } else {
              $scope.failedLogin = 'Incorrect username/password combination';
              //$scope.user.email = null;
              //$scope.user.password = null;
            }
        }).error(function (data) {
            console.log('err', data);
        });

    }

}]);

mainApp.controller('SignupCtrl', [ '$scope', function ($scope) {

}]);

mainApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/index',
        controller: 'LandingPageCtrl'
      })
      .when('/login', {
        templateUrl:'/views/login',
        controller:'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: '/views/signup',
        controller: 'SignupCtrl'
      })
      .when('/field-list', {
        templateUrl: '/views/field-list',
        controller: 'FieldListCtrl'
      });
      // .when('/add-planting', {
      //   templateUrl: '/view/add-planting',
      //   controller: 'DashboardCtrl'
      // });
  }
]);

