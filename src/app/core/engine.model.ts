import { Subscriber, Subscription, interval, noop } from 'rxjs';
import { Board } from './board.model';
import { Strategy } from './strategy.model';

export class Engine {
  private frameDelayInMs;
  public board: Board;
  public strategy: Strategy;

  set rate(r:number){
    this.frameDelayInMs = r;
    this.sub.unsubscribe()
    this.runThrotteled(true);
  }

  constructor(board: Board, strategy: Strategy, frameDelayInMs = 1000) {
    this.board = board;
    this.strategy = strategy;
    this.frameDelayInMs = frameDelayInMs;
  }

  run(): number {
    this.board.initialize();
    while (!this.board.isFull) {
      const picked_direction = this.strategy.move(this.board.board);
      this.board.pushTowards(picked_direction);
    }
    return this.board.score;
  }

  sub:Subscription = new Subscriber();

  runThrotteled(fromRestart=false) {
    if(!this.sub.closed){
        this.sub.unsubscribe();
    }
    if(!fromRestart)
    this.board.initialize();
    this.sub = interval(this.frameDelayInMs).subscribe((f) => {
      if (this.board.isFull) this.sub.unsubscribe();
      const picked_direction = this.strategy.move(this.board.board);
      this.board.pushTowards(picked_direction);
      this.onFrameUpdated(this.board.board2D);
    });
  }

  public onFrameUpdated(frame: number[][]) {}
}
