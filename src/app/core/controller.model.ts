import { Board } from './board.model';
import { CONSTANTS } from './constants';

export class Controller {
  public leftKey = 'j';
  public rightKey = 'l';
  public upKey = 'i';
  public downKey = 'k';

  public listen(board: Board) {
    if (this.isTouchDevice()) {
        let pointX = 0;
        let pointY = 0;
      document.addEventListener("touchstart", (e) => {
        pointX = e.changedTouches[0].clientX;
        pointY = e.changedTouches[0].clientY;
        
      });
      document.addEventListener("touchend", (e) => {
        console.log(e);
        
        this.listener(e, board,pointX,pointY);
      });
      
    } else {
      document.addEventListener('keypress', (e) => {
        this.listener(e, board);
      });
    }
  }

  public onLeftInput() {}
  public onRightInput() {}
  public onUpInput() {}
  public onDownInput() {}

  private isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.maxTouchPoints > 0));
  }

  private listener(event: KeyboardEvent | TouchEvent, board: Board,x = 0,y = 0) {
    if (!this.isTouchDevice()) {
      event = event as KeyboardEvent;
      if (event.key == this.rightKey) {
        board.pushTowards(CONSTANTS.RIGHT);
        this.onRightInput();
      } else if (event.key == this.leftKey) {
        board.pushTowards(CONSTANTS.LEFT);
        this.onLeftInput();
      } else if (event.key == this.downKey) {
        board.pushTowards(CONSTANTS.DOWN);
        this.onDownInput();
      } else if (event.key == this.upKey) {
        board.pushTowards(CONSTANTS.UP);
        this.onUpInput();
      }
    } else {
      event = event as TouchEvent;

      const l = event.changedTouches[0];
      const lx = Math.abs(l.clientX - x);
      const ly = Math.abs(l.pageY - y);
      if (lx > ly) {
        if (l.pageX - x >= 0) {
          board.pushTowards(CONSTANTS.RIGHT);
          this.onRightInput();
        } else {
          board.pushTowards(CONSTANTS.LEFT);
          this.onLeftInput
        }
      }else{
        if (l.pageY - y < 0) {
            board.pushTowards(CONSTANTS.UP);
            this.onUpInput();
          } else {
            board.pushTowards(CONSTANTS.DOWN);
            this.onDownInput();
          }
      }
    }
  }
}
