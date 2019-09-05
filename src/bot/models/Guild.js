const { db } = require('../structs/Database');
const Sequelize = require('sequelize');

const Guild = db.define(
  'guild',
  {
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
    }
  },
  { timestamps: false }
);

module.exports = Guild;
