var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createClass,
  getClasses,
  getClassesDetail,
  updteClass,
  deleteClasses,
  updateClassStatus,
} = require("../../controllers/super-admin/classesController");

var router = express.Router();

// define the home page route
router
  .get("/classes-list", isAuthorized, getClasses)
  .post("/create-class", isAuthorized, createClass);
router
  .get("/class", isAuthorized, getClassesDetail)
  .patch("/class", isAuthorized, updteClass)
  .delete("/class/:classId", isAuthorized, deleteClasses);

router.patch("/class/status/:classId", isAuthorized, updateClassStatus);

module.exports = router;
