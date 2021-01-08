import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

export default class PresetCommand extends Command {
    public constructor() {
        super('preset', {
            aliases: ['preset', 'setpreset', 'ser-preset'],
            category: 'mod',
            ownerOnly: false,
            channel: 'guild',
            description: {
                content: 'Sets replies preset for this server.',
                usage: '<preset-name>',
                examples: ['junko (default)']
            },
            args: [
                {
                    id: 'preset',
                    type: ['junko'],
                    prompt: {
                        start: 'Provide a preset name.',
                        retry: 'you have to choose from available presets.'
                    }
                }
            ],
            userPermissions: ['MANAGE_GUILD']
        });
    }

    public async exec(message: Message, { preset }: { preset: string }): Promise<void> {
        await this.client.settings.set(message.guild.id, 'preset', preset);
        message.util.send(`Changed preset to \`${preset}\``);
    }
}