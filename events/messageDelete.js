module.exports = async (client, message) => {

	const say = require('../commands/say');
	const Discord = require("discord.js");

	if(message.author.id != 377936295831273473) return;

	//ignoring messages deleted by bot
	const emojiName = await message.reactions.map(messageReaction => messageReaction._emoji.name);
	const emojiCount = await message.reactions.map(messageReaction => messageReaction._emoji.reaction.count);
	if(message.id === say.messageID || (emojiName == '❌' && emojiCount == 4 && (Date.now() - message.createdTimestamp) <= 10000)) return;

	//actual message log
	const image = message.attachments.map(messageAttachment => messageAttachment.proxyURL);
	const embed = new Discord.RichEmbed()
		.setAuthor('Big Bully News')
		.setColor('#ff2b4b')
		.setDescription(`**USER:** ${message.author} has deleted a message!\n**Message content: **\n\`${message.cleanContent}\`\n**Attachments:**`)
		.setImage(`${image}`)
		.setTimestamp(message.createdAt);
	message.channel.send(embed);
};
