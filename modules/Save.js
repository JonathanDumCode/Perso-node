/*####################################################
Save
####################################################*/


/*####################################################
Gestion de Fichier 
####################################################*/
const fs = require('fs');

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


module.exports = {
	PNG : savePNG,
	TXT : saveTXT,
	getDirectories : getDirectories,
	getFiles : getFiles
}