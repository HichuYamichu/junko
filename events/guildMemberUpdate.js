module.exports = (client, oldMember, newMember) => {

  const Discord = require("discord.js");

  if(oldMember.displayName == newMember.displayName) return;
  if(newMember.displayName != newMember.user.username){
    var text = `nickname to <@${newMember.user.id}>`;
  }else{
    if(newMember.displayName == newMember.user.username){
     text = `username to <@${newMember.user.id}>`;
   }else{
     text = `username to \`${newMember.user.id}\``;
   }
  }

  const embed = new Discord.RichEmbed()
  .setAuthor('Big Bully News')
  .setColor('#ff2b4b')
  .setDescription(`**USER: **${oldMember.displayName} has changed their ${text}\nAgain...`)
  .setThumbnail(newMember.user.avatarURL);

  client.channels.get('506150345391603724').send(embed);

};
