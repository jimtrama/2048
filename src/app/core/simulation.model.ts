import { Board } from "./board.model";
import { Engine } from "./engine.model"
import { Strategy } from "./strategy.model";

export type SimulationConfig = {
    runs:number,
    engine:Engine,
    callback?:(score:number)=>void
}

export class Simulation{
    
    run(config:SimulationConfig):number[]{
        const results:number[] = [];
        for(let i = 0 ; i < config.runs;i++){
            const score = config.engine.runInstant();
            results.push(score);
            if(!!config.callback){
                config.callback(score);
            }
        }
        return results;
    } 
}