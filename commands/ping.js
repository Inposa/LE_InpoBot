// exports.run --> La chose qui s'exécutera dès qu'on va récupérer la chose avec un require et faire machin.run
module.exports = {
	name: 'ping',
	description: 'Renvoie un message en retour, cool !',
	
	execute(client, message){
		message.channel.send(`Hey ${message.author}, le message est bien reçu !\nLe test est **réussi** !`);
	}

/* exports.run = (client, message)=>{
	message.channel.send(`Hey ${message.author}, le message est bien reçu !\nLe test est **réussi** !`);
}; */
