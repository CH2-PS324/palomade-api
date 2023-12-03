const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define model
db.user = require('./user.model')(sequelize, Sequelize);
db.refreshToken = require('./refreshToken.model')(sequelize, Sequelize);

// define relation
db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
});

const initializeDatabase = async () => {
  try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      await sequelize.sync(); // Sync models with the database
      console.log("Database synchronized.");
  } catch (error) {
      console.error("Unable to connect to the database:", error.message);
      throw error; // rethrow the error to be caught in server.js
  }
};

module.exports = { db, initializeDatabase };