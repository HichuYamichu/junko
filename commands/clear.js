module.exports = {
	name: 'clear',
	description: 'Deletes provided number of messages from the channel!',
	cooldown: 1,
	args: true,
	usage: '<args>',
	guildOnly: true,
	ownerOnly: false,
	run(client, message, args) {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No permission');
		if(!args[0]) return message.channel.send('No args');
		if(isNaN(args[0])) return message.channel.send(`${args} is not a number`);
		message.channel.bulkDelete(args[0]);
	},
};
