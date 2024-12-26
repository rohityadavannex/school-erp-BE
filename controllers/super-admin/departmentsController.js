const { where, Op } = require("sequelize");
const Departments = require("../../models/super-admin/departments");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

// Create a class
exports.createDepartment = async (req, res) => {
  try {
    const { name, createdBy, active, schoolId } = req.body;
    const newClass = await Departments.create({
      name,
      createdBy: req.userId,
      active,
      schoolId,
    });
    res
      .status(201)
      .json({ message: "Department created successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Department
exports.getDepartments = async (req, res) => {
  try {
    const { schoolId } = req.body;
    const department = await Departments.findAll({
      where: { schoolId: schoolId },
    });
    res.status(200).json({ data: department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get class details
exports.getDepartmentsDetail = async (req, res) => {
  try {
    const { departmentId } = req.body;
    const departmentDetail = await Departments.findByPk(departmentId);
    if (!departmentDetail) {
      return res.status(404).json({ error: "Departments not found" });
    }
    res.status(200).json({ data: departmentDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updteDepartment = async (req, res) => {
  try {
    const { name, active, departmentId } = req.body;
    const updatedDepartment = await Departments.update(
      { name, active },
      { where: { id: departmentId } }
    );

    if (updatedDepartment[0] === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteDepartments = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const deletedClass = await Departments.destroy({
      where: { id: departmentId },
    });

    if (!deletedClass) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartmentStatus = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { status } = req.body;

    await Departments.update(
      { active: status },
      { where: { id: departmentId } }
    );
    res.send({ status: 200, message: "Department Status Updated." });
  } catch (err) {
    console.log("error DepartmentUpdate ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
