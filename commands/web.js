module.exports = {
	name: 'web',
	description: 'send a webhook',
	cooldown: 1,
	args: true,
	usage: '<args>',
	guildOnly:true,
	ownerOnly: true,
	async run(client, message, args) {

		message.delete();
		let webhook = await message.channel.createWebhook('Little Bully', 'https://i.imgur.com/hRsDl55.png');
		let text = args.join(' ');
		await webhook.send({
			"username": 'Little Bully',
			"embeds": [{
				"title": 'Little Bully News',
				"color": 16722763,
				"description": text,
			}]
		});
		await(webhook.delete());
	},
};
