angular.module('core', ['ui.bootstrap', 'flashr'])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {controller: 'HomeCtrl', templateUrl: '/app/core/views/home.html'})
        .when('/404', { controller: 'ErrorCtrl', templateUrl: '/app/core/views/404.html'})
        .otherwise({redirectTo: '404'});

    }]);