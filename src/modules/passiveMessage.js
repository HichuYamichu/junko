module.exports = {
  name: 'passiveMessage',
  description: 'passiveMessage',
  guildOnly: true,
  randomBully: async message => {
    if (message.author.id === message.client.config.ownerID) return;

    const random = Math.floor((Math.random() * 750) + 1);
    if (random <= 9) {
      const array = new Array();
      array[0] = `${message.author.username} you suck`;
      array[1] = `big gay ${message.author.username}`;
      array[2] = `${message.author.username} is a BIG LOOSER LOL`;
      array[3] = `kys ${message.author.username}`;
      array[4] = `${message.author.username} is actually retarded`;
      array[6] = `${message.author.username} just shut up already pls`;
      array[7] = `${message.author.username} bibi boi cry`;
      array[8] = 'Fuck you';

      const random2 = Math.floor(Math.random() * array.length);

      const bullyText = array[random2];

      const webhook = await message.channel.createWebhook('Little Bully', {
        avatar: 'https://i.imgur.com/hRsDl55.png'
      });
      const msg = await webhook.send({
        username: 'Little Bully',
        embeds: [
          {
            title: 'Little Bully News',
            color: 16722763,
            description: bullyText
          }
        ]
      });
      await msg.delete({ timeout: 3000 });
      await webhook.delete();
    }
  },

  reactFag: async message => {
    const emojis = require('./emoji');
    if (message.content === 'xD') {
      await message.react(emojis.g);
      await message.react(emojis.a);
      await message.react(emojis.y);
    }
  }
};
