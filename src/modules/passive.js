const { replies } = require('./replies');

module.exports = {
  randomMsg: async message => {
    if (message.author.id === message.client.config.ownerID) return;
    if (message.content.replace('\'', '').toLowerCase() === 'im gay') {
      message.reply(replies.get('gay'));
    } else if (message.content === ':derp:') {
      message.reply(replies.get('derp'));
    }
  }
};
