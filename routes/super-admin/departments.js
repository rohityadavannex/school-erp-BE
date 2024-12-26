var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createDepartment,
  getDepartments,
  getDepartmentsDetail,
  updteDepartment,
  deleteDepartments,
  updateDepartmentStatus,
} = require("../../controllers/super-admin/departmentsController");

var router = express.Router();

// define the home page route
router
  .get("/departments-list", isAuthorized, getDepartments)
  .post("/create-department", isAuthorized, createDepartment);
router
  .get("/department", isAuthorized, getDepartmentsDetail)
  .patch("/department", isAuthorized, updteDepartment)
  .delete("/department/:departmentId", isAuthorized, deleteDepartments);

router.patch(
  "/department/status/:departmentId",
  isAuthorized,
  updateDepartmentStatus
);

module.exports = router;
