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
  memberLog: {
    type: Sequelize.STRING
  },
  messageLog: {
    type: Sequelize.STRING
  },
  blacklist: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Setting;
