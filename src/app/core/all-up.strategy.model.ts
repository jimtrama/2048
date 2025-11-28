import { Board, DIRECTION } from "./board.model";
import { CONSTANTS } from "./constants";
import { Strategy } from "./strategy.model";

export class AllUpStartagy extends Strategy {
    public override killed: boolean = false;
    public override move(frame: number[],prevMove:DIRECTION): DIRECTION {
    
      
      const up = Board.checkIfLeagalMove(frame,CONSTANTS.UP);
      if(up&&prevMove!=CONSTANTS.LEFT)return CONSTANTS.UP;
      
      const left = Board.checkIfLeagalMove(frame,CONSTANTS.LEFT);
      if(left) return CONSTANTS.LEFT;
      
      const right = Board.checkIfLeagalMove(frame,CONSTANTS.RIGHT);
      if(right) return CONSTANTS.RIGHT;
      
      const down = Board.checkIfLeagalMove(frame,CONSTANTS.DOWN);
      if(down) return CONSTANTS.DOWN;
      

      return CONSTANTS.UP;
      
    }
  }