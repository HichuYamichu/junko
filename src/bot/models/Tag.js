const { db } = require('../structs/Database');
const Sequelize = require('sequelize');

const Tag = db.define('tag', {
  tagID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  guildID: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Tag;
