const Junko = require('./client/JunkoClient');
const client = new Junko();

client.start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
