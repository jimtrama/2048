import { Subscriber, Subscription, interval, noop } from 'rxjs';
import { Board } from './board.model';
import { Strategy } from './strategy.model';

export class Engine {
  private frameDelayInMs;
  private board: Board;
  public strategy: Strategy;
  private clock:Subscription = new Subscription();

  set rate(r:number){
    this.frameDelayInMs = r;
    this.run(false);
  }

  get frame():number[][]{
    return this.board.board2D;
  }

  get score():number{
    return this.board.score;
  }

  constructor(board: Board, strategy: Strategy, frameDelayInMs = 1000) {
    this.board = board;
    this.strategy = strategy;
    this.frameDelayInMs = frameDelayInMs;
  }

  runInstant(): number {
    this.board.initialize();
    while (!this.board.isFull) {
      const picked_direction = this.strategy.move(this.board.board);
      this.board.pushTowards(picked_direction);
    }
    return this.board.score;
  }

  pause(){
    this.clock.unsubscribe();
  }

  start() {
    this.run(true);
  }

  resume() {
    this.run(false);
  }

  restart(){
    this.pause();
    this.start();
  }

  onFrameUpdated(frame: number[][]) {}

  private run(cleanRun:boolean){
    this.clock.unsubscribe();

    if(cleanRun) this.board.initialize();
    
    this.clock = interval(this.frameDelayInMs).subscribe((f) => {
      if (this.board.isFull) this.clock.unsubscribe();
      const picked_direction = this.strategy.move(this.board.board);
      this.board.pushTowards(picked_direction);
      this.onFrameUpdated(this.board.board2D);
    });
  }
}
