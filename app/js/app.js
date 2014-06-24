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

  $http.defaults.headers.common['jwt_token'] = $cookies.jwt_token;

}]);

mainApp.controller('DashboardCtrl', [ '$scope', '$http', '$cookies',
    function ($scope, $http, $cookies) {

  $http({
    method: 'GET',
    url: '/api/v0_0_1/farmers/data'
  }).success(function(data) {
    console.log(data);
    $scope.farmer = data;
  });

}]);

mainApp.controller('LoginCtrl', [ '$scope', '$http', 
            '$base64', '$cookies', '$location', 
            function ($scope, $http, $base64, $cookies, $location) {


    $scope.signin = function () {

        $scope.failedLogin = '';

        $http.defaults.headers.common['Authorization'] = 'Basic '
            + $base64.encode($scope.user.email + ':' + $scope.user.password);

        $http({
            method: 'GET',
            url: '/api/v0_0_1/farmers'
        }).success(function (data) {
            if (data.jwt_token){
              $cookies.jwt_token = data.jwt_token;
              $location.path('/dashboard');
            } else {
              $scope.failedLogin = 'Incorrect username/password combination';
              $scope.user.email = null;
              $scope.user.password = null;
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
      .when('/dashboard', {
        templateUrl: '/views/dashboard',
        controller: 'DashboardCtrl'
      });
  }
]);

