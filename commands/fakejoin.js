exports.run = (client, message)=>{
	message.channel.send('Et hop ! Signal émit !');
	client.emit('guildMemberAdd', message.member || message.guild.fetchMember(message.author));
};
