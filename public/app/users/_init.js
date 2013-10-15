'use strict';

angular.module('users', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/user/:token', {templateUrl: '/app/users/views/loadProfile.html', controller: 'LoadProfileCtrl'});
  }]);