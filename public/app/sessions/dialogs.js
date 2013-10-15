'use strict';

angular.module('sessions')
  .controller('LoginDialogCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);