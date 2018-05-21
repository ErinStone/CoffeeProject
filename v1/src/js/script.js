(function () {
  "use strict";
  var app = angular.module('roastApp', []);

  app.component("roastMain", {
    templateUrl: 'tpl/roast-main.html',
    controller: "RoastMainController"
  });

})();