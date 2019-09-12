const Tag = require('../models/Tag');
const SettingsProvider = require('./SettingsProvider');

module.exports = class Store extends SettingsProvider {
  get Tag() {
    return Tag;
  }
};
