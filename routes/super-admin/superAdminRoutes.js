var express = require("express");

const {
  createModule,
  getModuleList,
} = require("../../controllers/super-admin/moduleController");

const { isAuthorized, isSuperAdmin } = require("../../helpers/helpers");
var router = express.Router();

router
  .post("/modules/create", isAuthorized, isSuperAdmin, createModule)
  .get("/modules/list", isAuthorized, isSuperAdmin, getModuleList);

module.exports = router;
