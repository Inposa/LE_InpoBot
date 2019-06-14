const Discord = require('discord.js');
exports.run = (client, message, args)=>{
	const path = './pics/roll/';

	/* // À la place de voir si le premier argument est undefined, on regarde si converti en int ça donne quelque chose
	// Ca permettra après de voir ce qu'on va pouvoir faire avec par la suite.
	const nbr = parseInt(args[0], 10); */

	// Si aucun argument n'a été précisé ou que l'utilisteur a rentré n'importe quoi, on réalise un simple roll 20
	if(args[0] == undefined) {
		const ans = Math.floor(Math.random() * 2) + 1;

		const dice = 'd20_big.png';
		const leEmbed = new Discord.RichEmbed()
			.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à 20 faces.**`)
			.attachFiles([path + dice])
			.setThumbnail(`attachment://${dice}`);

		message.channel.send(leEmbed);
	}
	else{
		const nb = Math.floor(args[0]);
		// On vérifie que le nombre entré n'est pas totalement pas possible à faire
		if(nb < 2) {
			message.channel.send('Merci de bien vouloir spécifier une valeur qui ai du **SENS** pour moi !');
			return;
		}
		if (nb > 1000000) {
			message.channel.send('Ah ah.. **Es-tu sûr d\'avoir besoin de tirer sur un dé aussi grand ?**');
			return;
		}

		try{
			const fs = require('fs');
			const ans = Math.floor(Math.random() * nb) + 1;

			// Si le fichier de dé n'existe pas, on utilise l'image de D6 à la place
			let dice = `d${nb}_big.png`;
			if(!fs.existsSync(path + dice)) {
				dice = 'd6_big.png';
			}

			const leEmbed = new Discord.RichEmbed()
				.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à ${nb} faces.**`)
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
