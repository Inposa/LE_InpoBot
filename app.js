// Importation de la librairie de Discord.js
const Discord = require('discord.js')

// Fichier contenant des fonctions pouvant être utiles
const tools = require('./functions.js');

const config = require("./config.json");


// Récupération d'une instance de client Discord
// (Le bot en lui même)
const client = new Discord.Client();


// Listener lorsque le bot est prêt à être utilisé 
// Lorsqu'il est lancé, par exemple
client.on('ready',() =>{
	console.log('LANCEMENT DU BOT');
	client.user.setActivity("Tester des trucs",{type:'PLAYING'});
	
});


// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
client.on('message', message => {
	if(message.author.bot){return}	// Si l'auteur du message est un bot, on arrête le traitement
	let sender = message.author;	// Sinon on récupère l'auteur
	
	// Variables pour faciliter le travail après
	let msg = message.content;					// On passe le tout en minuscule pour avoir un truc qui ignore la case
	if(!msg.startsWith(config.prefix)){return}	// Si ça ne commence pas par notre préfixe, on peut déjà arrêter le traitement
	
	//Test de command handler
	
	// Récupération des arguments et de la commande 
	let arguments = msg.slice(config.prefix.length).trim().split(/ +/g);
	let cmd = arguments.shift().toLowerCase();
	
	//Exécution de la commande avec le handler
	try{
		let fichier_commande = require(`./commands/${cmd}.js`); // Test d'ouverture de fichier.
		fichier_commande.run(client,message,arguments,tools);
	}catch(ex){
		console.log(ex.message);
	}finally{
		console.log(`${sender.tag} a exécuté la commande ${arguments}`);
	}
	
	
	
	//Commandes de test
	/*if(msg === prefix+'PING'){
		console.log('['+sender+'] executed ping command');
		message.channel.send('Message bien reçu !\n Le test est réussi '+sender+' !')
	}*/
	
	if(msg === config.prefix+'INFO'){
		console.log('['+sender+'] executed info command');
		message.channel.send('J\'ai été créé par Inposa !\nJe sert surtout à faire des trucs sur Discord !');
	}
});

// Loger le bot avec son token d'autentification qui lui est propre
client.login(config.token);