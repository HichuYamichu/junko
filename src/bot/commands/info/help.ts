import { Message } from 'discord.js';
import { Command, PrefixSupplier } from 'discord-akairo';
import { stripIndents } from 'common-tags';

export default class HelpCommand extends Command {
  public constructor() {
    super('help', {
      aliases: ['help'],
      category: 'info',
      ownerOnly: false,
      description: {
        content: 'Helps you.',
        usage: '*<command>',
        examples: ['ping', 'stats', 'image']
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias'
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  public async exec(message: Message, { command }: { command: Command }) {
    const prefix = (this.handler.prefix as PrefixSupplier)(message);
    if (!command) {
      const embed = this.client.util
        .embed()
        .setColor(this.client.config.color)
        .addField(
          'More help',
          `You can send \`${prefix}help [command name]\` to get info on a specific command!`
        )
        .addField(
          'Notation',
          stripIndents`
          \`<thing>\` - fill with appropriate content
          \`<thing1 | thing2>\` - multiple content types available
          \`[thing]\` - parameter is optional or has a default value`
        )
        .addField('\u200B', '\u200B');

      for (const category of this.handler.categories.values()) {
        embed.addField(
          category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase()),
          `${category
            .filter(cmd => cmd.aliases.length > 0)
            .map(cmd => `\`${cmd.aliases[0]}\``)
            .join(' ')}`
        );
      }

      return message.util.send(embed);
    }
    const embed = this.client.util
      .embed()
      .setColor(this.client.config.color)
      .setTitle(
        `\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``
      )
      .addField('Description:', command.description.content);

    if (command.description.examples?.length) {
      embed.addField(
        'Examples:',
        `\`${command.aliases[0]} ${command.description.examples.join(
          `\`\n\`${command.aliases[0]} `
        )}\``,
        true
      );
    }
    if (command.aliases.length > 1) {
      embed.addField('Aliases:', `\`${command.aliases.join('` `')}\``, true);
    }

    return message.util.send(embed);
  }
}
