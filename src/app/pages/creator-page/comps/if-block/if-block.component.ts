import { Component } from '@angular/core';
import { BlockComponent } from '../block/block.component';


@Component({
  selector: 'app-if-block',
  templateUrl: './if-block.component.html',
  styleUrl: './if-block.component.scss'
})
export class IfBlockComponent extends BlockComponent {

  vars = this.CoreService.vars;
  
  
}

