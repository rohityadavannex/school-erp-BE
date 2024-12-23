"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add `instituteName` and `logo` columns to the `Users` table
    await queryInterface.addColumn("Users", "instituteName", {
      type: Sequelize.STRING,
      allowNull: true, // Set `false` if this column is mandatory
    });
    await queryInterface.addColumn("Users", "instituteLogo", {
      type: Sequelize.STRING,
      allowNull: true, // Set `false` if this column is mandatory
    });
    await queryInterface.addColumn("Users", "district", {
      type: Sequelize.STRING,
      allowNull: true, // Set `false` if this column is mandatory
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove `instituteName` and `logo` columns when rolling back
    await queryInterface.removeColumn("Users", "instituteName");
    await queryInterface.removeColumn("Users", "instituteLogo");
    await queryInterface.removeColumn("Users", "district");
  },
};
