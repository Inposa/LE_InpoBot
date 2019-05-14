// Importation de la librairie de Discord.js
const Discord = require('discord.js')

// Fichier contenant des fonctions pouvant être utiles
const tools = require('./functions.js');

//Préfixe
const prefix = '&';

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
	let msg = message.content.toLowerCase();	// On passe le tout en minuscule pour avoir un truc qui ignore la case
	if(!msg.startsWith(prefix)){return}			// Si ça ne commence pas par notre préfixe, on peut déjà arrêter le traitement
	
	//Test de command handler
	
	// Récupération des arguments, on enlève d'abord le prefix et on 
	// convertie le tout en tableau. 
	let arguments = msg.slice(prefix.length).trim().split(/ +/);
	let cmd = arguments[0];
	
	//Exécution de la commande
	try{
		let fichier_commande = require(`./commands/${cmd}.js`); // Test d'ouverture de fichier.
		fichier_commande.run(client,message,arguments,tools);
	}catch(ex){
		console.log(ex.message);
	}finally{
		console.log(`${sender.tag} a exécuté la commande ${arguments}`);
		//message.channel.send("Le handler de commandes  ***F O N C T I O N N E***");
	}
	
	
	
	//Commandes de test
	/*if(msg === prefix+'PING'){
		console.log('['+sender+'] executed ping command');
		message.channel.send('Message bien reçu !\n Le test est réussi '+sender+' !')
	}*/
	
	if(msg === prefix+'INFO'){
		console.log('['+sender+'] executed info command');
		message.channel.send('J\'ai été créé par Inposa !\nJe sert surtout à faire des trucs sur Discord !');
	}
	
});


// Loger le bot avec son token d'autentification qui lui est propre
client.login('NTc1Nzk2MjAzMzE3MzYyNzE5.XNiHmg.Ds2DoMA1mgAbr1MeyU_qC409nH0')