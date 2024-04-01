const SchoolModel = require("../models/SchoolModel");
var express = require("express");
const mongoose = require("mongoose");

//Instance of Express Router
const schoolRouter = express.Router();

//Get the schools

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

// userRouter.put("/:school", function(req, res, next) {
//     const { school } = req.params;
//     console.log("school", school, req.body);
//     User.findOneAndUpdate({ school: school }, req.body, { new: true })
//         .then(updatedSchool => {
//             console.log("Update School here --->", updatedSchool);
//             if (updatedSchool) {
//                 console.log("UPDATED!!! ===>", updatedSchool);
//                 res.status(201).json(updatedSchool);
//             } else {
//                 console.log("Not found");
//                 res.status(400).json({ message: "not found" });
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ message: "Error: Updating Schools" });
//         });
// });


//   //DELETE
//   userRouter.delete("/:school", function(req, res, next) {
//     const { school } = req.params;
//     console.log("Deleting school:", school);
//     User.findOneAndDelete({ school: school })
//         .then(deletedSchool => {
//             if (deletedSchool) {
//                 console.log("Deleted school:", deletedSchool);
//                 res.status(200).json({ message: "School deleted successfully" });
//             } else {
//                 console.log("School not found");
//                 res.status(404).json({ message: "School not found" });
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ message: "Error: Deleting School" });
//         });
// });



module.exports = schoolRouter;
