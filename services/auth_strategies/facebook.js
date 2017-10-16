const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../../config/keys');

module.exports = (passport, User) => {

passport.use(new FacebookStrategy({
    clientID: keys.facebookID,
    clientSecret: keys.facebookSecrect,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    		User.findOne({ facebookId: profile.id }).then(existingUser => {
                if (existingUser) {
                  // we already have a record with the given profile ID
                  done(null, existingUser);
                } else {
                  // we don't have a user record with this ID, make a new record!
                  console.log(profile);
                  new User({ facebookId: profile.id,
                             name:     profile.displayName
                  })
                    .save()
                    .then(user => done(null, user));
                }
            });
  }
));



}