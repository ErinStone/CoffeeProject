(function () {
  "use strict";
  var app = angular.module('roastApp', []);


  app.component("roastMain", {
    templateUrl: 'tpl/roast-main.html',
    controller: "RoastMainController"
  });

  app.component("roastWelcome", {
    templateUrl: 'tpl/roast-welcome.html'
  });

  app.component("roastList",{
    templateUrl: 'tpl/roast-list.html',
    controller: "RoastListController",
    bindings : {
      roasts : '<',
      onSetRoast : '&'
    }
  });

  app.component("roastAdd", {
    templateUrl: 'tpl/roast-add.html',
    controller: "RoastAddController",
    bindings : {
      onAddRoast : '&'
    }

  });

  app.component("roastDetail", {
    templateUrl: 'tpl/roast-detail.html',
    controller: "RoastDetailController",
    bindings : {
      roast : '=',
      onUpdateRoast : '&',
      onDeleteRoast : '&'
    }
  });

})();