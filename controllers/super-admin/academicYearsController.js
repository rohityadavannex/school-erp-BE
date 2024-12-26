const { where, Op } = require("sequelize");
const AcademicYears = require("../../models/super-admin/academicYears");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createAcademicYear = async (req, res) => {
  try {
    const { note, startSession, endSession, createdBy, active, schoolId } =
      req.body;
    const newClass = await AcademicYears.create({
      note,
      createdBy: req.userId,
      active,
      schoolId,
      startSession,
      endSession,
    });
    res
      .status(201)
      .json({ message: "AcademicYear created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all AcademicYear
exports.getAcademicYears = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const academicYear = await AcademicYears.findAll({
      where: { schoolId: schoolId },
    });
    res.status(200).json({ data: academicYear });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getAcademicYearsDetail = async (req, res) => {
  try {
    const { academicYearId } = req.body;
    const academicYearDetail = await AcademicYears.findByPk(academicYearId);
    if (!academicYearDetail) {
      return res.status(404).json({ error: "AcademicYears not found" });
    }
    res.status(200).json({ data: academicYearDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteAcademicYear = async (req, res) => {
  try {
    const { note, startSession, endSession, active, academicYearId, schoolId } =
      req.body;
    const updatedAcademicYear = await AcademicYears.update(
      { note, startSession, endSession, active },
      { where: { id: academicYearId } }
    );

    if (updatedAcademicYear[0] === 0) {
      return res.status(404).json({ error: "AcademicYear not found" });
    }

    res.status(200).json({ message: "AcademicYear updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteAcademicYears = async (req, res) => {
  try {
    const academicYearId = req.params.academicYearId;
    const deletedClass = await AcademicYears.destroy({
      where: { id: academicYearId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "AcademicYear not found" });
    }

    res.status(200).json({ message: "AcademicYear deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAcademicYearStatus = async (req, res) => {
  try {
    const { academicYearId } = req.params;
    const { status } = req.body;

    await AcademicYears.update(
      { active: status },
      { where: { id: academicYearId } }
    );
    res.send({ status: 200, message: "AcademicYear Status Updated." });
  } catch (err) {
    console.log("error AcademicYearUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
