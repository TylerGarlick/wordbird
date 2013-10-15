'use strict';
var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , User = require('../models/user')
  , nconf = require('nconf').file({ file: 'app/config/settings.json'}).env()
  ;

module.exports = function (app) {

  // Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });


  passport.use(new GoogleStrategy({
      clientID: nconf.get('googleClientId'),
      clientSecret: nconf.get('googleClientSecret'),
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);

      var user = {
        providerId: profile.id,
        providerName: profile.provider,
        token: accessToken
      };

      if (profile.name.givenName) {
        user.firstName = profile.name.givenName;
      }

      if (profile.name.familyName) {
        user.lastName = profile.name.familyName;
      }

      if (profile.emails && profile.emails.length > 0) {
        user.email = profile.emails[0].value;
      }

      if (profile.link) {
        user.profile.url = profile.link;
      }

      if (profile.locale) {
        user.profile.local = profile.local;
      }

      if (profile.gender) {
        user.profile.gender = profile.gender;
      }

      if (profile.picture) {
        user.photos.push({
          url: profile.picture,
          isDefault: true
        });
      }

      User.findOneAndUpdate({ providerId: profile.id }, user, { upsert: true },
        function (err, user) {
          return done(err, user);
        });
    }));

  app.get('/auth/google', passport.authenticate('google', {scope: 'openid profile email'}));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/#!/user/' + req.user.token);
    });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


};