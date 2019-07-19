exports.run = (client, message, args, defaultSettings)=>{
	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

	const configProps = Object.keys(guildConf).map(prop => {
		return `${prop}  :  ${guildConf[prop]}\n`;
	});
	console.log(typeof configProps);

	let str = '';
	let str2 = '';
	for(const key in configProps) {
		const value = configProps[key];
		str2 = `${key} : ${value}\n`;
		str += str2.slice(4);
		console.log(`${key} : ${value}`);
	}

	message.channel.send(`Voici les paramètres actuels du serveur :
	    \`\`\`${str}\`\`\``);
};
