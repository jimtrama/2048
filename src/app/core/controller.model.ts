import { Board } from "./board.model";
import { CONSTANTS } from "./constants";

export  class Controller{

    public leftKey = "j";
    public rightKey = "l";
    public upKey = "i";
    public downKey = "k";



    public listen(board:Board){
        document.addEventListener("keypress",(e)=>{
            this.listener(e,board);
        })  
    }

    public onLeftInput(){};
    public onRightInput(){};
    public onUpInput(){};
    public onDownInput(){};

    private listener(event:KeyboardEvent,board:Board){
        if(event.key == this.rightKey){
            board.pushTowards(CONSTANTS.RIGHT)
            this.onRightInput();
        }else
        if(event.key == this.leftKey){
            board.pushTowards(CONSTANTS.LEFT)
            this.onLeftInput();
        }else
        if(event.key == this.downKey){
            board.pushTowards(CONSTANTS.DOWN)
            this.onDownInput();
        }else
        if(event.key == this.upKey){
          board.pushTowards(CONSTANTS.UP)
          this.onUpInput();
        } 
    }
}