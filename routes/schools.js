const SchoolModel = require ("../models/SchoolModel");
var express = require("express");
const mongoose = require ('mongoose');

//Instance of Express Router
const schoolRouter = express.Router();


//Get the schools

schoolRouter.post("/",  async function (req, res, next){
console.log(req.body);
const { position, title, content } = req.body //extract data from req body 

//New instance of the school model? 
const newSchool = new SchoolModel({
    position: position,
    title: title,
    content: content,
});

//Save to database
const savedSchool = await newSchool.save();



})



//Create schools in the database 
SchoolModel.create({school})

module.exports = schoolRouter;