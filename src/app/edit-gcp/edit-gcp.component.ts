import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GCP } from '../utils';

@Component({
  selector: 'gcp-edit-gcp',
  templateUrl: './edit-gcp.component.html',
  styleUrls: ['./edit-gcp.component.scss'],
})
export class EditGCPComponent {
  
  gcpData:GCP;

  constructor(
    public dialogRef: MatDialogRef<EditGCPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GCP) {
      const obj = new Object() as GCP;
      obj.name = data.name;
      obj.easting = data.easting;
      obj.northing = data.northing;
      obj.height = data.height;
      this.gcpData = obj;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}




export declare type AlignType = 'start' | 'center' | 'end';
