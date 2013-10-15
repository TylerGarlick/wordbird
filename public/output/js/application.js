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
angular.module('modules', ['core', 'discovery', 'sessions', 'users']);
angular.module('core', ['ui.bootstrap', 'flashr'])
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
'use strict';
angular.module('sessions', []).config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/logout', {templateUrl: '/app/sessions/views/logout.html', controller: 'LogoutCtrl'});
  }]);
'use strict';

angular.module('users', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/user/:token', {templateUrl: '/app/users/views/loadProfile.html', controller: 'LoadProfileCtrl'});
  }]);
'use strict';
angular.module('apis', []);

angular.module('apis')
  .factory('users', ['$http', function ($http) {
    var usersUrl = "/api/v1/users";
    return {
      get: function (token) {
        return $http.get(usersUrl + "/" + token);
      }
    }
  }])
  .factory('api', ['users',
    function (users) {
      return {
        users: users
      }
    }]);
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
'use strict';
angular.module('core')
  .factory('storage', ['$cookieStore',
    function ($cookieStore) {
      return {
        get: function (key) {
          var cookie = $cookieStore.get(key);
          if (cookie) {
            return cookie.token;
          } else {
            return null;
          }
        },
        save: function (key, data) {
          if (key === 'token') {
            $cookieStore.put(key, {token: data});
          } else {
            $cookieStore.put(key, data);
          }
        },
        remove: function (key) {
          $cookieStore.remove(key);
        }
      }
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
'use strict';
angular.module('sessions')
  .controller('LogoutCtrl', ['$scope',
    function ($scope) {
      $scope.storage.remove('token');
      $scope.flashr.later.success('Logout was successful!');
      $scope.$window.location.href = "/";
    }]);
'use strict';

angular.module('sessions')
  .controller('LoginDialogCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);
'use strict';
angular.module('users')
  .controller('LoadProfileCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
      $scope.storage.save('token', $routeParams.token);
      $scope.$window.location.href = "/";
    }]);