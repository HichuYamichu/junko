module.exports = {

	name: 'passiveMessage',
	description: 'passiveMessage',
	guildOnly: true,
	randomBully: async message => {
		const config = require("../config.json");
		if(message.author.id === config.ownerID) return;

		let random = Math.floor((Math.random() * 500) + 1);
		if(random <= 9){

			let array = new Array();
			array[0] = `${message.author.username} you suck`;
			array[1] = `big gay ${message.author.username}`;
			array[2] = `${message.author.username} is a BIG LOOSER LOL`;
			array[3] = `kys ${message.author.username}`;
			array[4] = `${message.author.username} is actually retarded`;
			array[5] = `${message.author.username} is such a faggot xDD Am I right?`;
			array[6] = `${message.author.username} just shut up already pls`;
			array[7] = `${message.author.username} bibi boi cry`;

			let random2 = Math.floor((Math.random() * array.length));

			let bullyTest = array[random2];

			let webhook = await message.channel.createWebhook('Little Bully', 'https://i.imgur.com/hRsDl55.png');
			await webhook.send({
				"username": 'Little Bully',
				"embeds": [{
					"title": 'Little Bully News',
					"color": 16722763,
					"description": bullyTest,
				}]
			});
			await message.channel.lastMessage.delete(3000);
			await(webhook.delete());
		}
	},

	reactFag: async message => {
		const emojis = require("./emoji");
		if(message.content == 'xD'){
			await message.react(emojis.g);
			await message.react(emojis.a);
			await message.react(emojis.y);
		}
	},

	react: async message => {

		const emoji = '❌';
		let msg = await message;
		module.exports.id = message.id;
		const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === emoji, {max: 4, time: 10000});
		if(typeof reactions.get(emoji) !== 'undefined'){
			const amount = reactions.get(emoji).count;
			if(amount >= 4){
				message.channel.send(`<@${message.author.id}> Your message was deleted because you've triggered too many people!`);
				message.delete();
			}}
	},
};
