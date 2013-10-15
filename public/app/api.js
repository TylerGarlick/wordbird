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