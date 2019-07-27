module.exports.replies = {
  blacklisted: [
    "I'm not talking with you.",
    'Fuck off',
    "Ur on my black list don't even try.",
    'No.'
  ],
  gay: [
    'yes you are and nobody cares sit down and fuck you',
    'We know. Now shaddup.',
    "You've said that before"
  ],
  derp: ['is that all you can say?'],
  dms: ["I'm not doing that insaide DMs.", 'Leave me alone.', 'How about no.'],
  noArgs: ["I can't work with this.", 'Arguments maybe?', 'Did you read help for this command?'],
  properUsage: [
    'Thats how you do it =>',
    "I can't balive I have to show you this again =>",
    'Well, that was embarasing. Do it like this next time =>'
  ],
  lowLVL: [
    'Your permission lvl is to low. Fuck you.',
    'Come back with higher permision lvl.',
    "I don't think your permission lvl is high enough for this."
  ],
  get(set) {
    return this[set][Math.floor(Math.random() * this[set].length)];
  }
};
