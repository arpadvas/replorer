var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'app/views/search.html',
		controller: 'mainCtrl',
		controllerAs: 'main'
	})

	.when('/result', {
		templateUrl: 'app/views/pages/result.html',
		controller: 'resultCtrl',
		controllerAs: 'result'
	})

	.otherwise( {redirectTo: '/'} );

	$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

});
