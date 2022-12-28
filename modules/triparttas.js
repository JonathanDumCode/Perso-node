/*====================================================
Import
====================================================*/

const assert = require('assert');
const FU = require('./FunctionUtile.js');

/*====================================================
Axiome
====================================================*/

function estTrie(tab,deb = 0,fin) {
	let res = true;
	for (var i = deb; i < fin; i++) {
		if (tab[i] >= tab[i+1]) {
			res = false;
		}
	}
	return res;
}

function estTas(a) {
	if (a == valVide || estFeuille(a)) {
		return true;
	} else {
		let bool = true;
		if(a.bd != valVide){
			bool = bool && (a.r <= a.bd.r ) && estTas(a.bd);
		}
		if(a.bg != valVide){
			bool = bool && (a.r <= a.bg.r ) && estTas(a.bg);
		}
		return bool
	}
}

/*====================================================
Type
====================================================*/

let valVide = null;
function newArbre(r) {
	return {
		r : r,
		bg : valVide,
		bd : valVide
	}
}
function estFeuille(a) {
	return a.bd == valVide && a.bg == valVide;
}
function aLen(a) {
	let res = 1;
	if(estFeuille(a) == false){
		if (a.bg != valVide) {
			res = res + aLen(a.bg);
		}
		if (a.bd != valVide) {
			res = res + aLen(a.bd);
		}
	}
	return res;
}

function affArbre(a,d = "") {
	let decal = "		"
	if (a.bd != valVide) {
		affArbre(a.bd,d+decal);
	}
	console.log(d + "-( "+ a.r + " )");
	if (a.bg != valVide) {
		affArbre(a.bg,d+decal);
	}
}

function merge(a1,a2) {
	assert(estTas(a1));
	assert(estTas(a2));
	let arb = valVide;
	if (a1 != valVide && a2 == valVide) {
		arb = a1;
	}
	if (a2 != valVide && a1 == valVide) {
		arb = a2;
	}
	if (a2 != valVide && a1 != valVide) {
		if (a1.r < a2.r) {
			arb = newArbre(a1.r);
			arb.bd = a2;
			arb.bg = merge(a1.bd,a1.bg);
		} else {
			arb = newArbre(a2.r);
			arb.bd = a1;
			arb.bg = merge(a2.bd,a2.bg);
		}
	}
	assert(estTas(arb));
	return arb;
}

/*====================================================
Code
====================================================*/

function insert(a,r) {
	assert(estTas(a));
	if (a == valVide) {
		a = newArbre(r);
		assert(estTas(a));
		return a;
	} else {
		
		if(a.r > r){
			let temp = a.r;
			a.r = r;
			r = temp
		}

		let ld = -1;
		if (a.bd != valVide) {
			ld = aLen(a.bd);
		}
		
		let lg = -1;
		if (a.bg != valVide) {
			lg = aLen(a.bg);
		}
		if (lg <= ld) {
			a.bg = insert(a.bg,r);
		} else {
			a.bd = insert(a.bd,r);

		}
		assert(estTas(a));
		return a
	}
}

function retirer(a) {
	assert(estTas(a));
	if (a == valVide) {
		return valVide
	} else{
		let r = a.r;
		let arb = valVide;
		if (estFeuille(a) == false) {

			if(a.bg != valVide){
				arb = a.bg;
			}
			if (arb == valVide && a.bd != valVide) {
				arb = a.bd;
			}else if(a.bd != valVide){
				arb = merge(a.bd,a.bg);
			}
		}
		assert(estTas(arb));
		return [r,arb];
	}
}

function arbInTab(a) {
	assert(estTas(a));
	let tab = [];
	assert(estTrie(tab,0,tab.length));
	while(a != valVide){
		let req = retirer(a);
		tab.push(req[0]);
		assert(estTrie(tab,0,tab.length));
		a = req[1];
		assert(estTas(a));

	}
	assert(estTrie(tab,0,tab.length));
	return tab;
}

/*====================================================
Export
====================================================*/

module.exports = {
	valVide:valVide,

	new : newArbre,
	estFeuille : estFeuille,
	len : aLen,
	print : affArbre,
	merge : merge,

	insert:insert,
	retirer:retirer,
	arbInTab:arbInTab,

	main : function() {
		console.log("==============================================");
		console.log("");
		console.log("Exercice 2 : Tri part tas.");
		a = valVide;
		for (var i = 0; i < 10; i++) {
			a = insert(a,FU.randInt(-100,100));
			//affArbre(a);
			//console.log("====================================================");

		}
		affArbre(a);

		let rep = retirer(a);
		console.log("===============");
		console.log(rep[0]);
		console.log("===============");
		a = rep[1];

		affArbre(a);

		let tab = arbInTab(a);
		console.log(tab);

	}
}