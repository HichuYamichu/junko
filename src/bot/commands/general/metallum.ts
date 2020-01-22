import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class MetallumBandCommand extends Command {
  public constructor() {
    super('metallum', {
      aliases: ['metallum'],
      category: 'general',
      ownerOnly: false,
      description: {
        content:
          'Issues a simple query against metallum api (https://metallum.hichuyamichu.me/graphql)',
        usage: '<type> <query> <selected fields>',
        examples: ['band "behemoth black metal" "name country"']
      },
      args: [
        {
          id: 'type',
          type: ['band', 'album', 'song'],
          prompt: {
            start: 'Enter type of data you want to search for.',
            retry: 'Enter a valid type of data you want to search for.'
          }
        },
        {
          id: 'userQuery',
          prompt: {
            start: 'Enter your query.',
            retry: 'Anything will do.'
          }
        },
        {
          id: 'select',
          prompt: {
            start: 'Enter fields to select.',
            retry: 'Enter valid fields to select.'
          }
        }
      ]
    });
  }

  public async exec(
    message: Message,
    { type, userQuery, select }: { type: string; userQuery: string; select: string }
  ) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const queryType = `search${capitalizedType}`;
    const query = `
    {
      ${queryType}(query: "${userQuery}") {
        ${select}
      }
    }
  `;
    try {
      const data = await this.client.APIManager.metallum.request(query);
      const selected = data[queryType];
      const selectedStr = JSON.stringify(selected, null, 2);
      const res =
        selectedStr.length > 1900
          ? 'Output too long try selecting fewer fields.'
          : [`\`\`\`json`, selectedStr, '```'];
      return message.util!.send(res);
    } catch (error) {
      if (error.response?.errors[0]?.message) {
        return message.reply(error.response?.errors[0]?.message);
      }
      this.client.logger.error(error);
      return message.reply('Unexpected error occurred!');
    }
  }
}
