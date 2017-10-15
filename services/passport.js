const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
              if (existingUser) {
                // we already have a record with the given profile ID
                done(null, existingUser);
              } else {
                // we don't have a user record with this ID, make a new record!
                console.log(profile);
                new User({ googleId: profile.id,
                           name:     profile.displayName
                })
                  .save()
                  .then(user => done(null, user));
              }
            });
    }
  )
);