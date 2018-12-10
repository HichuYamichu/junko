module.exports = {
	name: 'say',
	description: 'Sends a message with provided text',
	cooldown: 5,
	args: true,
	usage: '<args>',
	guildOnly:true,
	ownerOnly: false,
	run(client, message, args) {
		const sayMessage = args.join(" ");
		module.exports.messageID = message.id;
		message.delete().catch();
		message.channel.send(sayMessage);

	},
};
