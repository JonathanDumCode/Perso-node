/*====================================================
Import
====================================================*/
const FU = require('./FunctionUtile.js');
const fs = require("fs");

/*====================================================
Constantes
====================================================*/

let Alpha ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .";
let elfique = "Aiya Namarié Mara Lomë Mae Govannen Hantalé Lend gilsila lumenni Dolomei Là Quel resta Quel Kaima Lle naa vanima Mae Lau Ada Naneth Ion Iell Nost Herven Hervin Kano Hir Tirith Aran Ian Edhellen Mellon Orn' Filig El, Gil Wing Rond Eär Loth Amon Ithil Roch Sîr Nen Ned Men Vilya Minuial Rhîw Vanya Nolo Daer Érui Andelu Lim Nwalca Vaxë Ñotto Ashi Guru Edwen Mae Neled Faeg Uben Cynclic Stille Faeste Ancalima Tûr I amar Pîlin Beth Hên Dúath Lû Ôl Annîn In naeth Sed Gruith Ando Govannas Dûlu Estel Meleth Ant Cuil Methed Nad Yàr Quetta Fenda Wanath Dagor Aur Tail Naeth Nîr Hared Cair Varv Lanc Nama Gwaith Lasto beth nin. Tolo gan dan Galad Le Hon Im Nîn Lîn Men Hene Û Or A I Si An Ned Vîn Ae Athar Hen Dan Ennas Sin Man Go Han O Dan Dîn Uin Nu Beria Dartha Toltha Athrada Fir Ing- Iest Mab Matha Presta Leithia Tangada Tol Lasto Thaed Noro Anìra Nautha Orthor Gwanna Renich Losta Sehdo Nuitha Gwedh Telin Henia Aníra Píga Péria Cirà Car Nai Varya Cuiva A lasta nîn Hiro Na Ar-cened Ethol Estelia Bedin Doltha Pelia Danna Edra Erin Gerich Trasta Cen Daged Edaved Tano Hado Lle tela ? Lle desiel ? Lle tyava quel ? Lle anta amin tu ? Lle vesta ? Sut naa lle sina re ? Sut ? Mani naa essa en lle ? Mani marte ? Manke naa lle autien ? Mankoi lle uma tanya ? Le no an-uir nîn ? Ed' i'ear ar' elenea ! Rima ! Tampa ! A ! Sii' ! En ! Tua amin Dina Tula Simone Uuma Dela Khila Amin Tira ten' rashwe Esta sinome Sana sina Gwanno ereb nin Drego No dhínen Hebo estel Avo acheno Govaethanc Noro nan goth Im harnannen Amin autien rath Tulien Quel marth Amin hiraetha Amin utue ta Amin mela lle Amin anta est, kaim Amin n'rangwa edanea Amin dele ten' ho, he, sen Lle wethrine amin Detholalle Im harnannen Elenya Anarya Isilya Alduya Menelya Valanya Tarion Narvinye Nenime Sulime Viresse Lotesse Narre Cermie Brime Yavannie Narquelie Hisime Ringare Lasto lalaith nîn Rhachon le Nai Ungoliant meditha le Labo vi Orodruin Tevenyel";
let transform = [
	["é","e"],
	["è","e"],
	["ê","e"],
	["ë","e"],
	["à","a"],
	["ä","a"],
	["â","a"],
	["ï","i"],
	["î","i"],
	["í","i"],
	["ü","u"],
	["û","u"],
	["ù","u"],
	["ö","o"],
	["ô","o"],
	["œ","o"],
	["ç","c"],
	["ó","o"],
	["Ñ","N"],
	["Ô","O"],
	["Û","U"]

]


/*====================================================
Code
====================================================*/

function cInTab(c,tab){
	let res = false;
	for (var i = 0; i < tab.length && res == false; i++) {
		if(tab[i] == c){
			res = true;
		}
	}
	return res;
}


function epurer(alpha, txt) {
	let res = [];
	for (var i = 0; i < txt.length; i++) {
		if (cInTab(txt[i],alpha)) {
			res.push(txt[i]);
		}
	}
	return res
}

