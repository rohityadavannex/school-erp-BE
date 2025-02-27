var express = require("express");

const {
  createUser,
  getAllUsers,
  getUserInfo,
  updateUser,
} = require("../../controllers/super-admin/usersController");
const { isAuthorized } = require("../../helpers/helpers");
var router = express.Router();

// define the home page route
router
  .get("/users-list", isAuthorized, getAllUsers)
  .post("/create-user", isAuthorized, createUser);
router
  .get("/user/:userId", isAuthorized, getUserInfo)
  .patch("/user/:userId", isAuthorized, updateUser);

module.exports = router;
