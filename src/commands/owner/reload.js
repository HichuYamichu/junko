const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 'r'],
      category: 'owner',
      ownerOnly: true,
      channel: ['guild', 'dm'],
      description: {
        content: 'Reloads a module.',
        usage: '<module> [type:]',
        examples: ['eval', 'type:l cooldown']
      }
    });
  }

  *args() {
    const type = yield {
      'match': 'option',
      'flag': ['type:'],
      'type': [['command', 'c'], ['inhibitor', 'i'], ['listener', 'l']],
      'default': 'command'
    };

    const mod = yield {
      type: (msg, phrase) => {
        if (!phrase) return null;
        const resolver = this.handler.resolver.type(
          {
            command: 'commandAlias',
            inhibitor: 'inhibitor',
            listener: 'listener'
          }[type]
        );

        return resolver(msg, phrase);
      }
    };

    return { type, mod };
  }

  exec(message, { type, mod }) {
    if (!mod) {
      return message.util.reply(
        `Invalid ${type} ${type === 'command' ? 'alias' : 'ID'} specified to reload.`
      );
    }

    try {
      mod.reload();
      return message.util.reply(`Sucessfully reloaded ${type} \`${mod.id}\`.`);
    } catch (err) {
      console.log(err);
      return message.util.reply(`Failed to reload ${type} \`${mod.id}\`.`);
    }
  }
}

module.exports = ReloadCommand;
