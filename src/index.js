const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Junko = require('./struct/Junko');

const init = async () => {
  const client = await new Junko();

  const events = await readdir('./src/events/');
  for (const event of events) {
    const eventName = event.split('.')[0];
    const eventModule = require(`./events/${event}`);
    client.on(eventName, eventModule.bind(null, client));
  }

  const commandFiles = await readdir('./src/commands');
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  client.login(client.config.token);
};

init();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
