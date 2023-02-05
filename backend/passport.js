const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User=require('./model/User')

const passport = require("passport");

const GOOGLE_CLIENT_ID =process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
        
      try {
        
          let existingUser = await User.findOne({ gid: profile.id });
          // if user exists return the user
          console.log(existingUser)
          if (existingUser) {
              return done(null, profile);
          }
          
            //if user does not exist create a new user
      // console.log("Creating new user...");
      const newUser = new User({
       
              gid: profile.id,
              name: profile.displayName,
               photo: profile.photos[0].value,
         
      });
      await newUser.save();
      done(null, profile);
      // console.log(profile)
  } catch (error) {
    console.log(error)
      return done(error, false);
  }

    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
 
});
