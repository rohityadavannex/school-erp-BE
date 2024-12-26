"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("Users", "alternatePhone", {
      type: Sequelize.BIGINT,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn("Users", "alternatePhone", {
      type: Sequelize.BIGINT,
    });
  },
};
