const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  console.log(user);
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googlClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (acceessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("DEBUG EXISTING USER", existingUser);
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      console.log(user);
      return done(null, user);
    }
  )
);
