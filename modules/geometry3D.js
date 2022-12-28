const MA = require('./MathBase.js');

let Point = class{
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		this.dim = 3;
		let polar = MA.CartToPolar(x,y,z);
		this.r = polar[0];
		this.teta = polar[1];
		this.phi = polar[2];
	}

	dist(x,y=null,z=null){
		if (z == null) {
			if (y == null) {
				let p = x;
				if (p.dim == 2) {
					return MA.dist3D(this.x,this.y,this.z,p.x,p.y,0);
				} else {
					return MA.dist3D(this.x,this.y,this.z,p.x,p.y,p.z);
				}
			} else {
				return MA.dist3D(this.x,this.y,this.z,x,y,0);
			}
		}else if (y == null) {
			console.log("why? y==null && z!=null");
		} else {
			return MA.dist3D(this.x,this.y,this.z,x,y,z);
		}
	}
	copy(){
		return Point(this.x,this.y,this.y);
	}
	addAngle(teta){
		this.teta = (this.teta + teta)%360;
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

	setCord(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		let polar = MA.CartToPolar(x,y,z);
		this.r = polar[0];
		this.teta = polar[1];
		this.phi = polar[2];
	}
	addVecteur(v){
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		if (v.dim>2) {
			this.z = this.z + v.z;
		}
	}
}
//Vecteur

let Vecteur = class{
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
		this.dim = 3;
	}

	norme(){
		return MA.dist3D(0,0,0,this.x,this.y,this.z);
	}

	angle(){
		return {teta:MA.CartToPolar(this.x,this.y,this.z)[1],
			phi:MA.CartToPolar(this.x,this.y,this.z)[2]};
	}
	mult(k){
		this.x = this.x*k;
		this.y = this.y*k;
		this.z = this.z*k;
	}

	addV(v){
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		if (v.dim>2) {
			this.z = this.z + v.z;
		}
	}
	update(p){
		let x = p.x + this.x;
		let y = p.y + this.y;
		if (p.dim >2) {
			let z = p.z + this.z;
			return Point(x,y,z);
		} else {
			return Point(x,y,0);
		}
		
	}

	scale(v){
		return this.norme() * v.norme() * (Math.cos(MA.DegToRad(this.angle().teta-v.angle().teta)));
	}
}

module.exports = {
	Vecteur:Vecteur,
	point:Point
}