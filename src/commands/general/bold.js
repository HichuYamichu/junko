const { Command } = require('discord-akairo');
const emojis = require('../../util/emojis');

class BoldCommand extends Command {
  constructor() {
    super('bold', {
      aliases: ['bold'],
      ownerOnly: false,
      channel: ['guild', 'dm'],
      args: [
        {
          id: 'text',
          type: 'lowercase',
          match: 'content',
          prompt: {
            start: message => `${message.author}, provide a text to make it B O L D.`,
            retry: message => `${message.author}, you have to give me something to work with.`
          }
        }
      ]
    });
  }

  async exec(message, { text }) {
    if (!text) {
      return message.util.reply('You have to provide some text');
    }
    let boldText = '';
    for (let i = 0; i < text.length; i++) {
      let letter = text.charAt(i);
      if (letter === ' ') {
        boldText += '  ';
      } else if (letter.match(/[a-z]/)) {
        boldText += `${emojis[letter]} `;
      } else if (!isNaN(letter)) {
        letter = `d${letter}`;
        boldText += `${emojis[letter]} `;
      }
    }
    message.util.send(boldText);
  }
}

module.exports = BoldCommand;
