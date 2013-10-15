"use strict";

angular.module('app', ['ngRoute', 'ngCookies', 'apis', 'modules'])
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix('!');
    }])
  .run(['$rootScope', '$window', '$location', 'flashr', 'api', 'storage',
    function ($rootScope, $window, $location, flashr, api, storage) {

      $rootScope.$window = $window;
      $rootScope.$location = $location;

      $rootScope.flashr = flashr;
      $rootScope.api = api;
      $rootScope.storage = storage;

      var token = storage.get('token');

      if (token) {
        api.users.get(token)
          .success(function (res, status) {
            if (status === 200) {
              $rootScope.currentUser = res;
            }
          })
          .error(function (res, status) {
            if (status === 404) {
              flashr.now.error("User not found.");
            } else {
              flashr.now.error("There was an error");
            }
          })
      }
    }]);