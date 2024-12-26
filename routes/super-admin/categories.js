var express = require("express");
const { isAuthorized } = require("../../helpers/helpers");
const {
  createCategory,
  getCategories,
  getCategoriesDetail,
  updteCategory,
  deleteCategories,
  updateCategoryStatus,
} = require("../../controllers/super-admin/categoriesController");

var router = express.Router();

// define the home page route
router
  .get("/categories-list", isAuthorized, getCategories)
  .post("/create-category", isAuthorized, createCategory);
router
  .get("/category", isAuthorized, getCategoriesDetail)
  .patch("/category", isAuthorized, updteCategory)
  .delete("/category/:categoryId", isAuthorized, deleteCategories);

router.patch(
  "/category/status/:categoryId",
  isAuthorized,
  updateCategoryStatus
);

module.exports = router;
