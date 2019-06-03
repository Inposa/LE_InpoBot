exports.run = (client, message, args)=>{
	if(args[0] == undefined) {
		message.channel.send(message.author.displayAvatarURL);
	}
	else{
		try{
			for(const usr of message.mentions.users) {
				message.channel.send(usr.last.displayAvatarURL);

			}

			// let usr = message.mentions.users.first();

		}
		catch(ex) {
			console.log(ex);
			message.channel.send('Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !');
		}
	}
};
