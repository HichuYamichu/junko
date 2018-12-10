/* eslint-disable no-case-declarations */
module.exports = {
	name: 'bully',
	description: 'Bullies a person!',
	cooldown: 30,
	args: true,
	usage: '<mention> <value>',
	guildOnly: true,
	ownerOnly: false,
	run(client, message, args) {
		const jimp = require('jimp');
		let user = message.mentions.users.first();
		if (!user) return message.reply('Ping someone you idiot');
		if(user.id == client.user.id) return message.channel.send(`Can't bully me!`,  {files:['./images/me.gif']});
		if(user.id == client.config.ownerID) return message.channel.send(`Can't bully The Creator!`,  {files:['./images/me.gif']});
		let avatar = user.avatarURL;
		if(user.id == 377936295831273473){
			let random = Math.floor((Math.random() * 2));
			if(random == 1) return message.channel.send({files:['./images/ded.png']});
		}

		let value = parseInt(args[1]);
		if(!value) value = 1;
		let userAva = jimp.read(avatar);
		switch(value){
		case 1:
			let original = jimp.read('./images/original.jpg');

			Promise.all([userAva, original]).then(data => {
				data[0].resize(130, 130);
				data[1].composite(data[0], 623, 125);

				data[1].write('./images/new.jpg');
				message.channel.send({files:['./images/new.jpg']});
			});
			break;

		case 2:	
			let oMilions = jimp.read('./images/milions.jpg');
			let font = jimp.loadFont('./font/font.fnt');

			Promise.all([userAva, oMilions, font, user]).then(data => {
				let text = `Millions rejoice as ${user.username} is executed`;
				data[0].resize(100, 100);
				data[1].composite(data[0], 510, 375);
				data[1].print(data[2], 10, 50,
					{
						text: text,
						alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
						alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
					},
					1070);
				data[1].write('./images/newMillions.jpg');
				message.channel.send({files:['./images/newMillions.jpg']});
			});
			break;
			
		default:
			message.reply(' provided value is either too low, too high or is not a number. Please provide a value from 1-2.');
		}
	}
};
