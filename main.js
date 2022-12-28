/*====================================================
Import
====================================================*/

//npm lib
const GIFEncoder = require('gifencoder');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const assert = require('assert');

//lib perso
const Graph = require('./modules/Graph.js');
const Perlin = require('./modules/Perlin.js');
const FU = require('./modules/FunctionUtile.js');
const Save = require('./modules/Save.js');
const Gif = require('./modules/Gif.js');
const Draw = require('./modules/DrawCanvas.js');
const Mlib = require('./modules/Math.js');
const CBase = require('./modules/ChangementBase.js');
const GenAcc = require('./modules/GenAccount.js');
const txtMat = require('./modules/textMath.js');
const pChat = require('./modules/petitChat.js');


//lib TP
const EX1 = require('./modules/tripartinsertion.js');
const EX2 = require('./modules/triparttas.js');
const EX3 = require('./modules/chaine.js');
const EX4 = require('./modules/pile.js');

/*====================================================
Test
====================================================*/
// Graph.test(Graph);
// Perlin.test(Perlin);
// FU.test(FU);
// Mlib.test(Mlib);
// CBase.test(CBase);
// txtMat.test(txtMat);

//TP Test
//EX1.main();
//EX2.main();
//EX3.main();
//EX4.main();

/*====================================================
Code
====================================================*/

let planet = class{
	constructor(r,c1 = null , c2 = null , c3 = null){
		this.coef = 1;

		this.r = r;
		this.cote = r*2;
		this.C = 10;


		this.c1 = c1;
		this.c2 = c2;
		this.c3 = c3;
		this.colSeed = FU.randInt(-1*10**6,10**6);

		if (c1 == null) {
			this.c1 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];
			this.c2 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];
			this.c3 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];

		}else if (c2 == null) {
			this.c2 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];
			this.c3 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];

		}else if (c3 == null) {
			this.c3 = [FU.randInt(0,255),FU.randInt(0,255),FU.randInt(0,255)];

		}

		this.mat = [];
		for (var n = 0; n < this.cote; n++) {
			let couche = [];
			for (var i = 0; i < this.cote; i++) {
				let ligne = [];
				for (var j = 0; j < this.cote; j++) {
					ligne.push(-1);
				}
				couche.push(ligne);
			}
			this.mat.push(couche);
		}

		

	}
	genColor(x,y,z){
		Perlin.SetSeed(this.colSeed);
		let k = 10**2;
		let fact = (Perlin.Gen3D(x*k,y*k,z*k)*1);
		//console.log(fact);

		let r = Math.floor((fact*this.c1[0]+(1-fact)*this.c2[0])/1);
		let g = Math.floor((fact*this.c1[1]+(1-fact)*this.c2[1])/1);
		let b = Math.floor((fact*this.c1[1]+(1-fact)*this.c2[1])/1);

		let col = [r,g,b];

		return col;
				
	}

	generate(){
		let p = new Mlib.G2D.point(0,0);
		p.setPolar(this.r*0.9,Mlib.M.DegToRad(270));
		let pas = Mlib.M.DegToRad(Math.floor(90/this.r));




		for (var i = 0; i < this.r; i++) {
			let r = p.x;
			console.log(r);
			p.addAngle(pas);

			if (r > 0) {
				let indice1 = i;
				let indice2 = this.cote-1-i;

				let p2 = new Mlib.G2D.point(r*this.coef,r*this.coef);
				let pas2 = Mlib.M.DegToRad(1);

				let x = Math.round(p2.x)+this.r;
				let y = Math.round(p2.y)+this.r;
				
				x = Math.min(this.cote-1,Math.max(0,x));
				y = Math.min(this.cote-1,Math.max(0,y));

				this.mat[indice1][x][y] = this.genColor(x,y,i);
				this.mat[indice2][x][y] = this.genColor(x,y,i+this.r);
				
				for (var j = 0; j < 360; j++) {
					p2.addAngle(pas2);
					x = Math.round(p2.x)+this.r;
					y = Math.round(p2.y)+this.r;

					x = Math.min(this.cote-1,Math.max(0,x));
					y = Math.min(this.cote-1,Math.max(0,y));

					this.mat[indice1][x][y] = this.genColor(x,y,i);
					this.mat[indice2][x][y] = this.genColor(x,y,i+this.r);
				}
			}

		}
		/*let r = p.y;
		let p2 = new Mlib.G2D.point(r*this.coef,0);
		let pas2 = Mlib.M.DegToRad(1);

		let x = Math.round(p2.x)+this.r;
		let y = Math.round(p2.y)+this.r;
		
		x = Math.min(this.cote-1,Math.max(0,x));
		y = Math.min(this.cote-1,Math.max(0,y));

		this.mat[this.r][x][y] = this.genColor(x,y,this.r);
		
		for (var j = 0; j < 360; j++) {
			p.addAngle(pas2);
			x = Math.round(p2.x)+this.r;
			y = Math.round(p2.y)+this.r;
			
			x = Math.min(this.cote-1,Math.max(0,x));
			y = Math.min(this.cote-1,Math.max(0,y));

			this.mat[this.r][x][y] = this.genColor(x,y,this.r);
		
		}*/

	}

	print(c = null){
		if (c == null) {
			for (var n = 0; n < this.mat.length; n++) {
				console.log("==========================================")
				console.log("n° "+n);
				console.log("==========================================")
				let couche = this.mat[n];
				for (var i = 0; i < couche.length; i++) {
					let ln = "( " +couche[i].join(" )-( ")+" )";
					console.log(ln);
				}

			}

		} else {
			console.log("==========================================")
			console.log("n° "+c);
			console.log("==========================================")
			let couche = this.mat[c];
			for (var i = 0; i < couche.length; i++) {
				let ln = "( " +couche[i].join(" )-( ")+" )";
				console.log(ln);
			}
		}

	}
	SaveTranche(){
		let C = this.C;
		let cote = C*this.cote;
		let env = Draw.init(cote,cote);
		let gif = Gif.init("test.gif",cote,cote);

		for (var n = 0; n < this.mat.length; n++) {
			let couche = this.mat[n];

			Draw.recFill(env,0,0,cote,cote,[255,255,255]);

			for (var i = 0; i < this.cote; i++) {
				for (var j = 0; j < this.cote; j++) {
					if(couche[i][j] != -1){
						Draw.recFill(env,i*C,j*C,C,C,couche[i][j]);
					}
				}
			}
			Gif.save(gif,env);
		}
		Gif.end(gif);
	}
	getFace(){
		let C = this.C;
		let cote = C*this.cote;
		let env = Draw.init(cote,cote);

		for (var n = 0; n < this.mat.length; n++) {
			let tranche = this.mat[n];
			for (var i = 0; i < this.cote; i++) {
				let c = -1;

				for (var j = 0; j < this.cote; j++) {
					if(tranche[i][j] != -1){
						c = tranche[i][j];
					}
				}

				if (c != -1) {
					Draw.recFill(env,i*C,n*C,C,C,c);
				}
			}
		}

		return env;

	}
}

