const config = require('../config.json');

exports.run = (client, message)=>{

	message.channel.send(config.regex);
	console.log(config.regex);
	// Mettre le regex dans le fichier config
	const verif = message.content.replace(config.regex, '').trim().toLowerCase();

	// Procédure à faire --> utiliser une enmap contenant chaque mot clé à détecter,
	// chaque entrée accompagnée de sa réponse perso (peut-être qu'il faudra la
	// parcourir de long en large et de travers)

	if(verif.endsWith('quoi')) {
		message.channel.send('feur');
	}

	else if(verif.endsWith('oui')) {
		message.channel.send('stiti');
	}

};
