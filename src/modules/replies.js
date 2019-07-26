module.exports = {
  blacklisted: () => {
    const val = [
      "I'm not talking with you.",
      'Fuck off',
      "Ur on my black list don't even try.",
      'No.'
    ];
    return val[Math.floor(Math.random() * val.length)];
  },
  gay: () => {
    const val = [
      'yes you are and nobody cares sit down and fuck you',
      'We know. Now shaddup.',
      "You've said that before"
    ];
    return val[Math.floor(Math.random() * val.length)];
  },
  derp: () => {
    const val = ['is that all you can say?'];
    return val[Math.floor(Math.random() * val.length)];
  }
};
