exports.run = (client, message, args)=>{
	if(!message.guild.fetchMember(message.author).hasPermission('ADMINISTRATOR')) {
		message.channel.send('**AH AH**, vous n\'êtes pas administrateur !');
		return;
	}
	else if(args[0] == undefined) {
		message.channel.send('Merci de bien vouloir préciser un paramètre !');
		return;
	}

	else{
		const [param, ...values] = args;

		if(!client.settings.has(message.guild.id, param)) {
			message.channel.send('Merci de bien vouloir préciser un paramètre **valide** à modifier.');
			return;
		}

		try {
			client.settings.set(message.guild.id, values.join(' '), param);
		}

		// let usr = message.mentions.users.first();

		catch(ex) {
			console.log(ex);
		}
	}
};
