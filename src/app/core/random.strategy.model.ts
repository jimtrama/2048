import { DIRECTION } from './board.model';
import { CONSTANTS } from './constants';
import { Strategy } from './strategy.model';
import { Utils } from './utils.service';

export class RandomStrategy extends Strategy {
  public override move(frame: number[]): DIRECTION {
    const choice = Utils.randomShufledArray(4)[0];
    let direction = CONSTANTS.UP;
    if (choice == 0) {
      direction = CONSTANTS.LEFT;
    } else if (choice == 1) {
      direction = CONSTANTS.RIGHT;
    } else if (choice == 2) {
      direction = CONSTANTS.DOWN;
    }
    return direction;
  }
}
