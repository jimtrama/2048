import { Component, OnDestroy } from '@angular/core';
import { SimService } from './sim.service';
import { Board } from '../core/board.model';
import { RandomStrategy } from '../core/random.strategy.model';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrl: './sim.component.scss'
})
export class SimComponent implements OnDestroy {
  public board:number[][];
  public score:number= -1;

  constructor(private simulationService:SimService){
    const b = new Board();
    const s = new RandomStrategy();
    this.simulationService.init(b,s);
    this.board = this.simulationService.getFrame();
    this.simulationService.engine_updated$.subscribe((frame)=>{
      this.board = frame;
      this.score = this.simulationService.engine.board.score;
    })
  }

  ngOnDestroy(): void {
    this.simulationService.stop();
  }

  startButtonClicked(){
    this.simulationService.start();
  }

  pauseButtonClicked(){
    this.simulationService.stop();
  }
  resetButtonClicked(){
    this.simulationService.reset();
  }
  rateChanged(rate:number){
    this.simulationService.updateRate(rate);
  }

}
