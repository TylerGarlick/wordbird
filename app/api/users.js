'use strict';
var User = require('../models/user')
  ;
module.exports = function (app) {
  app.get('/api/v1/users/:token', function (req, res, next) {
    User.findOne({token: req.params.token}, function (err, user) {
      if (err) {
        next(err);
      } else {
        if (user) {
          res.send(200, user);
        } else {
          res.send(404);
        }
      }
    });
  });
};