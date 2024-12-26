const { where, Op } = require("sequelize");
const Sections = require("../../models/super-admin/sections");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createSection = async (req, res) => {
  try {
    const {
      name,
      category,
      capacity,
      classId,
      teacher,
      note,
      createdBy,
      active,
      schoolId,
    } = req.body;
    const newClass = await Sections.create({
      name,
      createdBy: req.userId,
      category,
      capacity,
      class: classId,
      teacher,
      note,
      active,
      schoolId,
    });
    res
      .status(201)
      .json({ message: "Section created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Section
exports.getSections = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const section = await Sections.findAll({
      where: { schoolId: schoolId },
    });
    res.status(200).json({ data: section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getSectionsDetail = async (req, res) => {
  try {
    const { sectionId } = req.body;
    const sectionDetail = await Sections.findByPk(sectionId);
    if (!sectionDetail) {
      return res.status(404).json({ error: "Sections not found" });
    }
    res.status(200).json({ data: sectionDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteSection = async (req, res) => {
  try {
    const {
      name,
      category,
      capacity,
      classId,
      teacher,
      note,
      createdBy,
      active,
      sectionId,
    } = req.body;
    const updatedSection = await Sections.update(
      {
        name,
        createdBy: req.userId,
        category,
        capacity,
        class: classId,
        teacher,
        note,
        active,
      },
      { where: { id: sectionId } }
    );

    if (updatedSection[0] === 0) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.status(200).json({ message: "Section updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteSections = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const deletedClass = await Sections.destroy({
      where: { id: sectionId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSectionStatus = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { status } = req.body;

    await Sections.update({ active: status }, { where: { id: sectionId } });
    res.send({ status: 200, message: "Section Status Updated." });
  } catch (err) {
    console.log("error SectionUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
