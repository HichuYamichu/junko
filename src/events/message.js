const { Collection } = require('discord.js');
const UserError = require('../modules/userError');
const passive = require('../modules/passive');
const { replies } = require('../modules/replies');

module.exports = async (client, message) => {
  if (message.author.bot) return;
  passive.randomMsg(message);

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  let args;
  let prefix;

  if (message.guild) {
    if (message.content.match(prefixMention)) {
      const guildPrefix = await client.store.hgetAsync(message.guild.id, 'prefix');
      return message.reply(
        `My prefix on this server is set to \`${guildPrefix}\` and my global prefix is \`${
          client.config.prefix
        }\``
      );
    }

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

  const command =
    client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (message.channel.type !== 'dm' && await client.store.hgetAsync(message.guild.id, `blacklist-${message.author.id}`)) {
    return message.reply(replies.get('blacklisted'));
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply(replies.get('dms'));
  }

  if (command.args) {
    if (!args.length) {
      let reply = `${replies.get('noArgs')} ${message.author}!`;
      reply += `\n${replies.get('properUsage')} \`${command.name} ${command.usage}\``;
      return message.channel.send(reply);
    } else if (command.args > args.length) {
      let reply = `${replies.get('noArgs')} ${message.author}!`;
      reply += `\n${replies.get('properUsage')} \`${command.name} ${command.usage}\``;
      return message.channel.send(reply);
    }
  }

  if (command.permissionLVL > 0 && message.author.id !== client.config.ownerID) {
    if (message.channel.type === 'dm') {
      return message.reply('cannot execute permision restricted commands insaide DMs');
    }
    const userPermissionLVL = await client.store.hgetAsync(message.guild.id, message.author.id);
    if (userPermissionLVL < command.permissionLVL) {
      return message.reply(replies.get('lowLVL'));
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
