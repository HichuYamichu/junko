const { Command } = require('discord-akairo');
const emojis = require('../../util/emojis');

class BoldCommand extends Command {
  constructor() {
    super('bold', {
      aliases: ['bold'],
      category: 'general',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Sends a B O L D message.',
        usage: '<message>',
        examples: ['this is bold now']
      },
      args: [
        {
          id: 'text',
          type: 'lowercase',
          match: 'content',
          prompt: {
            start: 'Provide a text to make it B O L D.',
            retry: 'You have to give me something to work with.'
          }
        }
      ]
    });
  }

  async exec(message, { text }) {
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
    return message.util.send(boldText);
  }
}

module.exports = BoldCommand;
