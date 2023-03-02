const { Sequelize, DataTypes } = require("sequelize");

//Sequelize Connection

const connection = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    port: 3306,
    dialect: "mysql",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: process.env.POOL_ACQUIRE,
    //   idle: process.env.POOL_IDLE
    // }
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("connection established successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = connection;

db.User = require("../models/userModel")(connection, DataTypes);
db.Product = require("../models/productModel")(connection, DataTypes);

// ae idhar bhi chalega or app.js me bhi chalega....

// db.sequelize.sync({alter:true})
//   .then(() => {
//     // seed.seedAdmin()
//     console.log('Synced db.')
//   })
//   .catch((err) => {
//     console.log('Failed to sync db: ' + err.message)
//   })

module.exports = db;
