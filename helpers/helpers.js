var jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = "Annex_crm_Private_key";

exports.generateJwtToken = function (userId) {
  return jwt.sign({ userId }, SECRET_KEY, {
    algorithm: "HS256",
  });
};

exports.isAuthorized = function (req, res, next) {
  try {
    const token = req.headers.authorization;

    if (token) {
      // Verify the token using jwt.verify method
      const decode = jwt.verify(token.split(" ")[1], SECRET_KEY);
      console.log("line 18 ", decode);
      if (decode) {
        req.userId = decode.userId;
        next();
        return;
      }
    }
    res.send({ status: 401, message: "Token is missing." });
  } catch (err) {
    res.send({
      status: 401,
      message: "Invalid token.",
    });
  }
};

exports.isSuperAdmin = async function (req, res, next) {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({
      attributes: ["role", "active"],
      where: {
        id: userId,
      },
    });
    if (userInfo.role !== 1) {
      res.send({ status: 403, message: "Action not allowed" });
      return;
    }
    next();
  } catch (err) {
    res.send({
      status: 401,
      message: "Invalid token.",
    });
  }
};

exports.fsResultHandler = function (err) {
  if (err) {
    console.log("unlink failed", err);
  } else {
    console.log("file deleted");
  }
};

exports.getPlainObjectFromSequelize = function (sequelizeData) {
  return JSON.parse(JSON.stringify(sequelizeData));
};

exports.timeToMilliseconds = function (time) {
  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Calculate total milliseconds
  const totalMilliseconds = (hours * 3600 + minutes * 60) * 1000;

  return totalMilliseconds;
};
