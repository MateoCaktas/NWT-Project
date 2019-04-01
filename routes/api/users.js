const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
// Load user model
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users works!"
  })
);
//ovaj API nam daje JSON
// @route   GET api/users/register
// @desc    Registers users
// @access  Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //hashiranje passworda
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user)) //mongoose funkcija,saljemo successful response sa ovim korisnikom
            .catch(err => console.log(err));
        });
      });
    }
  }); //Trazimo postoji li vec zatrazeni email koji korisnik zeli registrirat
});
module.exports = router;
