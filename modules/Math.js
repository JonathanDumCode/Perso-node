
const M = require('./MathBase.js');
const G2D = require('./geometry2D.js');
const G3D = require('./geometry3D.js');


module.exports = {

	M : M,
	G2D : G2D,
	G3D : G3D,
	test : function (Mlib){
		console.log("======================== Math");
		Mlib.M.test(M);
		console.log("======================== G2D");
		Mlib.G2D.test(G2D);
		console.log("======================== G3D");

	}
}