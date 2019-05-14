exports.run = (client, message, args, tools)=>{
	if(args[1]==undefined){
		message.channel.send(`Bonjour ${message.author} !`);
	}
	else{
		try{
			let memberId = tools.idByPoke(args[1]);
			console.log(memberId);
			
			let usr = message.guild.fetchMember(memberId);
			console.log(usr);
			
			message.channel.send(`Bonjour ${usr} !`);
		}
		catch{
			message.channel.send("Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !");
		}
	}
}