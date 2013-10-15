"use strict";

angular.module('core')
  .controller('AppCtrl', ['$scope', '$modal',
    function ($scope, $modal) {
      $scope.showLogin = function () {

        var modalInstance = $modal.open({
          templateUrl: '/app/sessions/views/login.html',
          controller: 'LoginDialogCtrl'
        });

        modalInstance.result
          .then(function (user) {
//            $scope.flashr.later.success('Login was successful!');
            $scope.$window.location.href = "/";
          });
      }

    }])
  .controller('ErrorCtrl', ['$scope',
    function ($scope) {

    }])
  .controller('HomeCtrl', ['$scope',
    function ($scope) {


    }]);