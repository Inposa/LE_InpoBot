module.exports = {
	ping: function(){
		return 'Test !';
	},
	
	//Retourne l'id d'un membre de guilde à partir de son ping
	// (qui est sous la forme <@113349616887463936>)
	// Renvoie l'id dans les <> et le @
	idByPoke: function(poke){
		if(poke.startsWith('<@')){
			nouvNom = poke.slice(2,poke.length-1).trim();
			return nouvNom;
		}
	}
}