module.exports = {
	name: 'selector',
	description: 'selects stuff',
	cooldown: 5,
	args: false,
	usage: '',
	guildOnly: false,
	ownerOnly: true,
	async run(client, message) {

		const Discord = require("discord.js");

		let currentPage = 0,
			max = 4,
			smallest = 0,
			images = ['https://i.imgur.com/i5XVnfc.jpg', 'https://i.imgur.com/l4UwuaE.jpg', 'https://i.imgur.com/PSRXARI.jpg', 'https://i.imgur.com/ajX3qNu.jpg', 'https://i.imgur.com/wpBbuI2.jpg'];
		let embed = new Discord.RichEmbed()
			.setAuthor('Voting!')
			.setDescription('whitch avatar is best')
			.setImage(images[currentPage])
			.setFooter('◀ Backwards | ☑ Select | ▶ Forward');
		const m = await message.channel.send(embed);
		await m.react('◀');
		await m.react('☑');
		await m.react('▶');

		const backwardfilter = (reaction, user) => reaction.emoji.name === '◀' && user.id == message.author.id;
		const backward = m.createReactionCollector(backwardfilter, { time: 30000, maxEmojis: 999 });
		const selectfilter = (reaction, user) => reaction.emoji.name === '☑' && user.id == message.author.id;
		const select = m.createReactionCollector(selectfilter, { time: 30000, maxEmojis: 999 });
		const forwardfilter = (reaction, user) => reaction.emoji.name === '▶' && user.id == message.author.id;
		const forward = m.createReactionCollector(forwardfilter, { time: 30000, maxEmojis: 999 });
		backward.on('collect', () => {
			if (currentPage - 1 < smallest) return;
			currentPage--;
			embed = new Discord.RichEmbed()
				.setAuthor('Select a background.')
				.setImage(images[currentPage])
				.setFooter('◀ Backwards | ☑ Select | ▶ Forward');
			m.edit(embed);
			console.log(currentPage);
		});
		forward.on('collect', () => {
			if (currentPage + 1 > max) return;
			currentPage++;
			embed = new Discord.RichEmbed()
				.setAuthor('Select a background.')
				.setImage(images[currentPage])
				.setFooter('◀ Backwards | ☑ Select | ▶ Forward');
			m.edit(embed);
			console.log(currentPage);
		});
		select.on('collect', () => {
			message.reply('yeah man');
		});
	},


};
