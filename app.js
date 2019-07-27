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
	// LogChannel: 'mod-log',
	// modRole: 'Moderator',
	adminRole: 'Administrateur',
	isWelcoming: true,
	welcomeChannel: 'bienvenue',
	welcomeMessage: 'Booooooonjour {{user}} !',
	startRole:false,
	welcomeRole: 0,
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
	console.log('-- Le bot est prêt à fonctionner ! --');
});

// Event de join du serveur
client.on('guildMemberAdd', async (member)=>{
	const guildconf = client.settings.ensure(member.guild.id, defaultSettings);
	console.log(client.settings.get(member.guild.id, 'isWelcoming'));

	// Permet d'activer ou désactiver le message de bienvenue
	if (guildconf.isWelcoming) {
		const guild = member.guild;

		let messageBienvenue = guildconf.welcomeMessage;

		messageBienvenue = messageBienvenue.replace('{{user}}', member.displayName)
			.replace('{{@user}}', member.user)
			.replace('{{guild}}', guild.name);

		guild.channels
			.find(ch => ch.name === client.settings.get(guild.id, 'welcomeChannel'))
			.send(messageBienvenue)
			.catch(console.error);

	}
});


// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
client.on('message', async (message) => {
	if (!message.guild || message.author.bot) {
		return;
	}

	const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
	const msg = message.content;

	// À modifier
	if(!msg.startsWith(guildConf.prefix)){
		return;
	}
	/*
	if(msg.indexOf(guildConf.prefix) !== 0) {
		return;
	} 
	*/

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

		// Si on tente d'entrer une commande "vieille" et que la personne en question n'est pas
		// la merveilleuse personne qui développe ce bot, on skip.
		if(cmd.startsWith('_') && message.author.id != '100707970203004928') {
			console.log([`${message.guild.name}] ${message.author.tag} a tenté d'exécuter ${guildConf.prefix}${cmd} ${args.join(' ')}`
			return;
		}
		
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

			/* Constitution de la date, à voir si ça sert à quelque chose de le garder.
			
			const now = new Date();
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