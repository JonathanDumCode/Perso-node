/*====================================================
Import
====================================================*/

const FU = require('./FunctionUtile.js');
const Save = require('./Save.js');
const CBase = require('./ChangementBase.js');


/*====================================================
Constante
====================================================*/

const valMin = 10**10;
const valMax = 10**15;
const BPasword = "!@ABCDEabcde123".split("");
const BTxt = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
const BNom = "abcdefghijklmnopqrstuvwxyz".split("");
const Byt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ".split("");


/*====================================================
Code
====================================================*/
function nom() {
	return CBase.IntToBase(BNom,FU.randInt(valMin,valMax));
}
function pseudo() {
	return CBase.IntToBase(BTxt,FU.randInt(valMin,valMax));
}
function mail() {
	return CBase.IntToBase(BTxt,FU.randInt(valMin,valMax))+"@outlook.fr";
}
function mdp() {
	let mdp = "";
	while(mdp.split("!") <= 1 && mdp.split("@") <= 1){
		mdp = CBase.IntToBase(BPasword,FU.randInt(valMin,valMax));
	}
	return mdp
}

function account() {
	return {
		Nom:nom(),
		Prenom:nom(),
		Pseudo:pseudo(),
		mail:mail(),
		mdp:mdp()
	}

}
function yt() {
	return "https://www.youtube.com/watch?v=" + CBase.IntToBase(BTxt,FU.randInt(valMin,valMax))
}
/*====================================================
Export
====================================================*/

module.exports = {
	pseudo:pseudo,
	mail:mail,
	mdp:mdp,
	acc:account,
	yt:yt,
	accN: function (n) {
		let ls = [];
		for (var i = 0; i < n; i++) {
			ls.push(account());
		}
		return ls
	},
	save:function (Path,ls) {
		let txt = "";
		for (var i = 0; i < ls.length; i++) {
			txt = txt + JSON.stringify(ls[i]) +"\n";
		}
		Save.TXT(txt,Path);
	}
}