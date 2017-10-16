const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../../config/keys');

module.exports = (passport, User) => {

passport.use(new FacebookStrategy({
    clientID: keys.facebookID,
    clientSecret: keys.facebookSecrect,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  }
));



}