exports.run = (client, message, args, defaultSettings)=>{
	// message.guild.fetchMember(message.author).then(member => {
	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

	const adminRole = message.guild.roles.find('name', guildConf.adminRole);
	if(!adminRole) {
		return message.reply('Le rôle d\'administrateur n\'a pas été trouvé sur ce serveur...\n\n*Conseil : Le rôle d\'administration du bot pas défaut est le rôle `Administrateur`.*');
	}

	if(!message.member.roles.has(adminRole.id)) {
		return message.reply(`Désolé.. Vous ne possédez pas le rôle ${adminRole}...`);
	}

	/*
	if(!member.hasPermission('ADMINISTRATOR')) {
	message.channel.send('Navré, vous n\'êtes pas administrateur...');
}
});*/

	if(args[0] == undefined) {
		message.channel.send('Merci de bien vouloir préciser un paramètre !');
		return;
	}

	else {
		const [param, ...values] = args;

		/* if(values.join(' ') === '{{default}}') {
	client.settings.set(message.guild.id, defaultSettings, param);
} */

		if(!client.settings.has(message.guild.id, param)) {
			message.reply('Merci de bien vouloir préciser un paramètre **valide** à modifier.');
			return;
		}

		try {
			client.settings.set(message.guild.id, values.join(' '), param);
			message.reply(`Le paramètre **${param}** a été modifié et possède maintenant la valeur **${values.join(' ')}** !`);
		}
		catch(ex) {
			console.log(ex);
		}
	}
};
