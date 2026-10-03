import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss'
})
export class CreatorPageComponent implements AfterViewInit{

  public item:HTMLElement = {} as HTMLElement;
  public blocks:{id:number,type:string}[] = [];
  private paddingLeft = 0;
  private paddingTop = 0;
  private mouvingEl :HTMLElement|undefined = undefined;


  ngAfterViewInit(): void {
    this.paddingLeft = (document.body.getElementsByClassName('tools-area')[0] as HTMLElement).getBoundingClientRect().width;
    this.paddingTop = (document.body.getElementsByTagName('app-header')[0] as HTMLElement).getBoundingClientRect().height;
  }

  addBlock(type:string){
    this.blocks.push({id:this.blocks.length,type});
  }

  @HostListener("mouseup",['$event'])
  mouseUp(e:PointerEvent){
    this.mouvingEl = undefined;
    console.log(e);
  }

  @HostListener("mousemove",['$event'])
  mouseMoving(e:PointerEvent){
    if(this.mouvingEl != undefined ){
      if(e.pageX - this.paddingLeft > 0)
      this.mouvingEl.style.left = e.pageX - this.paddingLeft + 'px';
      this.mouvingEl.style.top = e.pageY - this.paddingTop + 'px';
    }
    
  }

  @HostListener("mousedown",['$event'])
  mouseDown(e:PointerEvent){
    this.mouvingEl = this.pressedOnCell(e.pageX,e.pageY) as HTMLElement;
  }

  pressedOnCell(x:number,y:number):HTMLElement|undefined{
    let items = document.getElementsByTagName("app-block");
    for(let i = 0 ; i < items.length;i++){
      if(this.clickIsInsdideItem(x,y,items[i] as HTMLElement)){
        return items[i] as HTMLElement;
      }
    }
    return undefined;
  }

  clickIsInsdideItem(x:number,y:number,item:HTMLElement):boolean{
    const bound = item.getBoundingClientRect();
    return bound.left <= x && bound.right >=x && bound.top <= y && bound.bottom >= y ;
  }

}
