import { Component } from '@angular/core';
import { BlockComponent } from '../block/block.component';

@Component({
  selector: 'app-var-block',
  templateUrl: './var-block.component.html',
  styleUrl: './var-block.component.scss'
})
export class VarBlockComponent extends BlockComponent {

  value:string = "";


  valueChange(e:Event){
    this.value = (e.target as HTMLInputElement).value;
    const parsed= this.parseValue();
    if(!!parsed && !!parsed.value){
      this.CoreService.updateVar( parsed.name, parsed.value);
    }
  }

  parseValue(): {name:string, value:string} | undefined {
    let parts = this.value.split("=");
    if(parts.length == 2){
      return {name:parts[0].trim(), value:parts[1].trim()};
    }
    return undefined;
  }
}
