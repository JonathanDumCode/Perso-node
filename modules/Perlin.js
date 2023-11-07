/*####################################################
Perlin Noise
####################################################*/

/*====================================================
Constant
====================================================*/

//type de generation
var off = 10**6

var freq = 0.005 //precision
var ampli = 1.0 //hauteur

var percistance = 0.5 //diminu l'impacte de l'ampli
var lacu = 2.0 //augmente la precision sur les octaves d'après

var octaves = 8 //nb de generation de bruit

var P = [30, 125, 165, 152, 137, 110, 88, 182, 180, 51, 177, 15, 25, 208, 72, 246, 81, 36, 44, 245, 64, 186, 115, 95, 87, 133, 78, 9, 49, 172, 41, 54, 79, 219, 164, 90, 140, 212, 167, 211, 156, 188, 57, 98, 196, 238, 37, 101, 250, 151, 96, 194, 86, 202, 209, 139, 39, 34, 18, 97, 157, 210, 50, 55, 242, 116, 108, 201, 103, 174, 29, 42, 199, 176, 240, 159, 255, 205, 220, 147, 4, 3, 71, 198, 132, 163, 58, 143, 52, 100, 181, 207, 225, 128, 46, 119, 85, 56, 158, 7, 148, 190, 129, 226, 23, 122, 235, 233, 229, 10, 63, 43, 193, 179, 223, 138, 60, 75, 244, 146, 232, 230, 168, 161, 173, 8, 178, 17, 105, 130, 106, 236, 144, 134, 67, 102, 84, 127, 1, 123, 126, 162, 20, 231, 93, 183, 61, 237, 33, 11, 124, 109, 222, 66, 0, 47, 203, 213, 120, 62, 94, 234, 70, 89, 145, 69, 189, 175, 12, 68, 112, 40, 14, 32, 65, 45, 241, 228, 218, 197, 227, 192, 114, 251, 169, 80, 6, 170, 74, 53, 221, 247, 217, 82, 2, 239, 252, 104, 131, 191, 254, 153, 26, 216, 166, 91, 204, 171, 83, 111, 184, 73, 99, 160, 253, 118, 200, 27, 142, 107, 31, 35, 24, 48, 154, 59, 149, 195, 16, 243, 215, 22, 206, 28, 5, 113, 76, 77, 187, 121, 38, 248, 249, 150, 21, 141, 136, 92, 224, 214, 13, 19, 185, 135, 155, 117, 
		 30, 125, 165, 152, 137, 110, 88, 182, 180, 51, 177, 15, 25, 208, 72, 246, 81, 36, 44, 245, 64, 186, 115, 95, 87, 133, 78, 9, 49, 172, 41, 54, 79, 219, 164, 90, 140, 212, 167, 211, 156, 188, 57, 98, 196, 238, 37, 101, 250, 151, 96, 194, 86, 202, 209, 139, 39, 34, 18, 97, 157, 210, 50, 55, 242, 116, 108, 201, 103, 174, 29, 42, 199, 176, 240, 159, 255, 205, 220, 147, 4, 3, 71, 198, 132, 163, 58, 143, 52, 100, 181, 207, 225, 128, 46, 119, 85, 56, 158, 7, 148, 190, 129, 226, 23, 122, 235, 233, 229, 10, 63, 43, 193, 179, 223, 138, 60, 75, 244, 146, 232, 230, 168, 161, 173, 8, 178, 17, 105, 130, 106, 236, 144, 134, 67, 102, 84, 127, 1, 123, 126, 162, 20, 231, 93, 183, 61, 237, 33, 11, 124, 109, 222, 66, 0, 47, 203, 213, 120, 62, 94, 234, 70, 89, 145, 69, 189, 175, 12, 68, 112, 40, 14, 32, 65, 45, 241, 228, 218, 197, 227, 192, 114, 251, 169, 80, 6, 170, 74, 53, 221, 247, 217, 82, 2, 239, 252, 104, 131, 191, 254, 153, 26, 216, 166, 91, 204, 171, 83, 111, 184, 73, 99, 160, 253, 118, 200, 27, 142, 107, 31, 35, 24, 48, 154, 59, 149, 195, 16, 243, 215, 22, 206, 28, 5, 113, 76, 77, 187, 121, 38, 248, 249, 150, 21, 141, 136, 92, 224, 214, 13, 19, 185, 135, 155, 117];
