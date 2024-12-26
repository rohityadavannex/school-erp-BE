var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createSubject,
  getSubjects,
  getSubjectsDetail,
  updteSubject,
  deleteSubjects,
  updateSubjectStatus,
} = require("../../controllers/super-admin/subjectsController");

var router = express.Router();

// define the home page route
router
  .get("/subjects-list", isAuthorized, getSubjects)
  .post("/create-subject", isAuthorized, createSubject);
router
  .get("/subject", isAuthorized, getSubjectsDetail)
  .patch("/subject", isAuthorized, updteSubject)
  .delete("/subject/:subjectId", isAuthorized, deleteSubjects);

router.patch("/subject/status/:subjectId", isAuthorized, updateSubjectStatus);

module.exports = router;
