import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BioevoFrontComponent } from './bioevo-front/bioevo-front.component';
import { ReportService, BioEvoService } from './service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
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
