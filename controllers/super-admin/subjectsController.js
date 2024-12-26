const { where, Op } = require("sequelize");
const Subjects = require("../../models/super-admin/subjects");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createSubject = async (req, res) => {
  try {
    const { name, createdBy, active, schoolId } = req.body;
    const newClass = await Subjects.create({
      name,
      createdBy: req.userId,
      active,
      schoolId,
    });
    res
      .status(201)
      .json({ message: "Subject created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Subject
exports.getSubjects = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const { search = "", offset = 0, length = 10 } = req.query;
    const subject = await Subjects.findAll({
      limit: Number(length),
      offset: Number(offset),
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
        schoolId: schoolId,
      },
    });
    res.status(200).json({ data: subject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getSubjectsDetail = async (req, res) => {
  try {
    const { subjectId } = req.body;
    const subjectDetail = await Subjects.findByPk(subjectId);
    if (!subjectDetail) {
      return res.status(404).json({ error: "Subjects not found" });
    }
    res.status(200).json({ data: subjectDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteSubject = async (req, res) => {
  try {
    const { name, active, subjectId } = req.body;
    const updatedSubject = await Subjects.update(
      { name, active },
      { where: { id: subjectId } }
    );

    if (updatedSubject[0] === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ message: "Subject updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteSubjects = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const deletedClass = await Subjects.destroy({
      where: { id: subjectId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubjectStatus = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { status } = req.body;

    await Subjects.update({ active: status }, { where: { id: subjectId } });
    res.send({ status: 200, message: "Subject Status Updated." });
  } catch (err) {
    console.log("error SubjectUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
