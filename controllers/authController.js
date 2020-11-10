const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");

// Sign UP

router.post("/api/signup", (req, res) => {
  const { email, password, username, location, skills, skateDate } = req.body;
     console.log(email);
     console.log(password);
  if (!email.trim() || !password.trim()) {
    res.status(400);
  } else {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        console.log(hashedPassword);
        db.User.create({
          email: email,
          username: username,
          password: hashedPassword,
          location: location, 
          skills: skills, 
          skateDate: skateDate
        })
          .then((newUser) => {
            const token = jwt.sign(
              {
                _id: newUser._id,
                email: newUser.email,
                username:username, 
                location: location, 
                skills: skills, 
                skateDate: skateDate
                
                
                // firstName: newUser.firstName,
                // lastName: newUser.lastName,
              },
              "seleniumisawesome"
            );
            res.json({
              error: false,
              data: token,
              message: "Successfully signed up.",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to signup.",
            });
          });
      })
      .catch((err) => {
        res.status(500);
      });
  }
});

// Login

router.post("/api/login", (req, res) => {
  // Pull user provided email address and password from the body.
  console.log(req.body);
  const { emailAddress, password } = req.body;
  console.log("email" + emailAddress);
  // See if there is a matching user in the database.
  db.User.findOne({ email: emailAddress })
    .then((foundUser) => {
      if (foundUser) {
        console.log(foundUser);
        console.log("Hashed password from DB", foundUser.password);
        console.log("Plain text password from user", password);
        // If there is a matching user, compare the plaintext password with the stored, hashed password.
        bcrypt
          .compare( password,foundUser.password)
          .then(function (result) {
            // result == true
            console.log("The passwords match: ", result);
            if (result) {
              console.log("Result true: password matches");
              // If the passwords match, send back success.
              // TODO: send a jwt back as data instead. DONE
              // TODO: lock down the token with a time frame
              const token = jwt.sign(
                {
                  _id: foundUser._id,
                  email: foundUser.email,
                  username: foundUser.username, 
                  skills: foundUser.skills
                },
                "secret"
              );
              res.json({
                error: false,
                data: token,
                message: "Successfully logged in.",
              });
            } else {
              // If the passwords don't match, send back an error.
              res.status(401).json({
                error: true,
                data: null,
                message: "Failed to sign in.",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              error: true,
              data: null,
              message: "Failed to sign in.",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to sign in.",
      });
    });
});

module.exports = router;
