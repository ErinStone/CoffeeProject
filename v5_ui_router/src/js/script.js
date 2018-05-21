(function(){
  var app = angular.module('roastApp', ['ui.router']);

  app.config(function ($stateProvider) {
    var states = [
      {
        name: 'welcome',
        url: '',
        component: 'roastWelcome'
      },

      {
        name: 'detail',
        url: '/{id}',
        component: 'roastDetail',
        //This state defines a 'detail' resolve - it delegates to the roastService, passing the roastID parameter
        // from the transitions and since roast is a bound field on the detail component, it will get the data returned 
        //and it is then avaiable to display it in UI (the templateURL)
        resolve:{
          roast: function(RoastService, $transition$){
            return RoastService.getRoast($transition$.params().id);
          }
        }
      },

      {
        name: 'new',
        url: '/new',
        component: 'roastAdd'
      }

    ]

    // Loop over the state definitions and register them
    states.forEach(function (state) {
      $stateProvider.state(state);
    });

  });

  app.component("roastMain", {
    templateUrl: 'tpl/roast-main.html',
    controller: "RoastMainController"
  });

  app.component("roastWelcome", {
    templateUrl: 'tpl/roast-welcome.html'
  });

  app.component("roastList", {
    templateUrl: 'tpl/roast-list.html',
    controller: "RoastListController",
    bindings: {
      roasts: '<'
    }
  });

  app.component("roastAdd", {
    templateUrl: 'tpl/roast-add.html',
    controller: "RoastAddController",
    bindings: {
      onAddRoast: '&'
    }

  });

  app.component("roastDetail", {
    templateUrl: 'tpl/roast-detail.html',
    controller: "RoastDetailController",
    bindings: {
      roast: '<',
      onUpdateRoast: '&',
      onDeleteRoast: '&'
    }
  });

})();