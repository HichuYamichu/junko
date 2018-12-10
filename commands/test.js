module.exports = {
	name: 'test',
	description: 'general test command for debugging purposes.',
	cooldown: 5,
	args: false,
	usage: '<args>',
	guildOnly: false,
	ownerOnly: true,
	run(client, message, args) {
		console.log('lolxD');
	},
};
