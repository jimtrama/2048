import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sim-controller',
  templateUrl: './sim.controller.component.html',
  styleUrl: './sim.controller.component.scss'
})
export class SimControllerComponent {

  @Output() startClicked = new EventEmitter<string>();
  @Output() pauseClicked = new EventEmitter<void>();
  @Output() resetClicked = new EventEmitter<void>();
  @Output() rateChanged = new EventEmitter<number>();
  @Output() strategySelected = new EventEmitter<string>();

  rate:number = 1000;
  selectedStrategy:string = "RANDOM";


  start(){
    const boxes = document.getElementsByClassName("radio-btn-str");
    let str = "RANDOM";
    for(let i=0;i<boxes.length;i++){
      if((boxes[i] as HTMLInputElement).checked){
        str = (boxes[i] as HTMLInputElement).value
      };
    }
    this.startClicked.next(str);
  }
  pause(){
    this.pauseClicked.next();
  }
  reset(){
    this.resetClicked.next();
  }

  rateSliderChanged(){
    const rate = +(document.getElementById("rate")as HTMLInputElement).value;
    this.rate = +rate;
  }

  rateButtonClicked(){
    this.rateChanged.next(this.rate);
  }

  slideRate(){
    (document.getElementById("rate-info")as HTMLElement).innerText = 
    +(document.getElementById("rate")as HTMLInputElement).value + " MS"
  }
}
