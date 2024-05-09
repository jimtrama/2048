import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss'
})
export class CreatorPageComponent {

  private mousePressed = false;

  public item:HTMLElement = {} as HTMLElement;

  constructor(){}


  @HostListener("mousedown",['$event'])
  mouseDown(e:PointerEvent){
    if(this.pressedOnCell(e.pageX,e.pageY))
    this.mousePressed = true;
    console.log(e);
    console.log(e.offsetX);
    console.log(e.offsetY);
    
    
  }
  @HostListener("mouseup",['$event'])
  mouseUp(e:PointerEvent){
    this.mousePressed = false;
    console.log(e);
    console.log(e.offsetX);
    console.log(e.offsetY);
    
    
  }
  @HostListener("mousemove",['$event'])
  mouseMoving(e:PointerEvent){
    if(this.mousePressed){
      this.moveCell(e.offsetX,e.offsetY)
    }
    
  }

  moveCell(x:number,y:number){
    this.item.style.top = y + "px";
    this.item.style.left = x + "px";
    this.rX = x ;
    this.rY = y;
  }
  rX:number = 0;
  rY:number = 0;

  pressedOnCell(x:number,y:number):boolean{
    let items = document.getElementsByTagName("app-container-block");
    for(let i = 0 ; i < items.length;i++){
      if(this.clickIsInsdideItem(x,y,items[i] as HTMLElement)){
        this.item = items[i] as HTMLElement;
        return true;
      }
    }
    return false;
  }

  clickIsInsdideItem(x:number,y:number,item:HTMLElement):boolean{
    const bound = item.getBoundingClientRect();
    return bound.left <= x && bound.right >=x && bound.top <= y && bound.bottom >= y ;
  }

}
