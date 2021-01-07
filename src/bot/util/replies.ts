const junko = {
  blacklisted: [
    'You are blacklisted, no commands for you.'
  ],
  guildOnly: ['This is guild only command.'],
  ownerOnly: ['This is owner only command.'],
  timeout: ['Timeout.'],
  ended: ['Ended.'],
  cooldown: ['Cooldown.'],
};

const presets: { [index: string]: { [index: string]: string[] } } = { junko };

export default presets;
