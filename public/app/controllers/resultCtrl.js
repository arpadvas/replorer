'use strict';

angular.module('resultController', [])

.controller('resultCtrl', function($scope, $routeParams, Data) {
	
 const app = this;

 app.loading = true;
 app.loaded = false;
 app.pageSize = 10;
 app.id = $routeParams.id;

 Data.getDataByID(app.id).then(function(data) {
  if (data.status === 200) {
    app.name = data.data.name;
    app.url = data.data.html_url;
    app.description = data.data.description;
    app.owner = data.data.owner.login;
    app.owner_url = data.data.owner.html_url;
    app.forks = data.data.forks;
    app.open_issues = data.data.open_issues_count;
    app.stargazers = data.data.stargazers_count;
    app.watchers = data.data.watchers;
    app.loading = false;
    app.loaded = true;
  } else {
    app.errorMsg = 'No repository was found';
    app.loading = false;
  }

});

 $scope.detailsTab = 'active';
 $scope.issuesTab = 'default';
 app.detailsPhase = true;

 app.showDetails = function() {
  $scope.detailsTab = 'active';
  $scope.issuesTab = 'default';
  app.detailsPhase = true;
  app.issuesPhase = false;
 };

  app.showIssues = function() {
  $scope.detailsTab = 'default';
  $scope.issuesTab = 'active';
  app.detailsPhase = false;
  app.issuesPhase = true;
  Data.getIssues(app.name, app.owner).then(function(data) {
    if (data.status === 200) {
      app.issues = data.data.items;
    } else {
      app.errorMsg = 'No repository was found';
    }
  });
 };

});