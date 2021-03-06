const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models/User.model.js');

const config = require('./database');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.secretKey ? process.env.secretKey : config.secretKey;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
