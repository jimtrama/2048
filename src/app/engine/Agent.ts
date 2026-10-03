import { Network } from './Network';
import { DIRECTION } from '../core/board.model';
import { CONSTANTS } from '../core/constants';
import { Strategy } from '../core/strategy.model';

export class Agent extends Strategy{
  public brain: Network;
  public override killed: boolean = false;

  constructor() {
    super();
    
    if(localStorage.getItem("brain") != null){
      this.brain = JSON.parse(localStorage.getItem("brain") as string) as Network
      Network.mutate(this.brain,0.5);
    }else{
      this.brain = new Network([16, 8, 8, 4]);
    }
  }


  move(board: number[]): DIRECTION {
    this.checkToKill(board);
    this.lastSnap = board;
    const result = Network.feedForward(board, this.brain);
    let max = -1;
    let maxI = -1;
    for (let i = 0; i < result.length; i++) {
      if (max < result[i]) {
        max = result[i];
        maxI = i;
      }
    }

    if (maxI === 0) return CONSTANTS.UP;
    if (maxI === 1) return CONSTANTS.LEFT;
    if (maxI === 2) return CONSTANTS.DOWN;
    if (maxI === 3) return CONSTANTS.RIGHT;
    return null;
  }

  finished(score:number){
    const best_score = +(localStorage.getItem("score") ?? 0);
    if(score > best_score || localStorage.getItem("brain") === null){
      localStorage.setItem("brain",JSON.stringify(this.brain));
      localStorage.setItem("score",score+"");
    }
  }

  private lastSnap:number[] = [];
  private samesCpunt = 0 ;
  
  private checkToKill(frame:number[]){
    if(this.areFramesSame(frame)){
      this.samesCpunt++;
      if(this.samesCpunt == 1){
        this.killed = true;
      }
      
    }
  }

  private areFramesSame(frame:number[]):boolean{
    for(const el of this.lastSnap){
      for(const elm of frame){
        if(el !== elm){
          return false;
        }    
      }
    }
    if(this.lastSnap.length != frame.length){
      return false;
    }
    return true;
  }
}
