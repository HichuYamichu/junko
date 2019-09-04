const { db } = require('../structs/Database');
const Sequelize = require('sequelize');

const Blacklist = db.define(
  'blacklist',
  {
    userID: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    }
  },
  { timestamps: false }
);

module.exports = Blacklist;
