const config = require('./config.json');

exports.run = (client, message)=>{

	// Mettre le regex dans le fichier config
	const verif = message.replace(config.regex, '').trim();

	// Procédure à faire --> utiliser une enmap contenant chaque mot clé à détecter,
	// chaque entrée accompagnée de sa réponse perso (peut-être qu'il faudra la
	// parcourir de long en large et de travers)

	if(verif.endWith('quoi')) {
		message.channel.send('feur');
	}

	else if(verif.endWith('oui')) {
		message.channel.send('stiti');
	}

};
