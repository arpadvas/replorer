'use strict';

angular.module('mainController', [])

.controller('mainCtrl', function(Data, $scope) {
	
  const app = this;

  app.pageSize = 10;

  app.search = function(searchKeyword) {

    app.loading = true;
    app.errorMsg = false;
    app.items = undefined;

    $scope.searchKeyword = searchKeyword;

    Data.getData($scope.searchKeyword).then(function(data) {
      if (data.data.total_count === 0) {
        app.loading = false;
        app.errorMsg = 'No repository was found';
      } else {
        app.loading = false;
        app.items = data.data.items;
      }
    }, function(data) {
        app.loading = false;
        app.errorMsg = 'Request failed';
    });
  }

});