
/*====================================================
Slime
====================================================*/
function SlimeIn(slime,Xmin,Xmax,Ymin,Ymax) {
	let x = slime[1] ;
	let y =  slime[2];
	let x2 = Xmax;
	let y2 = Ymax;
	let r = distInt(x2,y2,Xmin,Ymin);

	return distInt(x,y,x2,y2) < (r+100);
}
function genSlime(Xmin,Xmax,Ymin,Ymax,Smin,Smax) {
	let slime = [];
	slime.push(randint(0,10**6));//seed Base

	slime.push(randint(Xmin,Xmax));//X
	slime.push(randint(Ymin,Ymax));//Y
	slime.push(randint(Smin,Smax)/10);//Scale

	slime.push(randint(0,10**6));//oeil G
	slime.push(randint(0,10**6));//oeil D

	slime.push(randint(10,100));//speed
	slime.push(randint(0,10**6));//r
	slime.push(randint(0,10**6));//g
	slime.push(randint(0,10**6));//b

	slime.push(randint(0,10**6));//absX
	slime.push(randint(0,10**6));//absY

	slime.push(randint(0,10**6));//ID
	return slime;
}

function affSlime(ctx,slime,n,xsuper,ysuper) {

	noiseSetSeed(slime[7]);
	let r = Math.floor(noiseGet2D(n,n)*255);
	noiseSetSeed(slime[8]);
	let g = Math.floor(noiseGet2D(n,n)*10);
	noiseSetSeed(slime[9]);
	let b = Math.floor(noiseGet2D(n,n)*255);
	let c = [r,g,b];
	
	let SeedM = slime[0] ;
	let x = slime[1] ;
	let y =  slime[2] ;
	let dx =  x + xsuper;
	let dy =  y + ysuper;
	let seedOG = slime[4] ;
	let seedOD = slime[5] ;
	let scale = slime[3] ;
	//let scale = 10;
	noiseSetSeed(seedOD);
	let oD = Math.floor(noiseGet2D(x*scale,y*scale)*360);
	noiseSetSeed(seedOG);
	let oG = Math.floor(noiseGet2D(x*scale,y*scale)*360);
	noiseSetSeed(SeedM);
	let nbPent = 36;
	ctx.fillStyle = "rgb("+c[0]+","+c[1]+","+c[2]+")";
	ctx.strokeStyle = "rgba(255,255,255,1)";
	ctx.beginPath();
	var vX = Math.cos(0);
	var vY = Math.sin(0);
	let rayon = Math.floor(noiseGet2D(x+vX*scale,y+vY*scale)*40*scale);
	ctx.moveTo(vX*rayon+dx, vY*rayon+dy);

	for (var i = 0; i < nbPent; i++) {
		vX = Math.cos(i*(360/nbPent)*(Math.PI)/180);
		vY = Math.sin(i*(360/nbPent)*(Math.PI)/180);
		rayon = Math.floor(noiseGet2D(x+vX*scale,y+vY*scale)*40*scale);
		ctx.lineTo(vX*rayon+dx, vY*rayon+dy);
	}
	vX = Math.cos(0);
	vY = Math.sin(0);
	rayon = Math.floor(noiseGet2D(x+vX*scale,y+vY*scale)*40*scale);
	ctx.lineTo(vX*rayon+dx, vY*rayon+dy);

	ctx.fill();
	ctx.save();
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.restore();
	ctx.fillStyle = "rgb(255,255,255)";
	
	vX = Math.cos(((1*(360/3)+oD)%360)*(Math.PI)/180);
	vY = Math.sin(((1*(360/3)+oD)%360)*(Math.PI)/180);
	vXP = Math.cos(((3*(360/3)+oG)%360)*(Math.PI)/180);
	vYP = Math.sin(((3*(360/3)+oG)%360)*(Math.PI)/180);
	rayonP = Math.floor(noiseGet2D(x+vX+vXP*scale,y+vY+vYP*scale)*4*scale);
	rayon = Math.floor(noiseGet2D(x+vX*scale,y+vY*scale)*10*scale);

	cercleF(ctx,vX*rayon+dx, vY*rayon+dy,rayon,[255,255,255]);
	cercleS(ctx,vX*rayon+dx, vY*rayon+dy,rayon,[0,0,0]);
	cercleF(ctx,vX*rayon+dx+vXP*rayonP, vY*rayon+dy+vYP*rayonP,rayonP,[0,0,0]);

	vX = Math.cos(((2*(360/3)+oG)%360)*(Math.PI)/180);
	vY = Math.sin(((2*(360/3)+oG)%360)*(Math.PI)/180);
	vXP = Math.cos(((3*(360/3)+oD)%360)*(Math.PI)/180);
	vYP = Math.sin(((3*(360/3)+oD)%360)*(Math.PI)/180);
	rayonP = Math.floor(noiseGet2D(x+vX+vXP*scale,y+vY+vYP*scale)*4*scale)
	rayon = Math.floor(noiseGet2D(x+vX*scale,y+vY*scale)*10*scale);
	cercleF(ctx,vX*rayon+dx, vY*rayon+dy,rayon,[255,255,255]);
	cercleS(ctx,vX*rayon+dx, vY*rayon+dy,rayon,[0,0,0]);
	cercleF(ctx,vX*rayon+dx+vXP*rayonP, vY*rayon+dy+vYP*rayonP,rayonP,[0,0,0]);
	
	
	
}
function moveSlime(slime,Xmin,Xmax,Ymin,Ymax,n) {
	let x = slime[1];
	let y = slime[2];
	let absx = slime[10];
	let absy = slime[11];
	let i = slime[12];

	let speed = slime[6];
	x = Math.floor(noiseGet2D(i,absx + n)*(Xmax-Xmin) + Xmin);
	y = Math.floor(noiseGet2D(i,absy + n)*(Ymax-Ymin) + Ymin);



	slime[1] = x;
	slime[2] = y;
	return slime;
}

function getSlimeRayon(slime){
	let scale = slime[3] ;
	return 40*scale;	
}

function mergeSlimes(slimes) {
	let ls = [];
	if (slimes.length == 0) {
		return ls;
	} else {
		let slime = slimes[0];
		for (var i = 1; i < slimes.length; i++) {

			if (dist(slime[1],slime[2],slimes[i][1],slimes[i][2]) < (getSlimeRayon(slime)+getSlimeRayon(slimes[i]))) {
				//let surface = slime[3]**2*Math.PI*2 + slimes[i][3]**2*Math.PI*2;
				//slime[3] = (surface/(2*Math.PI))**0.5*0.8;
				slime[3] = slime[3] +1;
				//console.log("merge !");
			}else{
				ls.push(slimes[i]);
			}
		}
		ls = mergeSlimes(ls);
		ls.push(slime);
		return ls;
	}
}