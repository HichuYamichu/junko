const { Command } = require('discord-akairo');
const { search } = require('kaori');

class YouCommand extends Command {
  constructor() {
    super('you', {
      aliases: ['you'],
      ownerOnly: false,
      channel: ['guild', 'dm'],
      clientPermissions: ['ATTACH_FILES']
    });
  }

  async exec(message, args) {
    const [result] = await search('gelbooru', {
      tags: ['rating%3Asafe', 'junko_(touhou)'],
      limit: 1,
      random: true
    });
    message.channel.send('Me!', { files: [result.fileURL] });
  }
}

module.exports = YouCommand;
