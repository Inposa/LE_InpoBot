exports.run = (client, message, args)=>{
	message.guild.fetchMember(message.author).then(member => {
		if(!member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('Navré, vous n\'êtes pas administrateur...');
		}
	});

	if(args[0] == undefined) {
		message.channel.send('Merci de bien vouloir préciser un paramètre !');
		return;
	}

	else{
		const [param, ...values] = args;

		/* if(values.join(' ') === '{{default}}') {
			client.settings.set(message.guild.id, defaultSettings, param);
		} */

		if(!client.settings.has(message.guild.id, param)) {
			message.channel.send('Merci de bien vouloir préciser un paramètre **valide** à modifier.');
			return;
		}

		try {
			client.settings.set(message.guild.id, values.join(' '), param);
			message.channel.send(`${param} a été modifié et possède maintenant la valeur ${values.join(' ')} !`);
		}

		catch(ex) {
			console.log(ex);
		}
	}
};
