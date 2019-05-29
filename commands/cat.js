const https = require('https');
const Discord = require('discord.js')
exports.run = (client, message, args, tools)=>{
	const url = 'https://aws.random.cat/meow';

	https.get(url, function(res){
    let body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        let response = JSON.parse(body);

				//const attachment = new Discord.MessageAttachment(response.file);
				//let attach = new Discord.Attachment(response.file,"chat.png");
				message.channel.send(`${message.author} Voici un petit chat ! `,{file: response.file});

    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

		/*https.get('https://aws.random.cat/meow',(reponse)=>{
			let info = '';

			reponse.on('data',(chunk)=>{
				info += chunk;
			});
			console.log(info);

			reponse.on('end',()=>{
				console.log(JSON.parse(info).title);
			});
		});*/


}
