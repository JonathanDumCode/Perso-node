/*====================================================
Import
====================================================*/

//npm lib
const GIFEncoder = require('gifencoder');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const assert = require('assert');

//lib perso
//const meta = require('./modules/meta.js');

const {Graph, Perlin, FU,Save,Gif,Draw,Mlib,CBase,GenAcc,txtMat,pChat,Pornpic}= require('./modules/meta.js');


//lib TP
const EX1 = require('./modules/tripartinsertion.js');
const EX2 = require('./modules/triparttas.js');
const EX3 = require('./modules/chaine.js');
const EX4 = require('./modules/pile.js');

/*====================================================
Test
====================================================*/
// Graph.test(Graph);
//Perlin.test(Perlin);
Perlin.testChaire(Perlin,Gif,Draw,FU)
// FU.test(FU);
// Mlib.test(Mlib);
// CBase.test(CBase);
// Pornpic.test(Pornpic);
// txtMat.test(txtMat);

//TP Test
//EX1.main();
//EX2.main();
//EX3.main();
//EX4.main();

/*====================================================
Code
====================================================*/




// function step(files,indice,gif,timeFlash){
// 	if (indice < files.length) {
// 		Draw.loadImg(files[indice],(env)=>{
// 			gif = Gif.save(gif,env);
// 			timeFlash = FU.BarAvancer(indice,files.length,timeFlash);
// 			step(files,indice+1,gif,timeFlash);
// 		});
// 	}else{
// 		Gif.end(gif);
// 		console.log("done");
// 	}
// }
// function start(input,output,frameRate){
// 	let files = Save.getFiles(input);
// 	for (var i = 0; i < files.length; i++) {
// 		files[i] = input+files[i];
// 	}
// 	//files = files.slice(0,10);
// 	Draw.loadImg(files[0],(env)=>{
// 		let width = env[1].width;
// 		let height = env[1].height;

// 		let gif = Gif.init(output,width,height,frameRate);
// 		console.log("start gif");
// 		let timeFlash = Date.now();
// 		step(files,0,gif,timeFlash);
// 	});
// }
// let lib = "./Data/audrey_bitoni_pics/";

// //start(lib,"./res/test.gif",1)

// //asset dedescription d'annonce

// let asset = [
// 	[1,"Ma super table en bois !","table"],
// 	[2,"Ma super chaise en bois !","chaise"],
// 	[3,"Ma super lampe en bois !","lampe"],
// 	[4,"Mes écouteurs !","écouteurs"],
// 	[5,"Mon super téléphone !","téléphone"],
// 	[6,"Mon super ordinateur !","ordinateur"],
// 	[7,"Ma super voiture !","voiture"],
// 	[8,"Ma super moto !","moto"],
// 	[9,"Ma super maison !","maison"],
// 	[10,"Ma super piscine !","piscine"],
// 	[11,"ma table de ping pong !","table de ping pong"],
// 	[12,"Mon super vélo !","vélo"],
// 	[13,"Mon super skate !","skate"],
// 	[14,"Mon super skateboard !","skateboard"],
// 	[15,"Mon super scooter !","scooter"],
// 	[16,"Mon super vélo électrique !","fraise électrique"],
// 	[17,"Mon super vélo de course !","fraise de course"],

// ]

// function getelement(objet){
// 	return objet[1]+" - "+objet[2];
// }
//console.log(FU.rechercheAsset(asset,"Skate fraise",getelement));


//Draw.compresse("./Data/imgs/chats/0 (1).jpg","./res/test.png",480)

// const DALL_E2 = require("dall-e2");

// const text = "Une voiture rouge qui roule sur une route de campagne";
// const dallE2 = new DALL_E2();

// dallE2.generate(text)
//   .then(images => {
//     console.log(images);
//     // Enregistrer l'image sur le disque
//     images[0].save("image.png");
//   })
//   .catch(console.error);