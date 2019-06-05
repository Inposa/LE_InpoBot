const request = require('request');

exports.run = async (client, message)=>{
	const url = 'https://aws.random.cat/meow';
	request(url, { json: true }, await function(error, response, body) {
		message.channel.send(`${message.author} Voici un petit chat ! `, { file: body.file });
	});
};
