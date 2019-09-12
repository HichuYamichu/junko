const { db } = require('../structs/Database');
const Sequelize = require('sequelize');

const Setting = db.define('settings', {
  guildID: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  prefix: {
    type: Sequelize.STRING
  },
  preset: {
    type: Sequelize.STRING
  },
  logChannel: {
    type: Sequelize.STRING
  },
  blacklist: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Setting;
