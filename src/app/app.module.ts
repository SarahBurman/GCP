import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { FilterByNamePipe } from './pipes/filterByName.pipe';
import { ValidNamePipe } from './pipes/validName.pipe';
import { ValidNumberPipe } from './pipes/validNumber.pipe';
import { EditGCPComponent } from './edit-gcp/edit-gcp.component';
import { UnitConverterPipe } from './pipes/unit-converter.pipe';
import { HeightComponent } from './height/height.component';


@NgModule({
  declarations: [
    AppComponent,
    ValidNamePipe,
    ValidNumberPipe,
    FilterByNamePipe,
    UnitConverterPipe,
    EditGCPComponent,
    HeightComponent,
  ],
  imports: [BrowserModule, FormsModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
