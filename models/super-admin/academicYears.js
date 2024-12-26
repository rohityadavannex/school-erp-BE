const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const AcademicYears = sequelize.define(
  "AcademicYears",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    startSession: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endSession: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = AcademicYears;
