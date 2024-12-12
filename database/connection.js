const { Sequelize } = require('sequelize');
const databaseConfig = require("../config/config.json");

const {host, username, password, database} = databaseConfig[process.env.ENVIRONMENT];

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql'
});

async function checkDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {
    sequelize,
    checkDatabaseConnection
}
