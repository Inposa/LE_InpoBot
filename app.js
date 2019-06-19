// Importation de la librairie de Discord.js
const Discord = require('discord.js');
const Enmap = require('enmap');
// const fs = require('fs');

const config = require('./config.json');

// Création d'une instance de client Discord
const client = new Discord.Client();

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
	// adminRole: 'Administrator',
	welcomeChannel: 'bienvenue',
	welcomeMessage: 'Booooooonjour {{user}} !',
};

/* //Tentative de loading des commandes
function reloadCommands(){
	let files = fs.readdirSync('./commands');

}*/


// Listener lorsque le bot est prêt à être utilisé
// Lorsqu'il est lancé, par exemple
client.on('ready', () =>{
	client.user.setActivity(config.activity, { type:'PLAYING' });
	console.log('-- LE BOT EST PRÊT À FONCTIONNER --');
});

client.on('guildMemberAdd', (member)=>{
	const guild = member.guild;

	client.settings.ensure(member.guild.id, defaultSettings);

	let messageBienvenue = client.settings.get(member.guild.id, 'welcomeMessage');
	const channel = guild.channels.find(ch => ch.name === client.settings.get(member.guild.id, 'welcomeChannel'));

	messageBienvenue = messageBienvenue.replace('{{user}}', member.displayName);
	messageBienvenue = messageBienvenue.replace('{{guild}}', member.guild.name);
	channel.send(messageBienvenue);
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
			fichier_commande.run(client, message, args);
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

			console.log(`[${message.guild.name}] ${message.author.tag} a exécuté la commande ${guildConf.prefix}${cmd} ${args}`);
		}
	}
});

// Loger le bot avec son token d'autentification qui lui est propre
client.login(process.env.BOT_TOKEN);
