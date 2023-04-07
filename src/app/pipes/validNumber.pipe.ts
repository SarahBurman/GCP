import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validNumber',
})
export class ValidNumberPipe implements PipeTransform {
  transform(value: string): string {
    if(isNaN(parseFloat(value))){
        return 'Invalid number';
    }
    if(!value){
        return 'Missing value';
    }
    return value;
  }
}