var express =require('express');

var router = express.Router(); //Instance 

const bcrypt = require("bcryptjs"); //Library used for hashing passwords
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const saltRounds = 10; //level of complexity for bcrypt

//Import the User Model: Models represent the structure of documents stored in mongoDB


const User = require('../models/User'); 
const isAuthenticated = require('../middleware')