angular.module('dataService', [])

.factory('Data', function($http) {
	dataFactory = {};

	dataFactory.getData = function(searchKeyword) {
		return $http({ 
			url: 'https://api.github.com/search/repositories',
			method: 'GET',
			params: {q: searchKeyword}
		});
	};

	dataFactory.getDataByID = function(id) {
		return $http.get('https://api.github.com/repositories/'+ id);
	};

	dataFactory.getIssues = function(name, owner) {
		return $http.get('https://api.github.com/search/issues?q=repo:' + owner + '/'+ name);
	};


	return dataFactory;
});