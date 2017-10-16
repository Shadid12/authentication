const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

module.exports = (passport, User) => {

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

}
