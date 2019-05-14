let fs = require('fs');

let path = '../pics/ok';
let files = fs.readdirSync(path);
		
let img = files[Math.floor(Math.random()*files.length)];

