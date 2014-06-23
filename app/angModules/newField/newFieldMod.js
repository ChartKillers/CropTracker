var controllers = require('./newFieldCtrl.js');


var formMod = angular.module('formMod', []);

formMod.controller('newFieldCtrl',
	['$scope', controllers.newFieldCtrl]
);


module.exports = formMod;


//(function(){
//})();