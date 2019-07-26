const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Helps you',
  args: 0,
  usage: 'help <command name>',
  guildOnly: false,
  cooldown: 5,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push(commands.map(command => command.name).join(', '));
      const embed = new MessageEmbed()
        .setTitle('**Help**')
        .setColor('#fc2041')
        .addField('Commands:', data[0])
        .addField('More help', `You can send \`${
          message.client.config.prefix
        }help [command name]\` to get info on a specific command!`)
        .addField('Notation', `\`[thing1 | thing2]\` - include one of the options literally
        \`<thing>\` - fill command with appropriate content
        \`<thing1 | thing2>\` - multiple content types available
        \`*<thing>\` - parameter is optional or has a default value`);
      return message.channel.send(embed);
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) {
      data.push(`**Usage:** ${message.client.config.prefix}${command.name} ${command.usage}`);
    }

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  }
};
