/*====================================================
Import
====================================================*/

const assert = require('assert');

/*====================================================
Class
====================================================*/

let chaine = class {
	constructor(s){
		this.val = s;
	}
	len(){
		return this.val.length;
	}
	get(i){
		if (i<0 || i>this.len()) {
			return null;
		}
		return this.val[i];
	}
	push(s){
		this.val = this.val + s;
	}
	merge(c){
		this.val = this.val + c.val;
	}
	print(){
		console.log(this.val);
	}
	sousChaine(deb,fin){
		if (deb < 0) {
			deb = 0;
		}
		if (fin >= this.len()) {
			fin = this.len();
		}
		return new chaine(this.val.substring(deb,fin));
	}
	annonce(ch){
		let i = 0;
		let j = 0;
		let res = "";
		assert(this.sousChaine(i,i+res.length).val == res && ch.sousChaine(0,res.length).val == res);
		while(i+j < this.len()){
			assert(this.sousChaine(i,i+res.length).val == res && ch.sousChaine(0,res.length).val == res);

			if (this.get(i+j) == ch.get(j)) {
				res = res + ch.get(j);
				j = j + 1;
			} else {
				j = 0;
				res = "";
				i = i + 1;
			}
			assert(this.sousChaine(i,i+res.length).val == res && ch.sousChaine(0,res.length).val == res);
			
		}
		assert(i+j == this.len() && j == res.length);
		assert(this.sousChaine(i,i+res.length).val == res && ch.sousChaine(0,res.length).val == res);
		return new chaine(res);
	}	
}

/*====================================================
Export
====================================================*/

module.exports = {
	chaine : chaine,
	main : function(){
		console.log("==============================================");
		console.log("");
		console.log("Exercice 3 : Type chaine de caractère !");

		console.log("");
		let ch = new chaine("Bonjours à tous !");
		console.log("print de l'instance de la classe chaine 'ch'.");
		ch.print();

		console.log("");
		let str = " Es que ça va ?";
		console.log("Ajout du string '"+str+"' dans ch et on le print.");
		ch.push(str);
		ch.print();

		console.log("");
		let val = " Oui et toi ?";
		console.log("On créer une nouvelle chaine ch2 avec comme valeur '"+val+"' et on le print.");
		let ch2 = new chaine(val);
		ch2.print();

		console.log("");
		console.log("On merge ch2 dans ch et on print ch.");
		ch.merge(ch2);
		ch.print();

		console.log("");
		console.log("On get le caractère dans ch2 a la postion 1 donc 'O'.");
		console.log(ch2.get(1));


		console.log("");
		console.log("On crée une sousChaine de ch2 de l'indice 0 à 4 pour avoir ' Oui'. On la nomme ch3 et on la print.");
		let ch3 = ch2.sousChaine(0,4);
		ch3.print();

		console.log("");
		console.log("=================================");

		console.log("");
		let VALEUR = new chaine("VALEUR");
		let EUROPE = new chaine("EUROPE");
		let EUR = VALEUR.annonce(EUROPE);
		console.log(VALEUR.val+" annonce "+EUROPE.val +" => "+EUR.val);

		console.log("");
		let CATION = new chaine("CATION");
		let IONISATION = new chaine("IONISATION");
		let ION = CATION.annonce(IONISATION);
		console.log(CATION.val+" annonce "+IONISATION.val +" => "+ION.val);

		console.log("");
		let SALON = new chaine("SALON");
		let NOUVEAU = new chaine("NOUVEAU");
		let N = SALON.annonce(NOUVEAU);
		console.log(SALON.val+" annonce "+NOUVEAU.val +" => "+N.val);

	}
}