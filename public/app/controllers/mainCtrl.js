angular.module('mainController', [])

.controller('mainCtrl', function(Data, $scope) {
	
  const app = this;

  app.search = function(searchKeyword) {

    $scope.searchKeyword = searchKeyword;
    Data.getData($scope.searchKeyword).then(function(data) {
      if (data.status === 200) {
        if (data.data.total_count === 0) {
          app.errorMsg = 'No repository was found';
          app.name = undefined;
        } else {
          app.items = data.data.items;
          console.log(app.items[0].name);
        }
      } else {
        app.errorMsg = 'No repository was found';
      }
      console.log(data);

    });
  }

});