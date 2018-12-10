module.exports = {
	name: 'yt',
	description: 'searches YT.',
	cooldown: 10,
	args: true,
	usage: '<args>',
	guildOnly: false,
	ownerOnly: false,
	async run(client, message, args) {

		const YouTube = require('simple-youtube-api');
		const youtube = new YouTube(client.config.ytKey);

		let videos = new Array();
		youtube.searchVideos(args, 5).then(results => {
			results.forEach(result =>{
				videos.push(result.title);
			});
			let text = '';
			for(let i in videos){
				text += `**${parseInt(i)+1}:** ${videos[i]}\n`;
			}
			message.channel.send(`${text} \n Please enter a number from 1-${results.length}`);

			let initialAuthor = message.author.id;
			const filter = message => !isNaN(message.content) && message.content < videos.length+1 && message.content > 0 && message.author.id === initialAuthor;
			message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).then(collected => {
				let value = collected.map(collected => collected.content);
				value = parseInt(value);
				let id = results[value-1].id;
				youtube.getVideoByID(id).then(finalRes => {
					message.channel.send(`https://www.youtube.com/watch?v=${finalRes.id}`);
				});

			}).catch(collected => {
				console.log(collected);
				message.reply('10 seconds have passed, time\'s up');
			});

		}).catch(console.log);

	},
};
