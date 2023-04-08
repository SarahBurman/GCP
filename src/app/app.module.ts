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
import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterByNamePipe,
    UnitConverterPipe,
    EditGCPComponent,
    HeightComponent,
    SortByPipe,
    ValidNamePipe,
    ValidNumberPipe,
  ],
  imports: [BrowserModule, FormsModule, MatDialogModule],
  providers: [
    ValidNamePipe,
    ValidNumberPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
