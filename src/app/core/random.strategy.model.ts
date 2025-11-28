import { Board, DIRECTION } from './board.model';
import { CONSTANTS } from './constants';
import { Strategy } from './strategy.model';
import { Utils } from './utils.service';

export class RandomStrategy extends Strategy {

  public override killed: boolean = false;
  public override move(frame: number[]): DIRECTION {
    let choice = Utils.randomShufledArray(4);
    let choiceIndex = 0;
    let direction = CONSTANTS.UP;
    if(Board.checkIfLeagalMove(frame,CONSTANTS.UP)){
      if(choice[choiceIndex] == 0 ){
        direction = CONSTANTS.UP;
      }
    }else{
      if(choice[choiceIndex] == 0 ){
        choiceIndex++;
      }
    }
    if(Board.checkIfLeagalMove(frame,CONSTANTS.DOWN)){
      if(choice[choiceIndex] == 1 ){
        direction = CONSTANTS.DOWN;
      }
    }else{
      if(choice[choiceIndex] == 1 ){
        choiceIndex++;
      }
    }
    if(Board.checkIfLeagalMove(frame,CONSTANTS.LEFT)){
      if(choice[choiceIndex] == 2 ){
        direction = CONSTANTS.LEFT;
      }
    }else{
      if(choice[choiceIndex] == 2 ){
        choiceIndex++;
      }
    }
    
    return direction;
  }
  
}
