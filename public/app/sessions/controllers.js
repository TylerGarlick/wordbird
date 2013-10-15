'use strict';
angular.module('sessions')
  .controller('LogoutCtrl', ['$scope',
    function ($scope) {
      $scope.storage.remove('token');
      $scope.flashr.later.success('Logout was successful!');
      $scope.$window.location.href = "/";
    }]);