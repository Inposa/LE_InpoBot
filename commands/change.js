exports.run = (client, message, args, defaultSettings)=>{
	// message.guild.fetchMember(message.author).then(member => {
	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

	const adminRole = message.guild.roles.find(role => role.name === guildConf.adminRole);
	console.log(message.author.id);
	// Si l'auteur du message est différent de Inposa !
	if(message.author.id != '100707970203004928') {
		if(!adminRole) {
			return message.reply('Le rôle d\'administrateur n\'a pas été trouvé sur ce serveur...\n\n*Conseil : Le rôle d\'administration du bot pas défaut est le rôle `Administrateur`.*');
		}

		if(!message.member.roles.has(adminRole.id)) {
			return message.reply(`Désolé.. Vous ne possédez pas le rôle ${adminRole}...`);
		}
	}


	if(args[0] == undefined) {
		message.channel.send('Merci de bien vouloir préciser un paramètre !');
		return;
	}

	else {
		const [param, ...values] = args;


		if(!client.settings.has(message.guild.id, param)) {
			message.reply('Merci de bien vouloir préciser un paramètre **valide** à modifier.');
			return;
		}

		try {
			client.settings.set(message.guild.id, values.join(' '), param);
			console.log(`[${message.guild.name}] paramètre <${param}> modifié vers <${values.join(' ')}> `);
			message.reply(`Le paramètre **${param}** a été modifié et possède maintenant la valeur **${values.join(' ')}** !`);
		}
		catch(ex) {
			console.log(ex);
		}
	}
};
