import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-block',
  templateUrl: './container-block.component.html',
  styleUrl: './container-block.component.scss'
})
export class ContainerBlockComponent implements OnInit{
 title = "test";
 @Input() x:number=0;
 @Input() y:number=0;
 ngOnInit(): void {
   (document.getElementsByClassName("app-container-block")[0] as HTMLElement)
   .style.top = this.y+"px";
   (document.getElementsByClassName("app-container-block")[0] as HTMLElement)
   .style.left = this.x+"px";
 }
}

