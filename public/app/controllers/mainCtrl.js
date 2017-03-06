angular.module('mainController', [])

.controller('mainCtrl', function(Data) {
	
  var app = this;

  app.pageSize = 10;

  app.search = function(searchKeyword) {

    app.loading = true;
    app.errorMsg = false;
    app.items = [];
    app.searchKeyword = searchKeyword;
    app.pageCounter = 1;

    function succesHandler(data) {
      if (data.data.total_count === 0) {
        app.loading = false;
        app.errorMsg = 'No repository was found';
      } else {
        app.loading = false;
        if (data.data.items.length < 40) {
          for (var i=0; i < data.data.items.length; i++) {
            app.items.push(data.data.items[i]);
          }
        } else {
          for (var i=0; i < data.data.items.length; i++) {
            app.items.push(data.data.items[i]);
          }
          app.pageCounter++;
          Data.getData(app.searchKeyword, app.pageCounter).then(succesHandler, errorHandler);
        }
      }
    }

    function errorHandler(data) {
      app.loading = false;
      app.errorMsg = data.data.message;
    }


    Data.getData(app.searchKeyword, app.pageCounter).then(succesHandler, errorHandler);

  }

});
