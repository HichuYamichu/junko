module.exports = {
	name: 'play',
	description: 'Playes music in a voice chat you\'re currently in.',
	cooldown: 10,
	args: true,
	usage: '<args>',
	guildOnly: true,
	ownerOnly: false,
	run(client, message, args) {

		const ytdl = require('ytdl-core');

		const { voiceChannel } = message.member;
		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			let link = args.toString();

			if(!ytdl.validateURL(link)){
				voiceChannel.leave();
				return message.reply('invalid link');
			}
			ytdl.getInfo(link).then(info => {
				if(info.length_seconds > 660){
					voiceChannel.leave();
					message.reply('too long must me less than 11 minutes');
				}else{
					const stream = ytdl(link, { filter: 'audioonly', highWaterMark: '8000' });
					const dispatcher = connection.playStream(stream);
					dispatcher.setVolumeLogarithmic(1/4);
					dispatcher.on('end', () => voiceChannel.leave());
				}
			}).catch(err => console.error(err));
		});
	},
};
