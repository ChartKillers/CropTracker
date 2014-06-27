var makeDailyHighLowGraph = require('../graphs/makeDailyHighLowGraph');
var makeCumGddGraph = require('../graphs/makeCumGddGraph');
var makeDailyGddGraph = require('../graphs/makeDailyGddGraph');
var plantingsByCropType = require('../plantingsByCropType');
var getFarmerData = require('../getFarmerData');
var getActiveCimisStations = require('../getActiveCimisStations');
var postNewPlanting = require('../postNewPlanting');
var getPlantingDailyGDD = require('../getPlantingDailyGDD');

module.exports = function (mainApp){

  mainApp.controller('FieldListCtrl', [ '$scope', '$http', '$cookies', '$location',
    function ($scope, $http, $cookies, $location) {
    

    //START ITEMS THAT RUN ON PAGE LOAD
    //==============================================

    //send user to login page if no token
    if (!$cookies.jwt_token){
        $location.path('/login');
    }

    //all requests should send token
    $http.defaults.headers.common['jwt_token'] = $cookies.jwt_token;
    $scope.loggedIn = $cookies.jwt_token;

    //on page load get the farmer document
    getFarmerData($http, function(farmerData) {

      setFarmer(farmerData);
      var date = new Date();
      var newDate = date.getFullYear() + '-' 
          + date.getMonth() + "-" + date.getDate();
      makeDailyHighLowGraph($scope.farmer.defaultCimisId, '2014-01-01', newDate);
      getActiveStationList();
    });

    //sets title in header
    $scope.pageTitle = 'Dashboard';
    
    //will hold daily GDD data for individual graphs
    $scope.plantingGddGraphData;

    //url of the right side view, change to set new right side view
    //default to dashboard
    $scope.rightSideUrl = 'views/dashboard';
    
    //hold data entered into new/edit planting form
    $scope.planting= {};

    //END ITEMS THAT RUN ON PAGE LOAD
    //==============================================
    //FUNCTIONS ON SCOPE

    //when user saves new planting
    $scope.saveNewPlanting = function saveNewPlanting () {

      postNewPlanting($http, $scope.planting, function(newFarmerDoc) {
      
      setFarmer(newFarmerDoc);
      $scope.planting = {};
      });
    };

    $scope.getDefaultCrops = function () {
      $http({
        method: 'GET',
        url: '/api/v0_0_1/gddParams'
      }).success(function (data) {
        $scope.cropTypes = data;
      });
    };

    //==============================================
    //CALLS THAT CHANGE THE RIGHT SIDE URL

    $scope.goToEditPlantingPage = function () {
      $scope.addPlantings();
      $scope.editPlantingPage = true;
    };


    $scope.goToAddPlantings = function() {
      $scope.editPlantingPage = false;
      $scope.rightSideUrl = 'views/add-plantings';
      $scope.getDefaultCrops();
    };


    //logout by deleting jwt and 
    //sending user to login page
    $scope.logout = function () {
      delete $cookies['jwt_token'];
      $location.path('/login');
    };

    //shows graphs and details of selected planting
    $scope.goToPlantingDetail = function(planting){
      $scope.currentPlanting = planting;
      $scope.rightSideUrl = 'views/plantingGraph';
      getPlantingDailyGDD($http, planting, function(plantingGDDData) {
          makeCumGddGraph(plantingGDDData);
          makeDailyGddGraph(plantingGDDData);
          $scope.plantingGddGraphData = plantingGDDData;
      });
    };

    //return right side to home view
    $scope.goToDashboard = function(){
      $scope.rightSideUrl = 'views/dashboard';
      var date = new Date();
      var newDate = date.getFullYear() + '-' 
          + date.getMonth() + "-" + date.getDate();
      makeDailyHighLowGraph($scope.farmer.defaultCimisId, '2014-01-01', newDate);

    };

    $scope.capFirst = function(word){
      word = word.split(' ');
      var ans = '';
      _.each(word, function(element){
        element = element.charAt(0).toUpperCase() + element.slice(1);
        ans += element + ' ';
      });      
      return ans;
    };

    //==============================================
    //OTHER FUNCTIONS NOT ON SCOPE

    //get list of active stations
    function getActiveStationList() {
      if ($scope['activeStationList']) {
        return;
      }
      
      getActiveCimisStations($http, function(data){
        $scope.activeStationList = data;
      });
    };

    //sets farmer document with transform on plantings
    //so plantings are nested by crop type
    function setFarmer(farmerDoc){
      farmerDoc.plantings = plantingsByCropType(farmerDoc.plantings);
      $scope.farmer = farmerDoc;
    };

  }]);
};