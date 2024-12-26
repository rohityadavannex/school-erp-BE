const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  instituteName: {
    type: DataTypes.STRING,
    allowNull: true,
  }, // Add new field
  instituteLogo: {
    type: DataTypes.STRING,
    allowNull: true,
  }, // Add new field
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  phone: {
    type: DataTypes.BIGINT,
  },
  alternatePhone: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifyToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tokenTime: {
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
});

module.exports = User;
