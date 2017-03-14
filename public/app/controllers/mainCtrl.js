angular.module('mainController', [])

.controller('mainCtrl', function(Data) {
	
  var app = this;

  app.pageSize = 10;

  function succesHandler(data) {
    if (data.data.total_count === 0) {
      app.loading = false;
      app.errorMsg = 'No repository was found';
    } else {
      app.loading = false;
      app.items = data.data.items;
      app.totalCount = data.data.total_count;
    }
  }

  function errorHandler(data) {
    app.loading = false;
    app.errorMsg = data.data.message;
  }

  app.search = function(searchKeyword) {

    app.loading = true;
    app.errorMsg = false;
    app.items = [];
    app.searchKeyword = searchKeyword;
    app.pageCounter = 1;
    app.totalCount = 0;

    Data.getData(app.searchKeyword, app.pageCounter).then(succesHandler, errorHandler);

  }

  app.changePage = function(pageNo) {
    app.errorMsg = false;
    app.loading = true;
    Data.getData(app.searchKeyword, pageNo).then(succesHandler, errorHandler);
  }

});
