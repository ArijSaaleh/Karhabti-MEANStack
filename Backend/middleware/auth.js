const jwt = require("jsonwebtoken");
const jwtSecret = "secret";
exports.Authentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authenticated" });
      } else {
         /* res.send(decodedToken._id);*/
          req.user_id=decodedToken._id;
          next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authenticated, token not available" });
  }
};
