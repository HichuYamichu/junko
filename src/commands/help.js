const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Helps you',
  args: 0,
  usage: 'help <command name>',
  examples: ['help ping', 'help tag'],
  guildOnly: false,
  cooldown: 2,
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
        .addField(
          'More help',
          'You can send `help [command name]` to get info on a specific command!'
        )
        .addField(
          'Notation',
          `\`[thing1 | thing2]\` - include one of the options literally
        \`<thing>\` - fill command with appropriate content
        \`<thing1 | thing2>\` - multiple content types available
        \`*<thing>\` - parameter is optional or has a default value`
        );
      return message.channel.send(embed);
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    const embed = new MessageEmbed().setTitle(`\`${command.name} ${command.usage}\``).setColor('#fc2041');
    embed.addField('Description:', command.description);
    embed.addField('Aliases:', `${command.aliases.join(', ')}`, true);
    embed.addField('Cooldown:', `${command.cooldown || 3} second(s)`, true);
    embed.addField('Permission LVL:', command.permissionLVL, true);
    embed.addField('Examples', command.examples);

    message.channel.send(embed);
  }
};
