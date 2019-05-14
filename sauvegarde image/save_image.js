const fs = require('fs')

class Save{
	constructor(pic_alias,pic_link){
		this.alias=pic_alias;
		this.img=pic_link;
	}
	
	
	//TODO : Voir pour la convertion JSON
	classToJson(){
		let str=JSON.stringify(this);
		return str;
	}

	/*JsonToClass(str){
		try{
			let retour = JSON.parse(str);
		}
		catch(ex){
			console.log("Json invalide");
			return null;
		}
		return retour;
	}*/
	
	
	sendImage(){
		
	}
	
	
	toString(){
		return "["+this.alias+", "+this.img+"]";
	}
}

let alias = new Save("toto","http://example.com")
console.log(alias.toString());

let json = alias.classToJson();
console.log(json);

let obj = JSON.parse(json);
console.log(obj.alias+", "+obj.img);