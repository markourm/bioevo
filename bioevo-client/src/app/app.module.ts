import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BioevoFrontComponent } from './bioevo-front/bioevo-front.component';
import { ReportService, BioEvoService } from './service';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    ReportService,
    BioEvoService
  ],
  declarations: [
    AppComponent,
    BioevoFrontComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
