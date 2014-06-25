module.exports = function(mainApp){
  mainApp.controller('SignupCtrl', [ '$scope', '$cookies', '$http', '$location',
      function ($scope, $cookies, $http, $location) {
    
    $scope.user = {};

    $scope.signup = function () {

      $scope.error = '';

      //first check that username is populated
      if(!$scope.user.email) {
        $scope.error = 'Need username';
        return;
      };

      if($scope.user.password !== $scope.user.password2
          || !$scope.user.password) {
        console.log('err');
        $scope.error = 'Passwords do not match or no password entered';
        return;
      };

      $scope.error = '';

        $http({
          method: 'POST',
          url: '/api/v0_0_1/farmers',
          data: {
            email: $scope.user.email,
            password: $scope.user.password
          }
        }).success(function (data) {
          if (data.jwt_token){
            $cookies.jwt_token = data.jwt_token;
            $location.path('/field-list');
          } else {
            $scope.error = 'successfull put request but no token';
          }
        }).error(function (data) {
          $scope.error = data.msg;
        });
    
    }
  }]);
};
