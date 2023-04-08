import { Pipe, PipeTransform } from '@angular/core';
import { GCP } from '../utils';
import { ValidNamePipe } from './validName.pipe';
import { ValidNumberPipe } from './validNumber.pipe';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  constructor(public validNumberPipe: ValidNumberPipe, public validNamePipr: ValidNamePipe) {}
  transform(gcps: GCP[],  column:string ='', asc:boolean): GCP[] {
    const array = this.sortInvalid(gcps, column);
    const invalidIndex = array.findIndex(gcp => this.invalidGCP(gcp, column));
    const validArray = array.slice(0, invalidIndex != -1? invalidIndex : array.length);
    let invalidArray = [] as GCP[];
    if(invalidIndex != -1){
      invalidArray = array.slice(invalidIndex)
    }
    if(column === 'name'){
      return validArray.sort((a, b) => 
        this.sortByString(a.name, b.name, asc)
      ).concat(invalidArray);
    }
    if(column === 'northing'){
      return validArray.sort((a,b) => 
      this.sortByNumber(a.northing,b.northing, asc)).concat(invalidArray);
    }
    if(column === 'easting'){
      return validArray.sort((a,b) => 
      this.sortByNumber(a.easting, b.easting, asc)).concat(invalidArray);
    }
    return validArray.sort((a,b) => 
      this.sortByNumber(a.height, b.height, asc)).concat(invalidArray);
  }

  private sortInvalid(array:GCP[], column:string){
    const validGCPs = array.map(gcp =>{ return {
      name:this.validNamePipr.transform(gcp.name),
      easting: this.validNumberPipe.transform(gcp.easting),
      northing: this.validNumberPipe.transform(gcp.northing),
      height: this.validNumberPipe.transform(gcp.height)
    } as GCP});

    let lastInvalid = validGCPs.length;
    for(let i=0;i<validGCPs.length; i++){
      const value = validGCPs.findIndex(gcp => this.invalidGCP(gcp, column));
      if(value > -1 && lastInvalid!= value){
        const gcp = validGCPs.splice(value,1);
        validGCPs.push(...gcp);
        lastInvalid--;
      }
    }
    return validGCPs;
    
  }

  private invalidGCP(gcp:GCP, column: string): boolean{
    if(column ==='name'){
      return gcp.name === "Missing name";
    }
    if(column === 'easting'){
      return gcp.easting === "Missing value" || gcp.easting === "Invalid number";
    }
    if(column === 'northing'){
      return gcp.northing === "Missing value" || gcp.northing === "Invalid number";
    }
    return  gcp.height === "Missing value" || gcp.height === "Invalid number";
  }

  private sortByString(firstValue: string, secondValue: string, isASC: boolean): number {
      if (isASC === true) {
        return firstValue.localeCompare(secondValue);
      } else if (isASC === false) {
        return secondValue.localeCompare(firstValue);
      }
      return 0;
  }

  private sortByNumber(firstValue: string, secondValue: string, isASC: boolean): number {
      if (isASC === true) {
        return Number(firstValue)-Number(secondValue);
      } else if (isASC === false) {
        return Number(secondValue)-Number(firstValue);
      }
      return 0;
  }
}