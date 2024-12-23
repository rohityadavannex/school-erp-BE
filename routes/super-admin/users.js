var express = require("express");

const {
  createUser,
  getAllUsers,
  getUserInfo,
  updateUser,
  updateUserStatus,
} = require("../../controllers/super-admin/usersController");
const { isAuthorized } = require("../../helpers/helpers");
const { upload } = require("../../utils/uploadFile");
var router = express.Router();

// define the home page route
router
  .get("/users-list", isAuthorized, getAllUsers)
  .post(
    "/create-user",
    isAuthorized,
    upload.single("instituteLogo"),
    createUser
  );
router
  .get("/user/:userId", isAuthorized, getUserInfo)
  .patch("/user/:userId", isAuthorized, updateUser)
  .patch("/update-status/user", isAuthorized, updateUserStatus);

module.exports = router;
