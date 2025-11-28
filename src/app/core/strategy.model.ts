import { DIRECTION } from "./board.model";

export abstract class Strategy{
    public abstract move(frame:number[],prevMove?:DIRECTION):DIRECTION
    public abstract killed:boolean;
}