import JunkoClient from '../client/JunkoClient';
import { Message } from 'discord.js';
import replies from '../util/replies';

export default class ReplyManager {
  public constructor(private readonly client: JunkoClient) {}

  private async getPreset(message: Message): Promise<string> {
    return await this.client.settings.get(
      message.guild!,
      'preset',
      this.client.config.defaultPreset
    );
  }

  public async getReply(message: Message, category: string): Promise<string> {
    const preset = await this.getPreset(message);
    return replies[preset][category][Math.floor(Math.random() * replies[preset][category].length)];
  }

  public async modifyStart(message: Message, text: string): Promise<string> {
    return `${message.author} **=>** ${text}\n\nType \`cancel\` to cancel this command.`;
  }

  public async modifyRetry(message: Message, text: string): Promise<string> {
    return `${message.author} **=>** ${text}\n\nType \`cancel\` to cancel this command.`;
  }

  public async timeout(message: Message): Promise<string> {
    const reply = await this.getReply(message, 'timeout');
    return `${message.author} **=>** ${reply}\n\nCommand has been cancelled.`;
  }

  public async ended(message: Message): Promise<string> {
    const reply = await this.getReply(message, 'ended');
    return `${message.author} **=>** ${reply}\n\nCommand has been cancelled.`;
  }

  public async cancel(message: Message): Promise<string> {
    return `${message.author} **=>** Command has been cancelled.`;
  }
}
