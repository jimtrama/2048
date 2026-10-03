import { Component, Input } from '@angular/core';
import { CoreLogicBlocksService } from '../../../../services/core-logic-blocks.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  @Input() title:string = "block works!";

  constructor(public CoreService:CoreLogicBlocksService) { }

  public selectVar(){
    console.log("selected");
  }
}
