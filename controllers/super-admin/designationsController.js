const { where, Op } = require("sequelize");
const Designations = require("../../models/super-admin/designations");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createDesignation = async (req, res) => {
  try {
    const { name, createdBy, active, schoolId } = req.body;
    const newClass = await Designations.create({
      name,
      createdBy: req.userId,
      active,
      schoolId,
    });
    res
      .status(201)
      .json({ message: "Designation created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Designation
exports.getDesignations = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const designation = await Designations.findAll({
      where: { schoolId: schoolId },
    });
    res.status(200).json({ data: designation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getDesignationsDetail = async (req, res) => {
  try {
    const { designationId } = req.body;
    const designationDetail = await Designations.findByPk(designationId);
    if (!designationDetail) {
      return res.status(404).json({ error: "Designations not found" });
    }
    res.status(200).json({ data: designationDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteDesignation = async (req, res) => {
  try {
    const { name, active, designationId } = req.body;
    const updatedDesignation = await Designations.update(
      { name, active },
      { where: { id: designationId } }
    );

    if (updatedDesignation[0] === 0) {
      return res.status(404).json({ error: "Designation not found" });
    }

    res.status(200).json({ message: "Designation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteDesignations = async (req, res) => {
  try {
    const designationId = req.params.designationId;
    const deletedClass = await Designations.destroy({
      where: { id: designationId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "Designation not found" });
    }

    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDesignationStatus = async (req, res) => {
  try {
    const { designationId } = req.params;
    const { status } = req.body;

    await Designations.update(
      { active: status },
      { where: { id: designationId } }
    );
    res.send({ status: 200, message: "Designation Status Updated." });
  } catch (err) {
    console.log("error DesignationUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