/*let p = new planet(15);
console.log("Gen");
p.generate();
console.log("Save");
p.SaveTranche();

let env = p.getFace();
Save.PNG(env,"test.png");*/

/*====================================================
Main
====================================================*/


//console.log("Nothing to do !");

/*====================================================
Autre
====================================================*/

//console.log(txtMat.main(txtMat,txtMat.elfique,txtMat.Alpha,10**3));


/*let salaire = 1300;
let P_eparger = 30/100;
let P_interet_Annuel = 2/100+1;

let passageRetraite = 60;
let AnneTravail = passageRetraite-25;
let AnneRetraite = 100 - passageRetraite;
console.log("Travailler pendant "+AnneTravail+" ans, retraiter pendant "+AnneRetraite+" ans.");
console.log("Epargne : " +P_eparger);
console.log("Interet : " +P_interet_Annuel);
console.log(salaire+" / "+(salaire*P_eparger));

let capital = 0;

for (var i = 0; i < AnneTravail; i++) {
	capital = capital + (salaire*P_eparger)*12;
	capital = capital*P_interet_Annuel;
}

let salaireAnnuel = capital/AnneRetraite;
console.log("Capital : "+capital);
console.log("Salaire Annuel : "+salaireAnnuel);
console.log("Salaire du Mois : "+salaireAnnuel/12);*/