const Discord = require('discord.js');
const Canvas = require('canvas');

exports.run = (client, message, args, tools)=>{
	// Récupération de l'image donnée en argument par l'utilisateur.
	// S'il en a pas donné, on récupère plutôt son image de profil.
	if(args[0]==undefined){
		const pic = message.author.displayAvatarURL;
	}
	if(message.mentions.first() != undefined){
		const pic = message.mentions.first().displayAvatarURL;
	}
	else{
		const pic = args[0];
	}
	try{
		// Création d'un canvas et récupération de son context
		const canvas = Canvas.createCanvas(600,600);
		const ctx = canvas.getContext('2d');
		
		const background = Canvas.loadImage(pic);
		const menacing = Canvas.loadImage('./pics/menacing/menacing.png');
		
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		
		const img_final = new Discord.Attachment(canvas.toBuffer(),'test.png');
		
		message.channel.send(`${message.author}`,img_final);
		
	}
	catch(ex){
		console.log(ex);
		message.channel.send("Merci de bien vouloir spécifier quelque chose qui ai du **SENS** pour moi !");
	}
}