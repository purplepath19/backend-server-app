const SchoolModel = require("../models/SchoolModel");
var express = require("express");
const mongoose = require("mongoose");
const isAuthenticated = require("../middleware/isAuthenticated");

//Instance of Express Router
const schoolRouter = express.Router();

//Get the schools
schoolRouter.get("/", function (req, res, next) {

  SchoolModel.find()
    .then((schools) => {
      res.status(201).json(schools);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });

  // res.send("any string");
});

// School route
schoolRouter.get("/:id", function (req, res, next) {

  console.log("These are params", req.params.id)

  
  SchoolModel.findById(req.params.id)
    .then((foundSchool) => {
      if (foundSchool) {
        res.status(201).json(foundSchool);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error", err });
    });
});

// POST
schoolRouter.post("/", isAuthenticated, async function (req, res, next) {
  // console.log(req.headers);
  const { address, latitude, longitude, name, description, photo } = req.body; //extract data from req body

  SchoolModel.findOne({ name })
    .then((foundSchool) => {
      // If the user with the same email already exists, send an error response
      if (foundSchool) {
        console.log("foundSchool", foundSchool);
        res.status(400).json({ message: "School name already exists." });
        return;
      }

      let thisPhoto

      if (photo) {
        thisPhoto = photo
      }
      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then`
      SchoolModel.create({ address, latitude, longitude, name, description, photo: thisPhoto, user: req.user._id })
        .then((createdSchool) => {

          res.status(201).json({ school: createdSchool });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            console.log("Error:", err);
            res.status(501).json({ message: "Provide all fields", err });
          } else if (err.code === 1100) {
            console.log("Duplicate value", err);
            res.status(502).json({ message: "invalid name" });
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// // UPDATE

schoolRouter.put("/:_id", function (req, res, next) {
  const { _id } = req.params;
  console.log("_id", _id, req.body);
  SchoolModel.findOneAndUpdate({ _id }, req.body, { new: true })
    .then((updatedSchool) => {
      console.log("Update School here --->", updatedSchool);
      if (updatedSchool) {
        console.log("UPDATED!!! ===>", updatedSchool);
        res.status(201).json(updatedSchool);
      } else {
        console.log("Not found");
        res.status(400).json({ message: "not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error: Updating Schools" });
    });
});

//DELETE
schoolRouter.delete("/:_id", function (req, res, next) {
  const { _id } = req.params;
  console.log("Deleting school:", _id);
  SchoolModel.findOneAndDelete({ _id })
    .then((deletedSchool) => {
      if (deletedSchool) {
        console.log("Deleted school:", deletedSchool);
        res.status(200).json({ message: "School deleted successfully" });
      } else {
        console.log("School not found");
        res.status(404).json({ message: "School not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error: Deleting School" });
    });
});

module.exports = schoolRouter;
