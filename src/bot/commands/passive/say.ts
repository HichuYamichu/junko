import { Message, TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

export default class SayCommand extends Command {
  public constructor() {
    super('say', {
      aliases: ['say'],
      category: 'passive',
      args: [
        {
          id: 'guildID'
        },
        {
          id: 'channelID'
        },
        {
          id: 'content'
        }
      ]
    });
  }

  public async exec(
    message: Message,
    { guildID, channelID, content }: { guildID: string; channelID: string; content: string }
  ) {
    if (message) return message.util!.send('Not happening.');
    return (this.client.guilds.get(guildID)!.channels.get(channelID)! as TextChannel).send(content);
  }
}
