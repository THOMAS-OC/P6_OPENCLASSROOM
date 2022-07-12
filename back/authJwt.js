const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRETKEY);
       const userId = decodedToken.userId;
       console.log(userId);
       req.auth = {
           userId: userId
       };
       console.log("Token okay");
       console.log(req.auth);
	next();
   } catch(error) {
       console.log("Mauvais token");
       res.status(401).json({ error });
   }
};