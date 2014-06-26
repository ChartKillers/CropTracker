
module.exports = function(mainApp){
  mainApp.controller('SignupCtrl', [ '$scope', '$cookies', '$http', '$location',
      function ($scope, $cookies, $http, $location) {
    


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

    $scope.getStationList();
    
    $scope.postError = '';
    $scope.user = {};

    $scope.signup = function () {

      var error = false;

      $scope.postError = '';
      $scope.error = [];

      if(!$scope.user.firstName || !$scope.user.lastName){
        $scope.error.push('Enter first and last name');
        error = true;
      };

      if(!$scope.user.company){
        $scope.error.push('Enter company');
        error = true;
      };

      if(!$scope.user.defaultCimisId){
        $scope.error.push('Select default CIMIS station');
        error = true;
      };

      //first check that username is populated
      if(!$scope.user.email) {
        $scope.error.push('Need username');
        error = true;
      };

      if($scope.user.password !== $scope.user.password2
          || !$scope.user.password) {
        $scope.error.push('Passwords do not match or no password entered');
        error = true;
      };

      if (error){
        return;
      };

      $scope.error = '';

        $http({
          method: 'POST',
          url: '/api/v0_0_1/farmers',
          data: $scope.user
        }).success(function (data) {
          if (data.jwt_token){
            $cookies.jwt_token = data.jwt_token;
            $location.path('/field-list');
          } else {
            $scope.error = 'successfull put request but no token';
          }
        }).error(function (data) {
          $scope.postError = data.msg;
        });
    
    }
  }]);
};
