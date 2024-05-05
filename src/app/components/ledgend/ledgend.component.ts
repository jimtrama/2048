import { Component, Input } from '@angular/core';
import { Controller } from '../../core/controller.model';

@Component({
  selector: 'app-ledgend',
  templateUrl: './ledgend.component.html',
  styleUrl: './ledgend.component.scss'
})
export class LedgendComponent {
  @Input() controller:Controller = new Controller();

}
