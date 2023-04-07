import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validName',
})
export class ValidNamePipe implements PipeTransform {
  transform(name: string): string {
    if(name) {
      return name;
    }
    return 'Missing name';
  }
}