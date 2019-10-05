import { Command, Flag } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class TagCommand extends Command {
  public constructor() {
    super('tag', {
      category: 'tags',
      aliases: ['tag'],
      channel: 'guild',
      description: {
        content: stripIndents`Use one of the following:
        • get \`<tag>\`
        • add \`<tag> <content>\`
        • del \`<tag>\`
        • edit \`<tag> <content>\``,
        usage: '<method> <...args>',
        examples: [
          'get tagName',
          'add tagName TagContent',
          'del tagName',
          'edit tagName TagContent'
        ]
      }
    });
  }

  public *args() {
    const method = yield {
      type: [
        ['tag-get', 'get', 'show'],
        ['tag-add', 'add', 'new', 'set'],
        ['tag-del', 'del', 'delete', 'remove', 'rm'],
        ['tag-edit', 'edit', 'update', 'change'],
        ['tag-list', 'list', 'show']
      ],
      otherwise: () => 'You must specify a method see `help tag` for more info'
    };

    return Flag.continue(method);
  }
}

module.exports = TagCommand;
