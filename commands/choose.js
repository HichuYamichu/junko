module.exports = {
	name: 'choose',
	description: 'Chooses betwen prowided arguments!',
	cooldown: 5,
	args: true,
	usage: '<arg1> | <arg2> | ...',
	guildOnly: false,
	ownerOnly: false,
	run(client, message, args) {

		let content = args.join(' ');
		let result = content.split(' | ');
		let random = Math.floor((Math.random() * result.length));
		message.channel.send(`I choose \`${result[random]}\`. But it sucks anyway!`);
	},
};
