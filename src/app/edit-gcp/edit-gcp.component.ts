import { Component, Inject } from '@angular/core';
import { GCP } from '../utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gcp-edit-gcp',
  templateUrl: './edit-gcp.component.html',
  styleUrls: ['./edit-gcp.component.scss'],
})
export class EditGCPComponent {
  gcpPoint:GCP;
  constructor(
    public dialogRef: MatDialogRef<EditGCPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GCP) {
      const obj = new Object() as GCP;
      obj.name = data.name;
      obj.easting = data.easting;
      obj.northing = data.northing;
      obj.height = data.height;
      this.gcpPoint = obj;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
