var express =require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors');

var authRouter =require('./routes/auth');
var userRouter = require('./routes/user');



//Create an express instance 
const app= express();


// MIDDLEWARE:
//This line adds middleware to your Express APP
//logger('dev') function creates a logger middleware with the predefined 'dev' format. This format includes HTTP method, URL, status code, response time, and other information about incoming requests. 
app.use(logger('dev'));
app.use(express.json()); //express.JSON is built-in middleware in Express that parses incoming requests bodies with JSON 
app.use(express.urlencoded({ extended: false })); //URL encoded data is parsed with the `querystring` library
//Add CORS middleware to Express app
app.use(
  cors({
    origin: [process.env.REACT_APP_URI] //this is  the origin
  })
);




// Routes with Express Router
//App.use() for routes to be accessible in your application 
app.use('/users', userRouter);
app.use('/auth', authRouter);




//Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, ()=> {
//     console.log(`Server running on port===>' ${PORT}`)
// }); 



mongoose.connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err))




module.exports = app;
