const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/connection");
const PlanAccess = require("../super-admin/planAccess");

const UserPlans = sequelize.define(
  "UserPlans",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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

UserPlans.hasMany(PlanAccess, { as: "planAccess", foreignKey: "planId" });
PlanAccess.belongsTo(UserPlans, { as: "userPlan", foreignKey: "planId" });

module.exports = UserPlans;
