const { Command } = require('discord-akairo');
const { search } = require('kaori');

class YouCommand extends Command {
  constructor() {
    super('you', {
      aliases: ['you'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Sends you cute pic of myself.',
        usage: '',
        examples: ['']
      },
      clientPermissions: ['ATTACH_FILES']
    });
  }

  async exec(message, args) {
    const [result] = await search('gelbooru', {
      tags: ['rating%3Asafe', 'junko_(touhou)'],
      limit: 1,
      random: true
    });
    return message.util.send('Me!', { files: [result.fileURL] });
  }
}

module.exports = YouCommand;
