const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.js');


module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile'],
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        state: true
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ loginId: profile.id }, async (err, user) => {

            if (err) {
                return done(err, null)
            }

            if (!user) {
                const newUser = new User({
                    username: "",
                    loginId: profile.id,

                })
                await newUser.save();
            } else {
                console.log(user + 'this user !!!');
            }
        });
        return done(null, profile);
      }
    ));

    // passport.serializeUser((user, done) => {
    //     return done(null, user.id);
    //   });
    
    //   passport.deserializeUser((id, done) => {
    //       User.findOne({loginId: id}, (err, user) => {

    //         if (err) {
    //             console.log(err + 'ERROR !!!');
    //         }
    //           return done(err, user);
    //       })
    //   });

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { id: user.id, username: user.username, name: user.name });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
}