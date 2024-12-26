var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYearsDetail,
  updteAcademicYear,
  deleteAcademicYears,
  updateAcademicYearStatus,
} = require("../../controllers/super-admin/academicYearsController");

var router = express.Router();

// define the home page route
router
  .get("/academic-years-list", isAuthorized, getAcademicYears)
  .post("/create-academic-year", isAuthorized, createAcademicYear);
router
  .get("/academic-year", isAuthorized, getAcademicYearsDetail)
  .patch("/academic-year", isAuthorized, updteAcademicYear)
  .delete("/academic-year/:academicYearId", isAuthorized, deleteAcademicYears);

router.patch(
  "/academic-year/status/:academicYearId",
  isAuthorized,
  updateAcademicYearStatus
);

module.exports = router;
