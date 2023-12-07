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
db.configs = require('./config.model')(sequelize, Sequelize);
db.shipping = require('./shipping.model')(sequelize, Sequelize);
db.shipping_detail = require('./shipping_detail.model')(sequelize, Sequelize);
db.subscription = require('./subscription.model')(sequelize, Sequelize);
db.subscription_detail = require('./subscription_detail.model')(sequelize, Sequelize);

// define relation
db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
    foreignKey: "userId",
    targetKey: "id",
});

db.user.hasMany(db.shipping, {
    foreignKey: "driver_id",
    targetKey: "id"
});
db.user.hasMany(db.shipping, {
    foreignKey: "organisasi_id",
    targetKey: "id"
});

db.shipping.hasMany(db.shipping_detail, {
    foreignKey: "shipping_id",
    targetKey: "id"
})

db.user.hasMany(db.subscription_detail, {
    foreignKey: "id_user",
    targetKey: "id"
})
db.subscription.hasMany(db.subscription_detail, {
    foreignKey: "id_subscription",
    targetKey: "id"
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