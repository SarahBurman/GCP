import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CsvService } from './csv.service';
import { EditGCPComponent } from './edit-gcp/edit-gcp.component';
import { GCP } from './utils';
@Component({
  selector: 'gcp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gcp';
  importedData: Array<GCP> = [];
  filter!: string;
  sortColumn = 'name';
  reverse = true;

  constructor(private _csvService: CsvService, public dialog: MatDialog) {}


  public async importDataFromCSV(event: any) {
    const fileContent = await this.getTextFromFile(event);
    this.importedData = this.mergeData(this.importedData,this._csvService.importDataFromCSV(fileContent));
  }

  openDialog(gcp:GCP): void {
    const dialogRef = this.dialog.open(EditGCPComponent, {
      width: '250px',
      data: gcp,
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result as GCP){
        this.importedData = this.importedData.map(gcp =>{ if(gcp.name === result.name){ return result} else return gcp;})
      }    
    });
  }

  deleteRow(deleteGcp:GCP){
    const index = this.importedData.findIndex(gcp=> gcp.name=== deleteGcp.name);
    if(index > -1 ){
      this.importedData = this.importedData.filter(gcp=> gcp.name !== deleteGcp.name);
    }
  }

  private mergeData(firstArray:GCP[], secondeArray:GCP[]):GCP[]{
    if(firstArray.length === 0){
      return secondeArray;
    }
    const names = firstArray.map(gcp => gcp.name);
    return [...firstArray, ...secondeArray.filter((gcp) => !names.includes(gcp.name))];
  }

  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    const fileContent = await file.text();

    return fileContent;
  }


  sort(column: string) {
    if (this.sortColumn === column) {
      // set boolean true or false
        this.reverse = !this.reverse;
      }
      // If we click on any column then it will assign that name to sortColumn.
    this.sortColumn = column;
  }
}