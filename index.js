const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const config = require("./config.json");
client.config = config;
const cooldowns = new Discord.Collection();
client.cooldowns = cooldowns;
client.logger = require("./modules/logger");

const init = async () => {

	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		client.logger.log(`Loading Event: ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});

	const Enmap = require("enmap");
	client.commands = new Enmap();

	const cmdFiles = await readdir("./commands/"); 
	client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		client.commands.set(commandName, props);
	});
	
	client.login(config.token);
};

init();

client.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));


