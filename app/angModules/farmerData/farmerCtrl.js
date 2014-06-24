var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function ($scope, Phone) {

  $scope.phones = Phone.query();

  $scope.orderProp = 'age';


}]);