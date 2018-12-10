module.exports = {
	name: 'remove-role',
	description: 'Removes provided role from a member.',
	cooldown: 5,
	args: true,
	usage: '<role>',
	guildOnly: true,
	ownerOnly: false,
	run(client, message, args) {
		let guildRole = args.join(' ');
		let memberRole = message.guild.roles.find(role => role.name === guildRole);
		if(!memberRole) return message.channel.send('There is no such role');
		if(!message.member.roles.some(role => role.name === guildRole)) return message.channel.send('You don\'t have that role');
		message.member.removeRole(memberRole);
		message.channel.send('Your role was removed!');

	},
};
