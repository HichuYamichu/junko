module.exports = {
  name: 'you',
  description: 'Sends you cute pic of myself.',
  args: 0,
  usage: '',
  examples: ['you'],
  guildOnly: false,
  cooldown: 5,
  aliases: [],
  permissionLVL: 0,
  async execute(message, args) {
    const [result] = await message.client.booru.search('gelbooru', {
      tags: ['rating%3Asafe', 'junko_(touhou)'],
      limit: 1,
      random: true
    });
    message.channel.send('Me!', { files: [result.common.fileURL] });
  }
};
