module.exports = {
	name: 'roll',
	description: 'Rolles a dice for you.',
	cooldown: 1,
	args: false,
	usage: '',
	guildOnly: false,
	ownerOnly: false,
	async run(client, message) {

		let webhook = await message.channel.createWebhook('Dice', './images/dice.jpg');
		let roll = await Math.floor((Math.random()*6)+1);
		await webhook.send({
			"username": 'DICE',
			"embeds": [{
				"title": 'You rolled:',
				"color": 16722763,
				"description": `**${roll}**`,
			}]
		});
		await(webhook.delete());
	},
};
