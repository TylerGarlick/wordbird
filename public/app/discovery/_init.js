'use strict';
angular.module('discovery', [])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/discovery', {controller: 'DiscoveryCtrl', templateUrl: '/app/discovery/views/discovery.html'});
    }]);