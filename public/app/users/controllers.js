'use strict';
angular.module('users')
  .controller('LoadProfileCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.storage.save('token', $routeParams.token);
      $scope.$window.location.href = "/";
    }]);