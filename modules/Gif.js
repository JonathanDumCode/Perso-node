/*####################################################
Gif
####################################################*/

const GIFEncoder = require('gifencoder');
const fs = require('fs');

function init(Path,width,height,ms,q=10) {
	const encoder = new GIFEncoder(width,height);
	encoder.createReadStream().pipe(fs.createWriteStream(Path));
	encoder.start();
	encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
	encoder.setDelay(ms);  // frame delay in ms
	encoder.setQuality(q); // image quality. 10 is default.
	return encoder
}

function save(encoder,env) {
	encoder.addFrame(env[0]);
	return encoder;
}
function end(encoder){
	encoder.finish();
}

module.exports = {
	init : init,
	save : save,
	end : end
}