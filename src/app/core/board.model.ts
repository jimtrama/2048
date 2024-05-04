import { Utils } from "./utils.service";
import { CONSTANTS } from "./constants"

export type DIRECTION =
    CONSTANTS.DOWN|
    CONSTANTS.LEFT|
    CONSTANTS.UP|
    CONSTANTS.RIGHT;

export type ACTION = CONSTANTS.JOIN | CONSTANTS.MOVE;
export type ITER_WAY = CONSTANTS.NORMAL | CONSTANTS.REVERSED;

export type BoardConfig = {
    startingPosition : number[];//|number[][];
    startingSquarsCount : number;
    dimension:number;
}

export class Board{
    private grid:number[] = [];
    private dimensions:number = 4;
    get d(){
        return this.dimensions;
    }
    private somethingHappened:boolean = false;;
    public score:number = 0;
    public isFull:boolean = false;

    constructor(){
        this.initialize();
    }

    public static movingMove(frame:number[],direction:DIRECTION):boolean{

        let movingOnXAxis = 0;
        let movingOnYAxis = 0;
        if(direction == CONSTANTS.LEFT || direction == CONSTANTS.RIGHT) movingOnXAxis = 1;
        if(direction == CONSTANTS.UP || direction == CONSTANTS.DOWN) movingOnYAxis = 1;

        let reversed = false;
        if(direction === CONSTANTS.UP ) reversed = true;
        if(direction === CONSTANTS.DOWN ) reversed = false;
        if(direction === CONSTANTS.LEFT ) reversed = true;
        if(direction === CONSTANTS.RIGHT ) reversed = false;

        let i = Board.initiator(reversed,frame);
        for(;Board.comperator(i,reversed,frame);){
            let j = Board.initiator(reversed,frame);
            for(;Board.comperator(j,reversed,frame);){
                const nextsDirection = reversed?-1:1;
                const fromIndex =  Utils.cordsTo1D(i,j,4); 
                const toIndex = Utils.cordsTo1D(
                    i + (movingOnYAxis*nextsDirection),
                    j + (movingOnXAxis*nextsDirection),
                    4
                );

                if(toIndex >= frame.length || toIndex < 0) break;
               
                if(
                    Board.joinCheck(fromIndex,toIndex,frame) ||
                    Board.moveCheck(fromIndex,toIndex,frame)
                )
                return true;
                
                        
                
                j = Board.increamentor(j,reversed);
            }
            i = Board.increamentor(i,reversed);
        }
        return false;
    }

    initialize(config?:BoardConfig){
        this.grid = [];
        this.somethingHappened = false;
        this.isFull = false;
        this.score = 0;
        if(!!config?.dimension) this.dimensions = config.dimension;

        if(!!config?.startingPosition && Math.sqrt(config?.startingPosition.length)%2 == 0){
            this.initialize_from_template(config);
            return;
        }
        
        for(let i = 0 ; i < this.dimensions*this.dimensions ;i++){
            this.grid.push(0);
        }
        let start_with_n_filled = 3;
        if(!!config?.startingSquarsCount) start_with_n_filled = config.startingSquarsCount;

        const random_order_array = Utils.randomShufledArray(this.grid.length)
        for(let i = 0 ; i < start_with_n_filled ; i++){
            this.grid[random_order_array[i]] = 2;
        }
        return this.board2D;
    }

    pushTowards(direction:DIRECTION){
        this.somethingHappened = false;
        this.push(direction,CONSTANTS.JOIN);
        this.push(direction,CONSTANTS.MOVE);
        this.push(direction,CONSTANTS.JOIN);
        this.push(direction,CONSTANTS.MOVE);
        if(this.somethingHappened){
            this.addNewTile();
        }
        this.checkFullBoard();
    }

    onAddedTile(v:number){};

    private initialize_from_template(config:BoardConfig){
        for(let i = 0 ; i < config.startingPosition.length ; i++){
            this.grid[i] = config.startingPosition[i];
        }
    }

    private addNewTile(){
        if(!this.somethingHappened) return;

        const randomOrder = Utils.randomShufledArray(this.dimensions*this.dimensions);
        for(let i = 0 ; i < randomOrder.length ; i++){
            if(this.grid[randomOrder[i]] == 0){
                this.grid[randomOrder[i]] = 2;
                this.onAddedTile(randomOrder[i]);
                return;
            }
            
        }
    }

    private checkFullBoard(){
        for(const cell of this.grid){
            if(cell === CONSTANTS.EMPTY_CELL){
                return;
            }
        }
        this.isFull = true;
    }

