import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverter',
})


export class UnitConverterPipe implements PipeTransform {
  meterToFeet = 3.2808399;
  meterToYard = 1.0936133;
  transform(height: string, unit:string = 'meter'): string {
    if(isNaN(parseFloat(height))){
      return height;
    }
    if(unit === 'meter'){
      return height.toString();
    }
    if(unit === 'feet'){
      return (+height*this.meterToFeet).toFixed(3).toString();
    }
    
    return (+height*this.meterToYard).toFixed(3).toString();
  }  
  
  
}
