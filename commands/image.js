module.exports = {
	name: 'image',
	description: 'Sends a random image from gelbooru (SFW if used in non-nsfw channel)',
	cooldown: 5,
	args: false,
	usage: '<args>',
	guildOnly: false,
	ownerOnly: false,
	async run(client, message, args) {
		const Kaori = require('kaori');
		const kaori = new Kaori();
		const tag = args.join(' ');
		const rating = message.channel.nsfw ? 'rating%3aexplicit' : 'rating%3Asafe';

		kaori.search('gelbooru', { tags: [rating, tag], limit: 1, random: true })
			.then(images => message.channel.send({
				files: [images[0].common.fileURL]
			}))
			.catch(err => {
				message.channel.send('Are you sure your query is correct? Read https://danbooru.donmai.us/wiki_pages/43049 and if you still think it\'s not your fault notify the bot creator');
				console.error(err);
			});
	}
};
