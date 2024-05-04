import { Board, DIRECTION } from "./board.model";
import { CONSTANTS } from "./constants";
import { Strategy } from "./strategy.model";

export class AllUpStartagy extends Strategy {
    public override move(frame: number[]): DIRECTION {
    
        
      const up = Board.movingMove(frame,CONSTANTS.UP);
      if(up) return CONSTANTS.UP;

      const left = Board.movingMove(frame,CONSTANTS.LEFT);
      if(left) return CONSTANTS.LEFT;

      const right = Board.movingMove(frame,CONSTANTS.RIGHT);
      if(right) return CONSTANTS.RIGHT;

      const down = Board.movingMove(frame,CONSTANTS.DOWN);
      if(down) return CONSTANTS.UP;

      return CONSTANTS.UP;
      
    }
  }