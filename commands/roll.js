const Discord = require('discord.js');
exports.run = (client, message, args, tools)=>{
	let path = './pics/roll/';
	
	// Si aucun argument n'a été précisé, on réalise un roll 20
	if(args[0]==undefined){
		let ans = Math.floor(Math.random()*20)+1;
		
		let dice = "d20_big.png";	
		const leEmbed = new Discord.RichEmbed()
			.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à 20 faces.**`)
			.attachFiles([path+dice])
			.setThumbnail(`attachment://${dice}`);
	
		message.channel.send(leEmbed);
	}
	else{
		// On vérifie que le nombre entré n'est pas totalement pas possible à faire
		if(args[0]<=0){
			message.channel.send("Merci de bien vouloir spécifier une valeur qui ai du **SENS** pour moi !");
			return;
		}

		try{
			let fs = require('fs');
			let ans = Math.floor(Math.random()*args[0])+1;
			
			// Si le fichier de dé n'existe pas, on utilise l'image de D6 à la place
			let dice = `d${args[0]}_big.png`;
			if(!fs.existsSync(path+dice)){
				dice = "d6_big.png";
			}
			
			const leEmbed = new Discord.RichEmbed()
				.setTitle(`**${message.author.tag} a tiré un ${ans} sur son dé à ${args[0]} faces.**`)
				.attachFiles([path+dice])
				.setThumbnail(`attachment://${dice}`);
	
			message.channel.send(leEmbed);
			
		}
		catch(ex){
			console.log(ex);
			message.channel.send("Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !");
		}
	}
}