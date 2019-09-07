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
    const blacklist = await this.client.store.getBlacklist(message.guild, []);
    if (blacklist.includes(user.id)) {
      const index = blacklist.indexOf(user.id);
      blacklist.splice(index, 1);
      await this.client.store.setBlacklist(message.guild, blacklist);
      return message.util.send(`**${user.tag}** removed from the blacklist.`);
    }
    blacklist.push(user.id);
    await this.client.store.setBlacklist(message.guild, blacklist);
    return message.util.send(`**${user.tag}** added to the blacklist.`);
  }
}

module.exports = BlacklistCommand;
