const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
//u package.json smo nadodali pod scripts -> server nodemon server.js kako bi automatski updatealo promjene kad bi runnali "npm run server", to nam nodemon omogucava

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config

const db = require("./config/keys").mongoURI; //hvatamo mongoURI iz keys fajla

//Connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true }) // useNewUrlParser -> izbjega DeprecationWarning
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000; // postavljamo port 5000 ili deployamo na heroku

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
