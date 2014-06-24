var $ = require ('jquery');
var getDailyHighLow = require('./getDailyHighLow');
var makeDailyHighLowGraph = require('./makeDailyHighLowGraph');


require('angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');


var mainApp = angular.module('mainApp', ['ngRoute', 'base64', 'ngCookies']);

mainApp.controller('LandingPageCtrl', [ '$scope' , function ($scope) {


    $scope.name = 'Kevin';

}]);

mainApp.controller('LoginCtrl', [ '$scope', '$http', 
            '$base64', '$cookies', '$location', 
            function ($scope, $http, $base64, $cookies, $location) {


    $scope.signin = function () {

        $http.defaults.headers.common['Authorization'] = 'Basic '
            + $base64.encode($scope.user.email + ':' + $scope.user.password);

        $http({
            method: 'GET',
            url: '/api/v0_0_1/farmers'
        }).success(function (data) {
            if (data.jwt_token){
              $cookies.jwt = data.jwt_token;
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

    $scope.fuckyou = 'please';

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
      .when('/graph', {
        templateUrl: '/view/dashboard',
        controller: 'DashboardCtrl'
      });
  }
]);

