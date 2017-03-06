angular.module('dataService', [])

.factory('Data', function($http) {


	dataFactory = {};

	dataFactory.getData = function(searchKeyword, pageCounter) {
		return $http.get('https://api.github.com/search/repositories?q=' + searchKeyword + '+in:name&page=' + pageCounter + '&per_page=100&client_id=6e303c649bfb56aa4a37&client_secret=ce8f3ecdb7ddb4ba18ed55ee07fdc416a91bc0a9')
	};

	dataFactory.getDataByID = function(id) {
		return $http.get('https://api.github.com/repositories/'+ id + '&per_page=100&client_id=6e303c649bfb56aa4a37&client_secret=ce8f3ecdb7ddb4ba18ed55ee07fdc416a91bc0a9');
	};

	dataFactory.getIssues = function(name, owner, pageCounter) {
		return $http.get('https://api.github.com/search/issues?q=repo:' + owner + '/'+ name + '+state:open&page=' + pageCounter + '&per_page=100&client_id=6e303c649bfb56aa4a37&client_secret=ce8f3ecdb7ddb4ba18ed55ee07fdc416a91bc0a9');
	};

	return dataFactory;
});