// Importation de la librairie de Discord.js
const config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
// const fs = require('fs');

const Enmap = require('enmap');
// Création d'une instance de client Discord

client.settings = new Enmap({
	name:'settings',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
});

const defaultSettings = {
	prefix: '&',
	// modLogChannel: 'mod-log',
	// modRole: 'Moderator',
	adminRole: 'Administrateur',
	isWelcoming: true,
	welcomeChannel: 'bienvenue',
	welcomeMessage: 'Booooooonjour {{user}} !',
};

/* //Tentative de loading des commandes
function reloadCommands(){
	let files = fs.readdirSync('./commands');

}*/

// Permet de retirer les config de la guild lorsque le bot est retiré
// de celle-ci.
client.on('guildDelete', (guild) => {
	console.log(`[${guild.name}] Supression des paramètres de serveur, au revoir !`);
	client.settings.delete(guild.id);
});

// Listener lorsque le bot est prêt à être utilisé
// Lorsqu'il est lancé, par exemple
client.on('ready', () =>{
	client.user.setActivity(config.activity, { type:'PLAYING' });
	console.log('-- LE BOT EST PRÊT À FONCTIONNER --');
});

client.on('guildMemberAdd', (member)=>{
	client.settings.ensure(member.guild.id, defaultSettings);
	console.log(client.settings.get(member.guild.id, 'isWelcoming'));
	if (client.settings.get(member.guild.id, 'isWelcoming')) {
		const guild = member.guild;

		let messageBienvenue = client.settings.get(guild.id, 'welcomeMessage');
		messageBienvenue = messageBienvenue.replace('{{user}}', member.displayName);
		messageBienvenue = messageBienvenue.replace('{{@user}}', member.user);
		messageBienvenue = messageBienvenue.replace('{{guild}}', guild.name);

		guild.channels
			.find(ch => ch.name === client.settings.get(guild.id, 'welcomeChannel'))
			.send(messageBienvenue)
			.catch(console.error);

	}
/*
	const usr = member.user;

	try {
		const channel = guild.channels.find(ch => ch.name === config.join_channel);
		channel.send(`Hello there ${usr} !`);
		member.addRole('585102354479579136');
	}
	catch (e) {
		console.error(`Le channel ${config.join_channel} ne semble pas exister...`);
	}*/
});


// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
client.on('message', async (message) => {
	if (!message.guild || message.author.bot) {return;}

	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
	const msg = message.content;

	if(msg.indexOf(guildConf.prefix) !== 0) {
		return;
	}

	/* if(!msg.startsWith(guildConf.prefix) && config.quoifeur == 'true') {
		try {
			const commande = require('./commands/reponse_auto.js');
			commande.run(client, message);
		}
		catch (e) {
			console.error(e);
		}

	}*/

	else{

		message.channel.startTyping();

		// Récupération des arguments et de la commande
		const args = msg.slice(guildConf.prefix.length).trim().split(/\s+/g);
		const cmd = args.shift().toLowerCase();

		// Exécution de la commande avec le handler
		try{
			// Test d'ouverture de fichier.
			const fichier_commande = require(`./commands/${cmd}.js`);
			fichier_commande.run(client, message, args, defaultSettings);
		}
		catch(ex) {
			console.error(ex.message);
		}
		finally {
			message.channel.stopTyping();

			/* const now = new Date();
			const annee = now.getFullYear();
			const mois = (('0' + (now.getMonth() + 1)).slice(-2));
			const jour = ('0' + now.getDate()).slice(-2);
			const hr = ('0' + now.getHours()).slice(-2);
			const min = ('0' + now.getMinutes()).slice(-2);
			const sec = ('0' + now.getSeconds()).slice(-2);

			const strDate = `[${annee}/${mois}/${jour}|${hr}:${min}:${sec}]`; */
			console.log(`[${message.guild.name}] ${message.author.tag} a exécuté la commande ${guildConf.prefix}${cmd} ${args.join(' ')}`);
		}
	}
});

// Loger le bot avec son token d'autentification qui lui est propre
client.login(config.token);
