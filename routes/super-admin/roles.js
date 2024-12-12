var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createRole,
  getRoleData,
  updateRoleData,
  getRolesList,
  deleteRole,
  updateRoleStatus,
} = require("../../controllers/super-admin/rolesController");

var router = express.Router();

// define the home page route
router
  .get("/roles-list", isAuthorized, getRolesList)
  .post("/create-role", isAuthorized, createRole);
router
  .get("/role/:roleId", isAuthorized, getRoleData)
  .patch("/role/:roleId", isAuthorized, updateRoleData)
  .delete("/role/:roleId", isAuthorized, deleteRole);

router.patch("/role/status/:roleId", isAuthorized, updateRoleStatus);

module.exports = router;
