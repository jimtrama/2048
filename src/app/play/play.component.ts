import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Board } from '../core/board.model';
import { Controller } from '../core/controller.model';
import { Utils } from '../core/utils.service';
import { Engine } from '../core/engine.model';
import { AllUpStartagy } from '../core/all-up.strategy.model';
import { SimService } from '../sim/sim.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements AfterViewInit,OnInit,OnChanges {

  @Input() boardImported:number[][] = [];
  @Input() scoreImported:number = -1;

  private board:Board;
  cellWidth:number = 0;
  get score(){
    if(this.scoreImported > 0 ){
      return this.scoreImported;
    }
    return this.board.score;
  }
  
  get boardToRender(){
    if(this.boardImported.length>0){
      return this.boardImported;
    }
    return this.board.board2D;
  }
  controller:Controller;
  justAddedIndex = -1;

  renderInEffect(i:number,j:number):boolean{
    if(this.justAddedIndex === Utils.cordsTo1D(i,j,this.board.d)){
      this.justAddedIndex = -1;
      return true;
    }
    return false;
  }
  

  constructor(private simService:SimService){
    this.board = new Board();
    this.board.onAddedTile = this.updateJust.bind(this);
    this.controller = new Controller();
  }

  ngOnInit(): void {
    if(this.boardImported.length === 0 )
      this.controller.listen(this.board);
  }

  ngAfterViewInit(): void {
    const width = document.getElementsByClassName("playing-container")[0]?.getBoundingClientRect().width??0;
    this.cellWidth = (width / this.board.d ) - 15;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes["boardImported"]){
      //this.boardImported = changes["boardImported"].currentValue;
    }
    if(!!changes["scoreImported"]){

    }
  }

  updateJust(v:number){
    this.justAddedIndex = v;
  }
  
}
