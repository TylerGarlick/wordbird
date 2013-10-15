'use strict';
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , hat = require('hat')
  ;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, lowercase: true, index: true},
  token: {type: String },
  providerName: String,
  providerId: String,
  profile: {
    locale: String,
    gender: String,
    url: String
  },
  photos: [
    {
      url: {type: String, lowercase: true },
      isDefault: {type: Boolean, default: true}
    }
  ]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;