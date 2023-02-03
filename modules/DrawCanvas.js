
/*####################################################
Canvas
####################################################*/
const { createCanvas, loadImage } = require('canvas');
const Save = require('./Save.js');


function tabToColor(c) {
	if (c.length == 3) {
		return "rgb("+c[0]+","+c[1]+","+c[2]+")";
	}else if(c.length == 4){
		return "rgba("+c[0]+","+c[1]+","+c[2]+","+c[3]+")";
	}else{
		return "rgb("+c[0]+","+c[0]+","+c[0]+")";
	}
}

function setEnv(width,height){
	var canvas = createCanvas(width, height);
	var context = canvas.getContext('2d');
	return [context,canvas];
}

function printEnv(env,envBis,x,y,L,l){
	env[0].drawImage(envBis[1], x,y,L,l);
}
function cercleS(env,x,y,r,c){
	let ctx = env[0];
	ctx.save();
	ctx.strokeStyle = tabToColor(c);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.restore();
}
function cercleF(env,x,y,r,c){
	let ctx = env[0];
	ctx.save();
	ctx.fillStyle = tabToColor(c);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.restore();
}

function rectangleS(env,x,y,w,h,c){
	let ctx = env[0];
	ctx.save();
	ctx.strokeStyle = tabToColor(c);
	ctx.strokeRect(x, y, w, h);
	ctx.restore();
}
function rectangleF(env,x,y,w,h,c){
	let ctx = env[0];
	ctx.save();
	ctx.fillStyle = tabToColor(c);
	//ctx.fillRect(x, y, w, h);
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+w,y);
	ctx.lineTo(x+w,y+h);
	ctx.lineTo(x,y+h);
	ctx.lineTo(x,y);
	ctx.fill();
	ctx.restore();
}

function loadImg(link,callback,w=-1,h=-1){
	loadImage(link).then( (res) => {
		if (w == -1) {
			w =res.width;
		}
		if (h == -1) {
			h =res.height;
		}
		

		let env = setEnv(w,h);
		env[0].drawImage(res,0,0,w,h);
		callback(env)
		
	});
}

function loadImgs(links,res,callback,w=-1,h=-1){
	let link = links[0];
	links = links.slice(1,links.length);
	loadImg(link,(env)=>{
		res.push(env);
		if (links.length == 0) {
			callback(res);
		}else{
			loadImgs(links,res,callback,w,h);
		}
	},w,h);
}

function compresse(input,output,CMax){
	loadImg(input,(img)=>{
		let width = img[1].width;
		let height = img[1].height;
		let newWidth = 0;
		let newHeight = 0;

		if(width>height){
			newWidth = CMax;
			newHeight = Math.floor(height*newWidth/width);

		}else{
			newHeight = CMax;
			newWidth = Math.floor(width*newHeight/height);
		}

		let env = setEnv(newWidth,newHeight);
		printEnv(env,img,0,0,newWidth,newHeight);
		Save.PNG(env,output)
	})

}

module.exports = {
	init : setEnv,
	printEnv:printEnv,
	cercleStroke : cercleS,
	cercleFill : cercleF,
	recStroke : rectangleS,
	recFill : rectangleF,
	loadImg : loadImg,
	loadImgs : loadImgs,
	compresse : compresse
}