//console.log(P.length);
var grad = [
	[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
    [1,1,0],[-1,1,0],[0,-1,1],[0,-1,-1]
]

var seed = 19;




/*====================================================
Function
====================================================*/

//Fade & Lerp
function fade(t){
	return ((6*t - 15)*t + 10)*t*t*t;
}

function quintic_poly(t)
{
    let t3 = t * t * t;
    return t3 * (t * (t * 6. - 15.) + 10.);
}


function lerp(t,a,b){
	return a + t * ( b - a );
}
function lerp2(a,b,t){
	return a + t * ( b - a );
}

function linear_interpolate( a, b , t)
{
    return (1. - t) * a + t * b;
}

/*====================================================
Vecteur
====================================================*/

//vecteur
function fast_dot(v,x,y,z){
    return v[0] * x + v[1] * y + v[2] * z;
}

function get_grad(x,y,z){
	let rand_value = P[z +(P[(y + P[x])])];
	return grad[rand_value & 15]
}


/*====================================================
Noise
====================================================*/

//noise
function smooth_noise_3d( x_pos,  y_pos, z_pos)
{
    //Les parties entières
    var X = Math.floor(x_pos) & 255;
	var Y = Math.floor(y_pos) & 255;
	var Z = Math.floor(z_pos) & 255;
    let decal = 0.05;
    let xf = (x_pos - Math.floor(x_pos));
    let yf = (y_pos - Math.floor(y_pos));
    let zf = (z_pos - Math.floor(z_pos));

    //Les parties fractionnaires
    // x, y, z;

    //Comme pour le précédent algorithme, nous séparons parties
    // entière et fractionnaire.

    //Nous récupérons les gradients en chacun des sommets du cube
    // contenant notre point.
    //Nous faisons alors le produit de chacun de ces gradients
    // obtenu en un sommet S par le vecteur issu de S et dirigé
    // vers notre point M(x_pos, y_pos, z_pos).
    //On retrouve facilement ces valeurs
    // en dessinant un schéma de notre cube.
    //Chacune de ces variables (résultat de ce produit scalaire)
    // porte un nom constitué de la lettre 'g' suivie des
    // coordonnées x, y, et z du point du cube dont il est issu.
    let g000 = fast_dot(get_grad(X, Y, Z),xf, yf, zf);
    let g001 = fast_dot(get_grad(X, Y, Z + 1),xf, yf, zf - 1.0);
    
    let g010 = fast_dot(get_grad(X, Y + 1, Z),xf, yf - 1.0, zf);
    let g011 = fast_dot(get_grad(X, Y + 1, Z + 1),xf, yf - 1.0, zf - 1.0);
    
    let g100 = fast_dot(get_grad(X + 1, Y, Z),xf - 1.0, yf, zf);
    let g101 = fast_dot(get_grad(X + 1, Y, Z + 1),xf - 1.0, yf, zf - 1.0);
    
    let g110 = fast_dot(get_grad(X + 1, Y + 1, Z),xf - 1.0, yf - 1.0, zf);
    let g111 = fast_dot(get_grad(X + 1, Y + 1, Z + 1),xf - 1.0, yf - 1.0, zf - 1.0);

    //Comme pour l'interpolation cosinusoïdale, nous calculons
    // le polynôme pour chacune de nos valeurs d'interpolation :
    // u pour l'interpolation le long de l'axe des x
    // v pour l'interpolation le long de l'axe des y
    // w pour l'interpolation le long de l'axe des z
    let u = quintic_poly(xf);
    let v = quintic_poly(yf);
    let w = quintic_poly(zf);
    //console.log(u,v,w);
    //Comme nous l'avons fait avec l'interpolation cubique,
    // nous composerons :
    // l'interpolation le long de l'axe x par
    // l'interpolation le long de l'axe y.

    //Nous interpolons le long de l'axe des x sur chacune
    // des arêtes parallèles à cet axe de notre cube.
    x00 = linear_interpolate(g000 , g100, u);
    x10 = linear_interpolate(g010 , g110, u);
    x01 = linear_interpolate(g001 , g101, u);
    x11 = linear_interpolate(g011 , g111, u);

    //Nous interpolons les arêtes deux à deux parallèles
    // se trouvant sur la même face de notre cube.
    xy0 = linear_interpolate(x00 , x10, v);
    xy1 = linear_interpolate(x01 , x11, v);

    //Enfin, nous interpolons entre les faces inférieures et
    // la face supérieure de notre cube.
    xyz = linear_interpolate(xy0 , xy1, w);
    //console.log(xyz);
    return xyz;
}


function noise_plus(val_x,val_y,val_z,seed){
  	var res = 0.0;
  	var a = ampli;
  	var f = freq;

	for (var o = 0; o < octaves; o++) {
		let n = smooth_noise_3d(val_x*f+seed,val_y*f+seed,val_z*f+seed);
    	t = a * n;
    	res = res + t;
    	a = a * percistance;
    	f = f *lacu;
	}
	geo_lim = (1 - percistance) / (1 - a);
	res = res * geo_lim;
	return Math.min(1,Math.max(0,((res+1.0)*0.5-0.25)*2));
}


/*====================================================
Getteur Setteur
====================================================*/
function noiseSetSeed(s) {
	seed =s;
}
function noiseGet3D(x,y,z){
	let n = noise_plus(x,y,z,seed);
	return n;
}
function noiseGet2D(x,y){
	return noise_plus(x,y,0,seed)
}
function noiseGet1D(x){
	return noise_plus(x,0,0,seed)
}
function MapNoise(noise,min,max) {
	return Math.floor(noise*(max - min) + min);
}

/*====================================================
Objet
====================================================*/

let ClassNoise = class {
	constructor(p,s=seed){
		this.pos = p;
		this.seed = seed;
		if (p.dim>2) {
			this.val = noiseGet3D(p.x,p.y,p.z);
		} else {
			this.val = noiseGet3D(p.x,p.y,0);
		}

		this.freq = freq;  //precision
		this.ampli = ampli; //hauteur

		this.percistance = percistance; //diminu l'impacte de l'ampli
		this.lacu = lacu; //augmente la precision sur les octaves d'après

		this.octaves = octaves; //nb de generation de bruit

		this.vect = null;
	}
	update(p){
		this.pos = p;
		this.SET();
		if (this.pos.dim>2) {
			this.val = noiseGet3D(this.pos.x,this.pos.y,this.pos.z);
		} else {
			this.val = noiseGet3D(this.pos.x,this.pos.y,0);
		}
		return this.val;

	}
	SET(){
		freq = this.freq;  //precision
		ampli = this.ampli; //hauteur

		percistance = this.percistance; //diminu l'impacte de l'ampli
		lacu = this.lacu; //augmente la precision sur les octaves d'après

		octaves = this.octaves; //nb de generation de bruit

	}

	get(p){
		this.SET();
		if (p.dim>2) {
			return noiseGet3D(p.x,p.y,p.z);
		} else {
			return noiseGet3D(p.x,p.y,0);
		}
	}
	setVecteur(v){
		this.vect=v;
	}
	suiv(){
		if (this.vect == null) {
			return this.val;
		} else {
			this.SET();

			this.pos.addVecteur(this.vect);
			if (this.pos.dim>2) {
				this.val = noiseGet3D(this.pos.x,this.pos.y,this.pos.z);
			} else {
				this.val = noiseGet3D(this.pos.x,this.pos.y,0);
			}
			return this.val;

		}
	}
	map(m,M){
		return MapNoise(this.val,m,M);
	}
}

module.exports = {
	//contantes
	SetFreq : function (f) {freq = f;},
	SetAmpli : function (a) {ampli = a;},
	SetPercistance : function (p) {percistance = p;},
	SetLacuratie : function (l) {lacu = l;},
	SetOctaves : function (o) {octaves = o;},

	GetFreq : function () {return freq;},
	GetAmpli : function () {return ampli;},
	GetPercistance : function () {return percistance;},
	GetLacuratie : function () {return lacu;},
	GetOctaves : function () {return octaves;},

	SetSeed : noiseSetSeed,

	//Gen Noise
	Gen1D : noiseGet1D,
	Gen2D : noiseGet2D,
	Gen3D : noiseGet3D,

	//Function
	map : MapNoise,


	//test
	test : function (Perlin){
		Perlin.SetSeed(192);
		let alpha = '.-+=$#@';
		let decal = 100;
		for (var i = 0; i < 20; i++) {
			let ligne = [];
			for (var j = 0; j < 100; j++) {
				let noise = Perlin.Gen2D(i*decal,j*decal);
				let id = Perlin.map(noise,0,alpha.length-1);
				let car = alpha[id];
				ligne.push(car);
			}
			ligne = ligne.join("");
			console.log(ligne);		
		}	
	},

	testChaire:function(Perlin,Gif,Draw,FU){
		let w = 32;
		let h = w;
		let nb = 100;
		let c = 25;
		let gif = Gif.init("res/Chair.gif",w*c,h*c,100);
		let zoom = 10;

		let Cmin = [199, 44, 72];
		let Cmax = [253, 108, 158];
		let time = Date.now();

		console.log("Demarage de l'assention !");
		for (var n = 0; n < nb; n++) {
			let env = Draw.init(w*c,h*c);

			for (var i = 0; i < w; i++) {
				for (var j = 0; j < h; j++) {
					let noise = (Perlin.Gen3D(i*zoom,j*zoom,n*zoom));


					let color = [255,255,255];
					if (Perlin.map(noise,0,100)<20) {
						let n;
						n = Perlin.map(noise,0,100)/20;

						color = [Perlin.map(n,200,255),Perlin.map(n,200,255),Perlin.map(n,200,255)];
					}else if (Perlin.map(noise,0,100)<60) {
						color = [Perlin.map(noise,Cmin[0],Cmax[0]),Perlin.map(noise,Cmin[1],Cmax[1]),Perlin.map(noise,Cmin[2],Cmax[2])];
					}else{
						let n = (Perlin.map(noise,0,100)-60)/40;
						color = [Perlin.map(noise,100,200),0,0];
					}

					
					Draw.recFill(env,i*c,j*c,c,c,color);
				}
			}
			Gif.save(gif,env);
			time = FU.BarAvancer(n,nb,time);
		}
		console.log("Demarage de la chute !");
		for (var n = nb-1; n >= 0 ; n--) {
			let env = Draw.init(w*c,h*c);

			for (var i = 0; i < w; i++) {
				for (var j = 0; j < h; j++) {
					let noise = (Perlin.Gen3D(i*zoom,j*zoom,n*zoom));


					let color = [255,255,255];
					if (Perlin.map(noise,0,100)<20) {
						let n;
						n = Perlin.map(noise,0,100)/20;

						color = [Perlin.map(n,200,255),Perlin.map(n,200,255),Perlin.map(n,200,255)];
					}else if (Perlin.map(noise,0,100)<60) {
						color = [Perlin.map(noise,Cmin[0],Cmax[0]),Perlin.map(noise,Cmin[1],Cmax[1]),Perlin.map(noise,Cmin[2],Cmax[2])];
					}else{
						let n = (Perlin.map(noise,0,100)-60)/40;
						color = [Perlin.map(noise,100,200),0,0];
					}

					
					Draw.recFill(env,i*c,j*c,c,c,color);
				}
			}
			Gif.save(gif,env);
			time = FU.BarAvancer(nb+nb-n-1,nb*2,time);
		}
		Gif.end(gif);
		console.log("fin");
	},

	main : function () {
		for (var i = 0; i < 10; i++) {
			console.log(randNoise(i));
			
		}
	}
}