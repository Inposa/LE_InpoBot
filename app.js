// Importation de la librairie de Discord.js
const Discord = require('discord.js');
const fs = require('fs');

// Fichier contenant des fonctions pouvant être utiles
const tools = require('./functions.js');
const config = require("./config.json");

// Création d'une instance de client Discord
const client = new Discord.Client();

//Tentative de loading des commandes
function reloadCommands(){
	let files = fs.readdirSync('./commands');

}



// Listener lorsque le bot est prêt à être utilisé
// Lorsqu'il est lancé, par exemple
client.on('ready',() =>{
	client.user.setActivity("Tester des trucs",{type:'PLAYING'});
	console.log('-- LE BOT EST PRÊT À FONCTIONNER --');
});

client.on('guildCreate',() =>{

});


// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
client.on('message', message => {
	let msg = message.content;					// On passe le tout en minuscule pour avoir un truc qui ignore la case
	if(!msg.startsWith(config.prefix)||message.author.bot){return}	// Si ça ne commence pas par notre préfixe, on peut déjà arrêter le traitement


	let sender = message.author;	// Sinon on récupère l'auteur


	// Command handler
	// Récupération des arguments et de la commande
	let args = msg.slice(config.prefix.length).trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();

	// Exécution de la commande avec le handler
	try{
		let fichier_commande = require(`./commands/${cmd}.js`); // Test d'ouverture de fichier.
		fichier_commande.run(client,message,args,tools);
	}catch(ex){
		console.log(ex.message);
	}finally{
		console.log(`${sender.tag} a exécuté la commande ${cmd+" "+args}`);
	}
});

try {
	// Loger le bot avec son token d'autentification qui lui est propre
	client.login(process.env.BOT_TOKEN);
} catch (e) {
	console.log("Impossible de lancer le bot, une erreur est survenue :\n"+e);
}
