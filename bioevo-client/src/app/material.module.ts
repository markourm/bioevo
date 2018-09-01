import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule
  ],
  declarations: []
})
export class MaterialModule { }
