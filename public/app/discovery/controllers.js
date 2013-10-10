'use strict';

angular.module('discovery')
  .controller('DiscoveryCtrl', ['$scope', 'WordListService',
    function ($scope, WordListService) {
      $scope.words = WordListService.getAllWords();

      $scope.options = {
        visible: false
      };

    }]);