const passport = require('passport');
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

require('./auth_strategies/google')(passport, User);
require('./auth_strategies/facebook')(passport, User);