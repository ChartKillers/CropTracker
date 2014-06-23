module.exports = function(app) {
  app.controller('SigninCtrl', function($scope, $http, $base64, $cookies, $location) {
    $scope.signin = function() {
      $http.defaults.headers.common['Authentication'] = 'Basic ' + $base64($scope.user.email + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v0_0_1/farmers', //What's this gonna be?
      }).success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/???');
      }).error(function(data) {
        console.log(data);
      });
    }
  });
}