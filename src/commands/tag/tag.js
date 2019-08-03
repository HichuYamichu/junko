const { Command, Flag } = require('discord-akairo');

class TagCommand extends Command {
  constructor() {
    super('tag', {
      category: 'tags',
      aliases: ['tag'],
      channel: 'guild'
    });
  }

  *args() {
    const method = yield {
      type: [
        ['tag-get', 'get', 'show'],
        ['tag-add', 'add', 'new', 'set'],
        ['tag-del', 'del', 'delete', 'remove', 'rm']
      ],
      otherwise: async () => 'check help'
    };

    return Flag.continue(method);
  }
}

module.exports = TagCommand;
