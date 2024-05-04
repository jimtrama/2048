import { DIRECTION } from "./board.model";

export abstract class Strategy{
    public abstract move(frame:number[]):DIRECTION
}