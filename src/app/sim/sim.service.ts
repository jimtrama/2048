import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Simulation } from "../core/simulation.model";
import { Engine } from "../core/engine.model";
import { Board } from "../core/board.model";
import { Strategy } from "../core/strategy.model";

@Injectable({providedIn:"root"})
export class SimService{
    public engine =  {} as Engine;
    private updated_frame = new Subject<number[][]>();
    public engine_updated$ = this.updated_frame.asObservable();


    init(board:Board,strategy:Strategy){
        this.engine = new Engine(board,strategy);
        this.engine.onFrameUpdated = this.updateF.bind(this);
        
    }

    start(){
        this.engine.runThrotteled();
    }

    stop(){
        this.engine.sub.unsubscribe();
    }
    reset(){
        this.engine.sub.unsubscribe();
        this.engine.board.initialize();
        this.updated_frame.next(this.engine.board.board2D);
    }

    getFrame():number[][]{
       return  this.engine.getFrame();
    }

    updateRate(rate:number){
        this.engine.rate = rate;
    }

    private updateF(frame:number[][]){
        this.updated_frame.next(frame);
    }
}