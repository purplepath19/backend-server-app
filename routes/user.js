//This is the user middleware: an instance of Express Router.
//It consists of Route definitions(GET, PUT, POST, DELETE)
const User = require("../models/User");
var express = require("express");
const mongoose = require("mongoose");
var userRouter = express.Router(); //

userRouter.get("/", function (req, res, next) {
  const users = User.find({})
    .then((users) => {
      res.status(201).json(users);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
    
  // res.send("any string");
  
});

// user route
userRouter.get("/:username", function (req, res, next) {
  const username = req.params.username;
  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        res.status(201).json(foundUser);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error", err });
    });
});

// create
userRouter.post("/", async function (req, res, next) {
  console.log(req.body);
  const { username, name } = req.body;

  User.findOne({ username })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        console.log("foundUser", foundUser)
        res.status(400).json({ message: "Username already exists." });
        return;
      }

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then`
      User.create({ username, name })
        .then((createdUser) => {
          // Deconstruct the newly created user object to omit the password
          // We should never expose passwords publicly
          const { name, username, _id } = createdUser;

          // Create a new object that doesn't expose the password
          const user = { name, username, _id };

          // Send a json response containing the user object
          res.status(201).json({ user: user });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            console.log("Error:", err);
            res.status(501).json({ message: "Provide all fields", err });
          } else if (err.code === 1100) {
            console.log("Duplicate value", err);
            res.status(502).json({ message: "invalid name, password, email." });
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});


// Delete user
userRouter.delete("/:username", function (req, res, next) {
  const username = req.params.username;

User.findOneAndDelete({ username}) //User or user router?
  .then((deletedUser) => {
    if (deletedUser) {
      // User found and deleted successfully
      res.status(200).json({ message: "User deleted successfully", deletedUser });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  })
.catch((err)=> {
  console.log(err);
  res.status(500).json({message: "Error caught: Internal Server Error"})
})
})

//Exporting the router
module.exports = userRouter;
