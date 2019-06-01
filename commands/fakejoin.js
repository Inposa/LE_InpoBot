exports.run = (client, message, args, tools)=>{
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
}
