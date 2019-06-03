// exports.run --> La chose qui s'exécutera dès qu'on va récupérer la chose avec un require et faire machin.run
exports.run = (client, message)=>{
	message.channel.send(`Hey ${message.author}, le message est bien reçu !\nLe test est **réussi** !`);
};
