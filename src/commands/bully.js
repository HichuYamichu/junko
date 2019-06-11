const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
  name: 'bully',
  description: 'Bullies someone',
  args: 1,
  usage: '<mention OR username OR id> <bulling level>',
  guildOnly: true,
  cooldown: 1,
  aliases: ['bulli'],
  permissionLVL: 0,
  async execute(message, args) {
    const user =
      message.mentions.users.first() ||
      message.client.users.find(u => u.username === args[0]) ||
      message.client.users.get(args[0]) ||
      message.author;

    if (user.id === message.client.user.id) {
      return message.channel.send(`Can't bully me!`, { files: ['./static/me.gif'] });
    }

    if (user.id === message.client.config.ownerID) {
      return message.channel.send(`Can't bully The Creator!`, { files: ['./static/me.gif'] });
    }

    let canvas;
    let ctx;
    let base;
    let avatar;
    let fontSize = 70;
    const fontColor = '#000';
    let textWidth;

    switch (parseInt(args[1], 10)) {
    case 1:
    default:
      canvas = Canvas.createCanvas(1068, 821);
      ctx = canvas.getContext('2d');

      base = await Canvas.loadImage('./static/original.jpg');
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(690, 210, 60, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      avatar = await Canvas.loadImage(user.avatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 630, 150, 125, 125);
      break;
    case 2:
      canvas = Canvas.createCanvas(1100, 1095);
      ctx = canvas.getContext('2d');
      base = await Canvas.loadImage('./static/milions.jpg');
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = fontColor;
      ctx.fillText('milions rejoice as', canvas.width / 30, canvas.height / 18);

      do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
      } while (ctx.measureText(user.username).width > canvas.width - 300);
      textWidth = ctx.measureText(user.username).width;
      ctx.fillStyle = '#fc2041';
      ctx.fillText(user.username, (canvas.width / 2) - (textWidth / 2), canvas.height / 7.5);

      ctx.fillStyle = fontColor;
      ctx.font = '70px sans-serif';
      ctx.fillText('is executed', canvas.width / 1.5, canvas.height / 5);

      ctx.beginPath();
      ctx.arc(567, 435, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      avatar = await Canvas.loadImage(user.avatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 517, 385, 100, 100);
    }

    const attachment = new Discord.MessageAttachment(canvas.toBuffer());

    message.channel.send(attachment);
  }
};
