var $ = require ('jquery');

//
require('angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var mainApp = angular.module('mainApp', ['ngRoute', 'base64', 'ngCookies']);

//controllers
require('./controllers/FieldListCtrl')(mainApp);
require('./controllers/LandingPageCtrl')(mainApp);
require('./controllers/LoginCtrl')(mainApp);
require('./controllers/SignupCtrl')(mainApp);

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
  }
]);
