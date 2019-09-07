const { Command } = require('discord-akairo');

class SayCommand extends Command {
  constructor() {
    super('say', {
      aliases: ['say'],
      category: 'passive',
      args: [
        {
          id: 'guildID'
        },
        {
          id: 'channelID'
        },
        {
          id: 'content'
        }
      ]
    });
  }

  async exec(message, { guildID, channelID, content }) {
    if (message) return message.util.send('Not happening.');
    return this.client.guilds
      .get(guildID)
      .channels.get(channelID)
      .send(content);
  }
}

module.exports = SayCommand;
