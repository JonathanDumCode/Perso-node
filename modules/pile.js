/*====================================================
Import
====================================================*/
const assert = require('assert');
const FU = require('./FunctionUtile.js');

/*====================================================
Class
====================================================*/
let pile1 = class{
	constructor(limit){
		this.limit = limit;
		this.pile = [];
	}
	len(){
		return this.pile.length;
	}

	empiler(el){
		if (this.len() >= this.limit) {
			console.log("Empiler est impossible car la limite et atteint !");
		}else{
			this.pile.push(el);
		}
	}
	depiler(){
		if (this.len() <= 0) {
			console.log("Impossible de depiler la pile est vide !");
			return null;
		} else {
			let el = this.pile[this.len()-1];
			this.pile = this.pile.slice(0,-1);
			return el;
		}
	}
	print(){
		let txt = "pile";
		if (this.len() == 0) {
			txt = txt + " vide !";
		} else {
			for (var i = this.pile.length-1; i >= 0; i--) {
				txt = txt  + " -> " + this.pile[i];
			}
		}
		console.log(txt);
	}

}

let pile2 = class{
	constructor(limit){
		this.limit = limit;
		this.el = null
		this.suiv = null;
		this.length = 0;
	}
	len(){
		return this.length;
	}

	empiler(el){
		assert(this.len() <= this.limit && this.len() >= 0)
		if (this.length == this.limit) {
			console.log("Empiler est impossible car la limite et atteint !");
		} else {
			if (this.length == 0) {
				this.length = 1;
				this.el = el;
			} else {
				if (this.suiv == null) {
					this.suiv = new pile2(this.limit);
				}
				this.suiv.empiler(this.el);
				this.el = el;
				this.length = this.length+1;
			}
		}
		assert(this.len() <= this.limit && this.len() >= 0)
	}
	depiler(){
		assert(this.len() <= this.limit && this.len() >= 0)
		if (this.len() <= 0) {
			console.log("Impossible de depiler la pile est vide !");
			return null;
		} else {
			let el = this.el;
			if (this.len() == 1) {
				this.el = null;
				this.length = 0;
				this.suiv = null;
				return el;
			} else {
				this.el = this.suiv.depiler();
				this.length = this.length-1;
				if (this.len()<=1) {
					this.suiv = null;
				}
			}
			return el;
		}
		assert(this.len() <= this.limit && this.len() >= 0)
	}
	print(r = false){
		if (r) {	
			if (this.suiv == null) {
				return  " -> " + this.el;

			} else {
				return " -> " + this.el + this.suiv.print(true);

			}
		} else {
			let txt = "pile";
			if (this.len() == 0) {
				txt = txt + " vide !";
			} else {
				if (this.len() == 1) {
					txt = txt  + " -> " + this.el;
				} else {
					txt = txt  + " -> " + this.el + this.suiv.print(true);

				}
			}
			console.log(txt);
		}
	}

}

/*====================================================
Code
====================================================*/
function test(Pile) {
	let limit = 5;
	let pile = new Pile(5);
	console.log("Creer une Pile avec une limite de : "+limit);
	console.log("========================================");
	pile.print();
	console.log("========================================");
	for (var i = 0; i < limit+1; i++) {
		let el = FU.randInt(-100,100);
		console.log("Tente d'ajouter "+el+" a la pile !");
		pile.empiler(el);
		pile.print();
	}
	console.log("========================================");
	pile.print();
	console.log("========================================");
	for (var i = 0; i < limit+1; i++) {
		console.log("On tente de depiler dans la Pile !");
		let el = pile.depiler();
		pile.print();
		console.log("On obtient : "+el);
	}
	console.log("========================================");
	pile.print();
}
/*====================================================
Type Pile :
	Paramètre :
		limit : Int => la limite de la Pile.

	Methode:
		empiler(el):
			Permet d'ajouter un élément a la pile.
			Paramètre:
				el : élément => L'élément à ajouté.
		depiler():
			Permet de retirer un élément de la pile.
			Return : élément => l'élément en haut de la pile.
		len():
			Renvoie la taille de la pile.
			Return : Int => la taille de la pille.
		print():
			Affiche la pille dans le terminal.
====================================================*/



/*====================================================
Export
====================================================*/

module.exports = {
	pile1 : pile1,
	pile1 : pile2,
	main : function(){
		console.log("==============================================");
		console.log("");
		console.log("Exercice 4 : Les piles.");
		console.log("");

		console.log(" -> Utlisation de la classe 'pile1' !");
		console.log("");
		test(pile1);

		console.log("==============================================");
		console.log("");
		console.log(" -> Utlisation de la classe 'pile2' !");
		console.log("");
		test(pile2);
	}
}