"use strict";

angular.module('app', ['ngRoute', 'modules'])
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix('!');
    }]);