var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createSection,
  getSections,
  getSectionsDetail,
  updteSection,
  deleteSections,
  updateSectionStatus,
} = require("../../controllers/super-admin/sectionsController");

var router = express.Router();

// define the home page route
router
  .get("/sections-list", isAuthorized, getSections)
  .post("/create-section", isAuthorized, createSection);
router
  .get("/section", isAuthorized, getSectionsDetail)
  .patch("/section", isAuthorized, updteSection)
  .delete("/section/:sectionId", isAuthorized, deleteSections);

router.patch("/section/status/:sectionId", isAuthorized, updateSectionStatus);

module.exports = router;
