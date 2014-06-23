module.exports.fiveDayService = function($http){
	var promise = $http({
		method: 'GET',
		url: '/api/v0_0_1/daily-high-low/:station_id/:start_date/:end_date',
		responseType: 'json',
		params:{} //start and end date
	});


  //'callback for when get request finishes'
	promise.then(function(obj){  
		$scope.data = obj.data;
	})
}