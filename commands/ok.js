exports.run = (client, message, args, tools)=>{
	try{
		let fs = require('fs');
		
		let path = './pics/ok/';
		let files = fs.readdirSync(path);
		
		let pic = files[Math.floor(Math.random()*files.length)];

		message.channel.send("",{file: path+pic});
	}
	catch(ex){
		console.log(ex);
		message.channel.send("Hopla boom, erreur :");
		message.channel.send(`**${ex}**`);
		return;
	}

	
}