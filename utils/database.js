const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "siarhei", "123698745wasd", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
