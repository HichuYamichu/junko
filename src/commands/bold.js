const emojis = require('../modules/emoji.js');

module.exports = {
  name: 'bold',
  description: 'Sends a B O L D message',
  args: true,
  usage: '<message>',
  guildOnly: true,
  cooldown: 15,
  async execute(message, args) {
    const text = args.toString().toLowerCase();
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      let letter = text.charAt(i);
      if (letter === ',') {
        newText += '  ';
      } else if (letter.match(/[a-z]/)) {
        newText += `${emojis[letter]} `;
      } else if (letter === '\n') {
        newText += `\n`;
      } else if (!isNaN(letter)) {
        letter = `d${letter}`;
        newText += `${emojis[letter]} `;
      }
    }
    message.channel.send(newText);
  }
};
