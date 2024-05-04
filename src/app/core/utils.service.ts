import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class Utils{
    public static transformMatrix(matrix:number[],level:number):number[][]{
        if(matrix.length == 0 || matrix.length % level != 0){
            new Error("Transforming failed ");
        }
        const toReturn = [];
        for(let i = 0 ; i < level;i++){
            const row:number[] = [];
            const step = i*level;
            for(let j = 0+step;j<level+step;j++){
                row.push(matrix[j]);
            }
            toReturn.push(row);
        }
        return toReturn;
    }

    public static randomShufledArray(length:number):number[]{
        const toReturn:number[] = [];
        while(toReturn.length != length){
            const number = this.getRandomInt(length);
            if(!toReturn.find((v)=>v==number)){
                toReturn.push(number);
            }
        }
        return toReturn;
    }

    public static getRandomInt(max:number):number {
        return Math.floor(Math.random() * max);
    }

    public static cordsTo2D(index:number,d:number):number[] {
        return [Math.floor(index/d),index%d]
    }

    public static cordsTo1D(row:number,col:number,d:number):number {
        if(col < 0 || col >= d ) return -1;
        if(row < -1 || row >= d ) return -1;
        return row * d + col;
    }

    public static map(
        value:number,
        from:number,
        to:number,
        at_to:number,
        at_from:number
    ){
        return Math.abs(at_to - at_from) * value /  Math.abs(to - from) 
    }
}