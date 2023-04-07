import { Pipe, PipeTransform } from '@angular/core';
import { GCP } from '../utils';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(values: GCP[], filter: string): GCP[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: GCP) => {
      const nameFound =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      if (nameFound) {
        return value;
      }
      return null;
    });
  }
}