/*====================================================
Map
====================================================*/

function GenMapData(w,h,ep,Hmin,Hmax,Tmin,Tmax,Emin,Emax) {
	return [
	[w,h,ep],
	[randint(0,10**6),randint(0,10**6),randint(0,10**6)],
	[[Hmin,Hmax],[Tmin,Tmax],[Emin,Emax]]
	];
}
function GenMapElTest(x,y,data) {
	let SeedH = data[1][0];
	let Hdata = data[2][0];
	let SeedT = data[1][1];
	let Tdata = data[2][1];
	let SeedE = data[1][2];
	let Edata = data[2][2];


	noiseSetSeed(SeedH);
	let valH = MergeNoise(noiseGet2D(x,y) ,Hdata[0],Hdata[1]);
	/*noiseSetSeed(SeedT);
	let valT = MergeNoise(noiseGet2D(x,y) ,Tdata[0],Tdata[1]);
	noiseSetSeed(SeedE);
	let valE = MergeNoise(noiseGet2D(x,y) ,Edata[0],Edata[1]);*/

	let pixel = [0,0,0];

	valH = Math.floor(valH * 10 / 255);
	if(valH <0){
		valH = 0;
	}
	if(valH > 9){
		valH = 9;
	}

	let Biome = [
	[255,255,255],
	[192,192,192],
	[85,107,47],
	[50,205,50],
	[154,205,50],
	[255,215,0],
	[0,191,255],
	[0,191,255],
	[30,144,255],
	[65,105,225],
	[0,0,0]
	]
	

	

	
	return Biome[valH];


}
function GenMapEl(x,y,data) {
	let SeedH = data[1][0];
	let Hdata = data[2][0];
	let SeedT = data[1][1];
	let Tdata = data[2][1];
	let SeedE = data[1][2];
	let Edata = data[2][2];


	noiseSetSeed(SeedH);
	let valH = MergeNoise(noiseGet2D(x,y) ,Hdata[0],Hdata[1]);
	noiseSetSeed(SeedT);
	let valT = MergeNoise(noiseGet2D(x,y) ,Tdata[0],Tdata[1]);
	noiseSetSeed(SeedE);
	let valE = MergeNoise(noiseGet2D(x,y) ,Edata[0],Edata[1]);

	let pixel = [0,0,0];


	if (valH >230) {//Très Haut

		if (valT > 200) {//volcan
			pixel = [255,0,0];
		} else {
			pixel = [255,255,255];
		}
		


	} else if (valH >200) {//Haut

		if (valT > 150) {//messa
			pixel = [160,82,45];
		} else {
			pixel = [255-valH,255-valH,255-valH];
		}
		


	} else if (valH >100) {//Moyen


		if (valH < 120) {//plage
			pixel = [valH,valH,0];

		} else if (valE > 125){//foret
			if (valT >125) { // Tropical
				pixel = [0,255-valH + 50,0];
			} else {// classique
				pixel = [0,255-valH,0];
			}
			
		} else if (valE > 40){//arride
			if (valT >125) { // messa
				pixel = [160,82,45];
			} else {// Savane
				pixel = [0,255-valH,0];
			}
		} else if (valE > 10){//Tres arride (desert)
			pixel = [255,215,0];

		}else {
			pixel = [154,205,50];
		}
		

	} else if (valH >11) {//Bas


		if (valE >50) {//ocean
			pixel = [0,0,valH*2];
		} else {
			if (valT < 100) {
				pixel = [176,224,230];
			} else {
				pixel = [125,125,125];
			}
			

		}


	} else {//Très Bas

		if (valE > 0) {//ocean
			pixel = [0,0,valH*2];
		} else if (valT > 200){//lave
			pixel = [255-valH,0,0];
		} else {//reste
			pixel = [125,125,125];
		}
	}

	
	return pixel;


}
function GenMap(x,y,data){
	let w = data[0][0];
	let h = data[0][1];
	console.log("Pre-Generation de la Map : ")

	let res = [];
	for (var i = 0; i < h; i++) {
		let ligne = [];
		for (var j = 0; j < w;j++){
			//ligne.push(GenMapEl(x+j,y+i,data));
			ligne.push(GenMapElTest(x+j,y+i,data));
		}
		timeFlash = progressionBar(i,h,timeFlash);
		res.push(ligne);
	}
	console.log("Fin !")
	return [data,res];
}

function saveMap(data,path) {

	let map = data[1];
	let w = data[0][0][0];
	let h = data[0][0][1];
	let ep = data[0][0][2];

	let width = w*ep;
	let height = h*ep;

	let env = setEnv(width,height);

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			rectangleF(env[0],j*ep,i*ep,ep,ep,map[i][j]);
		}
	}

	savePNG(env[1],path);

}
function mapGifSave(data,encoder) {

	let map = data[1];
	let w = data[0][0][0];
	let h = data[0][0][1];
	let ep = data[0][0][2];

	let width = w*ep;
	let height = h*ep;

	let env = setEnv(width,height);

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			rectangleF(env[0],j*ep,i*ep,ep,ep,map[i][j]);
		}
	}

	
	encoder.addFrame(env[0]);
}

function mapGifSaveEchantillon(map,encoder,x,y,w,h,ep) {
	map = map[1];

	let width = w*ep;
	let height = h*ep;

	/*console.log(w,h);
	console.log(x,y);
	console.log(map[0].length,map.length);*/

	let env = setEnv(width,height);

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			//console.log(map[y+i][x+j]);
			rectangleF(env[0],j*ep,i*ep,ep,ep,map[y+i][x+j]);
		}
	}

	
	encoder.addFrame(env[0]);
}

function mapGifSaveEchantillonAvecSlime(map,encoder,x,y,w,h,ep,slimes,n) {
	map = map[1];

	let width = w*ep;
	let height = h*ep;

	/*console.log(w,h);
	console.log(x,y);
	console.log(map[0].length,map.length);*/

	let env = setEnv(width,height);

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			//console.log(map[y+i][x+j]);
			rectangleF(env[0],j*ep,i*ep,ep,ep,map[y+i][x+j]);
		}
	}
	for (var i = 0; i < slimes.length; i++) {
		let slime = slimes[i];
		if (SlimeIn(slime,x,x+width- minAbsW,y,y+height- minAbsH)) {
			//affSlime(env[0],slime,n,0-x,0-y);
		}
		affSlime(env[0],slime,n,0-x*speed,0-y*speed);
	}

	
	encoder.addFrame(env[0]);
}
