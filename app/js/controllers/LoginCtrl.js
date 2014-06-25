
module.exports = function(mainApp){
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
};
