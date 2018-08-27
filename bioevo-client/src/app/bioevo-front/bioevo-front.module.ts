import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { BioEvoFrontRoutingModule } from './bioevo-front-routing.module';
import { BioevoFrontComponent } from './bioevo-front.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BioEvoFrontRoutingModule
  ],
  declarations: [BioevoFrontComponent]
})
export class BioEvoFrontModule { }
