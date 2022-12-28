/*####################################################
Import
####################################################*/

const Save = require('./Save.js');
const Draw = require('./DrawCanvas.js');
const Mlib = require('./Math.js');
//const { createCanvas, loadImage } = require('canvas');

/*####################################################
Code
####################################################*/

function moyColorImg(env,x,y,w,h){
	let data = env[0].getImageData(x, y, w,h).data;
	let ln = w*h;
	let r = 0;
	let g = 0;
	let b = 0;

	for (var j = 0; j < ln; j++) {
		r = r + data[j*4];
		g = g + data[j*4+1];
		b = b + data[j*4+2];
	}
	r = Math.floor(r/ln);
	g = Math.floor(g/ln);
	b = Math.floor(b/ln);
	return [r,g,b]
}

function findNextColor(c,imgs){
	let indice = 0;
	let p = new Mlib.G3D.Point(c[0],c[1],c[2]);
	for (var i = 1; i < imgs.length; i++) {
		let d1 = p.dist(imgs[i][1][0],imgs[i][1][1],imgs[i][1][2]);
		let d2 = p.dist(imgs[indice][1][0],imgs[indice][1][1],imgs[indice][1][2]);
		if (d1 < d2) {
			indice = i;
		}
	}

	return imgs[indice][0];

}
function ptitChat(img,lib,path,w,h){
	console.log("Start ! "+img);
	Draw.loadImg(img,(dataImg)=>{
		let width = dataImg[1].width;
		let height = dataImg[1].height;

		let env = Draw.init(width*w,height*h);
		
		let files = Save.getFiles(lib);
		for (var i = 0; i < files.length; i++) {
			files[i] = lib+files[i];
		}
		let monImageData = dataImg[0].getImageData(0, 0, width,height).data;
		console.log("Loading ! "+lib);
		Draw.loadImgs(files,[],(imgs)=>{
			console.log("Computing ! "+lib);
			for (var i = 0; i < imgs.length; i++) {
				
				let c = moyColorImg(imgs[i],0,0,w,h);

				imgs[i] = [imgs[i],c];
		
			}
			console.log("Making ! "+path);
			for (var x = 0; x < width; x++) {
				for (var y = 0; y < height; y++) {
					let n = (y*width+x)*4;
					let c = [monImageData[n],monImageData[n+1],monImageData[n+1]]
					let imgToPrint = findNextColor(c,imgs);

					env[0].drawImage(imgToPrint[1],x*w,y*h,w,h);
				}
			}
			console.log("Saving ! "+path);
			Save.PNG(env,path);
			
		},w,h);
	})
}

/*####################################################
Export
####################################################*/

/*
let lib = "./Data/imgs/chats/";

pChat.ptitChat("logo.png",lib,"logo2.png",128,128);
*/

module.exports = {
	moyColorImg : moyColorImg,
	findNextColor : findNextColor,
	ptitChat : ptitChat
}