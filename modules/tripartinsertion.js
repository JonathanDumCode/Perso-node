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
		if (tab[i] > tab[i+1]) {
			res = false;
		}
	}
	return res;
}


function tabInfX(tab,inf,sup,x) {
	let res = true;
	for (var i = inf; i < sup; i++) {
		if (tab[i]<x) {
			res = false;
		}
	}
	return res
}

/*====================================================
Code
====================================================*/

function triInsertionSeqentiel(tab,n,onAff=false) {

	if (n > 0) {
		tab = triInsertionSeqentiel(tab,n-1,onAff);
		assert(estTrie(tab,n-1));
		let k = n-1;
		let x = tab[n];
		while(k>=0 && tab[k]>x){
			assert((tabInfX(tab,k,n,x) || (tab[n-1] > tab[n])) && estTrie(tab,n-1));
			tab[k+1] = tab[k];
			assert((tabInfX(tab,k,n,x) && (tab[k] == tab[k+1])) && estTrie(tab,n));
			k = k -1;
			assert((tabInfX(tab,k+1,n,x) && (tab[k+2] == tab[k+1])) && estTrie(tab,n));
			
		}
		if (k >= 1) {
			for (var i = 0; i < k+1; i++) {
				assert(tab[i] <= x);
			}
			for (var i = k+1; i < n-1; i++) {
				assert(tab[i] > x);
			}
		}else if(k == -1){
			for (var i = 0; i < n; i++) {
				assert(tab[i]>x);
			}
		}else if(k != n-1){
			assert(tab[k+2] == tab[k+1] && estTrie(tab,1,i));
		}

		tab[k+1] = x;
		assert(estTrie(tab,n));
	}
	assert(estTrie(tab,n));
	if (onAff) {
		console.log(tab);
	}
	return tab
}

/*====================================================
Export
====================================================*/

module.exports = {
	triInsertionSeqentiel:triInsertionSeqentiel,
	main : function(onAff=false){
		console.log("Exercice 1 : Tri part insertion sequentiel.");

		let tab = [];
		let n = 10;
		for (var i = 0; i < n; i++) {
			tab.push(FU.randInt(-100,100));
		}
		console.log("Liste de départ.");
		console.log(tab);
		if (onAff) {
			console.log("====================================================");
		}


		tab = triInsertionSeqentiel(tab,n-1,onAff);
		console.log("====================================================");
		console.log(tab);

		console.log("FIN");
	}
}