/*####################################################
Function Utiles
####################################################*/

function dist(x1,y1,x2,y2) {
	let a = Math.pow((x1-x2),2);
	let b = Math.pow((y1 - y2),2);
	return Math.sqrt((a + b));
}
function distInt(x1,y1,x2,y2){
	return Math.floor(dist(x1,y1,x2,y2));
}

function randint(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}

function progressionBar(posAct,posMax,timeFlash) {
	let tempsFrame = Date.now() - timeFlash;
	let tempsRestant = Math.floor((tempsFrame * posMax - tempsFrame*posAct) / 1000);
	let msg = (posAct+1) +" / "+ posMax + "[";
	let nbtrait = 30;
	for (var t = 0; t < nbtrait; t++) {
		if(t <= posAct*nbtrait/posMax){
			if (t+1 <= posAct*nbtrait/posMax) {
				msg = msg + "-";
			} else {
				if (posAct%2 == 0) {
					msg = msg + "C";
				} else {
					msg = msg + "c";
				}
			}
			
		}else{
			msg = msg + ".";
		}
	}
	let points = ". ";
	for (var i = 0; i < posAct%3; i++) {
		points = points + ". ";
	}
	console.log(msg + "] "+Math.round(posAct*100/posMax)+" % : Temps restant : "+ Math.floor(tempsRestant/60) +" min "+ tempsRestant%60 +" s "+points);
	timeFlash = Date.now();
	return timeFlash;
}

function setChono() {
	return Date.now();
}
function readTime(chrono,type = "ms") {
	let t = Date.now() - chrono;

	if (type == "ms") {
		return Math.round(t);
	}else{
		t = t / 1000;
		if (type == "s") {
			return Math.round(t);
		}else{
			t = t / 60;
			if (type == "min") {
				return Math.round(t);
			}else{
				t = t / 60;
				if (type == "h") {
					return Math.round(t);
				}else{
					t = t / 24;
					if (type == "j") {
						return Math.round(t);
					}else{
						return -1;
					}
				}
			}
		}
	}
}

function msToHoraie(ms) {
	
	let s = Math.floor(ms / 1000);
	ms = ms %1000;
	let min = Math.floor(s/60);
	s = s%60;
	let h = Math.floor(min/60);
	min = min%60;
	let j = Math.floor(h/24);
	h = h%24;
	let time = [j,h,min,s,ms];
	return time;
}
function HoraireToMs(time) {
	return (((time[0]*24+time[1])*60+time[2])*60+time[3])*1000+time[4];
}
function newHoraire(ms,s=0,min=0,h=0,j=0) {
	return msToHoraie(HoraireToMs([j,h,min,s,ms]));
}
function affHoraire(time) {
	if (typeof time == "number") {
		time = msToHoraie(time);
	}
	let txt = [" J, "," H "," min "," s et "," ms."];
	let res  = "";
	for (var i = 0; i < time.length; i++) {
		res = res + time[i] + txt[i];
	}
	return res;
}

function TimeAdd(t1,t2) {
	return msToHoraie(HoraireToMs(t1)+HoraireToMs(t2))
}
function TimeSub(t1,t2) {
	return msToHoraie(HoraireToMs(t1)-HoraireToMs(t2))
}

function contient(ls,mot,getel){
	let res = [];
	for (var i = 0; i < ls.length; i++) {
		if (getel(ls[i]).toLowerCase().includes(mot)) {
			res.push(ls[i]);
		}
	}
	return res;
}
function sommeAsset(ls,tab,getel){
	let res = [];
	for(var i = 0; i < ls.length; i++){
		let cpt = 0;
		for (let j = 0; j < tab.length; j++) {
			for (let k = 0; k < tab[j].length; k++) {
				if (getel(ls[i]).toLowerCase().includes(getel(tab[j][k]).toLowerCase())) {
					cpt++;
				}
			}
		}
			
		res.push([ls[i],cpt]);
	}
	return res;
}
function plusProche(ls,recherche, getel){
	let mots = recherche.toLowerCase().split(" ");
	let raw = [];
	for (var i = 0; i < mots.length; i++) {
		raw.push(contient(ls,mots[i],getel));
	}
	let rawPondere = sommeAsset(ls,raw,getel);
	
	rawPondere.sort((a,b)=>{
		return b[1]-a[1];
	});
	let res =[]
	for (var i = 0; i < rawPondere.length; i++) {
		if (rawPondere[i][1] > 0) {
			res.push(rawPondere[i][0]);
		}
		
	}
	return res;
}


function rechercheAsset(ls,recherche,getel){
	return plusProche(ls,recherche,getel)
}

module.exports = {
	distance : dist,
	distanceInt : distInt,
	randInt : randint,
	BarAvancer : progressionBar,
	setChono : setChono,
	readTime : readTime,
	msToHoraie : msToHoraie,
	HoraireToMs : HoraireToMs,
	newHoraire : newHoraire,
	affHoraire : affHoraire,
	TimeAdd : TimeAdd,
	TimeSub : TimeSub,
	rechercheAsset : rechercheAsset,
	test : function (FU) {
		let ch = FU.setChono();
		let x1 = 0;
		let y1 = -5;

		let x2 = 23;
		let y2 = 9;

		

		let flash = Date.now();
		for (var i = 0; i <= 100; i++) {
			FU.BarAvancer(i,100,flash);
		}

		console.log("INT : ");
		console.log(FU.distanceInt(x1,y1,x2,y2));
		console.log("FLOAT : ");
		console.log(FU.distance(x1,y1,x2,y2));
		console.log("randInt [-10;10] : ");
		console.log(FU.randInt(-10,10));

		console.log("Temps en ms :");
		console.log(FU.readTime(ch));
		console.log("Temps en s :");
		console.log(FU.readTime(ch,"s"));

		console.log("Temps en err :");
		console.log(FU.readTime(ch,"uzefuzefhu"));

		let ms = 238787;

		console.log("ms -> horaire");
		let time = FU.msToHoraie(ms);
		console.log(time);	
		console.log(FU.HoraireToMs(time)==ms);
		console.log(FU.affHoraire(time));

		console.log("Horaire 1");
		let time1 = FU.newHoraire(ms);
		console.log(FU.affHoraire(time1));
		console.log(FU.affHoraire(ms));

		console.log("Horaire 1");
		let time2 = FU.newHoraire(133,10,9,20);
		console.log(FU.affHoraire(time2));
		console.log(FU.affHoraire(FU.TimeAdd(time2,FU.newHoraire(0,0,0,0,4))));
		console.log(FU.affHoraire(FU.TimeSub(time2,FU.newHoraire(0,0,0,20))));

	}
}