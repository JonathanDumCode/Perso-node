const MA = require('./MathBase.js');

//Points
let Point = class{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.dim = 2;

		let polar = MA.CartToPolar(x,y);
		this.r = polar[0];
		this.teta =polar[1];
	}
	setPolar(r,teta){
		this.r = r;
		this.teta = teta;

		let co = MA.PolarToCart(this.r,this.teta);
		this.x = co[0];
		this.y = co[1];
	}


	dist(x,y=null){
		if (y == null) {
			let p = x;
			return MA.dist(this.x,this.y,p.x,p.y);
		} else {
			return MA.dist(this.x,this.y,x,y);
		}
	}
	copy(){
		return Point(this.x,this.y);
	}
	addAngle(teta){
		this.teta = (this.teta + teta);

		let co = MA.PolarToCart(this.r,this.teta);
		this.x = co[0];
		this.y = co[1];
	}
	addRayon(r){
		this.r = this.r + r;
		let co = MA.PolarToCart(this.r,this.teta);
		this.x = co[0];
		this.y = co[1];
	}

	setCord(x,y){
		this.x = x;
		this.y = y;
		let polar = MA.CartToPolar(x,y);
		this.r = polar[0];
		this.teta =polar[1];
	}
	addVecteur(v){
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}
}
//Vecteur

let Vecteur = class{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.dim = 2;
	}

	norme(){
		return MA.dist(0,0,this.x,this.y);
	}

	angle(){
		return MA.CartToPolar(this.x,this.y)[1];
	}
	mult(k){
		this.x = this.x*k;
		this.y = this.y*k;
	}

	addV(v){
		this.x = this.x + v.x;
		this.y = this.y + v.y
	}
	update(p){
		let x = p.x + this.x;
		let y = p.y + this.y;
		return Point(x,y);
	}

	scale(v){
		return this.norme() * v.norme() * (Math.cos(MA.DegToRad(this.angle()-v.angle())));
	}
}


//Segment
function setSegment(p1,p2) {
	return [p1,p2];
}
function getSegP1(seg) {
	return seg[0];
}
function getSegP2(seg) {
	return seg[1];
}

//Demi Droite
function setDemiDroite(pD,pC) {
	return [pD,pC];
}
function getDemDroitePD(d) {
	return d[0];
}
function getDemDroitePC(d) {
	return d[1];
}

module.exports = {
	point : Point,

	setSegment : setSegment,
	getSegP1 : getSegP1,
	getSegP2 : getSegP2,

	setDemiDroite : setDemiDroite,
	getDemDroitePD : getDemDroitePD,
	getDemDroitePC : getDemDroitePC,
	test : function (G2D){
		console.log("Point :");
		let p = new G2D.point(2,18);
		console.log(p);
		let r = p.r;
		let teta = p.teta;
		console.log("r , Teta :");
		console.log(r,teta);

		console.log("Point :");
		console.log(p.x,p.y);

	}
}