    private push(direction:DIRECTION,action:ACTION){
        // Up and JOIN -> normal
        // Up and MOVE -> rev
        // Down and JOIN -> rev
        // Down and MOME -> normal

        //Left and JOIN -> norm
        //Left and Move -> rev
        
        //Right and JOIN -> rev
        //Right and Move -> norm

        let movingOnXAxis = 0;
        let movingOnYAxis = 0;
        if(direction == CONSTANTS.LEFT || direction == CONSTANTS.RIGHT) movingOnXAxis = 1;
        if(direction == CONSTANTS.UP || direction == CONSTANTS.DOWN) movingOnYAxis = 1;

        let reversed = false;
        if(direction === CONSTANTS.UP && action === CONSTANTS.MOVE) reversed = true;
        if(direction === CONSTANTS.UP && action === CONSTANTS.JOIN) reversed = true;
        
        if(direction === CONSTANTS.DOWN && action === CONSTANTS.MOVE) reversed = false;
        if(direction === CONSTANTS.DOWN && action === CONSTANTS.JOIN) reversed = false;

        if(direction === CONSTANTS.LEFT && action === CONSTANTS.MOVE) reversed = true;
        if(direction === CONSTANTS.LEFT && action === CONSTANTS.JOIN) reversed = true;

        if(direction === CONSTANTS.RIGHT && action === CONSTANTS.MOVE) reversed = false;
        if(direction === CONSTANTS.RIGHT && action === CONSTANTS.JOIN) reversed = false;

        let i = this.initiator(reversed);
        for(;this.comperator(i,reversed);){
            let j = this.initiator(reversed);
            for(;this.comperator(j,reversed);){
                const nextsDirection = reversed?-1:1;
                const fromIndex =  Utils.cordsTo1D(i,j,this.dimensions); 
                const toIndex = Utils.cordsTo1D(
                    i + (movingOnYAxis*nextsDirection),
                    j + (movingOnXAxis*nextsDirection),
                    this.dimensions
                );

                if(toIndex >= this.grid.length || toIndex < 0) break;
                
                if(action === CONSTANTS.JOIN) this.join(fromIndex,toIndex);
                if(action === CONSTANTS.MOVE) this.move(fromIndex,toIndex);
                        
                
                j = this.increamentor(j,reversed);
            }
            i = this.increamentor(i,reversed);
        }
        
    }

    private initiator(reversed:boolean):number{
        return reversed?this.dimensions-1:0;
    }
    public static initiator(reversed:boolean,array:number[]):number{
        return reversed?Utils.getDimensions(array)-1:0;
    }
    private comperator(i:number,reversed:boolean):boolean{
        return reversed?i>=0:i<this.dimensions;
    }
    public static comperator(i:number,reversed:boolean,array:number[]):boolean{
        return reversed?i>=0:i<Utils.getDimensions(array);
    }
    private increamentor(i:number,reversed:boolean):number{
       return reversed?i-1:i+1;
    }
    public static increamentor(i:number,reversed:boolean):number{
        return reversed?i-1:i+1;
     }

    private join(fromCellIndex:number,toCellIndex:number){
        if(
            this.grid[fromCellIndex] === this.grid[toCellIndex] &&
            this.grid[fromCellIndex] !== CONSTANTS.EMPTY_CELL
        ){
            this.grid[toCellIndex] += this.grid[fromCellIndex];
            this.score += this.grid[toCellIndex];
            this.grid[fromCellIndex] = CONSTANTS.EMPTY_CELL;
            this.somethingHappened = true;
        }
    }

    public static joinCheck(fromCellIndex:number,toCellIndex:number,board:number[]){
        return board[fromCellIndex] === board[toCellIndex] &&
            board[fromCellIndex] !== CONSTANTS.EMPTY_CELL;
        
    }

    private move(fromCellIndex:number,toCellIndex:number){
        if(
            this.grid[toCellIndex] === CONSTANTS.EMPTY_CELL&&
            this.grid[fromCellIndex] !== CONSTANTS.EMPTY_CELL

        ){
            this.grid[toCellIndex] = this.grid[fromCellIndex] 
            this.grid[fromCellIndex] = CONSTANTS.EMPTY_CELL;
            this.somethingHappened = true;
        }
    }

    public static moveCheck(fromCellIndex:number,toCellIndex:number,array:number[]){
       return       array[toCellIndex] === CONSTANTS.EMPTY_CELL&&
            array[fromCellIndex] !== CONSTANTS.EMPTY_CELL

        
    }

    get board2D(){
        return Utils.transformMatrix(this.grid,this.dimensions);
    }
    get board(){
        return [...this.grid];
    }
}