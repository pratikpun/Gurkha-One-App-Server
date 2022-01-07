const jwt = require("jsonwebtoken");

const authRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "secretKey");
    next();
  } catch (err) {
    return res.send({
      msg: "Authoriztion failed.",
    });
  }
};
module.exports = authRoute;
