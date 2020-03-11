const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
    h;
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googlClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (acceessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have record with given profile ID
          done(null, existingUser);
        } else {
          // we don't have a record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
      console.log("access token", acceessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
    }
  )
);
