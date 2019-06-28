exports.run = (client, message, args)=>{
	if(args[0] == undefined) {
		message.channel.send(message.author.displayAvatarURL);
	}
	else{
		try{
			const usr = message.mentions.users.first();
			message.channel.send(usr.displayAvatarURL);
		}
		catch(ex) {
			console.log(ex);
			message.channel.send('Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !');
		}
	}
};
