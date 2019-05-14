exports.run = (client, message, args, tools)=>{
	if(args[1]==undefined){
		message.channel.send(message.author.displayAvatarURL);
	}
	else{
		try{
			let usr = message.mentions.users.first();
			message.channel.send(usr.displayAvatarURL);
		}
		catch(ex){
			message.channel.send("Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !");
		}
	}
}