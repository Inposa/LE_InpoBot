const https = require('https');
exports.run = (client, message)=>{
	const url = 'https://aws.random.cat/meow';

	https.get(url, function(res) {
		let body = '';

		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			const response = JSON.parse(body);

			// const attachment = new Discord.MessageAttachment(response.file);
			// let attach = new Discord.Attachment(response.file,"chat.png");
			message.channel.send(`${message.author} Voici un petit chat ! `, { file: response.file });

		});
	}).on('error', function(e) {
		console.log('Une erreur : ', e);
	});
};
