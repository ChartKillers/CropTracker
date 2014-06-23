var $ = require ('jquery');
var getDailyHighLow = require('./getDailyHighLow');
var makeDailyHighLowGraph = require('./makeDailyHighLowGraph');
var formMod = require('../angModules/newField/newFieldMod.js');

/*$(function () {
	console.log("where the graph at?");
	makeDailyHighLowGraph(235, 1-0-2014, 5-0-2014);
});*/


var mainMod = angular.module('mainMod', ['ngRoute', formMod]);

mainMod.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/addField',{
		templateUrl: '../angModules/templates/newField.html',
		controller: 'newFieldCtrl'
	});
}]);


