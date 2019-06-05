/* const https = require('https');
exports.run = (client, message)=>{
	const url = 'https://aws.random.cat/meow';

	https.get(url, function(res) {
		let body = '';

		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			const response = JSON.parse(body);

			message.channel.send(`${message.author} Voici un petit chat ! `, { file: response.file });

		});
	}).on('error', function(e) {
		console.log('Une erreur : ', e);
	});
};*/

const request = require('request');

exports.run = (client, message)=>{
	const url = 'https://aws.random.cat/meow';
	request(url, function(error, response, body) {
		message.channel.send('Ceci est un test de recherche de chat avec le module request !');
		message.channel.send(`Erreur: ${error}`);
		message.channel.send(`Réponse: ${response}`);
		message.channel.send(`Body: ${body}`);
	});
};
