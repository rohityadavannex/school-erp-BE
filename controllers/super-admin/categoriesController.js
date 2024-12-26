const { where, Op } = require("sequelize");
const Categories = require("../../models/super-admin/categories");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createCategory = async (req, res) => {
  try {
    const { name, createdBy, active, schoolId } = req.body;
    const newClass = await Categories.create({
      name,
      createdBy: req.userId,
      active,
      schoolId,
    });
    res
      .status(201)
      .json({ message: "Category created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Category
exports.getCategories = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const category = await Categories.findAll({
      where: { schoolId: schoolId },
    });
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getCategoriesDetail = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const categoryDetail = await Categories.findByPk(categoryId);
    if (!categoryDetail) {
      return res.status(404).json({ error: "Categories not found" });
    }
    res.status(200).json({ data: categoryDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteCategory = async (req, res) => {
  try {
    const { name, active, categoryId } = req.body;
    const updatedCategory = await Categories.update(
      { name, active },
      { where: { id: categoryId } }
    );

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteCategories = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedClass = await Categories.destroy({
      where: { id: categoryId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoryStatus = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { status } = req.body;

    await Categories.update({ active: status }, { where: { id: categoryId } });
    res.send({ status: 200, message: "Category Status Updated." });
  } catch (err) {
    console.log("error CategoryUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
