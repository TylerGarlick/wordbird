'use strict';
angular.module('sessions', []).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/logout', {templateUrl: '/app/sessions/views/logout.html', controller: 'LogoutCtrl'});
  }]);