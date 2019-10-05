import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { emojis } from '../../util/emojis';

export default class BoldCommand extends Command {
  public constructor() {
    super('bold', {
      aliases: ['bold'],
      category: 'general',
      ownerOnly: false,
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

  public async exec(message: Message, { text }: { text: string }) {
    let boldText = '';
    for (let i = 0; i < text.length; i++) {
      let letter = text.charAt(i);
      if (letter === ' ') {
        boldText += '  ';
      } else if (letter.match(/[a-z]/)) {
        boldText += `${emojis[letter]} `;
      } else {
        letter = `d${letter}`;
        boldText += `${emojis[letter]} `;
      }
    }
    return message.util!.send(boldText);
  }
}

module.exports = BoldCommand;
