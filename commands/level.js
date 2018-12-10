module.exports = {
	name: 'level',
	description: 'Shows current level and points of a user.',
	cooldown: 5,
	args: false,
	usage: '<args>',
	guildOnly: true,
	ownerOnly: true,
	run(client, message) {
		let score = client.getScore.get(message.author.id, message.guild.id);
		message.reply(`You currently have ${score.points} points and ${score.level} level!`);

	},
};
