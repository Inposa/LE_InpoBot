const Discord = require('discord.js');
exports.run = (client, message, args)=>{
	const path = './pics/roll/';

	// À la place de voir si le premier argument est undefined, on regarde si converti en int ça donne quelque chose
	// Ca permettra après de voir ce qu'on va pouvoir faire avec par la suite.
	const nbr = parseInt(args[0], 10);

	// Si aucun argument n'a été précisé ou que l'utilisteur a rentré n'importe quoi, on réalise un simple roll 20
	if(nbr.isNaN()) {
		const ans = Math.floor(Math.random() * 2) + 1;

		const dice = 'd20_big.png';
		const leEmbed = new Discord.RichEmbed()
			.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à 20 faces.**`)
			.attachFiles([path + dice])
			.setThumbnail(`attachment://${dice}`);

		message.channel.send(leEmbed);
	}
	else{
		// On vérifie que le nombre entré n'est pas totalement pas possible à faire
		if(args[0] <= 0) {
			message.channel.send('Merci de bien vouloir spécifier une valeur qui ai du **SENS** pour moi !');
			return;
		}

		try{
			const fs = require('fs');
			const ans = Math.floor(Math.random() * args[0]) + 1;

			// Si le fichier de dé n'existe pas, on utilise l'image de D6 à la place
			let dice = `d${args[0]}_big.png`;
			if(!fs.existsSync(path + dice)) {
				dice = 'd6_big.png';
			}

			const leEmbed = new Discord.RichEmbed()
				.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à ${args[0]} faces.**`)
				.attachFiles([path + dice])
				.setThumbnail(`attachment://${dice}`);

			message.channel.send(leEmbed);

		}
		catch(ex) {
			console.log(ex);
			message.channel.send('Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !');
		}
	}
};
