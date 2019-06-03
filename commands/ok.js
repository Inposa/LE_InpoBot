exports.run = (client, message)=>{
	try{
		const fs = require('fs');

		const path = './pics/ok/';
		const files = fs.readdirSync(path);

		const pic = files[Math.floor(Math.random() * files.length)];

		message.channel.send('', { file: path + pic });
	}
	catch(ex) {
		console.log(ex);
		message.channel.send('Hopla boom, erreur :');
		message.channel.send(`**${ex}**`);
		return;
	}
};
