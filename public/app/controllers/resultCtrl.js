angular.module('resultController', [])

.controller('resultCtrl', function($scope, $routeParams, Data) {
	
 const app = this;

 app.loading = true;
 app.id = $routeParams.id;

 Data.getDataByID(app.id).then(function(data) {
  if (data.status === 200) {
    app.name = data.data.name;
    app.url = data.data.html_url;
    app.description = data.data.description;
    app.owner = data.data.owner.login;
    app.forks = data.data.forks;
    app.open_issues = data.data.open_issues_count;
    app.stargazers = data.data.stargazers_count;
    app.watchers = data.data.watchers;
    app.loading = false;
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
 };

  app.showIssues = function() {
  $scope.detailsTab = 'default';
  $scope.issuesTab = 'active';
  app.detailsPhase = false;
 };

});