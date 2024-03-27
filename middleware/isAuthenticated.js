const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || token === "null") {
    return res.status(400).json({ message: "Token not found" });
  }
 
  try {
    const tokenInfo = jwt.verify(token, process.env.SECRET); //Use the secret to validate it comes from our app
    req.user = tokenInfo;
    next(); //proceed to the next step in our verifying moment
  } catch (error) {
    console.log(error.message, "Error.message")
    return res.status(401).json(error); //JSON obj with the error
  }
  
};

module.exports = isAuthenticated;