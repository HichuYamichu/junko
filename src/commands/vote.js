const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'vote',
  description: 'Starts the voting.',
  args: 2,
  usage: '<time> <topic>',
  guildOnly: true,
  cooldown: 1,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const { UserError } = message.client;
    const time = args[0].split(':');
    const h = parseInt(time[0], 10);
    const m = parseInt(time[1], 10);
    const s = parseInt(time[2], 10);
    if (isNaN(h) || isNaN(m) || isNaN(s)) {
      throw new UserError('invalid time specified');
    }
    const timeInSec = h * 3600 + m * 60 + s;

    const text = args.slice(1).join(' ');

    const pool = new MessageEmbed()
      .setTitle('**Pool**')
      // // .setDescription(args[0])
      .setColor('#fc2041')
      .addField('Topic:', text)
      .addField('Pool lasts for:', args[0]);

    const msg = await message.channel.send(pool);
    await msg.react('✅');
    await msg.react('❌');

    const filter = reaction => reaction.emoji.name === '✅' || reaction.emoji.name === '❌';
    const collector = msg.createReactionCollector(filter, { time: timeInSec * 1000 });

    collector.on('end', collected => {
      message.channel.send(
        `Votes for: ${collected.get('✅').count - 1}. Votes against: ${collected.get('❌').count -
          1}`
      );
    });
  }
};
