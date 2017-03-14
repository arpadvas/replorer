angular.module('resultController', [])

.controller('resultCtrl', function($routeParams, Data) {
	
  var app = this;

  app.loading = true;
  app.loaded = false;
  app.pageSize = 10;
  app.id = $routeParams.id;
  app.issues = [];
  app.pageCounter = 1;
  app.detailsTab = 'active';
  app.issuesTab = 'default';
  app.detailsPhase = true;

  function loadDetails(id) {
    return Data.getDataByID(id).then(function(details) {
      app.name = details.data.name;
      app.full_name = details.data.full_name;
      app.url = details.data.html_url;
      app.description = details.data.description;
      app.owner = details.data.owner.login;
      app.owner_url = details.data.owner.html_url;
      app.forks = details.data.forks;
      app.open_issues = details.data.open_issues_count;
      app.stargazers = details.data.stargazers_count;
      app.watchers = details.data.watchers;
      app.loaded = true;
    });
  }

  function loadIssues() {
    return Data.getIssues(app.name, app.owner, app.pageCounter).then(function(issues) {
      app.issues = issues.data.items;
      app.loading = false;
    });
  }

  function reportProblems(error) {
    app.errorMsg = error.data.message;
  }

  app.changePage = function(page) {
    app.loading = true;
    app.pageCounter = page;
    loadIssues();
  };

  loadDetails(app.id)
    .then(loadIssues)
    .catch(reportProblems);

  app.showDetails = function() {
    app.detailsTab = 'active';
    app.issuesTab = 'default';
    app.detailsPhase = true;
    app.issuesPhase = false;
  };

  app.showIssues = function() {
    app.detailsTab = 'default';
    app.issuesTab = 'active';
    app.detailsPhase = false;
    app.issuesPhase = true;
  };

});