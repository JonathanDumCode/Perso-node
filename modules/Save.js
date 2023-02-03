/*####################################################
Save
####################################################*/


/*####################################################
Gestion de Fichier 
####################################################*/
const fs = require('fs');
const http = require('http'); // or 'https' for https:// URLs
const https = require('https'); // or 'https' for https:// URLs


function savePNG(env,path) {
	let canvas = env[1];
	const buffer = canvas.toBuffer('image/png');
	fs.writeFileSync(path, buffer);
}

function saveTXT(txt,path) {
	fs.writeFile(path, txt,function (err) {
		if (err) return console.log(err);
	});
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}
function getFiles(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory() == false;
  });
}

function download(url, dest) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(dest, { flags: "wx" });

		const request = http.get(url, response => {
			if (response.statusCode === 200) {
				response.pipe(file);
			} else {
				file.close();
				fs.unlink(dest, () => {}); // Delete temp file
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
			}
		});

		request.on("error", err => {
			file.close();
			fs.unlink(dest, () => {}); // Delete temp file
			reject(err.message);
		});

		file.on("finish", () => {
			resolve();
		});

		file.on("error", err => {
			file.close();

			if (err.code === "EEXIST") {
				reject("File already exists");
			} else {
				fs.unlink(dest, () => {}); // Delete temp file
				reject(err.message);
			}
		});
	});
}
function downloadS(url, dest) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(dest, { flags: "wx" });

		const request = https.get(url, response => {
			if (response.statusCode === 200) {
				response.pipe(file);
			} else {
				file.close();
				fs.unlink(dest, () => {}); // Delete temp file
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
			}
		});

		request.on("error", err => {
			file.close();
			fs.unlink(dest, () => {}); // Delete temp file
			reject(err.message);
		});

		file.on("finish", () => {
			resolve();
		});

		file.on("error", err => {
			file.close();

			if (err.code === "EEXIST") {
				reject("File already exists");
			} else {
				fs.unlink(dest, () => {}); // Delete temp file
				reject(err.message);
			}
		});
	});
}


module.exports = {
	PNG : savePNG,
	TXT : saveTXT,
	getDirectories : getDirectories,
	download : download,
	downloadS : downloadS,
	getFiles : getFiles
}