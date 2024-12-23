const { where, Op } = require("sequelize");
const Classes = require("../../models/super-admin/classes");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createClass = async (req, res) => {
  try {
    const { name, description, createdBy, active } = req.body;
    const newClass = await Classes.create({
      name,
      description,
      createdBy,
      active,
    });
    res
      .status(201)
      .json({ message: "Class created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Classes.findAll();
    res.status(200).json({ data: classes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getClassesDetail = async (req, res) => {
  try {
    const { classId } = req.body;
    const classDetail = await Classes.findByPk(classId);
    if (!classDetail) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ data: classDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteClass = async (req, res) => {
  try {
    const { name, description, active, classId } = req.body;
    const updatedClass = await Classes.update(
      { name, description, active },
      { where: { id: classId } }
    );

    if (updatedClass[0] === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json({ message: "Class updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteClasses = async (req, res) => {
  try {
    const classId = req.params.classId;
    const deletedClass = await Classes.destroy({ where: { id: classId } });

    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClassStatus = async (req, res) => {
  try {
    const { classId } = req.params;
    const { status } = req.body;

    await Classes.update({ active: status }, { where: { id: classId } });
    res.send({ status: 200, message: "Class Status Updated." });
  } catch (err) {
    console.log("error updatePlanStatus ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
