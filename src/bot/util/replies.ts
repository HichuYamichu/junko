const junko = {
  blacklisted: [
    'Get out of my sight before I obliterate you.',
    "Such impure being can't ask me for anything."
  ],
  guildOnly: ["Can't do that in such impure place.", 'Not here.'],
  ownerOnly: ["You can't ask me for that.", 'Not happening.'],
  timeout: ["Don't waste my time."],
  ended: ['This is worthless.', 'What a waste of time.'],
  cooldown: ["Impatient aren't you?", 'Calm down!', "Can't you wait for a bit?"],
  owo: ['no']
};

const mean = {
  blacklisted: [
    "I'm not talking with you.",
    'Fuck off',
    "Ur on my blacklist don't even try.",
    'No.'
  ],
  guildOnly: ["I'm not doing that inside DMs.", 'Leave me alone.', 'How about no?'],
  timeout: [
    "I don't feel like waiting eternity for you to make up your mind.",
    'Try to be faster next time.'
  ],
  ended: ["Okay that's enough.", 'How can you mess up 3 times in a row?'],
  cooldown: ["Impatient aren't you?"],
  owo: ['fuck you']
};

const oneesan = {
  blacklisted: [
    "Oh you can't do that.",
    "What a shame I can't do that for you.",
    'You must have done something really bad to end up on the blacklist.',
    "Ara ara... someone's on the blacklist"
  ],
  ownerOnly: ["Mhm... Can't do that with you.", 'Ara ara...'],
  timeout: ['Oh... you have to be faster~', 'Sorry gotta do something else.'],
  ended: ["Whew... I guess that's enough.", "There's no shame in not being able to do it."],
  cooldown: ["Impatient aren't you?"],
  owo: ['ara ara']
};

export default { junko, mean, oneesan };
