module.exports = {
	name: 'bold',
	description: 'Sedns a B O L D message.',
	cooldown: 10,
	args: false,
	usage: '<args>',
	guildOnly: false,
	ownerOnly: false,
	run(client, message, args) {

		const emojis = require('../modules/emoji.js');
		let text = args.toString().toLowerCase();
		let newText = '';
		for(let i = 0; i<text.length; i++){
			let letter = text.charAt(i);
			switch(letter){
			case 'a':
				newText += `${emojis.a} `;
				break;

			case 'b':
				newText += `${emojis.b} ` ;
				break;

			case 'c':
				newText += `${emojis.c} `;
				break;
				
			case 'd':
				newText += `${emojis.d} `;
				break;

			case 'e':
				newText += `${emojis.e} `;
				break;

			case 'f':
				newText += `${emojis.f} `;
				break;

			case 'g':
				newText += `${emojis.g} `;
				break;

			case 'h':
				newText += `${emojis.h} `;
				break;

			case 'i':
				newText += `${emojis.i} `;
				break;

			case 'j':
				newText += `${emojis.j} `;
				break;

			case 'k':
				newText += `${emojis.k} `;
				break;

			case 'l':
				newText += `${emojis.l} `;
				break;

			case 'm':
				newText += `${emojis.m} `;
				break;

			case 'n':
				newText += `${emojis.n} `;
				break;

			case 'o':
				newText += `${emojis.o} `;
				break;

			case 'p':
				newText += `${emojis.p} `;
				break;

			case 'q':
				newText += `${emojis.q} `;
				break;

			case 'r':
				newText += `${emojis.r} `;
				break;

			case 's':
				newText += `${emojis.s} `;
				break;

			case 't':
				newText += `${emojis.t} `;
				break;

			case 'u':
				newText += `${emojis.u} `;
				break;

			case 'v':
				newText += `${emojis.v} `;
				break;

			case 'w':
				newText += `${emojis.w} `;
				break;

			case 'x':
				newText += `${emojis.x} `;
				break;

			case 'y':
				newText += `${emojis.y} `;
				break;

			case 'z':
				newText += `${emojis.z} `;
				break;

			case ',':
				newText += '    ';
				break;

			case '0':
				newText += `${emojis.d0} `;
				break;

			case '1':
				newText += `${emojis.d1} `;
				break;

			case '2':
				newText += `${emojis.d2} `;
				break;

			case '3':
				newText += `${emojis.d3} `;
				break;

			case '4':
				newText += `${emojis.d4} `;
				break;

			case '5':
				newText += `${emojis.d5} `;
				break;

			case '6':
				newText += `${emojis.d6} `;
				break;

			case '7':
				newText += `${emojis.d7} `;
				break;

			case '8':
				newText += `${emojis.d8} `;
				break;

			case '9':
				newText += `${emojis.d9} `;
				break;

			case '10':
				newText += `${emojis.d10} `;
				break;

			case '!':
				newText += `${emojis.ex} `;
				break;

			case '?':
				newText += `${emojis.qm} `;
				break;

			case '#':
				newText += `${emojis.sh} `;
				break;

			case '*':
				newText += `${emojis.st} `;
				break;
			}
		}	
		message.channel.send(newText);
	},
};
