'use strict';

const app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'app/views/search.html',
		controller: 'mainCtrl',
		controllerAs: 'main'
	})

	.when('/result/:id', {
		templateUrl: 'app/views/result.html',
		controller: 'resultCtrl',
		controllerAs: 'result'
	})

	.otherwise( {redirectTo: '/'} );

	$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

});
