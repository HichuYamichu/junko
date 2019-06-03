const { Collection } = require('discord.js');
const UserError = require('../modules/userError');
const passive = require('../modules/passiveMessage');

module.exports = async (client, message) => {
  if (message.author.bot) return;
  passive.randomBully(message);
  passive.reactFag(message);

  let args;
  let prefix;

  if (message.guild) {
    if (message.content.startsWith(client.config.prefix)) {
      prefix = client.config.prefix;
    } else {
      const guildPrefix = await client.store.hgetAsync(message.guild.id, 'prefix');
      if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    if (!prefix) return;
    args = message.content.slice(prefix.length).split(/\s+/);
  } else {
    const slice = message.content.startsWith(client.config.prefix)
      ? client.config.prefix.length
      : 0;
    args = message.content.slice(slice).split(/\s+/);
  }

  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (command.permissionLVL > 0 && !message.member.hasPermission('ADMINISTRATOR')) {
    const userPermissionLVL = await client.store.hgetAsync(message.guild.id, message.author.id);
    if (userPermissionLVL < command.permissionLVL) {
      return message.reply('your permission lvl is to low. Fuck you.');
    }
  }

  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
          command.name
        }\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  client.UserError = UserError;
  message.client = client;
  command.execute(message, args).catch(error => {
    if (error instanceof UserError) {
      message.reply(`ERROR: ${error.message}`);
    } else {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  });
};
