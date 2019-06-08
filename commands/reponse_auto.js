const config = require('../config.json');

exports.run = (client, message)=>{

	const regex = new RegExp(config.regex);
	// Mettre le regex dans le fichier config
	const verif = message.content.replace(regex, '').trim().toLowerCase();

	message.channel.send(`TEST: \n ${verif}\n----------------`);

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
