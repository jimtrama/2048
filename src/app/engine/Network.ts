
export class Network {
  public levels;

  constructor(neuronCounts:number[]) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }
  static feedForward(givenInputs:number[], network: Network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i],i == network.levels.length - 1);
    }
    return outputs;
  }
  static mutate(network: Network, amount = 1) {
    console.log(amount);
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = lerp(
            level.weights[i][j],
            Math.random() * 2 - 1,
            amount
          );
        }
      }
    });
  }
}

function lerp(A: number, B: number, t: number) {
  return A + (B - A) * t;
}

class Level {
  public inputs;
  public outputs;
  public biases;
  public weights;

  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);
    this.weights = [];
    for (let i = 0; i < inputCount; i++) {
      //this.weights.push( new Array(outputCount));
      this.weights[i] = new Array(outputCount);
    }
    Level.#randomize(this);
  }

  static #randomize(level: Level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
      level.biases[i] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInput:any[], level: Level,isLast = false):any[] {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = Level.sig(givenInput[i]);
    }
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      if(isLast){
        if (sum > level.biases[i]) {
          level.outputs[i] = 1 ;
        } else {
          level.outputs[i] = 0;
        }
      }else{
        if (sum > level.biases[i]) {
          level.outputs[i] = level.inputs[i] * 2 ;
        } else {
          level.outputs[i] = level.inputs[i];
        }
      }
      
    }
    return level.outputs;
  }

  static sig(x:number){
    return 1 / (1 + Math.exp(-x)) 
  }
}
