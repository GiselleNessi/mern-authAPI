const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        // if not signed in not allow to add customer
      const token = req.cookies.token;
      if (!token) return res.status(401).json({errorMessage: "Unauthorized"}); 

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // alow to read the id of user
      req.use = verified.user;

      next();
    } catch (err) {
        console.error(err);
        res.status(401).json({errorMessage: "Unauthorized"});   
    }
}

module.exports = auth;