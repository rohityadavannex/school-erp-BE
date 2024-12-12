const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");

const ModuleAccess = sequelize.define(
  "ModuleAccess",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ModuleAccess;
