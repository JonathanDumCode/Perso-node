const FU = require('./FunctionUtile.js');

function PolarToCart(r,teta) {
	let x = Math.round(Math.cos(teta)*r);
	let y = Math.round(Math.sin(teta)*r);
	return [x,y];
}

function CartToPolar(x,y,z=null) {
	let r =  FU.distance(0,0,x,y);
	let coef = y/(x);
	let teta = Math.atan(coef);
	let phi = Math.asin(z/r);
	return [r,teta,phi];
}

function DegToRad(angle) {
	return angle*Math.PI/180;
}
function RadToDeg(angle) {
	return angle*180/Math.PI;
}
function dist(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
function dist3D(x1,y1,z1,x2,y2,z2) {
	return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
}




module.exports = {
	PolarToCart : PolarToCart,
	CartToPolar : CartToPolar,
	DegToRad : DegToRad,
	RadToDeg : RadToDeg,
	dist:dist,
	dist3D:dist3D,
	test : function (Mlib) {
		let x = 10;
		let y = 3;
		console.log("X , Y :");
		console.log(x,y);
		let r = Mlib.CartToPolar(x,y)[0];
		let teta = Mlib.CartToPolar(x,y)[1];
		console.log("r , Teta :");
		console.log(r,teta);

		console.log("X , Y :");
		console.log(Mlib.PolarToCart(r,teta));

		console.log("Rad & Deg");
		console.log(Mlib.RadToDeg(Mlib.DegToRad(233)) == 233);


	}
}