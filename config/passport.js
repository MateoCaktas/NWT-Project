const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users"); // iz User.js na 27 retku imamo naziv users koji exportamo
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

//Passport u exports je samo parametar
module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //jwt_payload sadrzi ono sta payload ima na 69. retku iz users.js
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); // error i user se vrati
          }
          return done(null, false); // nije naslo korisnika
        })
        .catch(err => console.log(err));
    })
  );
};
