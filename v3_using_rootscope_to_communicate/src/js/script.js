(function () {
  "use strict";
  var app = angular.module('roastApp', []);


  app.component("roastMain", {
    templateUrl: 'tpl/roast-main.html',
    controller: "RoastMainController"
  });

  app.component("roastList",{
    templateUrl: 'tpl/roast-list.html',
    controller: "RoastListController"
  });

  app.component("roastWelcome", {
    templateUrl: 'tpl/roast-welcome.html',
    controller: "RoastWelcomeController"
  });

  app.component("roastAdd", {
    templateUrl: 'tpl/roast-add.html',
    controller: "RoastAddController"

  });

  app.component("roastDetail", {
    templateUrl: 'tpl/roast-detail.html',
    controller: "RoastDetailController"
  });

})();