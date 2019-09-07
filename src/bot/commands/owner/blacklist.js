const { Command } = require('discord-akairo');

class BlacklistCommand extends Command {
  constructor() {
    super('blacklist', {
      aliases: ['blacklist'],
      category: 'owner',
      ownerOnly: true,
      channel: ['guild', 'dm'],
      description: {
        content: 'Makes me hate you even more.',
        usage: '<id | username | mention>',
        examples: ['462219867467022347', '@ someone']
      },
      args: [
        {
          id: 'user',
          type: 'user',
          prompt: {
            start: message => `${message.author}, who?`,
            retry: message => `${message.author}, seems like an invalid user.`
          }
        }
      ]
    });
  }

  async exec(message, { user }) {
    if (!user) return message.util.send('Please specify a valid user');
    const blacklist = await this.client.store.getBlacklist();
    if (blacklist.includes(user.id)) {
      await this.client.store.removeFromBlacklist(user.id);
      return message.util.send('User removed from blacklist!');
    }
    await this.client.store.addToBlacklist(user.id);
    return message.util.send('User blacklisted!');
  }
}

module.exports = BlacklistCommand;
