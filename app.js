// Importation de la librairie de Discord.js
const Discord = require('discord.js');
// const fs = require('fs');

// Fichier contenant des fonctions pouvant être utiles
// const tools = require('./functions.js');
const config = require('./config.json');

// Création d'une instance de client Discord
const client = new Discord.Client();

/* //Tentative de loading des commandes
function reloadCommands(){
	let files = fs.readdirSync('./commands');

}*/


// Listener lorsque le bot est prêt à être utilisé
// Lorsqu'il est lancé, par exemple
client.on('ready', () =>{
	client.user.setActivity('Tester des trucs', { type:'PLAYING' });
	console.log('-- LE BOT EST PRÊT À FONCTIONNER --');
});

client.on('guildMemberAdd', (member)=>{
	const guild = member.guild;
	const usr = member.user;

	const channel = guild.channels.find(ch => ch.name === 'bienvenue');

	channel.send(`Hello there ${usr} !`);

});

/*
client.on('guildCreate',() =>{

});*/


// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
client.on('message', message => {
	// On passe le tout en minuscule pour avoir un truc qui ignore la case
	const msg = message.content;
	// Si ça ne commence pas par notre préfixe, on peut déjà arrêter le traitement
	if(!msg.startsWith(config.prefix) || message.author.bot) {return;}

	// Sinon on en récupère l'auteur
	const sender = message.author;

	// Command handler
	// Récupération des arguments et de la commande
	const args = msg.slice(config.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	// Exécution de la commande avec le handler
	try{
		// Test d'ouverture de fichier.
		const fichier_commande = require(`./commands/${cmd}.js`);
		fichier_commande.run(client, message, args);
	}
	catch(ex) {
		console.log(ex.message);
	}
	finally {
		console.log(`${sender.tag} a exécuté la commande ${cmd + ' ' + args}`);
	}
});

// Loger le bot avec son token d'autentification qui lui est propre
client.login(process.env.BOT_TOKEN);
