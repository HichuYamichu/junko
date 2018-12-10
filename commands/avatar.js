module.exports = {
	name: 'avatar',
	description: 'Sends a avatar picture of mentioned member or message author.',
	cooldown: 3,
	args: true,
	usage: '<mention>',
	guildOnly:false,
	ownerOnly: false,
	run(message) {

		const Discord = require("discord.js");

		let user = message.mentions.users.first() || message.author;
		let embed = new Discord.RichEmbed()
			.setImage(user.avatarURL)
			.setColor('#fc2041');
		message.channel.send(embed);
	},
};
