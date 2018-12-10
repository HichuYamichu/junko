module.exports = {
	name: 'hat',
	description: 'Generates your avatar with santa hat',
	cooldown: 10,
	args: true,
	usage: '<hat scale x> <hat scale y> <hat position x> <hat position y>',
	guildOnly: false,
	ownerOnly: false,
	run(client, message, args) {
		const jimp = require('jimp');

		let { avatarURL } = message.author;
		let avatar = jimp.read(avatarURL);
		let hat = jimp.read('./images/hat.png');
		args[0] = parseInt(args[0]);
		args[1] = parseInt(args[1]);
		args[2] = parseInt(args[2]);
		args[3] = parseInt(args[3]);
		Promise.all([avatar, hat]).then(data =>{
			data[1].resize(args[0], args[1]);
			data[0].composite(data[1], args[2], args[3]);
			data[0].write('./images/newHat.png');

			message.channel.send({files:['./images/newHat.png']});
		}).catch(err => console.log(err));
	},
};
