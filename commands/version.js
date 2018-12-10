module.exports = {
	name: 'version',
	description: 'Returns current version of the bot.',
	cooldown: 5,
	args: false,
	usage: '',
	guildOnly: false,
	ownerOnly: false,
	run(client, message) {

		let version = require('../package.json');
		let text = version.version;
		message.channel.send(`${text} is my current version`);
	},
};
