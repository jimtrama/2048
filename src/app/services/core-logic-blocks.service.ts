import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreLogicBlocksService {

  vars:{name:string, value:any}[] = [];

  constructor() { }

  updateVar(name:string, value:string){
    console.log(`Updating variable: ${name} with value: ${value}`);
    const existingVar = this.vars.find(v => v.name === name);
    if(existingVar){
      existingVar.value = value;
    } else {
      this.vars.push({name, value});
    }
  }
  
}
