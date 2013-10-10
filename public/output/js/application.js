"use strict";

angular.module('app', ['ngRoute', 'modules'])
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix('!');
    }]);
angular.module('modules', ['core', 'discovery']);
angular.module('core', ['ui.bootstrap'])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {controller: 'HomeCtrl', templateUrl: '/app/core/views/home.html'})
        .when('/404', { controller: 'ErrorCtrl', templateUrl: '/app/core/views/404.html'})
        .otherwise({redirectTo: '404'});

    }]);
'use strict';
angular.module('discovery', [])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/discovery', {controller: 'DiscoveryCtrl', templateUrl: '/app/discovery/views/discovery.html'});
    }]);
'use strict';
"use strict";

angular.module('core')
  .controller('AppCtrl', ['$scope',
    function ($scope) {

    }])
  .controller('ErrorCtrl', ['$scope',
    function ($scope) {

    }])
  .controller('HomeCtrl', ['$scope',
    function ($scope) {




    }]);
'use strict';

angular.module('discovery')
  .controller('DiscoveryCtrl', ['$scope', 'WordListService',
    function ($scope, WordListService) {
      $scope.words = WordListService.getAllWords();

      $scope.options = {
        visible: false
      };

    }]);
'use strict';

angular.module('discovery')
  .factory('WordListService', function () {
    var wordList = [];
    var _index = 0;

    _setupWordList();

    return {
      getAllWords: function () {
        return wordList;
      },
      getWord: function (index) {
        return wordList[index];
      },
      save: function (word) {
        wordlist[i] = word;
      },
      next: function () {
        // do logic to find next
        // make sure we are in bounds of array
        _index++;
        return wordList[_index];
      },
      previous: function () {
        // do logic to find prev
        // make sure we are in bounds of array
        _index--;
        return wordList[_index];
      }
    };

    function _setupWordList() {
      for (var i = 0; i < 25; i++) {
        wordList.push({
          id: i,
          english: 'English Word ' + i,
          spanish: 'Spanish Word ' + i,
          pronunciation: 'Pronunciation ' + i,
          count: 0,
          skip: false
        });
      }
    }
  });