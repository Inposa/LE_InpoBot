// Importation de la librairie de Discord.js
const Discord = require('discord.js')

//Préfixe
const prefix = '&';

// Récupération d'une instance de client Discord
// (Le bot en lui même)
const bot = new Discord.Client();

// Listener lorsqu'un message est envoyé dans le chat
// message est le message en lui même qu'on récupère en même temps qu'on l'écoute
bot.on('message', message => {
	
	// Variables pour faciliter le travail après
	let msg = message.content.toUpperCase();
	let sender = message.author;
	
	console.log(sender+' a dit '+msg);
	
	if(msg === prefix+'PING'){
		console.log('['+sender+']  executed ping command');
		message.channel.send('Message bien reçu !\n Le test est réussi '+sender+' !')
	}
	
	if(msg === prefix+'INFO'){
		console.log('['+sender+']  executed info command');
		message.channel.send('J\'ai été créé par Inposa !\nJe sert surtout à faire des trucs sur Discord !');
	}
	
});

// Listener lorsque le bot est prêt à être utilisé 
// Lorsqu'il est lancé, par exemple
bot.on('ready',() =>{
	console.log('LANCEMENT DU BOT');
});




// Loger le bot avec son token d'autentification qui lui est propre
bot.login('NTc1Nzk2MjAzMzE3MzYyNzE5.XNNReA.lXehGJ0jbXa4sgfkmjKDUlAYCCg')