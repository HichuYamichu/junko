const emojis = require('../modules/emoji.js');

module.exports = {
  name: 'bold',
  description: 'Sends a B O L D message',
  args: true,
  usage: '<message>',
  guildOnly: true,
  cooldown: 15,
  permissionLVL: 0,
  async execute(message, args) {
    const text = args.toString().toLowerCase();
    let boldText = '';
    for (let i = 0; i < text.length; i++) {
      let letter = text.charAt(i);
      if (letter === ',') {
        boldText += '  ';
      } else if (letter.match(/[a-z]/)) {
        boldText += `${emojis[letter]} `;
      } else if (!isNaN(letter)) {
        letter = `d${letter}`;
        boldText += `${emojis[letter]} `;
      }
    }
    message.channel.send(boldText);
  }
};
