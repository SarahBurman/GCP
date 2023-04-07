import { Component } from '@angular/core';
import { CsvService } from './csv.service';
import { GCP } from './utils';
import { isDeepStrictEqual } from 'util';
import { MatDialog } from '@angular/material/dialog';
import { EditGCPComponent } from './edit-gcp/edit-gcp.component';

@Component({
  selector: 'gcp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gcp';
  importedData: Array<GCP> = [];
  filter!: string;


  constructor(private _csvService: CsvService, public dialog: MatDialog) {}

  public async importDataFromCSV(event: any) {
    const fileContent = await this.getTextFromFile(event);
    const new_array = this._csvService.importDataFromCSV(fileContent);
    const newData = this.mergeData(this.importedData, new_array);
    this.importedData = this.mergeData(this.importedData,this._csvService.importDataFromCSV(fileContent));
  }

  openDialog(gcp:GCP, index: number): void {
    const dialogRef = this.dialog.open(EditGCPComponent, {
      width: '250px',
      data: gcp
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.importedData.splice(index, 1, result);
      }
      
    });
  }

  deleteRow(deleteGcp:GCP){
    const index = this.importedData.findIndex(gcp=> gcp.name=== deleteGcp.name);
    if(index >= 0 ){
      this.importedData.splice(index,1);
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

}