function indice(tab,c) {
	let res = -1;
	for (var i = 0; i < tab.length && res == -1; i++) {
		if (tab[i] == c) {
			res = i;
		}
	}
	return i-1;
}

function appliTranformation(txt,trans) {
	for (var i = 0; i < trans.length; i++) {
		for (var j = 0; j < txt.length; j++) {
			if(txt[j] == trans[i][0]){
				txt[j] = trans[i][1];
			}
		}
	}
	return txt
}


/*====================================================
Main
====================================================*/

function initMatAlpha(alpha) {
	let res =[];
	for (var i = 0; i < alpha.length; i++) {
		let ligne = [];
		for (var j = 0; j <= alpha.length; j++) {
			ligne.push(0);
		}
		res.push(ligne);
	}
	return res
}

function IncMatAlpha(alpha,M,pre,suf) {
	let indicePre = indice(alpha,pre);
	let indiceSuf = indice(alpha,suf);
	if(indicePre != -1 && indiceSuf != -1){
		M[indicePre][indiceSuf] = M[indicePre][indiceSuf] +1;
		M[indicePre][alpha.length] = M[indicePre][alpha.length] +1;
	}
	return M;
}


function predictEl(alpha,M,c) {
	let proba = M[indice(alpha,c)];
	let x = FU.randInt(0,proba[proba.length-1]+1);
	let res = -1;

	for (var i = 0; i < proba.length-1 && res == -1; i++) {
		if (x <= proba[i]) {
			res = i;
		}
		x = x - proba[i]
		
	}
	res = res;
	if (res <0){
		res = res +alpha.length;
	}
	return alpha[res];
}

/*====================================================
Export
====================================================*/


module.exports = {
	Alpha : Alpha,
	elfique : elfique,
	T : transform,

	init : initMatAlpha,
	incr : IncMatAlpha,
	pred : predictEl,

	indice : indice,

	epurer : epurer,
	appliTranformation : appliTranformation,

	test : function (txtMat) {
		let dataMat = txtMat.init(txtMat.Alpha);
		fs.readFile("./input/20milles1.txt",'utf8',(err,dataB)=>{
			dataB = txtMat.appliTranformation(dataB,txtMat.T);
			let data = txtMat.epurer(txtMat.Alpha,dataB);

			for (var i = 0; i < data.length-1; i++) {
				dataMat = txtMat.incr(txtMat.Alpha,dataMat,data[i],data[i+1]);
			}
			let elC = " ";
			let text = "";
			for (var i = 0; i < 10**3*5; i++) {
				elC = txtMat.pred(txtMat.Alpha,dataMat,elC);
				text = text + elC;
			}
			console.log(text);
		});
	},
	test2 : function(txtMat){
		let consonne = "G";
		let alpha = ""+consonne+"aoui ".split("");
		alpha = (txtMat.Alpha+"'").split("");
		alpha = "#a-. ";
		let debile = " "+consonne+"a"+consonne+"o"+consonne+"i"+consonne+"u "+consonne+"a "+consonne+"o "+consonne+"u "+consonne+"i ";
		let dataB = " # a . - " + " ## #a #. #- " +" a# aa a. a- " +" .# $a . .- " + " -# -a -. - ";

		let nb = 5*10**3;


		let text = txtMat.main(txtMat,dataB,alpha,nb);

		console.log(text);
	},

	main: function (txtMat,dataB,alpha,nb) {
		let dataMat = txtMat.init(alpha);
		dataB = txtMat.appliTranformation(dataB,txtMat.T);

		let data = txtMat.epurer(alpha,dataB);

		for (var i = 0; i < data.length-1; i++) {
			dataMat = txtMat.incr(alpha,dataMat,data[i],data[i+1]);
		}
		let elC = " ";
		let text = "";
		for (var i = 0; i < nb; i++) {
			elC = txtMat.pred(alpha,dataMat,elC);
			text = text + elC;
		}
		return text
	}

}