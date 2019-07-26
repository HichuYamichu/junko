module.exports = {
  name: 'eval',
  description: 'Evaluates provided code',
  args: 1,
  usage: '<code>',
  guildOnly: false,
  cooldown: 2,
  aliases: [],
  permissionLVL: 2,
  async execute(message, args) {
    const { UserError } = message.client;
    const clean = text => {
      if (typeof text === 'string') {
        return text
          .replace(/`/g, `\`${String.fromCharCode(8203)}`)
          .replace(/@/g, `@${String.fromCharCode(8203)}`);
      }
      return text;
    };
    try {
      const code = args.join(' ');
      let evaled = eval(code);
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      message.channel.send(clean(evaled), { code: 'xl' });
    } catch (err) {
      throw new UserError(`\`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};
