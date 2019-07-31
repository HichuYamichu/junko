module.exports.replies = {
  blacklisted: [
    "I'm not talking with you.",
    'Fuck off',
    "Ur on my blacklist don't even try.",
    'No.'
  ],
  gay: [
    'yes you are and nobody cares sit down and fuck off',
    'We know. Now shut up.',
    "You've said that before"
  ],
  derp: ['is that all you can say?'],
  guildOnly: ["I'm not doing that inside DMs.", 'Leave me alone.', 'How about no.'],
  ownerOnly: [
    "You're not my owner, so you can fuck off",
    'Pretending to be my owner? Nice try but no.'
  ],
  timeout: [
    "I don't feel like waiting eternity for you to make up your mind. The command has been timed out.",
    'Try to be faster next time. Time out!'
  ],
  ended: ['Okay that\'s enough canceled', 'How can you mess up 3 times in a row? Canceled'],
  cooldown: ["Impatient aren't you?"],
  noArgs: ["I can't work with this.", 'Arguments maybe?', 'Did you read help for this command?'],
  properUsage: [
    'Thats how you do it =>',
    "I can't balive I have to show you this again =>",
    'Well, that was embarasing. Do it like this next time =>'
  ],
  get(set) {
    return this[set][Math.floor(Math.random() * this[set].length)];
  }
};
