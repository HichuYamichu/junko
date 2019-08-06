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
      otherwise: () => 'You must specify a method see `help tag` for more info'
    };

    return Flag.continue(method);
  }
}

module.exports = TagCommand;
