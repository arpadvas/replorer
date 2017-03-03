angular.module('dataService', [])

.factory('Data', function($http) {
	dataFactory = {};

	dataFactory.getData = function(searchKeyword) {
		return $http.get('https://api.github.com/search/repositories?q=' + searchKeyword);
	};


	return dataFactory;
});