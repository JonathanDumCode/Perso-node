function lissageVal(x){
	return 1 / (1 + Math.exp(-1*x))
}
class Node {
	constructor(inputSize) {
	  this.bias = Math.random();
	  this.output = this.bias;

	  this.weights = [];
	  for (let i = 0; i < inputSize; i++) {
		this.weights.push(Math.random())	
	  }
	  
	}
	activate(inputs) {
	  let output = this.bias;
	  
	  for (let i = 0; i < inputs.length; i++) {
		output = output + inputs[i] * this.weights[i]
	  }

	  this.output = lissageVal(output);

	  //console.log(this.bias,output,this.output)
	  return this.output;
	}
	adjustWeights(error, inputs, learningRate) {

	  for (let i = 0; i < this.weights.length; i++) {
		this.weights[i] = this.weights[i] - (inputs[i] * error * learningRate);
	  }

	  this.bias = this.bias - (error * learningRate);
	}
  }
  
  class Layer {
	constructor(size, inputSize) {
		this.nodes = []
		for (let i = 0; i < size; i++) {
			this.nodes.push(new Node(inputSize));
		}
		
	}
	activate(inputs) {
		let res = [];
		for (let i = 0; i < this.nodes.length; i++) {
			res.push(this.nodes[i].activate(inputs))
		}
		return res;
	}
	adjustWeights(errors, inputs, learningRate) {
		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].adjustWeights(errors[i], inputs, learningRate)	
		}
	}
  }


  class Network {
	constructor(inputSize, hiddenSizes, outputSize, learningRate) {
	  this.inputSize = inputSize;

	  this.hiddenLayers = [];
	  for (let i = 0; i < hiddenSizes.length; i++) {
		if(i == 0){
			this.hiddenLayers.push(new Layer(hiddenSizes[i], inputSize))
		}else{
			this.hiddenLayers.push(new Layer(hiddenSizes[i], hiddenSizes[i-1]))
		}
	  }

	  this.outputLayer = new Layer(outputSize, hiddenSizes[hiddenSizes.length - 1]);
	  this.learningRate = learningRate;
	}
  
	predict(inputs) {
		let layerInputs = inputs;

		for (let i = 0; i < this.hiddenLayers.length; i++) {
			layerInputs = this.hiddenLayers[i].activate(layerInputs)
		
		}

		return this.outputLayer.activate(layerInputs);
	}
  
	train(inputs, labels) {
		let layerInputs = inputs;

		this.hiddenLayers.forEach((layer) => { });
		for (let i = 0; i < array.length; i++) {
			layerInputs = this.hiddenLayers[i].activate(layerInputs)
		
		}
	  	const output = this.outputLayer.activate(layerInputs);
  
		let outputErrors = [];
	  	for (let i = 0; i < labels.length; i++) {
			outputErrors.push(output[i]-labels[i])
		
	  	}
		this.outputLayer.adjustWeights(outputErrors, layerInputs, this.learningRate);
  
	  	let hiddenErrors = [];
	  	for (let i = this.hiddenLayers.length - 1; i >= 0; i--) {
			let errors = [];
			for (let j = 0; j < this.hiddenLayers[i].nodes.length; j++) {
				let error = 1;
				errors.push(error);
				
			}

		
	  	}

		//   .map((_, j) =>
		// 	outputErrors.reduce(
		// 	  (sum, error, k) => sum + error * this.outputLayer.nodes[k].weights[j],
		// 	  0
		// 	)
		//   );
		// 	this.hiddenLayers[i].adjustWeights(hiddenErrors[i], layerInputs, this.learningRate);
		// 	layerInputs = this.hiddenLayers[i].nodes.map((node) => node.output);
	}
  }

  // Create a new network with 2 inputs, 2 hidden layers with 2 nodes each and 1 output
const network = new Network(2, [2, 2], 1, 0.1);

// Define a training set with input and expected output examples
const trainingSet = [
  { inputs: [0, 0], label: 0 },
  { inputs: [0, 1], label: 1 },
  { inputs: [1, 0], label: 1 },
  { inputs: [1, 1], label: 0 }
];

// Train the network on the training set
for (let i = 0; i < 0; i++) {
  trainingSet.forEach(({ inputs, label }) => network.train(inputs, [label]));
}

//Test the network on new inputs
console.log(network.predict([0, 0])); // Should output something close to 0
console.log(network.predict([0, 1])); // Should output something close to 1
console.log(network.predict([1, 0])); // Should output something close to 1
console.log(network.predict([1, 1])); // Should output something close to 0



const tf = require('@tensorflow/tfjs-node');

// Définir les données d'entraînement
const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
const ys = tf.tensor1d([0, 1, 1, 0]);

// Définir le modèle
const model = tf.sequential();
model.add(tf.layers.dense({ units: 5, inputShape: [2] }));
model.add(tf.layers.dense({ units: 1, inputShape: [5] }));

// Compiler le modèle
model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

// Entraîner le modèle
async function test(){
	for (let i = 0; i < 10000; i++) {
		await model.fit(xs, ys,{epochs:10});
		
	}
	


	model.predict(tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]])).print();
}



test()