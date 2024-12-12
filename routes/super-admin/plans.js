var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createPlan,
  getPlanData,
  updatePlanData,
  deletePlan,
  getPlansList,
  updatePlanStatus,
} = require("../../controllers/super-admin/plansController");

var router = express.Router();

// define the home page route
router
  .get("/plans-list", isAuthorized, getPlansList)
  .post("/create-plan", isAuthorized, createPlan);
router
  .get("/plan/:planId", isAuthorized, getPlanData)
  .patch("/plan/:planId", isAuthorized, updatePlanData)
  .delete("/plan/:planId", isAuthorized, deletePlan);

router.patch("/plan/status/:planId", isAuthorized, updatePlanStatus);

module.exports = router;
