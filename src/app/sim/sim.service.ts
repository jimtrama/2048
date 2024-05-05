import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Engine } from "../core/engine.model";
import { Board } from "../core/board.model";
import { Strategy } from "../core/strategy.model";
import { RandomStrategy } from "../core/random.strategy.model";
import { AllUpStartagy } from "../core/all-up.strategy.model";

@Injectable({providedIn:"root"})
export class SimService{
    public engine =  {} as Engine;
    private updated_frame = new Subject<number[][]>();
    public engine_updated$ = this.updated_frame.asObservable();

    init(board:Board,strategy:Strategy){
        this.engine = new Engine(board,strategy);
        this.engine.onFrameUpdated = this.updateF.bind(this); 
    }

    start(str:string){
        if(str === "RANDOM"){
            this.engine.strategy = new RandomStrategy();
        }else if(str === "TOPLEFT"){
            this.engine.strategy = new AllUpStartagy();
        }  
        this.engine.start();
    }

    pause(){
        this.engine.pause();
    }

    reset(){
        this.engine.restart();
        this.updated_frame.next(this.engine.frame);
    }

    updateRate(rate:number){
        this.engine.rate = rate;
    }

    private updateF(frame:number[][]){
        this.updated_frame.next(frame);
    }
}