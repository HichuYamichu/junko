module.exports = client => {
  setInterval(() => {
    const statuses = ['%help', 'What are you looking at 👿'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setPresence({ game: { name: status }, status: 'online' });
  }, 6000);
  console.log(
    `Ready in ${client.channels.size} channels on ${
      client.guilds.size
    } servers, for a total of ${client.users.size} users.`
  );
};
