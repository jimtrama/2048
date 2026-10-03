import { Board, DIRECTION } from "./board.model";
import { CONSTANTS } from "./constants";
import { Strategy } from "./strategy.model";

export class AllUpStartagy extends Strategy {
    public override killed: boolean = false;
    private moves:DIRECTION[] = []
    public override move(frame: number[]): DIRECTION {
      let direction = CONSTANTS.UP;

      const up = Board.checkIfLeagalMove(frame,CONSTANTS.UP);
      const left = Board.checkIfLeagalMove(frame,CONSTANTS.LEFT);
      const right = Board.checkIfLeagalMove(frame,CONSTANTS.RIGHT);
      const down = Board.checkIfLeagalMove(frame,CONSTANTS.DOWN);
      console.log(up,left,right,down);
      
      if(this.moves[this.moves.length-1] == CONSTANTS.LEFT ){
        if(left){direction = CONSTANTS.LEFT;}
        else if(up){direction = CONSTANTS.UP;}
        else if(right){direction = CONSTANTS.RIGHT;}   
        else if(down){direction = CONSTANTS.DOWN;}
      }else if(this.moves[this.moves.length-1] == CONSTANTS.RIGHT ){
        if(left){direction = CONSTANTS.LEFT;}
        else if(up){direction = CONSTANTS.UP;}
        else if(right){direction = CONSTANTS.RIGHT;}   
        else if(down){direction = CONSTANTS.DOWN;}
      }else{
        if(up){direction = CONSTANTS.UP;}
        else if(left){direction = CONSTANTS.LEFT;}
        else if(right){direction = CONSTANTS.RIGHT;}   
        else if(down){direction = CONSTANTS.DOWN;}
      }
      
      
      this.moves.push(direction);
      console.log(this.moves);
      
      return direction;
      
    }
  }