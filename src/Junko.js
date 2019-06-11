const Junko = require('./client/JunkoClient');
const client = new Junko();

client.start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('exit', () => {
  client.store.hset('config', 'lastRestart', new Date().toUTCString());
});

process.on('SIGINT', () => {
  client.store.hset('config', 'lastRestart', new Date().toUTCString());
});

