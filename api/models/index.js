const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging :false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
async function connectionDb(sequelize){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectionDb(sequelize);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./UserModel.js")(sequelize, Sequelize);
db.follow = require("./FollowModel.js")(sequelize, Sequelize);
module.exports = db;