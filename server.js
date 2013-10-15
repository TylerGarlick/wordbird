"use strict";

var express = require('express')
  , http = require('http')
  , path = require('path')
  , authentication = require('./app/config/authentication')
  , passport = require('passport')
  , nconf = require('nconf').file({ file: 'app/config/settings.json'}).env()
  , api = require('./app/api')
  ;

require('./app/config/mongoose');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: nconf.get('sessionSecret') }));

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
authentication(app);

api(app);
app.use(app.router);

app.get('/', function(req, res){
  res.render('index');
});


app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
//  console.log(app.routes);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('#!/login');
}