var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createDesignation,
  getDesignations,
  getDesignationsDetail,
  updteDesignation,
  deleteDesignations,
  updateDesignationStatus,
} = require("../../controllers/super-admin/designationsController");

var router = express.Router();

// define the home page route
router
  .get("/designations-list", isAuthorized, getDesignations)
  .post("/create-designation", isAuthorized, createDesignation);
router
  .get("/designation", isAuthorized, getDesignationsDetail)
  .patch("/designation", isAuthorized, updteDesignation)
  .delete("/designation/:designationId", isAuthorized, deleteDesignations);

router.patch(
  "/designation/status/:designationId",
  isAuthorized,
  updateDesignationStatus
);

module.exports = router;
