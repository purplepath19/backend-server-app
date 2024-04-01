const SchoolModel = require("../models/SchoolModel");
var express = require("express");
const mongoose = require("mongoose");

//Instance of Express Router
const schoolRouter = express.Router();

//Get the schools
schoolRouter.get("/", function (req, res, next) {
    const school = SchoolModel.find({})
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
 schoolRouter.get("/:name", function (req, res, next) {
    const name = req.params.name;
    SchoolModel.findOne({ name })
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
schoolRouter.post("/", async function (req, res, next) {
  console.log(req.body);
  const { position, name, content } = req.body; //extract data from req body



SchoolModel.findOne({ name })
    .then((foundSchool) => {
      // If the user with the same email already exists, send an error response
      if (foundSchool) {
        console.log("foundSchool", foundSchool);
        res.status(400).json({ message: "School name already exists." });
        return;
      }

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then`
      SchoolModel.create({ position, name, content })
        .then((createdSchool) => {
          // Deconstruct the newly created user object to omit the password
          // We should never expose passwords publicly
          const { position, name, content, _id } = createdSchool;

          // Create a new object that doesn't expose the password
          const school = { position, name, content, _id };

          // Send a json response containing the user object
          res.status(201).json({ school: school });
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

schoolRouter.put("/:_id", function(req, res, next) {
    const { _id } = req.params;
    console.log("_id", _id, req.body);
    SchoolModel.findOneAndUpdate({ _id }, req.body, { new: true })
        .then(updatedSchool => {
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
  schoolRouter.delete("/:_id", function(req, res, next) {
    const { _id } = req.params;
    console.log("Deleting school:", _id);
    SchoolModel.findOneAndDelete({ _id })
        .then(deletedSchool => {
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
