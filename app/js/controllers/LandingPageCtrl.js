
module.exports = function(mainApp){
  mainApp.controller('LandingPageCtrl', [ '$scope', '$http', '$cookies', '$location',
   function ($scope, $http, $cookies, $location) {

    if ($cookies.jwt_token){
        $location.path('/field-list');
    };

  }]);
};