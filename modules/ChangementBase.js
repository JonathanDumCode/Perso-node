/*====================================================
Import
====================================================*/

const FU = require('./FunctionUtile.js');

/*====================================================
Constantes
====================================================*/

const BBinary = ["0","1"];
const BHex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
const BAlpha = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X','Y', 'Z'];
const BAlphaNum = ["0","1","2","3","4","5","6","7","8","9",'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X','Y', 'Z'];
const BText = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z', ' '];



/*====================================================
Code 
====================================================*/

function IntToBase(base,nb){

	let res = "";
	while (nb != 0){
		let mod = nb%base.length;
		res = base[mod] + res;
		nb = Math.floor((nb-mod)/base.length);
	}
	return res;
}

function BaseToInt(base,txt){
	let tab = txt.split("");
	let res = 0;
	for (var i = tab.length-1; i >= 0; i--) {
		let k = -1;
		for (var j = 0; j < base.length; j++) {
			if (base[j] == tab[i]) {
				k = j;
			}
		}
		if (k == -1) {
			throw "Caractère inconnu de la base !"
		}
		res = res + Math.pow(base.length,tab.length-1-i)*k;
	}
	return res
}

/*====================================================
Export
====================================================*/

module.exports = {
	IntToBase:IntToBase,
	BaseToInt:BaseToInt,
	bin:function() {
		return {
			IntToBase:function(nb){
				return IntToBase(BBinary,nb)
			},
			BaseToInt:function(txt){
				return BaseToInt(BBinary,txt)
			}

		}
		
	},
	hex:function() {
		return {
			IntToBase:function(nb){
				return IntToBase(BHex,nb)
			},
			BaseToInt:function(txt){
				return BaseToInt(BHex,txt)
			}

		}
		
	},
	Alpha:function() {
		return {
			IntToBase:function(nb){
				return IntToBase(BAlpha,nb)
			},
			BaseToInt:function(txt){
				return BaseToInt(BAlpha,txt)
			}

		}
		
	},
	AlphaNum:function() {
		return {
			IntToBase:function(nb){
				return IntToBase(BAlphaNum,nb)
			},
			BaseToInt:function(txt){
				return BaseToInt(BAlphaNum,txt)
			}

		}
		
	},
	Text:function() {
		return {
			IntToBase:function(nb){
				return IntToBase(BText,nb)
			},
			BaseToInt:function(txt){
				return BaseToInt(BText,txt)
			}

		}
		
	},
	test : function (CBase) {
		console.log("");
		console.log("=================================");
		console.log("");
		let nb = FU.randInt(10**2,10**3);
		console.log("Le nombre est : "+nb);
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation d'une base custome !");
		let base = ["0","1","2"];
		console.log(base);
		let txt = CBase.IntToBase(base,nb);
		console.log(txt);
		console.log(CBase.BaseToInt(base,txt));
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation de la base bin() !");
		txt = CBase.bin().IntToBase(nb);
		console.log(txt);
		console.log(CBase.bin().BaseToInt(txt));
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation de la base hex() !");
		txt = CBase.hex().IntToBase(nb);
		console.log(txt);
		console.log(CBase.hex().BaseToInt(txt));
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation de la base Alpha() !");
		txt = CBase.Alpha().IntToBase(nb);
		console.log(txt);
		console.log(CBase.Alpha().BaseToInt(txt));
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation de la base AlphaNum() !");
		txt = CBase.AlphaNum().IntToBase(nb);
		console.log(txt);
		console.log(CBase.AlphaNum().BaseToInt(txt));
		console.log("");
		console.log("=================================");
		console.log("");

		console.log("Utilisation de la base Text() !");
		txt = CBase.Text().IntToBase(nb);
		console.log(txt);
		console.log(CBase.Text().BaseToInt(txt));
		console.log("");
		console.log("=================================");
		console.log("");
	}
}