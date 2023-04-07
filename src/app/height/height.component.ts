import { Component, Input } from '@angular/core';
import { ValidNumberPipe } from '../pipes/validNumber.pipe';

@Component({
  selector: 'gcp-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss'],
  providers: [ValidNumberPipe]

})
export class HeightComponent {
  @Input() height = ''; 
  selectedUnit = 'meter';

  constructor(private validNumberPipe: ValidNumberPipe){}

  valid(number: string):boolean {
    return this.validNumberPipe.transform(number) != 'Invalid number';
  }
}
