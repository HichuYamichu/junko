const replies = require('../util/replies');

let store;

module.exports = class ReplyManager {
  static _init(storeInstance) {
    store = storeInstance;
  }

  static async getReply(message, category, appendText) {
    const preset = await store.getGuildPreset(message.guild);
    let text =
      replies[preset][category][Math.floor(Math.random() * replies[preset][category].length)];
    appendText ? text += appendText : '';
    return text;
  }
};
