'use strict';
var usersApi = require('./users');

module.exports = function (app) {
  usersApi(app);
};