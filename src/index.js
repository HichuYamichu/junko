require('dotenv').config();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Discord = require('discord.js');
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

// async function start() {
//   const client = await new Junko();
//   const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

//   for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//   }

//   client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
//   });

//   client.on('message', message => {
//     if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

//     const args = message.content.slice(client.config.prefix.length).split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     if (!client.commands.has(commandName)) return;
//     const command = client.commands.get(commandName);

//     if (command.guildOnly && message.channel.type !== 'text') {
//       return message.reply("I can't execute that command inside DMs!");
//     }

//     if (command.args && !args.length) {
//       let reply = `You didn't provide any arguments, ${message.author}!`;

//       if (command.usage) {
//         reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${
//           command.usage
//         }\``;
//       }

//       return message.channel.send(reply);
//     }

//     if (!client.cooldowns.has(command.name)) {
//       client.cooldowns.set(command.name, new Discord.Collection());
//     }

//     const now = Date.now();
//     const timestamps = client.cooldowns.get(command.name);
//     const cooldownAmount = (command.cooldown || 3) * 1000;

//     if (timestamps.has(message.author.id)) {
//       const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

//       if (now < expirationTime) {
//         const timeLeft = (expirationTime - now) / 1000;
//         return message.reply(
//           `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
//             command.name
//           }\` command.`
//         );
//       }
//     }

//     timestamps.set(message.author.id, now);
//     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
//     message.client = client;
//     try {
//       command.execute(message, args);
//     } catch (error) {
//       console.error(error);
//       message.reply('there was an error trying to execute that command!');
//     }
//   });

//   client.login(client.config.token);
// }

init();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
