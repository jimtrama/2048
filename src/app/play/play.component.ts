import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Board } from '../core/board.model';
import { Controller } from '../core/controller.model';
import { Utils } from '../core/utils.service';
import { Engine } from '../core/engine.model';
import { RandomStrategy } from '../core/random.strategy.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements AfterViewInit,OnInit {

  @Input() simMode:boolean = false;

  private board:Board;
  private e:Engine;
  get score(){
    return this.board.score;
  }
  get ToRender(){
    if(this.show.length == this.board.d) return this.show;
    return this.board.board2D;
  }
  private show:number[][] = [];
  controller:Controller;
  stepWi:number=10;
  justAddedIndex = 0;

  get1D(i:number,j:number):number{
    return Utils.cordsTo1D(i,j,this.board.d)
  }


  constructor(){
    this.board = new Board();
    this.board.onAddedTile = this.updateJust.bind(this);
    this.controller = new Controller();
    const s = new RandomStrategy();
    this.e = new Engine(this.board,s);
  }

  ngOnInit(): void {
    if(!this.simMode){
      this.controller.listen(this.board,this.isTouchDevice());
    }else{
      
      this.e.onFrameUpdated = this.frameUp.bind(this);
      this.e.runThrotteled();
    }
  }
  private isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.maxTouchPoints > 0));
  }

  frameUp(frame:number[][]){
    this.show = frame;
  }

  updateJust(v:number){
    this.justAddedIndex = v;
  }

  changeRate(){
    const rate = +(document.getElementById("rate")as HTMLInputElement).value;
    console.log(rate);
    
    this.e.rate = +rate;
  }
  slideRate(){
    (document.getElementById("rate-info")as HTMLElement).innerText = 
    +(document.getElementById("rate")as HTMLInputElement).value + " MS"
  }

  
  ngAfterViewInit(): void {
    const width = document.getElementsByClassName("playing-container")[0]?.getBoundingClientRect().width??0;
    this.stepWi = (width / this.board.d ) - 15;

  }
}
