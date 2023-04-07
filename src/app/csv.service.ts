import { Injectable } from '@angular/core';
import { GCP } from './utils';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // public saveDataInCSV(data: Array<GCP>): string {
  //   if (data.length == 0) {
  //     return '';
  //   }

  //   const propertyNames = Object.keys(data[0]);
  //   const rowWithPropertyNames = propertyNames.join(',') + '\n';

  //   let csvContent = rowWithPropertyNames;

  //   const rows: string[] = [];

  //   data.forEach((item) => {
  //     const values: string[] = [];

  //     propertyNames.forEach((key) => {
  //       let val: any = item.get(key);

  //       if (val !== undefined && val !== null) {
  //         val = new String(val);
  //       } else {
  //         val = '';
  //       }
  //       values.push(val);
  //     });
  //     rows.push(values.join(','));
  //   });
  //   csvContent += rows.join('\n');

  //   return csvContent;
  // }

  public importDataFromCSV(csvText: string): Array<GCP> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).replace('\r','').split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    const dataArray: GCP[] = [];
    dataRows.forEach((row) => {
      const values = row.replace('\r','').split(',');

      const obj = new Object() as GCP;

      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        const val: any = values[index];

        if(propertyName === 'name'){
          obj.name = val;
        } else if(propertyName === 'e'){
          obj.easting = val;
        } else if(propertyName === 'n'){
          obj.northing = val;
        }  else if(propertyName === 'h'){
          obj.height = val;
        }
        
      }
      if(!this.checkIfNameExists(obj.name, dataArray) && obj.name){
        dataArray.push(obj);
      }  
    });

    return dataArray;
  }

  private checkIfNameExists(name:string, dataArray:GCP[]): boolean{
    return dataArray.find(gcp => gcp.name == name)!== undefined;
  }
}