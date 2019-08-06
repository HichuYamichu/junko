const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      emitter: 'commandHandler'
    });
  }

  exec(message, command, reason) {
    const responce = {
      owner: () => this.client.replies.get('ownerOnly'),
      guild: () => this.client.replies.get('guildOnly'),
      blacklist: () => this.client.replies.get('blacklisted')
    }[reason];


    if (!responce) return;
    if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
      message.reply(responce());
    }
  }
}

module.exports = CommandBlockedListener;
