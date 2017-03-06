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


  function detailSuccesHandler(data) {
    app.name = data.data.name;
    app.full_name = data.data.full_name;
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
 }

 function detailsErrorHandler(data) {
    app.errorMsg = 'Request failed';
    app.loading = false;
 }

  function issuesSuccesHandler(data) {
    if (data.data.items.length < 100) {
      for (var i=0; i < data.data.items.length; i++) {
        app.issues.push(data.data.items[i]);
      }
    } else {
      for (var i=0; i < data.data.items.length; i++) {
        app.issues.push(data.data.items[i]);
      }
      app.pageCounter++;
      Data.getIssues(app.name, app.owner, app.pageCounter).then(issuesSuccesHandler, issuesErrorHandler);
    }
 }

  function issuesErrorHandler(data) {
    app.errorMsg = 'No repository was found';
  }

  Data.getDataByID(app.id).then(detailSuccesHandler, detailsErrorHandler);

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
    Data.getIssues(app.name, app.owner, app.pageCounter).then(issuesSuccesHandler, issuesErrorHandler);
  };

});