var express = require("express");
const {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
} = require("../controllers/user");
const { isAuthorized } = require("../helpers/helpers");
const { getRoleData } = require("../controllers/super-admin/rolesController");
const { upload } = require("../utils/uploadFile");
var router = express.Router();

// define the home page route
router.post("/login", login);

router.post("/register", register);
router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", isAuthorized, updatePassword);

router.get("/user-info", isAuthorized, getUserInfo).patch(
  "/user-info",
  isAuthorized,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "instituteLogo", maxCount: 1 },
  ]),
  updateUserInfo
);

router.get("/role-access/:roleId", isAuthorized, getRoleData);

module.exports = router;
