module.exports = (client) => {

	const moment = require("moment");

	//const rss = require('../modules/rss.js');
	//rss.rss(client);

	setInterval(() => {
		let statuses = ['%help', 'What are you looking at 👿'];
		let status = statuses[Math.floor(Math.random()*statuses.length)];

		client.user.setPresence({ game: { name: status }, status: 'online' });
		
	}, 6000);
	const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
	console.log(`${timestamp} Ready in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
	
};
