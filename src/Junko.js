const Junko = require('./client/JunkoClient');
const client = new Junko();
const moment = require('moment');

client.start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

const now = () => moment.utc().format('DD-MM-YYYY[\n]HH:mm:ss');

process.on('exit', () => {
  client.store.hsetAsync('JunkoConf', 'lastRestart', `${now()} UTC`);
});


process.on('SIGINT', () => {
  client.store.hsetAsync('JunkoConf', 'lastRestart', `${now()} UTC`);
});

