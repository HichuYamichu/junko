const { db } = require('../structs/Database');
const Sequelize = require('sequelize');

const Tag = db.define(
  'tag',
  {
    tagID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  { timestamps: false }
);

module.exports = Tag;
